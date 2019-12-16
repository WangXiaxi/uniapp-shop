<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="formData.username" placeholder="请输入用户名" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">真实姓名</text>
			<input class="input" type="text" v-model="formData.realname" placeholder="请输入真实姓名" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">短信验证码</text>
			<input class="input" type="number" v-model="formData.mobile_code" placeholder="请输入验证码" placeholder-class="placeholder" />
			<button class="code-btn" :disabled="sending" @click="sendCode">{{sendMessage}}</button>
		</view>

		<button class="add-btn" :loading="loading" :disabled="loading" @click="confirm">提交</button>
	</view>
</template>

<script>
	import loginModel from '../../api/login/index.js'
	
	const formFields = {
		username: ''
	}
	
	export default {
		data() {
			return {
				sending: false,
				sendMessage: '发送验证码',
				formData: JSON.parse(JSON.stringify(formFields)),
				loading: false
			}
		},
		methods: {
			// 发送验证码
			sendCode() {
				const {
					formData: {
						username,
						mobile
					},
					rules: {
						username: usernameRule,
						mobile: mobileRule
					},
					messages: {
						username: usernameMessage,
						mobile: mobileMessage
					}
				} = this
				const sendData = {
					username,
					mobile
				}
				loginModel.initValidate({
					username: usernameRule,
					mobile: mobileRule
				}, {
					username: usernameMessage,
					mobile: mobileMessage
				})
				if (!loginModel.WxValidate.checkForm(sendData)) return
				this.sending = true
				loginModel.getRegMobileCode(sendData).then(res => {
					this.timeAction()
				}).catch(() => {
					this.sending = false
				})
			},
			// 倒计时
			timeAction() {
				let t = 120
				const fun = () => {
					t--
					this.sendMessage = `${t}s重新获取`
					if (t <= 0) {
						this.sendMessage = '发送验证码'
						this.sending = false
						clearInterval(inter)
					}
				}
				this.sendMessage = `${t}s重新获取`
				let inter = setInterval(fun, 1000)
			}
		}
	}
</script>

<style lang="scss">
	.code-btn {
		height: 64upx;
		line-height: 60upx;
		border: 1px solid $base-color;
		background-color: #fff;
		color: $base-color;
		font-size: $font-base;

		&::after {
			border: none;
		}

		&[disabled] {
			border-color: rgba(0, 0, 0, .3);
		}
	}

	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 160upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.code-image {
		width: 260upx;
		height: 90upx;
	}
	.xieyi-section {
		width: 100%;
		margin-top: 20upx;
		margin-left: 30upx;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		display: flex;
		align-items: center;
		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>
