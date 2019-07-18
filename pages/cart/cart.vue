<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>
			<view v-else class="empty-tips">
				请登陆后查看购物车
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.img" class="loaded" mode="aspectFill"></image>
							<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.isCheck}" @click="check('item', item)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.name}}</text>
							<text class="attr">{{item.attr_val}}</text>
							<text class="price">¥{{item.sell_price}}</text>
							<uni-number-box class="step" :min="1" :max="Number(item.store_nums)" :value="item.count>Number(item.store_nums)?Number(item.store_nums):item.count"
							 :isMax="item.count>=Number(item.store_nums)?true:false" :isMin="item.count===1" :index="index" @eventChange="numberChange"></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(item)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{final_sum | nf}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import uniNumberBox from '@/components/uni-number-box.vue'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'

	export default {
		components: {
			uniNumberBox,
			mixLoading
		},
		data() {
			return {
				pageLoading: false,
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: []
			};
		},
		onShow() {
			this.mixLoading = true
			this.getData()
		},
		watch: {
			// 监听赋值
			cart_list(e) {
				const len = e.length
				this.cartList = JSON.parse(JSON.stringify(e))
				this.allChecked = len !== 0 && e.findIndex(c => !c.isCheck) === -1
				this.empty = !len
			}
		},
		computed: {
			...mapGetters(['hasLogin', 'cart_list', 'final_sum', 'cart_count'])
		},
		methods: {
			...mapActions(['getCartInfo', 'removeCart', 'exceptCartGoods']),
			getData() { // 获取数据
				this.pageLoading = true
				this.getCartInfo().then(() => {
					this.pageLoading = false
				}).catch(() => {
					this.pageLoading = false
				})
			},
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			check(type, item) {
				this.pageLoading = true
				const sendData = {}
				const list = this.cartList
				if (type === 'item') {
					item.isCheck = !item.isCheck
					const {
						goods_id,
						product_id
					} = item
					sendData.data = list.filter(c=> !c.isCheck).map(c => `${goods_id}_${product_id}`)
				} else { // 全选 or 全不选
					const checked = !this.allChecked
					this.allChecked = checked
					sendData.data = list.map(c => {
						c.isCheck = checked
						const {
							goods_id,
							product_id
						} = c
						return `${goods_id}_${product_id}`
					})
					if (checked) {
						sendData.data = []
					}
				}
				this.exceptCartGoods(sendData).then(this.getData).catch(() => {
					this.pageLoading = false
				})
			},
			//数量
			numberChange(data) {},
			//删除
			deleteCartItem(data) {
				const {
					spec_array,
					product_id,
					goods_id
				} = data
				const sendData = {
					type: 'goods',
					goods_id
				}
				if (spec_array) {
					Object.assign(sendData, {
						type: 'products',
						goods_id: product_id
					})
				}
				this.pageLoading = true
				this.removeCart(sendData).then(this.getData).catch(() => {
					this.pageLoading = false
				})
			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal() {},
			//创建订单
			createOrder() {
				uni.navigateTo({
					url: `/pages/order/createOrder?data=${JSON.stringify({
						goodsData: goodsData
					})}`
				})
				this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		.image-wrapper {
			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
			}
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
