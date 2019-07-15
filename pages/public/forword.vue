<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">用户名</text>
			<input class="input" type="text" v-model="formData.name" placeholder="请输入用户名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">验证码</text>
			<input class="input" type="number" v-model="formData.code" placeholder="请输入验证码" placeholder-class="placeholder" />
			<button type="primary" plain="true" size="mini" class="code" :disabled="sending" @click="sendCode">{{sendMessage}}</button>
		</view>

		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
	const formFields = {
		name: '',
		mobile: '',
		code: ''
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

			},
			// 发送验证码
			sendCode() {
				
			}
		}
	}
</script>


<style lang="scss">
	uni-button.code {
		height: 64upx;
		border-color: $base-color;
		color: $base-color;
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
