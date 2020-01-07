<template>

	<view class="page-section swiper">
	<!-- 	<view class="page-section-spacing">
			<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
			 :circular="circular">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../../static/arc.png"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">B</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">C</view>
				</swiper-item>
			</swiper>

			<view class="news">
				<image src="../../static/icon/jiayou-1.png"></image>
				<view class="tit">充值消息：</view>
				<view class="news-content">车主1662****234，64秒钱加油1200元， 节省200.70元。</view>
			</view>
		</view> -->

		<!-- 查询条件 -->
		<view class="sort">
			<view class="sort-item">
				<picker @change="bindPickerChange" :value="index1" :range="array1">
					<view class="uni-input">{{array1[index1]}}</view>
				</picker>
			</view>
			<view class="sort-item">
				<picker @change="bindPickerChange" :value="index2" :range="array2">
					<view class="uni-input">{{array2[index2]}}</view>
				</picker>
			</view>
			<view class="sort-item">
				<picker @change="bindPickerChange" :value="index3" :range="array3">
					<view class="uni-input">{{array3[index3]}}</view>
				</picker>
			</view>
		</view>

		<!-- 主要 内容区域 -->
		<view class="main-info">
			<view class="item-main" v-for="(item, index) in dataList" :key="index">
				<image class="img-shop" src="../../static/card.png"></image>
				<view class="info">
					<view class="title">中国石油(义桥时代分店)</view>
					<view class="price">义杭价<text class="red">￥129.33</text></view>
					<view class="price-2">
						<view class="le">已省￥0.42</view>
						<view class="ri">国标价 ￥7.2</view>
					</view>
					<view class="location">
						<image class="loc-img" src="../../static/icon/location.png"></image>
						<view class="text">浙江省杭州市萧山区</view>
						<view class="lo-ico">
							<image class="ico" src="../../static/icon/ships.png"></image>
							<view class="m">8.5km</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				// background: ['color1', 'color2', 'color3'],
				// indicatorDots: true,
				// autoplay: true,
				// interval: 2000,
				// duration: 500,
				// circular: true,
				dataList: [{}, {}],
				array1: [
					'距离优先',
					'价格优先'
				],
				array2: [
					'6km内',
					'10km内',
					'15km内',
					'20km内',
					'50km内'
				],
				array3: [
					'汽油-90#',
					'汽油-92#',
					'汽油-95#',
					'汽油-98#',
					'汽油-101#',
					'柴油：-40#',
					'柴油：-35#',
					'柴油：-30#',
					'柴油：-20#',
					'柴油：-10#',
					'柴油：国四0#',
					'柴油：0#',
					'天然气：CNG',
					'天然气：LNG'
				],
				index1: 0,
				index2: 1,
				index3: 0
			}
		},
		methods: {
			bindPickerChange(e) {
				console.log(e)
			}
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		background: #f5f5f5;
		position: relative;
		z-index: 1;
	}
	.sort {
		background: #FFFFFF;
		width: 702upx;
		margin: 24upx auto 0;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		display: flex;
	}
	.sort-item {
		flex: 1;
		font-size: 24upx;
		color: #111111;
		padding: 26rpx 0;
		text-align: center;
	}
	.uni-input {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.uni-input:after {
		content: ' ';
		border-top: 10rpx solid #DDDDDD;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		margin-left: 10rpx;
	}
	.main-info {
		background: #FFFFFF;
		width: 702upx;
		margin: 0 auto 0;
		border-bottom-left-radius: 10upx;
		border-bottom-right-radius: 10upx;
	}
	.item-main {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		padding: 30rpx 24rpx;
		.img-shop {
			width: 160rpx;
			height: 160rpx;
		}
		.info {
			flex: 1;
			width: 0;
			margin-left: 20rpx;
			.title {
				font-size: 27rpx;
			}
			.price {
				font-size: 24rpx;
				margin-top: 10rpx;
				.red {
					font-size: 32rpx;
					color: #EA1212;
				}
			}
			.price-2 {
				display: flex;
				align-items: center;
				justify-content: center;
				.le {
					width: 256rpx;
					font-size: 32rpx;
					height: 56rpx;
					padding: 32rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: scale(0.5);
					background: #EA1212;
					color: #FFFFFF;
					border-radius: 28rpx;
					transform-origin: 0 54%;
				}
				.ri {
					margin-left: -110rpx;
					flex: 1;
					font-size: 24rpx;
					color: #F47878;
				}
			}
			.location {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 1;
				height: 40rpx;
				.loc-img {
					width: 22rpx;
					height: 28rpx;
				}
				.text {
					margin-left: 10rpx;
					font-size: 24rpx;
					color: #333333;
					width: 0;
					flex: 1;
				}
				.lo-ico {
					margin-left: -140rpx;
					background: #EA1212;
					border-radius: 40rpx;
					width: 280rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: scale(0.5);
					transform-origin: 100% 54%;
					.ico {
						margin-right: 10rpx;
						width: 58rpx;
						height: 50rpx;
					}
					.m {
						font-size: 38rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}
</style>
