<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/bj.png"></image>
			<view class="tit">目前拥有股权</view>
			<view class="num">{{userInfo.fir_stocks}} / {{userInfo.sec_stocks}}</view>
		</view>
		<view class="center-part">
			<view class="top-name">
				<view class="tit">股权明细</view>
				<text class="cell-tip">更多</text>
				<text class="cell-more yticon icon-you"></text>
			</view>
			<view class="list">
				<view class="item">
					<view class="top">
						<view class="type">股权增加</view>
						<view class="time">2018:09:08 02:02</view>
					</view>
					<view class="bot">
						用户忆杭1[18877744754]增加500股权。
					</view>
				</view>
				<view class="item">
					<view class="top">
						<view class="type">股权增加</view>
						<view class="time">2018:09:08 02:02</view>
					</view>
					<view class="bot">
						用户忆杭1[18877744754]增加500股权。
					</view>
				</view>
				<view class="item">
					<view class="top">
						<view class="type">股权增加</view>
						<view class="time">2018:09:08 02:02</view>
					</view>
					<view class="bot">
						用户忆杭1[18877744754]增加500股权。
					</view>
				</view>
			</view>
		</view>
		<view class="ic-box">
			<list-cell image="qbdd" iconColor="#e07472" title="股权证书" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/mix-list-cell'
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

			};
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			navTo() {
			}
		}
	}
</script>

<style lang="scss">
	.top-part {
		position: relative;
		width: 100%;
		height: 460upx;
		text-align: center;

		.tit {
			color: #fff;
			position: relative;
			padding-top: 130upx;
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
			height: 460upx;
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
				}
				&:last-child {
					border-bottom: none;
				}
			}
		}
	}
	.ic-box {
		margin-top: 40upx;
	}
</style>
