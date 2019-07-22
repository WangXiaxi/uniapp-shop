<template>
	<view class="content">
		<view v-if="!goodsList.length" class="empty-tips">
			空空如也
			<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛></navigator>
		</view>
		<view v-else class="goods-list">
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
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 96upx;
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
