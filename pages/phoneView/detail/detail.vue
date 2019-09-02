<template>
	<view class="content">
		<view class="top">
			<image class="header" src="../../../static/icon/gywm.png"></image>
			<view class="name">{{params.name}}</view>
		</view>
		<view class="list">
			<view class="item" v-for="(item, index) in params.children" :key="index" @click="dial()">
				<view class="text">{{item}}</view>
				<image src="../../../static/icon/bohao.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapGetters(['params']),
		},
		methods: {
			dial(val) { // 拨号操作
			}
		}
	}
</script>

<style lang="scss">
	.top {
		background: #f7f7f7;
		text-align: center;
		padding: 50upx 0;
		color: #999999;
		font-size: 36upx;
		.header {
			width: 100upx;
			height: 100upx;
			margin-bottom: 30upx;
		}
	}
	.list {
		padding: 0 24upx;
		.item {
			display: flex;
			padding: 24upx 0;
			font-size: 32upx;
			border-bottom: 1px solid #f0f0f0;
			.text {
				line-height: 50upx;
				flex: 1;
			}
			image {
				width: 50upx;
				height: 50upx;
			}
		}
	}
</style>
