<template>
	<view class="content">
		<view class="item-type" v-if="searchText.length > 0">
			<image src="../../static/time.png" class="icon"></image>
			<view class="name">历史搜索</view>
			<image src="../../static/trash.png" class="icon" @click="clearSearchText"></image>
		</view>
		<view class="item-list">
			<view class="item" v-for="(item, index) in searchText" :key="index" @click="goSearch(item)">{{item}}</view>
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
				search: ''
			}
		},
		onLoad() {
		},
		computed: {
			...mapGetters(['searchText'])
		},
		methods: {
			...mapMutations(['clearSearchText', 'setSearchText']),
			goSearch(item) {
				uni.navigateTo({
					url: `/pages/search/searchList?search=${item}`
				})
			}
		},
		// #ifndef MP
		// 标题栏input搜索框变动
		onNavigationBarSearchInputChanged(e) {
			this.search = e.text
		},
		// 标题栏input搜索框点击
		onNavigationBarSearchInputConfirmed() {
			if(!this.search.trim()) return
			this.setSearchText(this.search)
			uni.navigateTo({
				url: `/pages/search/searchList?search=${this.search}`
			})
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index
			if (index === 0) {
				if(!this.search.trim()) return
				this.setSearchText(this.search)
				uni.navigateTo({
					url: `/pages/search/searchList?search=${this.search}`
				})
			}
		}
		// #endif
	}
</script>

<style lang='scss'>
	.item-type {
		margin-top: 10upx;
		display: flex;
		justify-content: center;
		align-items: middle;
		padding: 0 20upx;
		.icon {
			width: 48upx;
			height: 48upx;
		}
		.name {
			flex: 1;
			line-height: 48upx;
			margin-left: 10upx;
			color: $font-color-base;
			font-size: $font-base + 4upx;
		}
	}
	.item-list {
		margin-top: 20upx;
		padding: 0 20upx;
		.item {
			display: inline-block;
			padding: 10upx 20upx;
			font-size: $font-base;
			color: $font-color-base;
			background: rgba(231, 231, 231, 0.7);
			border-radius: 30upx;
			margin-right: 20upx;
			margin-bottom: 20upx;
		}
	}
</style>
