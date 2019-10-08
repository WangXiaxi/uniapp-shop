<template>
	<view class="content">
		<view class="spec">
			<text class="tit">充值金额</text>
			<view class="inp">
				<view class="red">￥</view>
				<input class="input" type="number" v-model="amount" placeholder="0.00" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="pay-type-list">
			<view class="type-item b-b" @click="changePayType(14)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 14' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(18)" v-if="!isH5">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 18' />
					</radio>
				</label>
			</view>
		</view>
		<button class="mix-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
		<view class="pay-dlalog" v-if="showPayDialog">
			<view class="cont">
				<view class="title">请确定支付是否已完成</view>
				<view class="title red" @click="getOrderStatus">已完成订单支付</view>
				<view class="title grey" @click="getOrderStatus">支付遇到问题，重新支付</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import orderModel from '../../api/order/index.js'
	import requestModel from '../../utils/request.js'
	import {
		url_base
	} from '../../common/config/index.js'

	// #ifdef H5
	const request = new requestModel()
	// #endif
	export default {
		components: {
		},
		data() {
			return {
				showPayDialog: false, // 微信H5支付回掉弹框
				amount: '',
				btnLoading: false,
				payType: 14,
				isH5: false
			}
		},
		onLoad(options) {
			// #ifdef H5
			this.isH5 = true
			this.detail = JSON.parse(JSON.stringify(options))
			if (options.winxin) {
				this.btnLoading = true
				this.showPayDialog = true
			}
			// #endif
		},
		computed: {
			...mapGetters(['isWeixin']),
		},
		methods: {
			// #ifdef H5
			// 轮询查看订单状态 h5支付
			getOrderStatus() {
				this.showPayDialog = false
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				setTimeout(() => {
					orderModel.isPayOrderPaySuccess({
						id: this.detail.id,
						type: 'recharge'
					}).then(res => {
						uni.hideLoading()
						if (res.data == 'SUCCESS') {
							uni.redirectTo({
								url: '/pages/money/reSuccess'
							})
						} else {
							uni.showModal({
								title: '提示',
								content: '支付失败！'
							})
							this.btnLoading = false
						}
					})
				}, 3000)
			},
			// #endif
			confirm() { // 确认
				if (!Number(this.amount)) return this.$api.msg('请输入充值金额')
				this.btnLoading = true
				
				// #ifdef H5
				const paySwitch = {
					18: 10,
					14: this.isWeixin ? 12 : 15 // 微信浏览器用 微信浏览器方试调用
				}
				orderModel.doPay({
					recharge: Number(this.amount),
					payment_id: paySwitch[this.payType]
				}).then(ress => {
					switch (paySwitch[this.payType]) {
						case 10: // 支付宝
							request.postExcelFile(ress.data, 'https://mapi.alipay.com/gateway.do?_input_charset=utf-8')
							break
						case 12: // 微信浏览器 微信
							const {
								appid,
								nonce_str,
								sign,
								prepay_id,
								timeStamp,
								paySign,
								M_OrderId
							} = ress.data
							WeixinJSBridge.invoke('getBrandWCPayRequest', {
								'appId': appid, //公众号名称，由商户传入
								'timeStamp': '' + timeStamp, //时间戳，自1970年以来的秒数
								'nonceStr': nonce_str, //随机串     
								'package': `prepay_id=${prepay_id}`,
								'signType': 'MD5', // 微信签名方式
								'paySign': paySign, // 微信签名
							}, function(e) {
								if (e.err_msg == 'get_brand_wcpay_request:ok') {
									uni.redirectTo({
										url: '/pages/money/reSuccess'
									})
								} else {
									uni.showModal({
										title: '提示',
										content: '支付失败！'
									})
									this.btnLoading = false
								}
							})
							break
						case 15: // 微信 H5
							window.location.href = ress.data.mweb_url + '&redirect_url=' + encodeURIComponent(url_base +
								'/pages/money/invest?winxin=true&id=' + M_OrderId)
							break
					}
				}).catch(() => {
					this.btnLoading = false
				})
				// #endif
				
				// #ifndef H5
				orderModel.doPay({
					recharge: Number(this.amount),
					payment_id: this.payType
				}).then(ress => {
					switch (this.payType) {
						case 18: // 支付宝
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: ress.data.url,
								success: () => {
									this.btnLoading = false
									uni.redirectTo({
										url: '/pages/money/reSuccess'
									})
								},
								fail: (error) => {
									uni.showModal({
										title: '提示',
										content: error.errMsg
									})
									this.btnLoading = false
								}
							})
							break
						case 14: // 微信
							uni.requestPayment({
								provider:"wxpay",
								timeStamp:ress.data.timestamp,
								nonceStr:ress.data.noncestr,
								package:ress.data.package,
								signType:"MD5",
								paySign:ress.data.sign,
								orderInfo:{
									appid:ress.data.appid,
									noncestr:ress.data.noncestr,
									package:ress.data.package,
									partnerid:ress.data.partnerid,
									prepayid:ress.data.prepayid,
									timestamp:ress.data.timestamp,
									sign:ress.data.sign,
								},
								success: () => {
									this.btnLoading = false
									uni.redirectTo({
										url: '/pages/money/reSuccess'
									})
								},
								fail: (error) => {
									uni.showModal({
										title: '提示',
										content: error.errMsg
									})
									this.btnLoading = false
								}
							})
							break
					}
				}).catch(() => {
					this.btnLoading = false
				})
				// #endif
			},
			close() { // 关闭支付
				this.show = false
			},
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
		}
	}
</script>

<style lang="scss">
	.pay-dlalog {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100000;
		background: rgba(0, 0, 0, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
	
		.cont {
			width: 80%;
			height: 300upx;
			background: #FFFFFF;
			border-radius: 10upx;
	
			.title {
				font-size: 30rpx;
				height: 100rpx;
				display: flex;
				justify-content: center;
				align-items: center;
	
				&+.title {
					border-top: 1upx solid #dedede;
				}
	
				&.red {
					color: red;
				}
	
				&.grey {
					color: #999999;
				}
			}
		}
	}
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.spec {
		position: relative;
		padding: 20upx 30upx;
		background: #fff;
		.inp {
			margin-top: 20upx;
			display: flex;
			align-items: center;
			font-size: 30px;
			.red {
				color: $base-color;
				margin-right: 10upx;
			}
			.input {
				font-size: 50upx;
				flex: 1;
			}
		}
	}
	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;
	
		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}
	
		.icon {
			width: 100upx;
			font-size: 52upx;
		}
	
		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}
	
		.icon-weixinzhifu {
			color: #36cb59;
		}
	
		.icon-alipay {
			color: #01aaef;
		}
	
		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}
	
		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}
	
	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
