<template>
	<view class="container">
		<view class="swiper-wrap">
			<page-first></page-first>
		</view>
	</view>
</template>

<script>
	import pages from './components/child-pages'
	export default {
		components: {
			...pages
		},
		data() {
			return {}
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
