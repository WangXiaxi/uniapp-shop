<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">原密码</text>
			<input class="input" type="text" v-model="addressData.password1" placeholder="请输入原密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">新密码</text>
			<input class="input" type="number" v-model="addressData.password" placeholder="请输入6-32位新密码" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">确认密码</text>
			<input class="input" type="number" v-model="addressData.repassword" placeholder="请确认密码" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
		<view class="pass">忘记原密码？</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressData: {
					password1: '',
					password: '', // 新密码
					repassword: '', // 原密码
				},
				btnLoading: false
			}
		}
	}
</script>


<style lang="scss">
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
			width: 140upx;
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
		margin: 60upx auto 20upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
	.pass {
		float: right;
		font-size: 24upx;
		color: royalblue;
		margin-right: 30upx;
	}
</style>

