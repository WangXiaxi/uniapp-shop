<template>
	<view>
		<view class="content" v-if="isCheck">
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" disabled />
			</view>
			<view class="row b-b">
				<text class="tit">验证码</text>
				<input class="input" type="number" v-model="formData.mobile_code" placeholder="请输入验证码" placeholder-class="placeholder" />
				<button class="code-btn" :disabled="sending" @click="sendCode">{{sendMessage}}</button>
			</view>
			<button class="add-btn" @click="confirmFirst">下一步</button>
		</view>
		<view class="content" v-else>
			<view class="row b-b">
				<text class="tit spec">请输入新密码</text>
				<input class="input" type="password" v-model="formData.password" placeholder="请输入6-32位密码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit spec">请确认密码</text>
				<input class="input" type="password" v-model="formData.repassword" placeholder="请再次输入密码" placeholder-class="placeholder" />
			</view>
			<button class="add-btn spec" @click="goFirst">上一步</button>
			<button class="add-btn" :loading="loading" :disabled="loading" @click="confirmLast">提交</button>
		</view>
	</view>
</template>

<script>
	import loginModel from '../../api/login/index.js'
	import {  
	    mapGetters
	} from 'vuex';
	const formFields = {
		username: '',
		mobile: '',
		mobile_code: '',
		password: '',
		repassword: ''
	}
	export default {
		data() {
			return {
				loading: false,
				isCheck: true, // 是否输入验证码等
				sendMessage: '发送验证码',
				sending: false,
				formData: JSON.parse(JSON.stringify(formFields)),
				rulesFirst: {
					username: {
						required: true
					},
					mobile: {
						required: true,
						tel: true
					},
					mobile_code: {
						required: true
					}
				},
				messagesFirst: {
					username: {
						required: '请输入用户名！'
					},
					mobile: {
						required: '请输入手机号！'
					},
					mobile_code: {
						required: '请输入短信验证码！'
					}
				},
				rulesSecond: {
					password: {
						required: true
					},
					repassword: {
						required: true
					}
				},

				messagesSecond: {
					password: {
						required: '请输入密码！'
					},
					repassword: {
						required: '请确认密码！'
					}
				}
			}
		},
		onShow() {
			const { username, mobile } = this.userInfo
			Object.assign(this.formData, { username, mobile })
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			// 上一步
			goFirst() {
				this.isCheck = true
			},
			// 
			// 下一步
			confirmLast() {
				const {
					formData: {
						username,
						mobile,
						mobile_code,
						password,
						repassword
					},
					rulesFirst,
					messagesFirst,
					rulesSecond,
					messagesSecond
				} = this
				const sendData = {
					username,
					mobile,
					mobile_code,
					password,
					repassword
				}
				if (password !== repassword) return this.$api.msg('两次密码输入不一致！')
				loginModel.initValidate(Object.assign(rulesFirst, rulesSecond), Object.assign(messagesFirst, messagesSecond))
				if (!loginModel.WxValidate.checkForm(sendData)) return
				this.loading = true
				loginModel.findPassWordByMobile(sendData).then(() => {
					this.loading = false
					this.$api.msg('登录密码修改成功！', 1500, false, 'success')
					setTimeout(() => {
						uni.navigateBack({
							delta: 2
						})
					}, 1500)
				}).catch(() => {
					this.loading = false
				})

			},
			confirmFirst() {
				const {
					formData: {
						username,
						mobile,
						mobile_code
					},
					rulesFirst,
					messagesFirst
				} = this
				const sendData = {
					username,
					mobile,
					mobile_code
				}
				loginModel.initValidate(rulesFirst, messagesFirst)
				if (!loginModel.WxValidate.checkForm(sendData)) return
				this.isCheck = false
			},
			// 发送验证码
			sendCode() {
				const {
					formData: {
						username,
						mobile
					},
					rulesFirst: {
						username: usernameRule,
						mobile: mobileRule
					},
					messagesFirst: {
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
				loginModel.getMobileCode(sendData).then(res => {
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
			width: 120upx;
			font-size: 30upx;
			color: $font-color-dark;

			&.spec {
				width: 200upx;
			}
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
		margin: 30upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);

		&.spec {
			border: 1px solid $base-color;
			background-color: #fff;
			color: $base-color;
			box-shadow: none;
		}
	}
</style>
