<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="tit">余额<text>(￥)</text></view>
			<view class="num">{{userInfo.remain_balance | nf }}</view>
		</view>
		<!-- <view class="center-part">
			<view class="type-list">
				<view class="type" :class="{ act: type === 0 }" @click="changeType(0)">市场</view>
				<view class="type" :class="{ act: type === 1 }" @click="changeType(1)">商城</view>
			</view>
			<view class="money-box" v-if="type === 0">
				<view class="item">
					<view class="num">{{userInfo.dtdtdt | fill('0.00')}}</view>
					<view class="name">分享佣金(￥)</view>
				</view>
				<view class="item">
					<view class="num">{{userInfo.dtdtdt | fill('0.00')}}</view>

					<view class="name">管理佣金(￥)</view>
				</view>
				<view class="item">
					<view class="num">{{userInfo.dtdtdt | fill('0.00')}}</view>

					<view class="name">分红(%)</view>
				</view>
			</view>
			<view class="money-box" v-if="type === 1">
				<view class="item">
					<view class="num">{{userInfo.dtdtdt | fill('0.00')}}</view>

					<view class="name">零售佣金(￥)</view>
				</view>
				<view class="item">
					<view class="num">{{userInfo.dtdtdt | fill('0.00')}}</view>

					<view class="name">店铺佣金(￥)</view>
				</view>
			</view>
		</view> -->
		<view class="card-box" style="margin-top: -80upx;">
			<image class="card-img" mode="aspectFit" src="../../static/card.png"></image>
			<view class="info">
				<view class="name">{{detail.bank | fill('----')}}</view>
				<view class="des">尾号{{(detail.card_num ? detail.card_num.substr(-4) : false) | fill('----')}}的储蓄卡</view>
			</view>
			<view v-if="detail.bank" class="bd-btn" @click="navTo(`/pages/money/bindBank?data=${JSON.stringify(detail)}`)">更换银行卡</view>
			<view v-else @click="navTo('/pages/money/bindBank')" class="bd-btn">绑定银行卡</view>
		</view>
		<view class="ic-box">
			<list-cell image="money-3" title="提现" @eventClick="navTo('/pages/money/withdraw')"></list-cell>
			<list-cell image="money-1" title="充值" @eventClick="navTo('/pages/money/invest')"></list-cell>
			<list-cell image="money-4" title="转账" @eventClick="navTo('/pages/money/trans')"></list-cell>
			<list-cell image="money-2" title="余额明细" @eventClick="navTo('/pages/money/balanceDetails')"></list-cell>
		</view>
		<view class="descript">杭州义桥网络科技有限公司</view> <!--将遵循 <text class="text">《冰酒协议》</text> -->
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell'
	import moneyModel from '../../api/money/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import {
		mapGetters,
	} from 'vuex';
	export default {
		components: {
			listCell,
			mixLoading
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		data() {
			return {
				pageLoading: false,
				type: 0, // 0 市场 1 商城
				detail: {}
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() { // 获取信息
				this.pageLoading = true
				moneyModel.getMemberBankInfo().then(res => {
					Object.assign(this.detail, res.data)
					this.pageLoading = false
				}).catch(res => {
					this.pageLoading = false
				})
			},
			changeType(type) {
				this.type = type
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.top-part {
		position: relative;
		width: 100%;
		height: 370upx;
		text-align: left;
		padding-left: 32upx;

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
			margin-top: 30upx;
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
	}

	.center-part {
		position: relative;
		z-index: 2;
		margin: -140upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		// box-shadow: 0px 12upx 18upx 2upx rgba(0, 0, 0, 0.1);
		padding: 30upx 30upx 40upx;

		.type-list {
			display: flex;
			height: 44upx;

			.type {
				font-size: 24upx;
				color: #666666;
				position: relative;
				margin-right: 32upx;
				display: flex;
				align-items: flex-end;
				letter-spacing: 4upx;
				transition: all 0.3s;
			}

			.act {
				font-size: 32upx;
				color: $base-color;

				&:after {
					content: ' ';
					position: absolute;
					bottom: -18upx;
					left: 50%;
					margin-left: -18upx;
					width: 36upx;
					height: 6upx;
					background: $base-color;
					border-radius: 10upx;
				}
			}
		}

		.money-box {
			display: flex;
			margin-top: 72upx;
			text-align: center;

			.item {
				flex: 1;

				.num {
					font-size: 44upx;
				}

				.name {
					font-size: 24upx;
					color: #999999;
				}
			}
		}
	}

	.card-box {
		position: relative;
		margin: 20upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		padding: 30upx 30upx 30upx;
		display: flex;
		align-items: center;

		.card-img {
			width: 80upx;
			height: 80upx;
		}

		.info {
			flex: 1;
			width: 0;
			margin-left: 30upx;

			.name {
				font-size: 36upx;
				letter-spacing: 8upx;
			}

			.des {
				margin-top: 20upx;
				font-size: 24upx;
				color: #999;
				letter-spacing: 4upx;
			}
		}

		.bd-btn {
			width: 150upx;
			height: 48upx;
			color: $base-color;
			border: 2upx solid $base-color;
			border-radius: 24upx;
			font-size: 22upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.ic-box {
		margin: 20upx 32upx 0;
		border-radius: 10upx;
		background: #fff;
	}

	.descript {
		font-size: 24upx;
		color: #666666;
		text-align: center;
		margin-top: 20upx;
		margin-bottom: 40upx;

		.text {
			color: $base-color;
		}
	}
</style>
