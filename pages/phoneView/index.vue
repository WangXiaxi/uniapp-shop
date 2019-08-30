<template>
	<view>
		<content-one></content-one>
		<!-- 键盘页面 -->
		<view class="key-panel">
			<image class="le" src="../../static/icon/ipone_mo.png"></image>
			<!-- <image class="le" src="../../static/icon/ipone_mo.png"></image> -->
			<view class="cen">
				<image class="phone_main" src="../../static/icon/ipone_main.png"></image>
			</view>
			<image class="ri" src="../../static/icon/iphone_pre.png"></image>
		</view>
	</view>
</template>

<script>
	import contentOne from './components/content-one.vue'
	export default {
		components: {
			contentOne
		},
		data() {
			return {
				number: '150'
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.key-panel {
		position: fixed;
		z-index: 100;
		box-shadow: 0 0 30upx 0 rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		bottom: 40upx;
		left: 24upx;
		right: 24upx;
		height: 120upx;
		display: flex;
		align-items: center;
		justify-content: center;
		.le {
			width: 56upx;
			height: 56upx;
		}
		.cen {
			width: 120upx;
			height: 120upx;
			background: rgba(234,18,18,1);
			box-shadow: 0 0 20upx 0 rgba(234, 18, 18, 0.1);
			margin: -120upx 100upx 0;
			border-radius: 50%;
		}
		.ri {
			width: 56upx;
			height: 56upx;
		}
	}
</style>
