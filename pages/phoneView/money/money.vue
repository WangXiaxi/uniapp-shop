<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="box">
				<image src="../../../static/icon/gywm.png"></image>
				<view class="info">
					<view>15058550502</view>
					<view>账户余额：166.00元</view>
					<view>到期时间：</view>
					</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

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
		padding-top: 80upx;
		.box {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 120upx;
				height: 120upx;
			}
			view {
				flex: 1;
				margin-left: 16upx;
				color: #FFFFFF;
				font-size: 36upx;
				& + view {
					margin-top: 10upx;
					font-size: 28upx;
				}
			}
		}

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 370upx;
		}
	}
</style>
