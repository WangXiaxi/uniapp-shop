<template>
	<view class="content">
		<view class="top-show">{{number}}</view>
		<view class="mobile-list">
			<view class="item">
				<image src="../../static/icon/gywm.png"></image>
				<view class="info">
					<view class="name">王晓欣</view>
					<view class="mobile">150 5855 9592</view>
				</view>
				<image class="more" src=""></image>
			</view>
		</view>
		<view class="key-panel">
			<image class="arrow"></image>
			<image class="phone"></image>
			<image class="people"></image>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: '150'
			}
		}
	}
</script>

<style lang="scss">
</style>
