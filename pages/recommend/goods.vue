<template>
	<view class="content">
		<view class="header">
			<image class="bg" src="/static/bj-bd.png"></image>
			<text class="title">{{ title }}</text>
		</view>

		<view class="main">
			<view class="list">
				<view class="item" v-for="(goods, index) in goodsList" :key="index">
					<view class="image-wrapper"><image :src="goods.img" mode="aspectFill"></image></view>
					<view class="des-wrapper">
						<view class="tit">{{ goods.name }}</view>
						<text class="des">{{ goods.des }}</text>
						<view class="btn" @click="chooseGift(goods.id)">我要下单</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="giftState.class" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="curGift.img"></image>
					<view class="right">
						<view class="selected" v-if="giftList.length">
							已选：
							<text class="selected-text">{{ curGift.name }}</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-with-animation scroll-y>
					<view class="attr-list-box">
						<view v-for="(item, index) in giftList" :key="index" class="attr-list">
							<text :class="{ selected: index == giftState.selectIndex }" @click="toggleGift(item, index)">{{ item.name }}</text>
						</view>
					</view>
				</scroll-view>
				<view class="action-btn-group spec">
					<button :disabled="giftState.loading" :loading="giftState.loading" class="action-btn no-border buy-now-btn spec" @click="buy()">确定</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import recommendModel from '../../api/recommend/index.js';
import orderModel from '../../api/order/index.js';
import { url_image } from '../../common/config/index.js';

import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
	data() {
		return {
			title: '任意搭配都是好滋味',
			goodsList: [],
			giftList: [],
			active_id: '',
			giftState: {
				loading: false,
				class: 'none',
				selectIndex: 0
			},
			curGift: {
				id: '',
				name: '',
				img: ''
			},
			postData: {
				goods_num: 1,
				type: 'goods',
				origin: 'Ydui',
				vgoods_type: '2', // 要获取的商品类型，默认2是报单商品，5是买商品送航旅通的商品
			},
		};
	},
	onLoad(options) {
		if (options.vgoods_type) this.postData.vgoods_type = options.vgoods_type;
		if (options.active_id) this.postData.active_id = options.active_id;
		if (options.tips) this.title = options.tips;
		this.getData();
	},
	methods: {
		...mapMutations(['setParams']),
		getData() {
			Promise.all([
				recommendModel.getPackageList({
					type: this.postData.vgoods_type,
					ydui: true
				}),
				recommendModel.getPackageList({
					type: '3',
					ydui: true
				})
			])
				.then(res => {
					const finalRes = res.reduce((finalList, item) => {
						finalList.push(
							item.data.map(e => {
								return {
									id: e.goods_id,
									name: e.name,
									des: e.description,
									img: `${url_image}/${e.img}`
								};
							})
						);
						return finalList;
					}, []);

					const [goodsRes, giftRes] = finalRes;
					this.goodsList = goodsRes;
					this.giftList = giftRes;
					this.curGift = giftRes[0];
				})
				.catch(() => {});
		},

		chooseGift(id) {
			this.giftState.class = 'show';
			this.postData.id = id;
		},

		buy() {
			const sendData = Object.assign(this.postData, {
				gift_id: this.curGift.id
			});
			orderModel
				.shopping(sendData)
				.then(res => {
					this.setParams(res.data);
					uni.navigateTo({
						url: `/pages/order/createOrder`
					});
				})
				.catch(() => {});
		},

		//规格弹窗开关
		toggleSpec(type) {
			if (this.giftState.class === 'show') {
				this.giftState.class = 'hide';
				setTimeout(() => {
					this.giftState.class = 'none';
				}, 250);
			} else if (this.giftState.class === 'none') {
				this.giftState.class = 'show';
			}
		},

		toggleGift(item, index) {
			this.$set(this.giftState, 'selectIndex', index);
			this.curGift = item;
		},

		stopPrevent() {}
	}
};
</script>

<style lang="scss">
.header {
	height: 314upx;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 314upx;
	}
	.title {
		position: absolute;
		top: 167upx;
		left: 0;
		z-index: 9;
		width: 100%;
		text-align: center;
		font-size: 44upx;
		color: #fff;
		text-shadow: 0px 4upx 0px rgba(0, 0, 0, 0.3);
	}
}
.main {
	background: #fff;
	padding: 32upx;
	border-radius: 12upx;
	.list {
		.item {
			display: flex;
			margin-bottom: 32upx;
			.image-wrapper {
				width: 240upx;
				height: 240upx;
				border-radius: 3px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.des-wrapper {
				margin-left: 32upx;
				position: relative;
				flex: 1;
				.tit {
					font-size: 32upx;
				}
				.des {
					font-size: 26upx;
					color: #666;
				}
				.btn {
					position: absolute;
					bottom: 0;
					right: 0;
					font-size: 26upx;
					width: 170upx;
					height: 66upx;
					color: $base-color;
					background: #fbebee;
					border: 1upx solid #fbebee;
					border-radius: 8upx;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
}

/* 规格选择弹窗 */
.attr-content {
	padding: 10upx 30upx;

	.a-t {
		display: flex;

		image {
			width: 170upx;
			height: 170upx;
			flex-shrink: 0;
			margin-top: -40upx;
			border-radius: 8upx;
		}

		.right {
			display: flex;
			flex-direction: column;
			padding-left: 24upx;
			font-size: $font-sm + 2upx;
			color: $font-color-base;
			line-height: 42upx;

			.price {
				font-size: $font-lg;
				color: $uni-color-primary;
				margin-bottom: 10upx;
			}

			.selected-text {
				margin-right: 10upx;
			}
		}
	}

	.attr-list-box {
		display: flex;
		flex-wrap: wrap;
		padding-top: 20upx;
	}

	.attr-list {
		font-size: $font-base + 2upx;
		color: $font-color-base;
		padding-top: 20upx;
		text {
			display: flex;
			align-items: center;
			justify-content: center;
			background: #eee;
			margin-right: 20upx;
			margin-bottom: 20upx;
			border-radius: 100upx;
			min-width: 60upx;
			height: 60upx;
			padding: 0 20upx;
			font-size: $font-base;
			color: $font-color-dark;
		}
		.selected {
			background: #fbebee;
			color: $uni-color-primary;
		}
	}
}

/*  弹出层 */
.popup {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 99;

	&.show {
		display: block;

		.mask {
			animation: showPopup 0.2s linear both;
		}

		.layer {
			animation: showLayer 0.2s linear both;
		}
	}

	&.hide {
		.mask {
			animation: hidePopup 0.2s linear both;
		}

		.layer {
			animation: hideLayer 0.2s linear both;
		}
	}

	&.none {
		display: none;
	}

	.mask {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.layer {
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		min-height: 40vh;
		border-radius: 10upx 10upx 0 0;
		background-color: #fff;

		.btn {
			height: 66upx;
			line-height: 66upx;
			border-radius: 100upx;
			background: $uni-color-primary;
			font-size: $font-base + 2upx;
			color: #fff;
			margin: 30upx auto 20upx;
		}

		.action-btn-group {
			margin: 30upx auto 20upx;
		}
	}

	@keyframes showPopup {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes hidePopup {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	@keyframes showLayer {
		0% {
			transform: translateY(120%);
		}

		100% {
			transform: translateY(0%);
		}
	}

	@keyframes hideLayer {
		0% {
			transform: translateY(0);
		}

		100% {
			transform: translateY(120%);
		}
	}
}
</style>
