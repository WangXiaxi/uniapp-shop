<template>
	<view class="content">
		<!-- 状态 -->
		<view class="status">
			<image class="img" src='../../static/icon/status.png'></image>
			<text>{{detail.order_status}}</text>
		</view>
		<!-- 收件人 -->
		<view class="address-section">
			<view class="order-content">
				<text class="yticon icon-shouhuodizhi"></text>
				<view class="cen">
					<view class="top">
						<text class="name">{{detail.accept_name}}</text>
						<text class="mobile">{{detail.mobile}}</text>
					</view>
					<text class="address">{{detail.province_str}}-{{detail.city_str}}-{{detail.area_str}}&nbsp;{{detail.address}}</text>
				</view>
			</view>
			<image class="a-bg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAFCAYAAAAaAWmiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Rjk3RjkzMjM2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Rjk3RjkzMjQ2NzMxMTFFOUI4RkU4OEZGMDcxQzgzOEYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGOTdGOTMyMTY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGOTdGOTMyMjY3MzExMUU5QjhGRTg4RkYwNzFDODM4RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PrEOZlQAAAiuSURBVHjazJp7bFvV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"></image>
		</view>
		<!-- 商品 -->
		<view class="goods-section">
			<!-- 商品列表 -->
			<view class="big-good" v-for="(goods, index) in detail.mapGood" :key="index">
				<view @click="navTo(`/pages/product/product?id=${goodsItem.goods_id}`, detail.active_uid !=='0')" class="goods-box-single" v-for="(goodsItem, goodsIndex) in goods"
				 :key="goodsIndex">
					<image class="goods-img" :src="goodsItem.img" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">{{goodsItem.goods_array.name}}</text>
						<text class="attr-box">{{goodsItem.goods_array.value}} x {{goodsItem.goods_nums}}</text>
						<text class="price">{{goodsItem.goods_price}}</text>
						<view class="eval-btn" v-if="goodsItem.comments_status === '0'" @click.stop="navToEvaluate(goodsItem.comments)">去评价</view>
						<view class="eval-btn grey" v-if="goodsItem.comments_status === '1'">已评价</view>
					</view>
				</view>
				<view class="logis-box" v-if="goods[0] && goods[0].delivery_code !== 'none'">
					<view class="logis-btn" @click="toggleSpec(goods[0].delivery_id, goods[0].delivery_code)">查看物流</view>
				</view>
			</view>
			<view class="order-js">
				<view class="money">商品金额：{{detail.payable_amount | nf}}</view>
				<view class="yunfei">运费：{{detail.real_freight | nf}}</view>
				<view class="money" v-if="Number(detail.promotions)">vip积分抵扣：{{detail.promotions | nf}}</view>

				<view class="real_pay">共{{detail.goods_num}}件商品，实付：<text>{{detail.order_amount | nf}}</text></view>
			</view>
		</view>
		<view class="order-info">
			<view class="tit">订单信息</view>
			<view class="item">
				<view>订单编号</view>
				<view>{{detail.order_no}}</view>
			</view>
			<view class="item">
				<view>下单时间</view>
				<view>{{detail.create_time}}</view>
			</view>
			<view class="item">
				<view>支付方式</view>
				<view>{{detail.payment}}</view>
			</view>
			<view class="item">
				<view>配送方式</view>
				<view>{{detail.delivery}}</view>
			</view>
			<view class="item" v-if="detail.checkcode">
				<view>自提码</view>
				<view>{{detail.checkcode}}</view>
			</view>
			<view class="item" v-if="detail.active_user">
				<view>开通会员</view>
				<view>{{detail.active_user.username}}</view>
			</view>
		</view>
		<view style="height: 100upx;"></view>
		<view class="action-box" v-if="!(!detail.isCancel && !detail.isGoPay && !detail.isRefund && !detail.isConfirm)">
			<button v-if="detail.isCancel" class="action-btn" @click="cancelOrder(id)">取消订单</button>
			<button v-if="detail.isGoPay" class="action-btn recom" @click="payOrder(detail)">立即支付</button>
			<button v-if="detail.isRefund" class="action-btn recom" @click="afterOrder(id)">申请售后</button>
			<button v-if="detail.isConfirm" class="action-btn recom" @click="sureOrder(id)">确认收货</button>
		</view>
		<mix-loading v-if="pageLoading"></mix-loading>
		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="layer-body">
					<view class="title">物流信息</view>
					<scroll-view scroll-with-animation scroll-y class="point-box">
						<view class="piont-item" :class="{ act: index === 0 }" v-for="(item, index) in curFreight" :key="index">
							<view class="point"></view>
							<view class="line"></view>
							<view class="info">
								<view class="time">{{item.time}}</view>
								<view class="stat">{{item.station}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import orderModel from '../../api/order/index.js'
	import {
		url_image
	} from '../../common/config/index.js'
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				pageLoading: false,
				id: '',
				detail: {},
				specClass: 'none',
				curFreight: []
			}
		},
		onLoad(option) {
			this.id = option.id
			this.loadData()
		},
		onBackPress(options) {
			if (this.$api.prePage() && this.parPageRefresh) {
				this.$api.prePage().loadData('refresh')
			}
			return false;
		},
		methods: {
			getFreightDetail(id, code) {
				orderModel.getFreightDetail({ id, code }).then(res => {
					this.specClass = 'show'
					this.curFreight = res.data.data
				}).catch(() => {})
			},
			//规格弹窗开关
			toggleSpec(id, code) {
				if (this.specClass === 'show') {
					this.specClass = 'hide'
					setTimeout(() => {
						this.specClass = 'none'
					}, 250)
				} else if (this.specClass === 'none') {
					this.getFreightDetail(id, code)
				}
			},
			stopPrevent() {},
			afterOrder(id) {
				uni.navigateTo({
					url: `/pages/order/after?id=${id}`
				})
			},
			navToEvaluate(item) {
				uni.navigateTo({
					url: `/pages/order/evaluate?data=${JSON.stringify(item)}`
				})
			},
			navTo(url, isVipOrder) {
				!isVipOrder && uni.navigateTo({
					url
				})
			},

			loadData(source) {
				if (source === 'refresh') {
					this.parPageRefresh = true
				}
				this.pageLoading = true
				orderModel.getOrderDetail({
					id: this.id
				}).then(res => {
					this.pageLoading = false
					let num = 0
					const comments = res.data.comment ? res.data.comment : []
					const arr = {}
					res.data.goods = res.data.goods.map(c => {
						c.img = `${url_image}/${c.img}`
						c.goods_array = JSON.parse(c.goods_array)
						num = num + Number(c.goods_nums)
						const data = comments.find(k => c.goods_id === k.goods_id)
						if (data && data.status === '0') {
							c.comments_id = data.id
							c.comments_status = data.status
							c.comments = {
								image: c.img,
								name: c.goods_array.name,
								id: data.id
							}
						}
						if (!c.delivery_code) c.delivery_code = 'none'
						if (arr[c.delivery_code]) {
							arr[c.delivery_code].push(c)
						} else {
							arr[c.delivery_code] = [c]
						}
						return c
					})
					res.data.mapGood = Object.keys(arr).map(c => {
						return arr[c]
					})
					res.data.goods_num = num
					this.detail = res.data
				}).catch(() => {
					this.pageLoading = false
				})
			},
			//取消订单
			cancelOrder(id) {
				uni.showModal({
					title: '提示',
					content: '确认取消该订单吗？',
					success: (e) => {
						if (e.confirm) {
							uni.showLoading({
								title: '请稍后'
							})
							orderModel.updateOrderStatus({
								op: 'cancel',
								order_id: id
							}).then(res => {
								uni.hideLoading();
								this.$api.msg('取消订单成功！')
								this.loadData('refresh')
								if (this.$api.prePage()) {
									this.$api.prePage().loadData('refresh')
								}
							}).catch(() => {
								// uni.hideLoading()
							})
						}
					}
				})
			},
			// 立即支付
			payOrder(item) {
				uni.navigateTo({
					url: `/pages/money/pay?type=pay&finalLastSum=${item.order_amount}&id=${item.id}`
				})
			},
			//确认收货
			sureOrder(id) {
				uni.showModal({
					title: '提示',
					content: '该订单确认收货吗？',
					success: (e) => {
						if (e.confirm) {
							uni.showLoading({
								title: '请稍后',
								mask: true
							})
							orderModel.updateOrderStatus({
								op: 'confirm',
								order_id: id
							}).then(res => {
								uni.hideLoading();
								this.$api.msg('确认收货成功！')
								this.loadData('refresh')
								if (this.$api.prePage()) {
									this.$api.prePage().loadData('refresh')
								}
							}).catch(() => {
								// uni.hideLoading()
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.layer-body {
		.point-box {
			max-height: 60vh;
		}
		.title {
			font-size: 36upx;
			line-height: 80upx;
			padding-left: 30upx;
			padding-bottom: 30upx;
		}
		.piont-item {
			width: 36upx;
			height: 36upx;
			position: relative;
			margin-bottom: 122upx;
			margin-left: 40upx;
			background: #FFFFFF;
			&:last-child {
				.line {
					display: none;
				}
			}
			&.act {
				.info {
					.time {
						color: #007AFF;
					}
					.stat {
						color: #007AFF;
					}
				}
				.line {
					background: #007AFF;
				}
				.point {
					border: 4upx solid #007AFF;
					&:before {
						background: #007AFF;
					}
				}
			}
			
			.info {
				position: absolute;
				left: 60upx;
				top: -10upx;
				width: 620upx;
				.time {
					color: #999999;
					font-size: 28upx;
				}
				.stat {
					font-size: 28upx;
					color: #787878;
				}
			}
			.line {
				width: 2upx;
				height: 126upx;
				background: #DCDFE6;
				position: absolute;
				left: 17upx;
				top: 34upx;
			}
			.point {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 36upx;
				height: 36upx;
				position: absolute;
				border-radius: 50%;
				border: 4upx solid #DCDFE6;
				&:before {
					content: ' ';
					width: 20upx;
					height: 20upx;
					background: #DCDFE6;
					border-radius: 50%;
				}
			}
		}
	}
	/*  弹出层 */
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;

		&.show {
			display: block;

			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0.2s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}

		&.none {
			display: none;
		}

		.mask {
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}

		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			min-height: 40vh;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;

			.btn {
				height: 66upx;
				line-height: 66upx;
				border-radius: 100upx;
				background: $uni-color-primary;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
			}

			.action-btn-group {
				margin: 30upx auto 20upx;
			}
		}

		@keyframes showPopup {
			0% {
				opacity: 0;
			}

			100% {
				opacity: 1;
			}
		}

		@keyframes hidePopup {
			0% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}

			100% {
				transform: translateY(0%);
			}
		}

		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}

			100% {
				transform: translateY(120%);
			}
		}
	}

	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding-right: 30upx;
		background: #fff;
	}

	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}

	.order-info {
		margin-top: 30upx;
		font-size: 30upx;
		padding: 30upx;
		background: #fff;

		.tit {
			font-size: 34upx;
			margin-bottom: 20upx;
		}

		.item {
			display: flex;

			view {
				line-height: 60upx;
				color: #999;

				&+view {
					color: #333;
					flex: 1;
					text-align: right;
				}
			}
		}
	}

	.order-js {
		font-size: 30upx;
		padding: 30upx 0;
		text-align: right;
		color: #999;
		line-height: 60upx;

		text {
			color: $base-color;
		}
	}

	.status {
		background: $base-color;
		font-size: 30upx;
		color: #fff;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.img {
			width: 60upx;
			height: 60upx;
			background: #fff;
			padding: 10upx;
			border-radius: 50%;
			margin-right: 20upx;
		}
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;
		margin-top: 20upx;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.big-good+.big-good {
		margin-top: 40upx;
		border-top: 1upx solid #dedede;
	}

	.logis-box {
		overflow: hidden;
		padding: 0 0 0;
		margin-bottom: -20upx;
	}

	.logis-btn {
		float: right;
		width: 200upx;
		padding: 10upx 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $base-color;
		border: 1upx solid $base-color;
		border-radius: 30upx;
		font-size: 28upx;
	}

	.goods-box-single {
		display: flex;
		padding: 20upx 0;

		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}

		.right {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;

			.eval-btn {
				background: #fff9f9;
				color: #ea1212;
				padding: 10upx 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1upx solid #f7bcc8;
				border-radius: 30upx;
				font-size: 28upx;
				position: absolute;
				right: 0;
				bottom: 0;

				&.grey {
					border-color: #dedede;
					background: #FFFFFF;
					color: #999;
				}
			}

			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}

			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}

			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.goods-section {
		padding: 0 30upx;
		background: #fff;
		margin-top: 30upx;
	}
</style>
