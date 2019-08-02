<template>
	<view>
		<view class="list">
			<view class="item">
				<image :src="icon[0]"></image>
				<view class="mian-info">
					<view>
						<text class="type">消费</text>
						<text class="detail"></text>
					</view>
					<view class="time"></view>
				</view>
				<view class="price-info">
					<view class="price"></view>
				</view>
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
				icon: {
					0: '/static/icon/xiaofei-1.png',
					1: '/static/icon/xiaofei-2.png',
					2: '/static/icon/xiaofei-3.png'
				},
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

<style lang="less">

</style>
