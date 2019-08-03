<template>
	<view>
		<view class="list">
			<view class="item">
				<view class="tit">股权变更</view>
				<view class="time">2019-06-15 11:24:00</view>
				<view class="des">用户忆杭1[18877744754]增加500股权，目前有5500股权。</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'

	export default {
		components: {
			uniLoadMore,
		},
		data() {
			return {
				loadingType: 'more', //加载更多状态
				list: [],
				page: 0,
				pages: 0 // 总页数
			};
		},
		onLoad(options) {
			this.loadData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom() {
			this.loadData();
		},
		methods: {
			loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.page = this.page + 1;
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'loading';
				}
				
				if (type === 'refresh') {
					this.page = 1;
					this.list = [];
				}
				setTimeout(() => {
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more';
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}
	.item {
		background: #fff;
		margin: 20upx 30upx 0;
		border-radius: 10upx;
		padding: 30upx;
		.tit {
			font-size: 30upx;
		}
		.time {
			font-size: 24upx;
			margin-top: 14upx;
		}
		.des {
			font-size: 24upx;
			margin-top: 20upx;
		}
	}
</style>
