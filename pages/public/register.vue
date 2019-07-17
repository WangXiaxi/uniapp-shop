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
			<text class="tit">图形验证码</text>
			<input class="input" type="number" v-model="formData.captcha" placeholder="请输入图形验证码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">邀请人</text>
			<input class="input" type="number" v-model="formData.parent_name" placeholder="请输入邀请人用户名" placeholder-class="placeholder" />
		</view>

		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
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
				sendMessage: '发送验证码',
				sending: false,
				formData: JSON.parse(JSON.stringify(formFields))
			}
		},
		onLoad(option) {},
		methods: {
			//提交
			confirm() {

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
</style>
