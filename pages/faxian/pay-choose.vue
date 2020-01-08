<template>
	<view class="container">
		<view class="item-main">
			<image class="img-shop" :src="item.gaslogosmall"></image>
			<view class="info">
				<view class="title">{{item.gasName}}</view>
				<view class="price">优惠价<text class="red">￥{{item.priceYfqSearch}}</text></view>
				<view class="price-2">
					<view class="le">已省￥{{ item.yhMoney }}</view>
					<view class="ri">国标价 ￥{{item.priceOfficialSearch}}</view>
				</view>
				<view class="location">
					<image class="loc-img" src="../../static/icon/location.png"></image>
					<view class="text">{{item.address}}</view>
					<view class="lo-ico">
						<image class="ico" src="../../static/icon/ships.png"></image>
						<view class="m">{{item.distanceStr}}km</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 选择 -->
		<view class="info-box">
			<view class="tip-title">
				选择油号
			</view>
			<view class="spec-list">
				<view class="item" :class="{ act: item.oilNo === formData.param1 }" v-for="(item, index) in options1" :key="index"
				 @click="choose1(item, 'param1')">
					{{item.oilName}}
				</view>
			</view>
			<view class="tip-title">
				选择油枪
			</view>
			<view class="spec-list">
				<view class="item" :class="{ act: item.key === formData.param2 }" v-for="(item, index) in options2" :key="index"
				 @click="choose(item, 'param2')">
					{{item.label}}
				</view>
			</view>
		</view>
		<!-- 提示 -->
		<view class="tips">
			<view class="tit">
				<image src="../../static/icon/tips.png"></image>重要提示
			</view>
			<view class="info">
				请务必<text class="red">先到达油站</text>与工作人员确认后再付款，切勿先买单在加油，避免异常订单的产生。
			</view>
		</view>

		<button class="add-btn" @click="confirm">确认</button>

		<view class="tips-2">若无您选择的油枪号，请联系油站工作人员 支付前请确认加油站是否正确</view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	const fields = {
		param1: '', // 油耗
		param2: '' // 油枪
	}
	export default {
		data() {
			return {
				item: {},
				formData: JSON.parse(JSON.stringify(fields)),
				options1: [ // 油号
				],
				options2: [ // 油枪 跟随油号变动
					{
						key: '8号',
						label: '8号'
					},
					{
						key: '9号',
						label: '9号'
					}
				],
			}
		},
		onLoad(options) {
			this.item = JSON.parse(options.data)
			const {
				oilPriceList,
				curOil
			} = this.item
			this.options1 = oilPriceList
			const cur = oilPriceList.find(c => c.oilName === curOil)
			this.choose1(cur, 'param1')
		},
		methods: {
			choose1(item, param) {
				const {
					oilNo,
					priceOfficial,
					priceYfq,
					gunNos
				} = item
				this.formData[param] = item.oilNo
				Object.assign(this.item, {
					priceYfqSearch: priceYfq,
					priceOfficialSearch: priceOfficial,
					yhMoney: (Number(priceOfficial) - Number(priceYfq)).toFixed(2)
				})
				this.options2 = gunNos.map(c => {
					const { gunNo } = c
					return {
						key: gunNo,
						label: gunNo + '号'
					}
				})
				this.formData['param2'] = this.options2[0].key
			},
			choose(item, param) {
				this.formData[param] = item.key
			},
			confirm() {

			}
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		background: #f5f5f5;
		position: relative;
		z-index: 1;
	}

	.item-main {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		padding: 30rpx 24rpx;

		.img-shop {
			width: 160rpx;
			height: 160rpx;
		}

		.info {
			flex: 1;
			width: 0;
			margin-left: 20rpx;

			.title {
				font-size: 27rpx;
			}

			.price {
				font-size: 24rpx;
				margin-top: 10rpx;

				.red {
					font-size: 32rpx;
					color: #EA1212;
				}
			}

			.price-2 {
				display: flex;
				align-items: center;
				justify-content: center;

				.le {
					width: 256rpx;
					font-size: 32rpx;
					height: 56rpx;
					padding: 32rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: scale(0.5);
					background: #EA1212;
					color: #FFFFFF;
					border-radius: 28rpx;
					transform-origin: 0 54%;
				}

				.ri {
					margin-left: -110rpx;
					flex: 1;
					font-size: 24rpx;
					color: #F47878;
				}
			}

			.location {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 1;
				height: 40rpx;

				.loc-img {
					width: 22rpx;
					height: 28rpx;
				}

				.text {
					margin-left: 10rpx;
					font-size: 24rpx;
					color: #333333;
					width: 0;
					flex: 1;
				}

				.lo-ico {
					margin-left: -140rpx;
					background: #EA1212;
					border-radius: 40rpx;
					width: 280rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: scale(0.5);
					transform-origin: 100% 54%;

					.ico {
						margin-right: 10rpx;
						width: 58rpx;
						height: 50rpx;
					}

					.m {
						font-size: 38rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}

	.info-box {
		position: relative;
		z-index: 2;
		margin: 30upx 32upx 0;
		border-radius: 0upx;
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

	.tips {
		margin: 0upx 32upx 0;
		background: rgb(253, 246, 236);
		color: #E6A23C;
		padding: 30rpx;

		.tit {
			display: flex;
			font-size: 32rpx;
			align-items: center;

			image {
				width: 36rpx;
				height: 36rpx;
				margin-right: 10rpx;
			}
		}

		.info {
			font-size: 28rpx;
			margin-top: 10rpx;
			text-indent: 2em;
			line-height: 1.6;

			.red {
				color: red;
			}
		}
	}

	.tips-2 {
		font-size: 28rpx;
		color: #999999;
		margin: 30upx 32upx 0;
		text-align: center;
	}
</style>
