<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.head_ico ? `${url_base_image}/${userInfo.head_ico}` : '/static/missing-face.png'"></image>

				</view>
				<view class="info-box">
					<view class="username">
						<view class="name">{{userInfo.username}}</view>
						<image class="vip-tip" src="/static/icon/vip.png" v-if="userInfo.is_vip"></image>
						<view class="pick-tip" v-if="!userInfo.is_agent">
							<image src="/static/icon/shop.png" class="shop"></image>{{userInfo.agent_text}}社区店
						</view>
					</view>
					<view class="tips">
						<image class="ico" src="/static/icon/mobile.png"></image>
						<view class="mobile text">{{userInfo.mobile}}({{userInfo.true_name | fill}})</view>
						<image class="ico" src="/static/icon/num.png"></image>
						<view class="num text">{{userInfo.team_sum | fill(0)}}</view>
					</view>
				</view>
				<image class="ico-add" src="/static/icon/add.png" @click="navTo('/pages/recommend/add')"></image>
			</view>
		</view>
		<view class="search-box">
			<input class="input" type="text" v-model="keyworld" @confirm="handleSearch" placeholder="请输入关键字" placeholder-class="placeholder" />
			<view class="btn" @click="handleSearch">搜索</view>
		</view>
		<view class="item-list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="item.head_ico ? `${url_base_image}/${userInfo.head_ico}` : '/static/missing-face.png'"></image>
					</view>
					<view class="info-box">
						<view class="username">
							<view class="name">{{item.username}}</view>
							<image class="vip-tip" src="/static/icon/vip.png" v-if="item.is_vip"></image>
							<view class="pick-tip" v-if="item.is_agent">
								<image src="/static/icon/shop.png" class="shop"></image>{{item.agent_text}}
							</view>
						</view>
						<view class="tips">
							<image class="ico" src="/static/icon/mobile.png"></image>
							<view class="mobile text">{{item.mobile}}({{item.true_name | fill}})</view>
							<image class="ico" src="/static/icon/num.png"></image>
							<view class="num text">{{item.team_sum | fill(0)}}</view>
						</view>
					</view>
					<image class="ico-more" v-if="!item.is_vip" src="/static/icon/more.png" @click="navTo(`/pages/recommend/register?data=${JSON.stringify(item)}`)"></image>
					<image class="ico-add" v-if="item.is_vip" src="/static/icon/add_b.png" @click="navTo(`/pages/recommend/add?data=${JSON.stringify(item)}`)"></image>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
	</view>
</template>

<script>
	import recommendModel from '../../api/recommend/index.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {
		url_base_image
	} from '../../common/config/index.js'

	import {
		mapGetters
	} from 'vuex';
	
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				url_base_image,
				keyworld: ' ',
				loadingType: 'more', //加载更多状态
				list: [],
				page: 0,
				pages: 0 // 总页数
			};
		},
		computed: {
			...mapGetters(['userInfo'])
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
				recommendModel.getMyTeam({ page: this.page, limit: 10, keyworld: this.keyworld ? this.keyworld: ' ' }).then(res => {
					if (!res.data.data) {
						res.data.data = []
						res.data.totalPage = 0
					}
					this.list.push(...res.data.data)
					this.pages = res.data.totalPage
					uni.stopPullDownRefresh();
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more';
				}).catch(() => {
				})
			},
			handleSearch() { // 搜索操作
				this.loadData('refresh');
			},
			navTo(url){
				uni.navigateTo({  
					url
				})  
			}
		},
	}
</script>

<style lang='scss'>
	
	.pick-tip {
		background: #d874fd;
		border-radius: 24upx;
		font-size: 20upx;
		line-height: 32upx;
		color: #fff;
		padding: 0upx 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 10upx;

		.shop {
			width: 24upx;
			height: 24upx;
			margin-right: 10upx;
		}
	}

	.user-info-box {
		display: flex;
		align-items: center;

		.portrait {
			display: block;
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.info-box {
			margin-left: 32upx;
			width: 0;
			flex: 1;
		}

		.username {
			display: flex;
			align-items: center;

			.vip-tip {
				width: 83upx;
				height: 32upx;
				margin-left: 10upx;
			}

			.name {
				color: #fff;
				font-size: 28upx;
			}
		}

		.tips {
			display: flex;
			margin-top: 22upx;
			align-items: center;

			.ico {
				width: 32upx;
				height: 32upx;
				margin-right: 10upx;
			}

			.text {
				font-size: 24upx;
				color: #E6E6E6;
				margin-right: 20upx;

				&.num {
					margin-right: 0;
				}
			}
		}

		.ico-add {
			width: 48upx;
			height: 48upx;
		}
		.ico-more {
			width: 48upx;
			height: 48upx;
			padding: 6upx;
		}
	}

	.item {
		margin: 40upx 30upx;
		.user-info-box {
			.name {
				color: #333;
			}
			.text {
				color: #666;
			}
		}

	}

	.top-part {
		position: relative;
		width: 100%;
		height: 320upx;
		text-align: center;
		padding: 60upx 30upx;

		.bg {
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
			width: 100%;
			height: 320upx;
		}
	}

	.search-box {
		position: relative;
		z-index: 2;
		margin: -50upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		box-shadow: 0px 12upx 18upx 2upx rgba(0, 0, 0, 0.1);
		padding: 10upx 30upx 10upx;
		display: flex;
		align-items: center;

		.input {
			flex: 1;
			height: 70upx;
			font-size: 30upx;
		}

		.btn {
			font-size: 28upx;
			padding: 16upx 0;

		}
	}
</style>
