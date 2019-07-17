<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input type="text" v-model="loginInfo" placeholder="请输入用户名" />
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input type="password" v-model="password" placeholder="6位以上不含特殊字符的数字、字母组合" placeholder-class="input-empty"
					 password @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" :loading="loading" :disabled="loading" @click="toLogin">登录</button>
			<view class="forget-section" @click="toRegist('/pages/public/forword')">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist('/pages/public/register')">马上注册</text>
		</view>
	</view>
</template>

<script>
	import loginModel from '../../api/login/index.js'
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				loading: false,
				loginInfo: '',
				password: '',
				rules: {
					loginInfo: {
						required: true
					},
					password: {
						required: true,
						minlength: 6
					}
				},
				messages: {
					loginInfo: {
						required: '请输入用户名！'
					},
					password: {
						required: '请输入密码！',
						minlength: '密码不能低于6位！'
					}
				}
			}
		},
		onLoad() {},
		computed: {},
		methods: {
			...mapMutations(['login']),
			navBack() {
				uni.navigateBack()
			},
			toRegist(url) {
				uni.navigateTo({
					url
				})
			},
			toLogin() {
				const {
					loginInfo,
					password,
					rules,
					messages
				} = this
				const sendData = {
					loginInfo,
					password
				}
				loginModel.initValidate(rules, messages)
				if (!loginModel.WxValidate.checkForm(sendData)) return
				this.loading = true
				loginModel.login(sendData).then(result => {
					this.loading = false
					this.loginInfo = ''
					this.password = ''
					this.login(result.data.userToken)
					if (this.$api.prePage()) {
						uni.navigateBack()
					} else {
						uni.switchTab({
							url: '../user/user'
						})
					}
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
