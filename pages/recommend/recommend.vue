<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.head_ico || '/static/missing-face.png'"></image>
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
						<view class="mobile text">15058559592(王爸爸)</view>
						<image class="ico" src="/static/icon/num.png"></image>
						<view class="num text">3562</view>
					</view>
				</view>
				<image class="ico-add" src="/static/icon/add.png" @click="navTo('/pages/recommend/add')"></image>
			</view>
		</view>
		<view class="search-box">
			<input class="input" type="text" v-model="search" @confirm="handleSearch" placeholder="请输入关键字" placeholder-class="placeholder" />
			<view class="btn" @click="handleSearch">搜索</view>
		</view>
		<view class="item-list">
			<view class="item">
				<view class="user-info-box">
					<view class="portrait-box">
						<image class="portrait" :src="userInfo.head_ico || '/static/missing-face.png'"></image>
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
							<view class="mobile text">15058559592(王爸爸)</view>
							<image class="ico" src="/static/icon/num.png"></image>
							<view class="num text">3562</view>
						</view>
					</view>
					<image class="ico-more" src="/static/icon/more.png" @click="navTo('/pages/recommend/register')"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';

	export default {
		data() {
			return {
				search: ''
			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			handleSearch() { // 搜索操作
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
