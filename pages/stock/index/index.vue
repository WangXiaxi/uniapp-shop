<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="tit">目前拥有股权</view>
			<view class="num">{{userInfo.fir_stocks !== '0' ? `${userInfo.fir_stocks} / ` : ''}}{{userInfo.sec_stocks}}</view>
		</view>
		<view class="center-part" v-if="list.length">
			<view class="top-name" @click="navTo('/pages/stock/list/list')">
				<view class="tit">股权明细</view>
				<text class="cell-tip">更多</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
			<view class="list">
				<view class="item" v-for="(item, index) in list" :key="index">
					<view class="top">
						<view class="type">{{item.type ? '增加' : '减少'}}</view>
						<view class="time">{{item.datetime | fill}}</view>
					</view>
					<view class="bot">
						[{{item.datetime | fill}}] {{item.type ? '增加' : '减少'}}股权 <text class="red">{{item.value}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="ic-box" v-if="list.length">
			<list-cell image="qbdd" iconColor="#e07472" title="股权证书" border="" @eventClick="createdCanvas()"></list-cell>
		</view>
		<view style="width: 100%; height: 0; overflow: hidden;">
			<canvas style="width: 978px; height: 686px;" canvas-id="firstCanvas"></canvas>
		</view>
		<empty v-if="pageLoading === false && list.length === 0" text="暂无相关记录" :styles="{ position: 'relative', paddingTop: '80upx', background: '#f5f5f5' }"></empty>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell'
	import stockModel from '../../../api/stock/index.js'
	import empty from '@/components/empty'
	import mixLoading from '../../../components/mix-loading/mix-loading.vue'
	import {
		fill
	} from '../../../utils/filter.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	import {
		url_base_image
	} from '../../../common/config/index.js'
	export default {
		components: {
			listCell,
			empty
		},
		data() {
			return {
				pageLoading: false,
				list: []
			};
		},
		onLoad() {
			this.loadData()
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			loadData() {
				this.pageLoading = true
				stockModel.getUcenterStocksLog({
					page: 1,
					limit: 3
				}).then(res => {
					this.pageLoading = false
					this.list = res.data.data
				}).catch(() => {
					this.pageLoading = false
				})
			},
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			createdCanvas() {
				uni.showLoading({
					title: '请稍后'
				})
				const _ = this
				stockModel.getStocksInfo().then(res => {
					const {
						true_name,
						ID_card,
						serial_no,
						sec_stocks,
						active_amount,
						time
					} = res.data
					const context = uni.createCanvasContext('firstCanvas', this)
					uni.downloadFile({
						// url: '/static/book.png',
						url: `${url_base_image}/public/img/gqbj.png`,
						success: (res) => {
							context.drawImage(res.tempFilePath, 0, 0, 0)
							context.setFontSize(20)
							context.setFillStyle('black')
							context.fillText(fill(serial_no), 253, 311)
							context.fillText(fill(sec_stocks), 212, 474)
							context.fillText(fill(true_name), 234, 342)
							context.fillText(fill(active_amount), 214, 410)
							context.fillText(fill(ID_card), 234, 376)
							context.setFontSize(16)
							context.fillText(fill(time), 580, 581)
							context.draw(false, () => {
								uni.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: 978,
									height: 686,
									destWidth: 978,
									destHeight: 686,
									canvasId: 'firstCanvas',
									fileType: 'png',
									quality: 0.5,
									success: (res) => {
										uni.previewImage({
											urls: [res.tempFilePath],
											success: () => {
												uni.hideLoading()
											}
										})
									},
									fail: (res) => {
										uni.hideLoading()
										_.$api.msg('图片加载失败！')
									}
								})
							})
						},
						fail: (res) => {
							uni.hideLoading()
							_.$api.msg('图片加载失败！')
						}
					})
				}).catch(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #f5f5f5;
	}

	.top-part {
		position: relative;
		width: 100%;
		height: 370upx;
		text-align: center;

		.tit {
			color: #fff;
			position: relative;
			padding-top: 60upx;
			z-index: 1;
			font-size: 28upx;
		}

		.num {
			position: relative;
			z-index: 1;
			margin-top: 30upx;
			color: #fff;
			font-size: 60upx;
		}

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 370upx;
		}
	}

	.center-part {
		position: relative;
		z-index: 2;
		margin: -80upx 32upx 0;
		border-radius: 20upx;
		background: #fff;
		box-shadow: 0px 12upx 18upx 2upx rgba(0, 0, 0, 0.1);
		padding: 30upx 30upx 10upx;

		.top-name {
			display: flex;
			align-items: center;
			line-height: 40upx;

			.tit {
				flex: 1;
				font-size: 32upx;
			}

			.cell-tip {
				font-size: 24upx;
				color: $font-color-base;
			}

			.cell-more {
				align-self: center;
				font-size: 24upx;
				color: $font-color-base;
				margin-left: 10upx;
			}
		}

		.list {
			.item {
				border-bottom: 1upx solid rgba(242, 242, 242, 1);
				padding: 28upx 50upx 30upx;
				position: relative;

				.top {
					display: flex;
					align-items: center;

					.type {
						flex: 1;
						font-size: 28upx;
						position: relative;

						&::before {
							content: ' ';
							position: absolute;
							width: 8upx;
							height: 8upx;
							border-radius: 50%;
							background: #000;
							left: -30upx;
							top: 50%;
							margin-top: -4upx;
						}
					}

					.time {
						font-size: 24upx;
					}
				}

				.bot {
					margin-top: 20upx;
					font-size: 24upx;
					color: $font-color-light;

					.red {
						color: $base-color;
					}
				}

				&:last-child {
					border-bottom: none;
				}
			}
		}
	}

	.ic-box {
		margin: 40upx 32upx 0;
		border-radius: 10upx;
		background: #fff;

	}
</style>
