<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" src="/static/bj.png"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.head_ico ? `${url_base_image}/${userInfo.head_ico}` : '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfo.username || '游客'}}</view>
					<view class="tips" v-if="hasLogin">
						<image class="vip-tip" src="/static/icon/vip.png" v-if="userInfo.is_vip"></image>
						<view class="pick-tip" v-if="userInfo.is_agent">
							<image src="/static/icon/shop.png" class="shop"></image>{{userInfo.agent_text}}
						</view>
					</view>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="b-btn" v-if="!userInfo.is_vip" @click="navTo('/pages/recommend/register')">
					立即开通
				</view>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					{{userInfo.is_agent ? userInfo.agent_text : userInfo.is_vip ? userInfo.vip_text : '普通会员'}}
				</view>
				<!-- <text class="e-m"></text> -->
				<!-- <text class="e-b"></text> -->
			</view>
		</view>

		<view class="cover-container" :style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
		 @touchstart="coverTouchstart" @touchmove="coverTouchmove" @touchend="coverTouchend">
			<image class="arc" src="/static/arc.png"></image>

			<view class="tj-sction">
				<view class="tj-item" @click="navTo('/pages/money/money')">
					<text class="num">{{ userInfo.remain_balance || '0.00' }}</text>
					<text>账户余额</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/money/vipsDetails')">
					<text class="num">{{ userInfo.revisit || '0.00' }}</text>
					<text>VIP消费</text>
				</view>
				<view class="tj-item" @click="navTo('/pages/collect/index')">
					<text class="num">{{ favorite && favorite.length || '0' }}</text>
					<text>收藏</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouye"></text>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-daifukuan"></text>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-yishouhuo"></text>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=4')" hover-class="common-hover" :hover-stay-time="50">
					<text class="yticon icon-shouhoutuikuan"></text>
					<text>退款/售后</text>
				</view>
			</view>
			<view class="history-section icon">
				<list-cell image="home-5" iconColor="#e07472" title="我的钱包" @eventClick="navTo('/pages/money/money')"></list-cell>
				<list-cell image="home-4" iconColor="#e07472" title="我的股权" @eventClick="navTo('/pages/stock/index/index')"></list-cell>
				<list-cell image="home-3" iconColor="#ee883b" title="我的推荐" @eventClick="specTo()"></list-cell>
				<list-cell image="home-8" iconColor="#54b4ef" title="我的二维码" @eventClick="navTo('/pages/collect/index')"></list-cell>
				<list-cell image="home-2" iconColor="#e07472" title="我的评价"></list-cell>
			</view>
			<view class="history-section icon">
				<list-cell image="home-7" title="实名认证" @eventClick="navTo('/pages/set/realname')"></list-cell>
				<list-cell image="home-6" title="会员通知" @eventClick="navTo('/pages/collect/index')"></list-cell>
				<list-cell image="home-1" title="关于我们"></list-cell>
			</view>
		</view>


	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell'
	import mineModel from '../../api/mine/index.js'
	import {
		url_base_image
	} from '../../common/config/index.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				url_base_image,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
			}
		},
		onLoad(option) {
			if (!option.isload) {
				this.getUserInfo()
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			...mapGetters(['hasLogin', 'userInfo', 'favorite'])
		},
		methods: {
			...mapActions(['getUserInfo']),
			specTo() {
				if (!this.hasLogin) {
					url = '/pages/public/login'
					return
				}
				if (!this.userInfo.is_vip) {
					uni.showModal({
						title: '提示',
						content: '您还不是会员，前去激活？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/recommend/register'
								})
							}
						}
					})
					return
				}
				uni.navigateTo({
					url: '/pages/recommend/recommend'
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 60 && moveDistance < 80) {
					moveDistance = 60;
				}

				if (moveDistance > 0 && moveDistance <= 60) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style lang='scss'>
	page {
		background: #f5f5f5;
	}

	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 460upx;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: #fff;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 22upx;
			top: 22upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #ea1212;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 0upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}

	.info-box {
		.tips {
			display: flex;
			align-items: center;
			margin-top: 10upx;

			.vip-tip {
				width: 83upx;
				height: 32upx;
				margin-left: 20upx;
			}

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
		}
	}
</style>
