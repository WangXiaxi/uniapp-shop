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
			<view class="type-item b-b" @click="changePayType(18)">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#ea1212" :checked='payType == 18' />
					</radio>
				</label>
			</view>
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
		</view>
		<button class="mix-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认支付</button>
	</view>
</template>

<script>
	import orderModel from '../../api/order/index.js'
	export default {
		components: {
		},
		data() {
			return {
				amount: '',
				btnLoading: false,
				payType: 18
			}
		},
		methods: {
			confirm() { // 确认
				if (!Number(this.amount)) return this.$api.msg('请输入充值金额')
				this.btnLoading = true

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
								provider: 'wxpay',
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
					}
				}).catch(() => {
					this.btnLoading = false
				})
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
