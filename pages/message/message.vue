<template>
	<view class="content">
		<!-- 空白页 -->
		<empty v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view v-else>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="tit"><text class="con">{{item.title}}</text><text class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(item.id)"></text></view>
					<view class="time">{{item.time | fill}}</view>
					<view class="des">
						<rich-text :nodes="item.content"></rich-text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import mineModel from '../../api/mine/index.js'
	import empty from '@/components/empty'
	import {
		url_base_image
	} from '../../common/config/index.js'
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
			deleteOrder(id) {
				uni.showModal({
					title: '提示',
					content: '确认删除该消息吗？',
					success: (e) => {
						if (e.confirm) {
							uni.showLoading({
								title: '请稍后',
								mask: true
							})
							mineModel.delMessage({
								id
							}).then(res => {
								uni.hideLoading();
								this.$api.msg('删除消息成功！')
								this.loadData('refresh')
							}).catch(() => {
								uni.hideLoading()
							})
						}
					}
				})
			},
			loadData(type = 'add', loading) {
				if (this.loadingType === 'loading' && type !== 'refresh') return // 有数据在加载时 不进行请求
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

				mineModel.getMessageList({
					page: this.page,
					limit: 10
				}).then(res => {
					if (!res.data.data) {
						res.data.data = []
						res.data.totalPage = 0
					}
					this.list.push(...res.data.data.map(c => {
						c.content = c.content.replace(/\/upload\//g, `${url_base_image}/upload/`).replace(/<img/g, `<img style="width: 100%;"`)
						return c
					}))
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
		position: relative;
		z-index: 1;
	}
	.content {
		position: relative;
		z-index: 1;
	}
	.del-btn {
		padding: 10upx 0 10upx 36upx;
		font-size: $font-lg;
		color: $font-color-light;
		position: relative;
	}
	.item {
		background: #fff;
		margin: 20upx 30upx 0;
		border-radius: 10upx;
		padding: 30upx;

		.tit {
			font-size: 30upx;
			display: flex;
			.con {
				flex: 1;
				width: 0;
				line-height: 40upx;
				font-size: 30upx;
			}
		}
		.time {
			font-size: 26upx;
			line-height: 40upx;
			color: #999;
			margin-top: 10upx;
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
