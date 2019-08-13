<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>

		<swiper :current="tabCurrentIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in navList" :key="tabIndex">
				<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
					<!-- 空白页 -->
					<empty v-if="tabItem.loaded === true && tabItem.orderList.length === 0"></empty>
					<!-- 订单列表 -->
					<view v-for="(item,index) in tabItem.orderList" :key="index" class="order-item">
						<view @click="navTo(`/pages/order/detail?id=${item.id}`)" class="goods-box-single">
							<image class="goods-img" :src="item.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{item.name}}</text>
								<text class="attr-box">{{item.time}}</text>
							</view>
						</view>
						<view class="action-box" v-if="item.status === '0'">
							<text class="tip-grey">您还未评价该商品~</text>
							<button class="action-btn recom" @click="navTo(`/pages/order/evaluate?data=${JSON.stringify(item)}`)">立即评价</button>
						</view>
					</view>
					<uni-load-more :status="tabItem.loadingType" v-if="!(tabItem.loadingType === 'nomore' && tabItem.orderList.length === 0)"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import empty from "@/components/empty";
	import orderModel from '../../api/order/index.js'
	import {
		url_image
	} from '../../common/config/index.js'
	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '未评价',
						loadingType: 'more',
						orderList: [],
						page: 0,
						total: 0
					},
					{
						state: 1,
						text: '已评价',
						loadingType: 'more',
						orderList: [],
						page: 0,
						total: 0
					}
				]
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		onLoad(options) {
			this.tabCurrentIndex = +0;
			this.loadData()
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			//swiper 切换
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
				this.loadData('tabChange');
			},
			//获取订单列表
			loadData(source) {
				//这里是将订单挂载到tab列表下
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];

				if (source === 'tabChange' && navItem.loaded === true) {
					//tab切换只有第一次需要加载数据
					return;
				}
				if (source === 'refresh') {
					navItem.page = 0;
					navItem.loadingType = 'more';
					navItem.total = 0;
					navItem.orderList = [];
				}
				if (navItem.loadingType === 'loading' || navItem.loadingType === 'nomore') {
					//防止重复加载
					return;
				}

				navItem.loadingType = 'loading';
				navItem.page = navItem.page + 1;
				let {
					state,
					page
				} = navItem;
				orderModel.getUcenterCommonList({
					common_status: state,
					page
				}).then(res => {
					navItem.orderList.push(...res.data.data.map(k => {
						k.image = `${url_image}/${k.img}`
						return k
					}));
					this.$set(navItem, 'loaded', true);
					navItem.total = res.data.totalPage;
					navItem.loadingType = page >= navItem.total ? 'nomore' : 'more';
					if (source === 'refresh') {
						uni.stopPullDownRefresh();
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
		background: #fff;
	}

	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}

	.order-item {
		margin-top: 30upx;
	}

	.tip-grey {
		color: #999;
		font-size: 28upx;
		flex: 1;
		padding-left: 30upx;
	}

	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 30upx;
		background: #fff;

		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			padding: 0 30upx 0 24upx;
			overflow: hidden;

			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}

			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 16upx 0 0 0;
			}
		}
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: relative;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
				}
			}
		}
	}
</style>
