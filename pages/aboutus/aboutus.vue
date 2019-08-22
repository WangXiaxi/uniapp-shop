<template>
	<view>
		<web-view :src="src">
		</web-view>
	</view>
</template>

<script>
	import mineModel from '../../api/mine/index.js'
	export default {
		data() {
			return {
				src: ''
			}
		},
		onLoad() {
			mineModel.getAboutUs().then(res => {
				this.src = res.data
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
