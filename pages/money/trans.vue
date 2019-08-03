<template>
	<view>
		<view class="content" v-if="!pageSHow">
			<view class="row b-b">
				<text class="tit">对方账号</text>
				<input class="input" type="text" v-model="mobile" placeholder="收款人手机号码" placeholder-class="placeholder" />
			</view>
			<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认</button>
			<view class="tip"><text>1.</text>请务必仔细填写正确的对方手机账号。</view>
		</view>
		<view class="content" v-else>
			<view class="user">
				<image class="portrait" :src="false || '/static/missing-face.png'"></image>
				<view class="name">王小星</view>
				<view class="mobile">150****6578</view>
			</view>
			<view class="spec">
				<text class="tit">转账金额</text>
				<view class="inp">
					<view class="red">￥</view>
					<input class="input" type="text" v-model="mobile" placeholder="0.00" placeholder-class="placeholder" />
				</view>
			</view>
			<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">确认</button>
			<view class="tip"><text>1.</text>可转账金额<text>26800.0元</text>;</view>
			<view class="tip"><text>2.</text>金额将实时转入对方账户，无法取消。</view>
		</view>
		<pay-password :show="show"></pay-password>
	</view>
</template>

<script>
	import payPassword from '../../components/pay_Password.vue'
	export default {
		components: {
			payPassword
		},
		data() {
			return {
				btnLoading: false,
				show: false,
				pageSHow: true,
				mobile: ''
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.tip {
		padding-left: 30upx;
		font-size: 24upx;
		color: #999999;
		margin-bottom: 10upx;
		text {
			color: $base-color;
		}
	}
	.spec {
		position: relative;
		padding: 20upx 30upx;
		background: #fff;
		.inp {
			margin-top: 20upx;
			display: flex;
			align-items: center;
			font-size: 30px;
			.red {
				color: $base-color;
				margin-right: 10upx;
			}
			.input {
				font-size: 50upx;
			}
		}
	}
	.user {
		text-align: center;
		padding-top: 30upx;
		.portrait {
			width: 140upx;
			height: 140upx;
		}
		.name {
			font-size: 32upx;
			margin-top: 30upx;
		}
		.mobile {
			font-size: 28upx;
			color: #666;
			margin-top: 10upx;
			margin-bottom: 40upx;
		}
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
</style>
