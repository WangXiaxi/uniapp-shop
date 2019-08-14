<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="tit">账户余额<text>(￥)</text></view>
			<view class="num">{{userInfo.remain_balance | nf }}</view>
			<view class="tip">7个工作日到账</view>
		</view>
		<view class="info-box">
			<view class="row b-b">
				<text class="tit">金额</text>
				<input class="input" type="number" v-model="formData.amount" placeholder="请输入提现金额" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">备注</text>
				<input class="input" type="text" v-model="formData.note" placeholder="可填写转账说明" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="tips">注：提现收取<text>{{userInfo.service_percent}}%</text>手续费</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
		<pay-password :show="show" @close="close" @success="success"></pay-password>
	</view>
</template>

<script>
	import payPassword from '../../components/pay_Password.vue'
	import moneyModel from '../../api/money/index.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	const fields = {
		amount: '',
		note: ''
	}
	export default {
		components: {
			payPassword
		},
		data() {
			return {
				btnLoading: false,
				show: false,
				formData: JSON.parse(JSON.stringify(fields))
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/money/withdraw-detail'
				})
			}
		},
		// #endif
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			...mapActions(['getUserInfo']),
			success(password) {
				this.close()
				const { amount, note } = this.formData
				const sendData = { amount, note, password }
				this.btnLoading = true
				moneyModel.withdraw(sendData).then(res => {
					this.btnLoading = false
					this.$api.msg('提现申请提交成功，将在两个工作日内到账！', 1500)
					this.getUserInfo()
					setTimeout(() => {
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.btnLoading = false
				})
			},
			close() {
				this.show = false
			},
			confirm() {
				if (!this.formData.amount || Number(this.formData.amount) > Number(this.userInfo.remain_balance)) return this.$api.msg('提现金额必填并且必须小于账户余额！')
				if (!this.formData.note)  return this.$api.msg('请填写备注！')
				this.show = true
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.tips {
		padding-left: 30upx;
		font-size: 24upx;
		color: #999999;
		margin-top: 30upx;
		text {
			color: $base-color;
		}
	}
	.top-part {
		position: relative;
		width: 100%;
		height: 370upx;
		text-align: center;
		.tit {
			color: #fff;
			position: relative;
			padding-top: 50upx;
			z-index: 1;
			font-size: 28upx;

			text {
				font-size: 20upx;
			}
		}

		.num {
			position: relative;
			z-index: 1;
			margin-top: 20upx;
			color: #fff;
			font-size: 66upx;
		}

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 370upx;
		}
		.tip {
			position: relative;
			z-index: 2;
			font-size: 20upx;
			color: #dedede;
			margin-top: 20upx;
		}
	}

	.info-box {
		position: relative;
		z-index: 2;
		margin: -80upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		padding: 10upx 30upx 30upx;

		.row {
			display: flex;
			align-items: center;
			position: relative;
			padding: 0 0upx;
			height: 90upx;
			background: #fff;
			.tit {
				flex-shrink: 0;
				width: 140upx;
				font-size: 30upx;
				color: $font-color-dark;
			}

			.input {
				flex: 1;
				font-size: 30upx;
				color: $font-color-dark;
			}

			.icon-shouhuodizhi {
				font-size: 36upx;
				color: $font-color-light;
			}
		}
	}
</style>
