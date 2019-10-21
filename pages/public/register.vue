<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="formData.username" placeholder="请输入用户名" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit spec">请输入密码</text>
			<input class="input" type="password" v-model="formData.password" placeholder="请输入6-32位密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit spec">请确认密码</text>
			<input class="input" type="password" v-model="formData.repassword" placeholder="请再次输入密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-if="registerType === '0'">
			<text class="tit">图形验证码</text>
			<input class="input" type="text" v-model="formData.captcha" placeholder="请输入图形验证码" placeholder-class="placeholder" />
			<image class="code-image" :src="codeImage" @click="getCaptcha"></image>
		</view>

		<view class="row b-b" v-if="registerType === '3'">
			<text class="tit">短信验证码</text>
			<input class="input" type="number" v-model="formData.mobile_code" placeholder="请输入验证码" placeholder-class="placeholder" />
			<button class="code-btn" :disabled="sending" @click="sendCode">{{sendMessage}}</button>
		</view>

		<view class="row b-b" v-if="!registerId">
			<text class="tit">邀请人</text>
			<input class="input" type="text" v-model="formData.parent_name" placeholder="请输入邀请人用户名" placeholder-class="placeholder" />
		</view>
		<label class="xieyi-section"><checkbox :checked="isRead === 'true'" @click="changeRead" />我已阅读<text @click.stop="toRegist('/pages/xieyi/xieyi')">《用户协议》</text></label>
		<button class="add-btn" :loading="loading" :disabled="loading || isRead === 'false'" @click="confirm" v-if="registerType !== '2'">提交</button>
	</view>
</template>

<script>
	import loginModel from '../../api/login/index.js'

	const formFields = {
		username: '',
		password: '',
		repassword: '',
		mobile: '',
		captcha: '',
		parent_name: '',
		mobile_code: ''
	}
	export default {
		data() {
			return {
				registerId: '', // H5页面携带参数
				isRead: 'true',
				sendMessage: '发送验证码',
				sending: false,
				registerType: '0',
				codeImage: loginModel.getCaptcha(),
				loading: false,
				formData: JSON.parse(JSON.stringify(formFields)),
				rules: {
					username: {
						required: true
					},
					password: {
						required: true
					},
					repassword: {
						required: true
					},
					mobile: {
						required: true,
						tel: true
					},
					mobile_code: {
						required: false
					},
					captcha: {
						required: false
					},
					parent_name: {
						required: true
					}
				},
				messages: {
					username: {
						required: '请输入用户名！'
					},
					password: {
						required: '请输入密码！'
					},
					repassword: {
						required: '请确认密码！'
					},
					mobile: {
						required: '请输入手机号！'
					},
					mobile_code: {
						required: '请输短信验证码！'
					},
					captcha: {
						required: '请输入图形验证码！'
					},
					parent_name: {
						required: '请输入邀请人用户名！'
					}
				}
			}
		},
		onLoad(option) {
			if (option.id) {
				 this.registerId = option.id
				 this.rules.parent_name = false
			}
			uni.showLoading({
				title: '请稍后',
				mask: true
			})
			loginModel.getRegOption().then(res => {
				uni.hideLoading()
				this.registerType = res.data
				switch (this.registerType) {
					case '0': // 正常
						this.rules.captcha.required = true
						break
					case '2': // 关闭
						this.$api.msg('当前系统设置不允许注册！')
						break
					case '3': // 手机
						this.rules.mobile_code.required = true
						break
				}
			})
		},
		methods: {
			changeRead() {
				this.isRead = this.isRead === 'false' ? 'true' : 'false'
			},
			toRegist(url) {
				uni.navigateTo({
					url
				})
			},
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
			},
			// 获取图形验证
			getCaptcha() {
				this.codeImage = loginModel.getCaptcha()
			},
			// 提交
			confirm() {
				const {
					registerId,
					formData,
					rules,
					messages
				} = this
				if (formData.password !== formData.repassword) return this.$api.msg('两次密码输入不一致！')
				loginModel.initValidate(rules, messages)
				if (!loginModel.WxValidate.checkForm(formData)) return
				this.loading = true
				const sendData = Object.assign({}, formData)
				if (registerId) sendData.from_id = registerId
				Object.keys(sendData).map(c => {
					if (!sendData[c]) delete sendData[c]
				})
				loginModel.register(sendData).then(res => {
					this.formData = JSON.parse(JSON.stringify(formFields))
					this.$api.msg('注册成功！', 1500, false, 'success')
					setTimeout(() => {
						this.loading = false
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.loading = false
				})
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
