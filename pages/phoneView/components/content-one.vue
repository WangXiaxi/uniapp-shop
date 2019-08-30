<template>
	<view class="content-one">
		<view class="mobile-list">
			<view class="item">
				<image class="header" src="../../static/icon/gywm.png"></image>
				<view class="info">
					<view class="name">王晓欣</view>
					<view class="mobile">
						<view class="tell">15058559592 </view>
						<view class="date">29/8 呼出</view>
						<image class="trans act" src="../../static/icon/phone_4.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content-one { // 通话记录
		padding-top: 32upx;
		margin: 0 24upx;
		.item {
			height: 100upx;
			margin-bottom: 32upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.header {
				width: 100upx;
				height: 100upx;
			}
			.info {
				flex: 1;
				margin-left: 24upx;
				.name {
					font-size: 30upx;
					color: #000000;
				}
				.mobile {
					margin-top: 20upx;
					display: flex;
					align-items: center;
					color: #EA1212;
					font-size: 28upx;
					.date {
						color: #999999;
						margin-left: 10upx;
					}
					.trans {
						width: 16upx;
						height: 16upx;
						margin-left: 6upx;
						&.act {
							transform: rotate(180deg);
						}
					}
				}
			}
		}
	}
</style>
