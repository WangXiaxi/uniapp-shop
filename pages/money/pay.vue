<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{detail.finalLastSum}}</text>
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

			<view class="type-item" @click="changePayType(1)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">余额</text>
					<text>可用余额 ¥{{userInfo.remain_balance | nf}}</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 1' />
					</radio>
				</label>
			</view>
		</view>
		<button class="mix-btn" v-if="type === 'pay'" @click="confirmPay" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
		<button class="mix-btn" v-else @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
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
		data() {
			return {
				showPayDialog: false, // 微信H5支付回掉弹框
				btnLoading: false,
				payType: 14,
				detail: {},
				type: '',
				isH5: false
			};
		},
		computed: {
			...mapGetters(['params', 'userInfo', 'isWeixin']),
		},
		onLoad(options) {
			if (options.type && options.type === 'pay') {
				this.type = 'pay'
				this.detail = JSON.parse(JSON.stringify(options))
			} else {
				this.detail = JSON.parse(JSON.stringify(this.params))
			}
			// #ifdef H5
			this.isH5 = true
			if (options.winxin) {
				this.btnLoading = true
				this.showPayDialog = true
			}
			// #endif
		},

		methods: {
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
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
						type: 'order'
					}).then(res => {
						uni.hideLoading()
						if (res.data == 'SUCCESS') {
							uni.redirectTo({
								url: '/pages/money/paySuccess?id=' + id
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
			payAction(id, payment_id) {
				// #ifdef H5
				const paySwitch = {
					1: 1,
					18: 10,
					14: this.isWeixin ? 12 : 15 // 微信浏览器用 微信浏览器方试调用
				}
				orderModel.doPay({
					order_id: id,
					payment_id: paySwitch[payment_id]
				}).then(ress => {
					switch (paySwitch[payment_id]) {
						case 1: // 余额支付
							uni.redirectTo({
								url: '/pages/money/paySuccess?id=' + id
							})
							break
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
								paySign
							} = ress.data
							WeixinJSBridge.invoke('getBrandWCPayRequest', {
								'appId': appid, //公众号名称，由商户传入
								'timeStamp': '' + timeStamp, //时间戳，自1970年以来的秒数
								'nonceStr': nonce_str, //随机串     
								'package': `prepay_id=${prepay_id}`,
								'signType': 'MD5', // 微信签名方式
								'paySign': paySign, // 微信签名
							}, function(e) {
								if (res.err_msg == 'get_brand_wcpay_request:ok') {
									uni.redirectTo({
										url: '/pages/money/paySuccess?id=' + id
									})
								} else {
									uni.showModal({
										title: '提示',
										content: '支付失败！'
									})
								}
							})
							break
						case 15: // 微信 H5
							window.location.href = ress.data.mweb_url + '&redirect_url=' + encodeURIComponent(url_base +
								'/pages/money/pay?type=pay&winxin=true&id=' + id)
							break
					}
				}).catch(() => {
					this.btnLoading = false
				})
				// #endif
				// #ifndef H5
				orderModel.doPay({
					order_id: id,
					payment_id
				}).then(ress => {
					switch (payment_id) {
						case 1: // 余额支付
							uni.redirectTo({
								url: '/pages/money/paySuccess?id=' + id
							})
							break
						case 18: // 支付宝
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: ress.data.url,
								success: () => {
									this.btnLoading = false
									uni.redirectTo({
										url: '/pages/money/paySuccess?id=' + id
									})
								},
								fail: (error) => {
									uni.showModal({
										title: '提示',
										content: '支付失败！'
									})
									this.btnLoading = false
								}
							})
							break
						case 14: // 微信
							uni.requestPayment({
								provider: 'wxpay',
								timeStamp: ress.data.timestamp,
								nonceStr: ress.data.noncestr,
								package: ress.data.package,
								signType: 'MD5',
								paySign: ress.data.sign,
								orderInfo: {
									appid: ress.data.appid,
									noncestr: ress.data.noncestr,
									package: ress.data.package,
									partnerid: ress.data.partnerid,
									prepayid: ress.data.prepayid,
									timestamp: ress.data.timestamp,
									sign: ress.data.sign
								},
								success: () => {
									this.btnLoading = false
									uni.redirectTo({
										url: '/pages/money/paySuccess?id=' + id
									})
								},
								fail: (error) => {
									uni.showModal({
										title: '提示',
										content: '支付失败！'
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
			confirmPay() { // 订单支付
				this.btnLoading = true
				const {
					detail: {
						id
					},
					payType
				} = this
				this.payAction(id, payType)
			},
			// 立即支付 确认支付
			confirm() {
				const {
					pay_revisit: revisit,
					defaultAddress: {
						id: radio_address,
						accept_name
					},
					logisticsId: delivery_id,
					remark: message,
					goodsList
				} = this.detail
				const sendData = {
					radio_address,
					accept_name,
					delivery_id,
					message: message ? message : ' ',
					revisit: revisit ? revisit : 0,
					payment: this.payType
				}
				if (goodsList.length === 1) {
					const {
						count,
						spec_array,
						goods_id,
						product_id,
					} = goodsList[0]
					Object.assign(sendData, {
						direct_gid: spec_array ? product_id : goods_id,
						direct_num: count,
						direct_type: spec_array ? 'products' : 'goods'
					})
				}
				this.btnLoading = true
				orderModel.confirmOrder(sendData).then(res => {
					if (res.data.type == 1) {
						this.type = 'pay'
						this.detail.id = res.data.order_id
						this.payAction(res.data.order_id, this.payType)
					} else {
						this.btnLoading = false
						uni.redirectTo({
							url: '/pages/money/paySuccess?id=' + res.data.order_id
						})
					}
				}).catch(() => {
					this.btnLoading = false
				})
			},
		}
	}
</script>

<style lang='scss'>
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

	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
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
