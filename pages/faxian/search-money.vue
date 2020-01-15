<template>
	<view class="content">
		<view class="spec">
			<text class="tit">加油金额</text>
			<view class="inp">
				<view class="red">￥</view>
				<input class="input" type="number" v-model="amount" placeholder="0.00" placeholder-class="placeholder" @focus="focus()" @blur="getOrderMoney()" />
				<view class="right-tip">约{{ others.litre | nf }}L</view>
			</view>

		</view>

		<view class="tips-info">
			<view class="tip-dk">可直接余额抵扣：<text class="red">￥{{ others.freeMoney | nf }}</text></view>

			<view class="tips-red">
				请务必先到达油站与工作人员确认后再付款，切勿先买单在加油，避免异常订单的产生，最终优惠抵扣价格以此页面实际付款为准。
			</view>
			<view class="tips-red">温馨提示：此价格为当前油价，油价根据国际市场变化实时调整。</view>
		</view>

		<!-- <view class="pay-type-list">
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
		</view> -->

		<!-- 最终应付 -->
		<view class="tip-last">
			<view class="le">合计待支付：</view>
			<view class="red">￥{{ others.czbPayAmount | nf }}</view>
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
	import faxianModel from '@/api/faxian/index.js'
	import {
		url_base
	} from '../../common/config/index.js'


	export default {
		components: {},
		data() {
			return {
				others: {}, // 查询
				details: {},
				showPayDialog: false, // 微信H5支付回掉弹框
				amount: '',
				btnLoading: false,
				payType: 14,
				isH5: false
			}
		},
		onLoad(options) {
			this.details = JSON.parse(options.data)
		},
		computed: {
			...mapGetters(['isWeixin']),
		},
		methods: {
			focus() { // 聚焦不让点击
				this.btnLoading = true
			},
			getOrderMoney() { // 获取订单金额
				setTimeout(() => {
					const {
						amount,
						details: {
							gasId,
							mobile,
							oilNo
						}
					} = this
					if (!amount) {
						this.btnLoading = false
						return
					}
					const sendData = {
						realmoney: amount,
						mobile,
						gasId,
						oilNo
					}
					faxianModel.getOrderMoney(sendData).then(res => {
						this.btnLoading = false
						this.others = res.data.json
					})
				}, 100)
			},
			confirm() { // 确认
				if (!this.amount) return this.$api.msg('请输入充值金额！')
				const {
					amount,
					details: {
						gasId,
						oilNo,
						userId,
						gunNo
					}
				} = this
				this.btnLoading = true
				faxianModel.generateOrder({
					amountGun: amount,
					userId,
					gasId,
					oilNo,
					gunNo
				}).then(res => {
					this.btnLoading = false
					console.log(res)
					
					plus.runtime.openURL("alipays://platformapi/startapp?appId=20000067&url="+res.json, function(res) {
					console.log(res);
					},"com.eg.android.AlipayGphone");
					
				}).catch(() => {
					this.btnLoading = false
				})
			},

		}
	}
</script>

<style lang="scss">
	.tips-info {
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 20upx 30upx;

		.tip-dk {
			font-size: 36rpx;
			.red {
				color: $base-color;
				font-size: 40rpx;
			}
		}

		.tips-red {
			font-size: 26rpx;
			margin-top: 10rpx;
			color: $base-color;
			text-indent: 2em;
		}
	}

	.tip-last {
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 20upx 30upx;
		display: flex;
		justify-content: center;

		.le {
			font-size: 36rpx;
		}

		.red {
			color: $base-color;
			font-size: 40rpx;
			text-align: right;
			flex: 1;
		}
	}

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

			.right-tip {
				font-size: 50upx;
				color: #E6A23C;
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
