<template>
	<view class="content">
		<view class="header">
			<image class="bg" src="/static/bj-bd.png"></image>
			<text class="title">{{ title }}</text>
		</view>

		<view class="main">
			<view class="list">
				<view class="item" v-for="(goods, index) in goodsList">
					<view class="image-wrapper"><image :src="goods.img" mode="aspectFill"></image></view>
					<view class="des-wrapper">
						<view class="tit">{{ goods.name }}</view>
						<text class="des">{{ goods.des }}</text>
						<button class="btn" type="warn" plain @click="buy(goods.id)">我要下单</button>
					</view>
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
			active_id: ''
		};
	},
	onLoad(options) {
		this.getData();
		this.active_id = options.active_id
	},
	methods: {
		...mapMutations(['setParams']),
		getData() {
			recommendModel
				.getPackageList({
					type: '2',
					ydui: true
				})
				.then(res => {
					const goodsList = res.data.map(e => {
						return {
							id: e.goods_id,
							name: e.name,
							des: e.description,
							img: `${url_image}/${e.img}`
						};
					});
					this.goodsList = goodsList;
				})
				.catch(() => {});
		},
		buy(id) {
			const sendData = {
				id,
				goods_num: 1,
				type: 'goods',
				origin: 'Ydui',
				active_id: this.active_id
			};
			orderModel
				.shopping(sendData)
				.then(res => {
					this.setParams(res.data);
					uni.navigateTo({
						url: `/pages/order/createOrder`
					});
				})
				.catch(() => {});
		}
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
				}
			}
		}
	}
}
</style>
