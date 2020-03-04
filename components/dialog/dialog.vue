<template>
	<!-- 规格-模态层弹窗 -->
	<view class="popup" :style="styles" :class="specClass" @touchmove.stop="stopPrevent">
		<!-- 遮罩层 -->
		<view class="mask"></view>
		<view class="layer attr-content" @click.stop="stopPrevent" :style="{ width: width }">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			},
			width: {
				type: String,
				default: '648rpx'
			},
			title: {
				style: String,
				default: '弹框'
			},
			styles: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				specClass: 'none'
			};
		},
		methods: {
			stopPrevent() {},
			toggleSpec(n) {
				if (!n) {
					this.specClass = 'none'
				} else {
					this.specClass = 'show'
				}
			}
		}
	}
</script>

<style lang="scss">
	/*  弹出层 */
	.popup {
		.title {
			height: 88rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			color: #333333;
			font-size: 40rpx;
			padding-top: 10rpx;
		}
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 10000;
		display: flex;
		align-items: center;
		justify-content: center;
		&.show {
			display: flex;
			.mask {
				animation: showPopup 0.2s linear both;
			}

			.layer {
				animation: showLayer 0s linear both;
			}
		}

		&.hide {
			.mask {
				animation: hidePopup 0.2s linear both;
			}

			.layer {
				animation: hideLayer 0s linear both;
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
			position: relative;
			overflow: hidden;
			z-index: 99;
			border-radius: 8rpx;
			background-color: #fff;
			.btn {
				height: 66rpx;
				line-height: 66rpx;
				border-radius: 100rpx;
				background: #ED4E4B;
				color: #fff;
				margin: 30rpx auto 20rpx;
			}

			.action-btn-group {
				margin: 30rpx auto 20rpx;
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
				// transform: translateY(120%);
				opacity: 0;
			}

			100% {
				// transform: translateY(0%);
				opacity: 1;
			}
		}

		@keyframes hideLayer {
			0% {
				opacity: 1;
				// transform: translateY(0);
			}

			100% {
				opacity: 0;
				// transform: translateY(120%);
			}
		}
	}
</style>
