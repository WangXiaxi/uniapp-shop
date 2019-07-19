<template>
	<view class="container">
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400">
				<swiper-item class="swiper-item" v-for="(item,index) in imgList" :key="index">
					<view class="image-wrapper">
						<image :src="item.src" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>

		<view class="introduce-section">
			<text class="title">{{detail.name | fill}}</text>
			<view class="price-box">
				<text class="price-tip">¥</text>
				<text class="price">{{detail.sell_price | fill}}</text>
				<text class="m-price" v-if="!(Number(detail.sell_price) >= Number(detail.market_price))">¥{{detail.market_price | fill}}</text>
				<!-- <text class="coupon-tip">7折</text> -->
			</view>
			<view class="bot-row">
				<text>销量: {{detail.sale | fill}}</text>
				<text>库存: {{detail.store_nums | fill}}</text>
				<text>浏览量: {{detail.visit | fill}}</text>
			</view>
		</view>

		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
			
		</view> -->

		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec(0)" v-if="specArray.length">
				<text class="tit">购买类型</text>
				<view class="con">
					<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
						{{sItem.name}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<!-- <view class="c-row b-b">
				<text class="tit">优惠券</text>
				<text class="con t-r red">领取优惠券</text>
				<text class="yticon icon-you"></text>
			</view> -->
			<!-- <view class="c-row b-b">
				<text class="tit">促销活动</text>
				<view class="con-list">
					<text>新人首单送20元无门槛代金券</text>
					<text>订单满50减10</text>
					<text>订单满100减30</text>
					<text>单笔购买满两件免邮费</text>
				</view>
			</view> -->
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text>· 7天无理由退换货</text>
					<text>· 假一赔十 </text>
				</view>
			</view>
		</view>

		<!-- 评价 -->
		<!-- <view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>(86)</text>
				<text class="tip">好评率 100%</text>
				<text class="yticon icon-you"></text>
			</view>
			<view class="eva-box">
				<image class="portrait" src="http://img3.imgtn.bdimg.com/it/u=1150341365,1327279810&fm=26&gp=0.jpg" mode="aspectFill"></image>
				<view class="right">
					<text class="name">Leo yo</text>
					<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
					<view class="bot">
						<text class="attr">购买类型：XL 红色</text>
						<text class="time">2019-04-01 19:21</text>
					</view>
				</view>
			</view>
		</view> -->

		<view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc" class="img-text"></rich-text>
		</view>

		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/pages/cart/cart" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favoriteBoolean}" @click="toFavorite">
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>

			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="toggleSpec(1)">立即购买</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="toggleSpec(2)">加入购物车</button>
			</view>
		</view>


		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer attr-content" @click.stop="stopPrevent">
				<view class="a-t">
					<image :src="detail.img"></image>
					<view class="right">
						<text class="price">¥{{detail.sell_price | fill}}</text>
						<text class="stock">库存：{{detail.store_nums | fill}}</text>
						<view class="selected" v-if="specArray.length">
							已选：
							<text class="selected-text" v-for="(sItem, sIndex) in specSelected" :key="sIndex">
								{{sItem.name}}
							</text>
						</view>
					</view>
				</view>
				<scroll-view scroll-with-animation scroll-y class="attr-list-box">
					<view v-for="(item,index) in specArray" :key="index" class="attr-list">
						<text>{{item.name}}</text>
						<view class="item-list">
							<text v-for="(childItem, childIndex) in item.values" :key="childIndex" class="tit" :class="{selected: childItem.selected}"
							 @click="selectSpec(childItem, item.values)">
								{{childItem.name}}
							</text>
						</view>
					</view>
					<view class="attr-num">
						<text class="num-tit">数量</text>
						<uni-number-box class="step" :min="1" :max="Number(detail.store_nums)" :value="goods_num>Number(detail.store_nums)?Number(detail.store_nums):goods_num"
						 :isMax="goods_num>=Number(detail.store_nums)?true:false" :isMin="goods_num===1" @eventChange="numberChange"></uni-number-box>
					</view>
				</scroll-view>
				<view class="action-btn-group" :class="{ spec: !!showBtn }">
					<button v-if="showBtn !== 2" :disabled="btnLoading" :loading="btnLoading" class="action-btn no-border buy-now-btn spec"
					 @click="buy(2)">立即购买</button>
					<button v-if="showBtn !== 1" :disabled="btnLoading" :loading="btnLoading" class="action-btn no-border add-cart-btn spec"
					 @click="buy(1)">加入购物车</button>
				</view>
			</view>
		</view>
		<!-- 分享 -->
		<!-- <share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share> -->
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	// import share from '@/components/share';
	import productModel from '../../api/product/index.js'
	import uniNumberBox from '@/components/uni-number-box.vue'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	import {
		url_image
	} from '../../common/config/index.js'
	export default {
		components: {
			// share,
			uniNumberBox,
			mixLoading
		},
		data() {
			return {
				pageLoading: false,
				btnLoading: false, // 按钮点击
				showBtn: 0, // 点击显示购物车还是立即购买或是都显示 0 全部 1 立即购买 2 加入购物车
				isCheck: true, // 默认商品允许提交
				type: 'goods', // 类型
				goods_num: 1, // 数量
				goodsId: this.$route.query.id, // id
				detail: {
					store_nums: 1
				}, // 基础
				specArray: [], // 属性列表
				skus: [], // 属性匹配
				specClass: 'none', // 属性下拉显示
				specSelected: [], // 选中属性列表
				favoriteBoolean: false,
				// shareList: [],
				imgList: [],
				desc: ''
			}
		},
		async onLoad(options) {
			this.getDetail()
			// this.shareList = await this.$api.json('shareList');
		},
		computed: {
			...mapGetters(['hasLogin', 'favorite'])
		},
		methods: {
			...mapActions(['goodsFavoriteEdit', 'goLogin']),
			//数量
			numberChange(data) {
				this.goods_num = data.number
			},
			// 获取商品明细
			getDetail() {
				this.pageLoading = true
				productModel.bothProducts({
					ydui: true,
					id: this.goodsId
				}).then(res => {
					const {
						photo,
						spec_array,
						skus
					} = res.data
					// 基础信息赋值
					this.detail = res.data
					// 图片赋值
					this.imgList = photo.map(c => {
						return {
							src: `${url_image}/${c.img}`
						}
					})
					this.detail.img = `${url_image}/${this.detail.img}`
					this.desc = this.detail.content.replace(/src="\/upload/g,
						`src="${url_image}/upload/`).replace(/style\s*?=\s*?([‘"])[\s\S]*?\1/g, '').replace(/<img/g,
						'<img width="100%"')
					// 规格种类
					if (spec_array) { // 存在说明有规格
						this.type = 'products' // 有规格说明是商品
						this.isCheck = false
						const specObj = JSON.parse(spec_array)
						this.specArray = Object.keys(specObj).map(c => {
							specObj[c].values = specObj[c].value.split(',').map(j => {
								return {
									selected: false,
									name: j
								}
							})
							return specObj[c]
						})
						// 规格对应价格等
						this.skus = skus.map(c => {
							c.spec_array = JSON.parse(c.spec_array)
							return c
						})
					}
					this.pageLoading = false
				}).catch(() => {
					this.pageLoading = false
				})
			},
			//规格弹窗开关
			toggleSpec(type) {
				if (this.specClass === 'show') {
					this.specClass = 'hide'
					setTimeout(() => {
						this.specClass = 'none'
					}, 250)
				} else if (this.specClass === 'none') {
					this.specClass = 'show'
					this.showBtn = type
				}
			},

			// 立即购买 or 加入购物车
			buy(typeAct) {
				if (this.specSelected.length !== this.specArray.length) return this.$api.msg('请选择规格！')
				const {
					detail: {
						id: goods_id
					},
					goods_num,
					type
				} = this
				const sendData = {
					goods_id,
					goods_num,
					type
				}
				this.btnLoading = true
				switch (typeAct) {
					case 1: // 加入购物车
						productModel.joinCart(sendData).then(() => {
							this.btnLoading = false
							this.$api.msg('加入购物车成功！', 1500, false, 'success')
							this.toggleSpec()
						}).catch(() => {
							this.btnLoading = false
						})
						break
					case 2: // 立即购买
						this.toggleSpec()
						uni.navigateTo({
							url: `/pages/order/createOrder`
						})
						break
				}
			},

			//选择规格
			selectSpec(cur, parent) {
				// 设置选中
				parent.forEach(c => {
					c.selected = c.name === cur.name
				})
				// 查出selected
				const selectedList = []
				this.specArray.forEach(c => {
					const cur = c.values.find(c => c.selected)
					if (cur) selectedList.push({
						id: c.id,
						name: cur.name
					})
				})
				this.specSelected = selectedList
				// 计算出使用哪一个 skus
				if (this.specSelected.length !== this.specArray.length) return // 规格全选中在进行匹配
				this.goods_num = 1
				this.isCheck = true // 选择后 不允许取消 所以就是可以提交状态
				const spS = this.specSelected
				const lenS = spS.length
				const {
					sell_price,
					market_price,
					store_nums,
					id
				} = this.skus.find(c => {
					const csp = c.spec_array
					const len = csp.length
					for (let i = 0; i < len; i++) {
						for (let j = 0; j < lenS; j++) {
							if (spS[j].id === csp[i].id) {
								if (spS[j].name !== csp[i].value) {
									return false // 只要id 相同 值不同说明匹配不上 直接 结束
								}
							}
						}
					}
					return true
				})
				Object.assign(this.detail, {
					sell_price,
					market_price,
					store_nums,
					id
				})
			},
			//分享
			// share() {
			// 	this.$refs.share.toggleMask();
			// },
			//收藏
			toFavorite() {
				this.goLogin(() => {
					this.favoriteBoolean = !this.favoriteBoolean
					this.goodsFavoriteEdit({ goods_id: this.goodsId })
				})
			},
			stopPrevent() {}
		},
		watch: {
			favorite: {
				handler(v) {
					if (v) this.favoriteBoolean = v.findIndex(c => c === this.goodsId) > -1
				},
				immediate: true
			}
		},
	}
</script>

<style lang='scss'>
	.img-text {
		font-size: 0;
	}

	page {
		background: $page-color-base;
		padding-bottom: 160upx;
	}

	.icon-you {
		font-size: $font-base + 2upx;
		color: #888;
	}

	.carousel {
		height: 722upx;
		position: relative;

		swiper {
			height: 100%;
		}

		.image-wrapper {
			width: 100%;
			height: 100%;
		}

		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	/* 标题简介 */
	.introduce-section {
		background: #fff;
		padding: 20upx 30upx;

		.title {
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}

		.price-box {
			display: flex;
			align-items: baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color: $uni-color-primary;
		}

		.price {
			font-size: $font-lg + 2upx;
		}

		.m-price {
			margin: 0 12upx;
			color: $font-color-light;
			text-decoration: line-through;
		}

		.coupon-tip {
			align-items: center;
			padding: 4upx 10upx;
			background: $uni-color-primary;
			font-size: $font-sm;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx);
		}

		.bot-row {
			display: flex;
			align-items: center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;

			text {
				flex: 1;
			}
		}
	}

	/* 分享 */
	.share-section {
		display: flex;
		align-items: center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;

		.share-icon {
			display: flex;
			align-items: center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position: relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;

			&:after {
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position: absolute;
				background: $uni-color-primary;
			}
		}

		.icon-xingxing {
			position: relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}

		.tit {
			font-size: $font-base;
			margin-left: 10upx;
		}

		.icon-bangzhu1 {
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}

		.share-btn {
			flex: 1;
			text-align: right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}

		.icon-you {
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}

	.attr-list-box {
		overflow: hidden;
		max-height: 60vh;
		min-height: 23vh;
	}

	.c-list {
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;

		.c-row {
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			position: relative;
		}

		.tit {
			width: 140upx;
		}

		.con {
			flex: 1;
			color: $font-color-dark;

			.selected-text {
				margin-right: 10upx;
			}
		}

		.bz-list {
			height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;

			text {
				display: inline-block;
				margin-right: 30upx;
			}
		}

		.con-list {
			flex: 1;
			display: flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}

		.red {
			color: $uni-color-primary;
		}
	}

	/* 评价 */
	.eva-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;

		.e-header {
			display: flex;
			align-items: center;
			height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.tit {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
			}

			.tip {
				flex: 1;
				text-align: right;
			}

			.icon-you {
				margin-left: 10upx;
			}
		}
	}

	.eva-box {
		display: flex;
		padding: 20upx 0;

		.portrait {
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;

			.con {
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}

			.bot {
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}

	/*  详情 */
	.detail-desc {
		background: #fff;
		margin-top: 16upx;

		.d-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;

			text {
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}

			&:after {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc;
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
				;
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

		.attr-list {
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}

		.attr-num {
			display: flex;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
			align-items: center;

			.uni-numbox {
				left: 0;
				position: relative;
			}

			.num-tit {
				flex: 1;
			}
		}

		.item-list {
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;

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

	/* 底部操作菜单 */
	.page-bottom {
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 690upx;
		height: 100upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.p-b-btn {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width: 96upx;
			height: 80upx;

			.yticon {
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}

			&.active,
			&.active .yticon {
				color: $uni-color-primary;
			}

			.icon-fenxiang2 {
				font-size: 42upx;
				transform: translateY(-2upx);
			}

			.icon-shoucang {
				font-size: 46upx;
			}
		}


	}

	.action-btn-group {
		display: flex;
		height: 76upx;
		border-radius: 100px;
		overflow: hidden;
		box-shadow: 0 20upx 40upx -16upx #fa436a;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		background: linear-gradient(to right, #ffac30, #fa436a, #F56C6C);
		margin-left: 20upx;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translateY(-50%);
			height: 28upx;
			width: 0;
			border-right: 1px solid rgba(255, 255, 255, .5);
		}

		&.spec:after {
			display: none;
		}

		.action-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 180upx;
			height: 100%;
			font-size: $font-base;
			padding: 0;
			border-radius: 0;
			background: transparent;
			color: #fff;

			&[disabled] {
				background: transparent;
				color: #fff;
			}
		}

		.spec {
			flex: 1;
		}
	}
</style>
