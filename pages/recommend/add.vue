<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="formData.username" placeholder="请输入登陆名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit spec">密码</text>
			<input class="input" type="password" v-model="formData.password" placeholder="请输入6-32位密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit spec">请确认密码</text>
			<input class="input" type="password" v-model="formData.repassword" placeholder="请再次输入密码" placeholder-class="placeholder" />
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
		<button class="add-btn" :loading="loading" :disabled="loading" @click="confirm" v-if="registerType !== '2'">提交</button>
	</view>
</template>

<script>
	import loginModel from '../../api/login/index.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	const formFields = {
		username: '',
		password: '',
		repassword: '',
		mobile: '',
		captcha: '',
		from_id: '',
		mobile_code: ''
	}
	export default {
		data() {
			return {
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
					}
				}
			}
		},
		onLoad(option) {
			if (option.data) {
				this.formData.from_id = JSON.parse(option.data).id
			} else {
				this.formData.from_id = this.userInfo.id
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
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			...mapActions(['getUserInfo']),
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
					formData,
					rules,
					messages
				} = this
				if (formData.password !== formData.repassword) return this.$api.msg('两次密码输入不一致！')
				loginModel.initValidate(rules, messages)
				if (!loginModel.WxValidate.checkForm(formData)) return
				this.loading = true
				const sendData = Object.assign({}, formData)
				Object.keys(sendData).map(c => {
					if (!sendData[c]) delete sendData[c]
				})
				loginModel.register(sendData).then(res => {
					this.formData = JSON.parse(JSON.stringify(formFields))
					this.$api.msg('添加会员成功！', 1500, false, 'success')
					if (this.$api.prePage()) {
						this.$api.prePage().loadData('refresh')
					}
					this.getUserInfo()
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
</style>
