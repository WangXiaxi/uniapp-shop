<template>
	<view>
		<!-- 空白页 -->
		<empty v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="tit">股权变更</view>
					<view class="time">{{item.datetime | fill}}</view>
					<view class="des">[{{item.datetime | fill}}] {{item.type ? '增加' : '减少'}}股权 <text class="red">{{item.value}}</text></view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import stockModel from '../../../api/stock/index.js'
	import empty from '@/components/empty'
	export default {
		components: {
			uniLoadMore,
			empty
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

				stockModel.getUcenterStocksLog({
					page: this.page,
					limit: 10
				}).then(res => {
					if (!res.data.data) {
						res.data.data = []
						res.data.totalPage = 0
					}
					this.list.push(...res.data.data)
					this.pages = res.data.totalPage
					uni.stopPullDownRefresh()
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more';
				}).catch(() => {})

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

		.red {
			color: $base-color;
		}
	}
</style>
