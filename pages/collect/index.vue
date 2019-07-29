<template>
	<view class="content">
		<view class="empty" v-if="!goodsList.length">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view class="empty-tips">
				还没有相关收藏商品
				<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
		</view>
		<view v-else>
			<view class="goods-list">
				<uni-swipe-action :options="options" @click="dele" v-for="(item, index) in goodsList" :key="index">
					<view class="goods-item" @click="navToDetailPage(item)">
						<view class="image-wrapper">
							<image :src="item.img" mode="aspectFill"></image>
						</view>
						<view class="info-box">
							<text class="title">{{item.name | fill}}</text>
							<view class="price-box">
								<text class="price">{{item.sell_price | fill}}</text>
								<!-- <text class="price old" v-if="!(Number(item.sell_price) >= Number(item.market_price))">{{item.market_price}}</text> -->
								<text class="sell">库存 {{item.store_nums | fill}}</text>
							</view>
						</view>
					</view>
				</uni-swipe-action>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import mineModel from '../../api/mine/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import uniSwipeAction from '../../components/uni-swipe-action.vue'
	import {
		url_image
	} from '../../common/config/index.js'
	import {
		mapActions
	} from 'vuex'

	export default {
		components: {
			mixLoading,
			uniSwipeAction,
			uniLoadMore
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#fa436a'
					}
				}],
				pageLoading: false,
				goodsList: [],
				loadingType: 'nomore' //加载更多状态
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			...mapActions(['goodsFavoriteEdit', 'getGoodsFavoriteIds']),
			loadData() {
				this.pageLoading = true
				mineModel.getFavoriteList().then(res => {
					this.pageLoading = false
					this.goodsList = res.data.map(c => {
						c.img = `${url_image}/${c.img}`
						return c
					})
				}).catch(() => {
					this.pageLoading = false
				})
			},
			dele({
				text,
				style,
				index
			}) { // 删除操作
				this.goodsFavoriteEdit({
					goods_id: this.goodsList[index].goods_id
				}).then(this.getGoodsFavoriteIds) // 删除完成后重新获取下收藏id
				this.goodsList.splice(index, 1) // 直接前端删除增加用户体验
			},
			//详情
			navToDetailPage(item) {
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}

		.empty-tips {
			display: flex;
			font-size: $font-sm+2upx;
			color: $font-color-disabled;

			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}

	.content {
		padding-top: 20upx;
		background: #fff;
	}

	/* 商品列表 */
	.goods-list {
		background: #fff;
		width: 100%;
		.goods-item {
			display: flex;
			width: 100%;
			padding: 20upx 30upx;
		}

		.image-wrapper {
			width: 180upx;
			height: 180upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.info-box {
			flex: 1;
			width: 0;
			margin-left: 20upx;
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 46upx;
			height: 100upx;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
		}

		.price-box {
			display: flex;
			align-items: center;
			padding-right: 10upx;
			font-size: 24upx;
			margin-top: 30upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}

		.price.old {
			font-size: $font-sm;
			color: $uni-color-warning;
			line-height: 1;
			text-decoration: line-through;
			margin-top: 2upx;

			&:before {
				content: '￥';
				font-size: 20upx;
			}
		}

		.sell {
			flex: 1;
			text-align: right;
		}
	}
</style>
