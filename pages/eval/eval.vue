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
						<view class="i-top b-b">
							<text class="time">{{item.create_time}}</text>
							<text class="state" :style="{color: item.stateTipColor}">{{item.status_text}}</text>
							<text v-if="true" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(item.id)"></text>
						</view>
						
						<view @click="navTo(`/pages/order/detail?id=${item.id}`)" v-if="item.goods.length === 1" class="goods-box-single" v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex">
							<image class="goods-img" :src="goodsItem.image" mode="aspectFill"></image>
							<view class="right">
								<text class="title clamp">{{goodsItem.goods_array.name}}</text>
								<text class="attr-box">{{goodsItem.goods_array.value}} x {{goodsItem.goods_nums}}</text>
								<text class="price">{{goodsItem.goods_price}}</text>
							</view>
						</view>
						<view class="action-box b-t" v-if="!(!item.isCancel && !item.isGoPay && !item.isRefund && !item.isConfirm)">
							<button v-if="item.isCancel" class="action-btn" @click="cancelOrder(item.id)">取消订单</button>
						</view>
					</view>
		
					<uni-load-more :status="tabItem.loadingType"></uni-load-more>
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
						text: '已评价',
						loadingType: 'more',
						orderList: [],
						page: 0,
						total: 0
					},
					{
						state: 1,
						text: '未评价',
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
				orderModel.getOrderListByState({
					state,
					page
				}).then(res => {
					navItem.orderList.push(...res.data.data.map(k => {
						let num = 0
						if (!k.goods) {
							k.goods = []
							return k
						}
						k.goods.forEach(c => {
							num = num + Number(c.goods_nums)
							c.image = `${url_image}/${c.img}`
							c.goods_array = JSON.parse(c.goods_array)
						})
						k.num = num
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
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}
</style>
