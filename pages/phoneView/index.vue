<template>
	<view>
		<content-one></content-one>
		<content-two></content-two>
		<content-three></content-three>
		<!-- 键盘页面 -->
		<view class="key-panel">
			<image class="le" src="../../static/icon/ipone_mo.png"></image>
			<!-- <image class="le" src="../../static/icon/ipone_mo.png"></image> -->
			<view class="cen">
				<image class="phone_main" src="../../static/icon/phone_main.png"></image>
			</view>
			<image class="ri" src="../../static/icon/iphone_pre.png"></image>
		</view>
	</view>
</template>

<script>
	import contentOne from './components/content-one.vue'
	import contentTwo from './components/content-two.vue'
	import contentThree from './components/content-three.vue'
	export default {
		components: {
			contentOne,
			contentTwo,
			contentThree
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
			margin: 0 146upx;
			position: relative;
			top: -60upx;
			border-radius: 50%;
			.phone_main {
				width: 120upx;
				height: 240upx;
				position: relative;
				top: 0;
				transition: all 0.3s;
				&.act {
					top: 120upx;
				}
			}
		}
		.ri {
			width: 56upx;
			height: 56upx;
		}
	}
</style>
