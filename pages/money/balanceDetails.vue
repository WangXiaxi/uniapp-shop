<template>
	<view>
		<!-- 空白页 -->
		<empty v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view v-else>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<image class="img" :src="icon[2]"></image>
					<view class="mian-info">
						<view class="top">
							<text class="type">{{item.type === '0'? '增加' : '减少' }}</text>
							<text class="detail" v-if="item.note">({{ item.note | fill }})</text>
						</view>
						<view class="time">{{item.time}}</view>
					</view>
					<view class="price-info">
						<view class="price" :class="{red : item.type === '1'}">{{item.amount}}</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import moneyModel from '../../api/money/index.js'
	import empty from '@/components/empty'
	export default {
		components: {
			uniLoadMore,
			empty
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
				moneyModel.getUcenterAccountLog({
					page: this.page,
					limit: 10
				}).then(res => {
					this.list.push(...res.data.data)
					this.pages = res.data.totalPage
					uni.stopPullDownRefresh();
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more';
				}).catch(() => {})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		.item {
			padding: 32upx;
			display: flex;
			border-bottom: 1upx solid #F2F2F2;

			.img {
				width: 64upx;
				height: 64upx;
			}

			.mian-info {
				margin-left: 70upx;
				flex: 1;
				width: 0;

				.top {
					font-size: 0;
				}

				.type {
					font-size: 26upx;
					color: #111;
				}

				.detail {
					font-size: 26upx;
					color: #666;
					word-wrap: break-word;
				}

				.time {
					color: #666;
					font-size: 24upx;
					margin-top: 24upx;
				}
			}

			.price-info {
				.price {
					font-size: 28upx;
					color: #111;
				}

				.red {
					color: $base-color;
				}
			}
		}
	}
</style>
