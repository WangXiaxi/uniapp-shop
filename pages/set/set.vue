<template>
	<view class="container">
		<view class="list-cell m-t" @click="changeHead()" hover-class="cell-hover" :hover-stay-time="50">
			<view class="cell-tit">
				<image class="face" :src="userInfo.head_ico ? `${url_base_image}/${userInfo.head_ico}` : '/static/missing-face.png'"></image>
			</view>
			<text class="cell-tip">更换头像</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell m-t b-b">
			<text class="cell-tit">昵称</text>
			<text class="cell-tip">{{userInfo.username}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b">
			<text class="cell-tit">手机号</text>
			<text class="cell-tip">{{userInfo.mobile}}</text>
			<!-- <text class="cell-more yticon icon-you"></text> -->
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/landPass')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改登陆密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="list-cell b-b" @click="navTo('/pages/set/cashPass')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改提现密码</text>
			<text class="cell-more yticon icon-you"></text>
		</view>

		<view class="list-cell b-b" @click="navTo('/pages/address/address')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">我的收货地址</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		
		<view class="list-cell m-t b-b" @click="navTo('/pages/xieyi/xieyi')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">用户协议</text>
			<text class="cell-more yticon icon-you"></text>
		</view>
		<view class="cell-bottom" >客服电话：400-0571-775</view>
		<!-- <view class="list-cell">
			<text class="cell-tit">检查更新</text>
			<text class="cell-tip">当前版本 1.0.0</text>
			<text class="cell-more yticon icon-you"></text>
		</view> -->
		<view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
	</view>
</template>

<script>
	import mineModel from '../../api/mine/index.js'
	import {
		url_base_image
	} from '../../common/config/index.js'
	import {
		mapMutations,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				url_base_image
			};
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		methods: {
			...mapMutations(['logout', 'clearOut']),
			...mapActions(['getUserInfo']),
			changeHead() { // 修改头像
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (data) => {
						const tempFilePaths = data.tempFilePaths;
						uni.showLoading({
							title: '请稍后',
							mask: true
						})
						mineModel.uploadUserIco(tempFilePaths[0]).then(res => {
							uni.hideLoading()
							this.$api.msg('头像上传成功！')
							this.getUserInfo()
						}).catch(res => {
							uni.hideLoading()
						})
					}
				})
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			//退出登录
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.logout();
							this.clearOut();
							setTimeout(() => {
								uni.navigateBack();
							}, 200)
						}
					}
				});
			}
		}
	}
</script>

<style lang='scss'>
	.cell-bottom {
		color: #666;
		font-size: 30upx;
		text-align: center;
		margin-top: 40upx;
	}
	.face {
		display: block;
		width: 102upx;
		height: 102upx;
		border-radius: 50%;
	}

	page {
		background: $page-color-base;
	}

	.list-cell {
		display: flex;
		align-items: center;
		padding: 20upx $page-row-spacing;
		line-height: 60upx;
		position: relative;
		background: #fff;
		justify-content: center;

		&.log-out-btn {
			margin-top: 40upx;

			.cell-tit {
				color: $uni-color-primary;
				text-align: center;
				margin-right: 0;
			}
		}

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		&.m-t {
			margin-top: 16upx;
		}

		.cell-more {
			font-size: $font-lg;
			color: $font-color-light;
			margin-left: 10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: $font-base;
			color: $font-color-light;
		}

		switch {
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
