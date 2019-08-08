<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="tit">目前拥有股权</view>
			<view class="num">{{userInfo.fir_stocks !== '0' ? `${userInfo.fir_stocks} / ` : ''}}{{userInfo.sec_stocks}}</view>
		</view>
		<view class="center-part">
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
		<view class="ic-box">
			<list-cell image="qbdd" iconColor="#e07472" title="股权证书" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
		</view>
		<canvas style="width: 978px; height: 686px;" canvas-id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell'
	import stockModel from '../../../api/stock/index.js'

	import {  
        mapGetters,
		mapActions
    } from 'vuex';  
	export default {
		components: {
			listCell
		},
		data() {
			return {
				list: []
			};
		},
		onLoad() {
			this.loadData()
			this.createdCanvas()
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			loadData() {
				stockModel.getUcenterStocksLog({ page: 1, limit: 3 }).then(res => {
					this.list = res.data.data
				})
			},
			navTo(url) {
				uni.navigateTo({  
					url
				})
			},
			createdCanvas() {
				const context = uni.createCanvasContext('firstCanvas')
				uni.downloadFile({
					url: '/static/book.png',
					success(res) {
						context.drawImage(res.tempFilePath, 0, 0, 0)
						context.draw()
						ctx.setFontSize(20)
						ctx.setFillStyle('black')
						ctx.fillText('0', 165, 78)
					}
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
