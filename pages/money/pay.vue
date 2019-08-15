<template>
	<view class="app">
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{detail.finalLastSum}}</text>
		</view>

		<view class="pay-type-list">

			<view class="type-item b-b" @click="changePayType(10)">
				<text class="icon yticon icon-weixinzhifu"></text>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 10' />
					</radio>
				</label>
			</view>
			<view class="type-item b-b" @click="changePayType(12)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 12' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(1)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">余额</text>
					<!-- <text>可用余额 ¥198.5</text> -->
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 1' />
					</radio>
				</label>
			</view>
		</view>
		<button class="mix-btn" v-if="type === 'pay'" @click="confirmPay" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
		<button class="mix-btn" v-else @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import orderModel from '../../api/order/index.js'
	export default {
		data() {
			return {
				btnLoading: false,
				payType: 10,
				detail: {},
				type: ''
			};
		},
		computed: {
			...mapGetters(['params']),
		},
		onLoad(options) {
			if (options.type && options.type === 'pay') {
				this.type = 'pay'
				this.detail = JSON.parse(JSON.stringify(options))
			} else {
				this.detail = JSON.parse(JSON.stringify(this.params))
			}
			// this.getPaymentList() // 暂时写死支付方式
		},

		methods: {
			// // 获取支付方式
			// getPaymentList() {
			// 	orderModel.getPaymentList().then(res => {
			// 		console.log(res)
			// 	})
			// },
			//选择支付方式
			changePayType(type) {
				this.payType = type;
			},
			payAction(id, payment_id) {
				orderModel.doPay({
					order_id: id,
					payment_id
				}).then(ress => {
					console.log(ress, '支付')
					uni.getProvider({
						service: 'payment',
						success: (service) => {
							uni.requestPayment({
								provider: service.provider[1],
								orderInfo: JSON.stringify(ress.data),
								success: () => {
									this.btnLoading = false
									uni.showModal({
										title: '提示',
										content: '是否已支付？',
										success: (e) => {
										}
									})
								},
								fail: (error) => {
									uni.showModal({
										title: '提示',
										content: JSON.stringify(error),
										success: (e) => {
										}
									})
									this.btnLoading = false
								}
							})
						}
					})
				
				}).catch(() => {
					this.btnLoading = false
				})
			},
			confirmPay() { // 订单支付
				this.btnLoading = true
				const { detail: { id }, payType } = this
				this.payAction(id, 14)
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
					this.payAction(res.data)
				}).catch(() => {
					this.btnLoading = false
				})
				// uni.redirectTo({
				// 	url: '/pages/money/paySuccess'
				// })
			},
		}
	}
</script>

<style lang='scss'>
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
