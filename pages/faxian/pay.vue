<template>
	<view>
		<web-view :src="src">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad(options) {
			this.src = decodeURIComponent(options.res)
			console.log(this.src,1234)
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
