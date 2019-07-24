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
				<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.img" mode="aspectFill"></image>
					</view>
					<text class="title">{{item.name | fill}}</text>
					<view class="price-box">
						<text class="price">{{item.sell_price | fill}}</text>
						<text class="price old" v-if="!(Number(item.sell_price) >= Number(item.market_price))">{{item.market_price}}</text>
						<text class="sell">库存 {{item.store_nums | fill}}</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				goodsList: [{}],
				loadingType: 'more' //加载更多状态
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
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
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
