<template>
	<view>
		<view class="content" v-if="pageSHow">
			<view class="row b-b">
				<text class="tit">对方账号</text>
				<input class="input" type="text" v-model="searchName" placeholder="收款人账号" placeholder-class="placeholder" />
			</view>
			<button class="add-btn" @click="checkSearch" :loading="btnLoading" :disabled="btnLoading">确认</button>
			<view class="tip"><text>1.</text>请务必仔细填写正确的对方手机账号。</view>
		</view>
		<view class="content" v-else>
			<view class="user">
				<image class="portrait" :src="detail.head_ico ? `${url_base_image}/${detail.head_ico}` : '/static/missing-face.png'"></image>

				<view class="name">{{ detail.username | fill }}</view>
				<view class="mobile">{{ detail.mobile | fill }}</view>
			</view>
			<view class="spec">
				<text class="tit">转账金额</text>
				<view class="inp">
					<view class="red">￥</view>
					<input class="input" type="number" v-model="amount" placeholder="0.00" placeholder-class="placeholder" />
				</view>
			</view>
			<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认</button>
			<view class="tip"><text>1.</text>可转账金额<text>{{ userInfo.remain_balance | nf }}元</text>;</view>
			<view class="tip"><text>2.</text>金额将实时转入对方账户，无法取消。</view>
		</view>
		<pay-password :show="show" @close="close" @success="success"></pay-password>
	</view>
</template>

<script>
	import payPassword from '../../components/pay_Password.vue'
	import moneyModel from '../../api/money/index.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		url_base_image
	} from '../../common/config/index.js'
	export default {
		components: {
			payPassword
		},
		data() {
			return {
				url_base_image,
				btnLoading: false,
				show: false,
				pageSHow: true,
				searchName: '',
				detail: {},
				amount: '' // 金额
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			...mapActions(['getUserInfo']),
			close() { // 关闭支付
				this.show = false
			},
			checkSearch() {
				if (!this.searchName) return this.$api.msg('请输入收款人账号查询！')
				this.btnLoading = true
				moneyModel.validateUsername({ username: this.searchName }).then(res => {
					Object.assign(this.detail, res.data)
					this.pageSHow = false
					this.btnLoading = false
				}).catch(() => {
					this.btnLoading = false
				})
			},
			confirm() { // 转账提交操作
				if (!Number(this.amount) || Number(this.amount) > Number(this.userInfo.remain_balance)) return this.$api.msg('转账金额必填并且必须小于账户余额！')
				this.show = true
			},
			success(password) { // 支付密码输入后提交
				this.close()
				const { username: curname } = this.detail
				const { amount } = this
				const sendData = { curname, amount, password, transType: 'balance' }
				this.btnLoading = true
				moneyModel.trans2user(sendData).then(res => {
					this.$api.msg('转账操作成功！', 1500)
					this.getUserInfo()
					setTimeout(() => {
						this.btnLoading = false
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.btnLoading = false
				})
			}
		},
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.tip {
		padding-left: 30upx;
		font-size: 24upx;
		color: #999999;
		margin-bottom: 10upx;
		text {
			color: $base-color;
		}
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
			}
		}
	}
	.user {
		text-align: center;
		padding-top: 30upx;
		.portrait {
			width: 140upx;
			height: 140upx;
		}
		.name {
			font-size: 32upx;
			margin-top: 30upx;
		}
		.mobile {
			font-size: 28upx;
			color: #666;
			margin-top: 10upx;
			margin-bottom: 40upx;
		}
	}
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
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
	
	.default-row {
		margin-top: 16upx;
	
		.tit {
			flex: 1;
		}
	
		switch {
			transform: translateX(16upx) scale(.9);
		}
	}
	
	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto 20upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
