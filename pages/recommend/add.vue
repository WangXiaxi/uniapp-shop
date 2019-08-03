<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" type="text" v-model="formData.username" placeholder="请输入姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">登陆名</text>
			<input class="input" type="text" v-model="formData.username" placeholder="请输入登陆名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit spec">密码</text>
			<input class="input" type="password" v-model="formData.password" placeholder="请输入6-32位密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit spec">请确认密码</text>
			<input class="input" type="password" v-model="formData.repassword" placeholder="请再次输入密码" placeholder-class="placeholder" />
		</view>
		
		<view class="row b-b">
			<text class="tit">图形验证码</text>
			<input class="input" type="text" v-model="formData.captcha" placeholder="请输入图形验证码" placeholder-class="placeholder" />
			<image class="code-image" :src="codeImage" @click="getCaptcha"></image>
		</view>

		<button class="add-btn" :loading="loading" :disabled="loading" @click="confirm">提交</button>
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
		parent_name: ''
	}
	export default {
		data() {
			return {
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
					captcha: {
						required: true
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
		},
		methods: {
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
				loginModel.register(formData).then(res => {
					this.loading = false
					this.formData = JSON.parse(JSON.stringify(formFields))
					this.$api.msg('注册成功！', 1500, false, 'success')
					setTimeout(() => {
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
