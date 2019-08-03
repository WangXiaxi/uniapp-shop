<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="cur">当前身份：普通会员</view>
		</view>
		<view class="info-box">
			<view class="row b-b">
				<text class="tit">收件人</text>
				<input class="input" type="text" v-model="addressData.param2" placeholder="请输入收件人" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">联系方式</text>
				<input class="input" type="number" v-model="addressData.param2" placeholder="请输入手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b spec">
				<text class="tit">详细地址</text>
				<textarea class="text-area" v-model="addressData.param2" placeholder="请输入详细地址信息，如道路、门牌号、小 区、楼号、单元等等。 "
				 placeholder-class="placeholder"></textarea>
			</view>
		</view>
		<view class="info-box">
			<view class="tip-title">
				我要开通
			</view>
			<view class="spec-list">
				<view class="item act">
					VIP
				</view>
				<view class="item">
					社区店
				</view>
				<view class="item">
					标准店
				</view>
				<view class="item">
					旗舰店
				</view>
			</view>
			<view class="tip-title">
				配送方式
			</view>
			<view class="spec-list">
				<view class="item">
					自提
				</view>
				<view class="item">
					物流
				</view>
				<view class="item">
					快递
				</view>
			</view>
			<view class="pay b-t">
				<view class="tit">支付金额</view>
				<view class="red">￥1999.00</view>
			</view>
		</view>
		<view class="info-box">
			<view class="tip-title">
				支付方式
			</view>
		</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				addressData: {

				}
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 0upx;
		height: 90upx;
		background: #fff;

		&.spec {
			height: auto;

			.text-area {
				height: 110upx;
				padding: 20upx 0;
				font-size: 30upx;
			}
		}

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

	.top-part {
		position: relative;
		width: 100%;
		height: 320upx;
		padding: 36upx 30upx;

		.cur {
			font-size: 36upx;
			color: #fff;
			position: relative;
			z-index: 2;
		}

		.bg {
			position: absolute;
			z-index: 0;
			left: 0;
			top: 0;
			width: 100%;
			height: 320upx;
		}
	}

	.info-box {
		position: relative;
		z-index: 2;
		margin: -200upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		/* box-shadow: 0px 12upx 18upx 2upx rgba(0, 0, 0, 0.1); */
		padding: 10upx 30upx 30upx;

		&+.info-box {
			margin: 30upx 32upx 0;
			padding: 30upx;
		}

		.tip-title {
			font-size: 30upx;
		}
		.pay {
			display: flex;
			align-items: center;
			position: relative;
			padding-top: 20upx;
			margin-top: 20upx;
			.tit {
				flex: 1;
				font-size: 30upx;
			}
			.red {
				color: $base-color;
				font-size: 36upx;
			}
		}
		.spec-list {
			overflow: hidden;
			margin-top: 20upx;

			.item {
				border-radius: 4upx;
				width: 31%;
				margin-left: 3.5%;
				margin-bottom: 20upx;
				float: left;
				height: 56upx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 28upx;
				color: #666;
				border: 1upx solid #ccc;
				&:nth-of-type(3n + 1) {
					margin-left: 0;
				}
			}

			.item.act {
				border-color: $base-color;
				color: $base-color;
				position: relative;
				overflow: hidden;
				&:after {
					content: '';
					position: absolute;
					bottom: 0;
					right: 0;
					width: 0;
					height: 0;
					border-bottom: 16upx solid $base-color;
					border-top: 16upx solid transparent;
					border-left: 22upx solid transparent;
					border-right: 22upx solid $base-color;
				}

				&:before {
					content: ' ';
					display: block;
					position: absolute;
					z-index: 1;
					right: 10upx;
					bottom: 8upx;
					width: 20upx;
					height: 40upx;
					border-radius: 0;
					border: none;
					border-bottom: 4upx solid #fff;
					border-right: 4upx solid #fff;
					transform: scale(0.4) rotate(45deg);
					transform-origin: bottom;
				}
			}
		}
	}
</style>
