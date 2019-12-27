<template>
	<view class="container">
		<view class="swiper-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
						<swiper-item>
							<view class="swiper-item">
								<image src="../../static/arc.png"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">B</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">C</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true
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
</style>
