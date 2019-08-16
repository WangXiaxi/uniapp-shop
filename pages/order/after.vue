<template>
	<view class="content">
		<view class="goods-section">
			<view class="goods-box-single" v-for="(goodsItem, goodsIndex) in detail.goods" :key="goodsIndex" @click="chooseGoodAct(goodsItem.goods_id)">
				<image class="goods-img" :src="goodsItem.img" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.goods_array.name}}</text>
					<text class="attr-box">{{goodsItem.goods_array.value}} x {{goodsItem.goods_nums}}</text>
					<text class="price">{{goodsItem.goods_price}}</text>
				</view>
				<view class="choose" :class="{ act: chooseGood.indexOf(goodsItem.goods_id) > -1 }"></view>
			</view>
		</view>
		<view class="info-box">
			<view class="tip-title">
				售后类型
			</view>
			<view class="spec-list">
				<view class="item" :class="{ act: item.key === type }" v-for="(item, index) in options" :key="index" @click="chooseType(item)">
					{{item.label}}
				</view>
			</view>
		</view>
		<view class="remark">
			<textarea class="text-area" v-model="remark" placeholder="请填写售后原因并上传上传售后原因图片~"
			 placeholder-class="placeholder"></textarea>
			<view class="image-box">
				<image class="img" v-for="(item, index) in imageList" :src="`${url_base_image}/${item}`" :key="index" @longtap="dele(index)"></image>
				<view class="img-add" @click="addImage">
					<image class="icon" src="../../static/icon/photo.png"></image>
					<view class="t">上传照片</view>
				</view>
			</view>
		</view>
		<button class="add-btn" @click="confirm" :loading="loading" :disabled="loading">提交</button>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import orderModel from '../../api/order/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import {
		url_image,
		url_base_image
	} from '../../common/config/index.js'
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				url_base_image,
				id: '',
				loading: false,
				pageLoading: false,
				detail: {
					goods: []
				},
				options: [{
						'label': '退款',
						key: 'refundment'
					},
					{
						'label': '换货',
						key: 'exchange'
					},
					{
						'label': '维修',
						key: 'fix'
					}
				],
				type: '',
				remark: '',
				imageList: [],
				chooseGood: [],
				rules: {
					order_goods_id: {
						required: true
					},
					type: {
						required: true
					},
					content: {
						required: true
					},
					_imgList: {
						required: true
					}
				},
				messages: {
					order_goods_id: {
						required: '请选择需要售后商品！'
					},
					type: {
						required: '请选择售后类型！'
					},
					content: {
						required: '请填写售后原因！'
					},
					_imgList: {
						required: '请上传图片！'
					}
				}
			}
		},
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			chooseGoodAct(id) { // 选择商品操作
				const index = this.chooseGood.indexOf(id)
				if (index > -1) {
					this.chooseGood.splice(index, 1)
				} else {
					this.chooseGood.push(id)
				}
			},
			chooseType(item) {
				this.type = item.key
			},
			confirm() { // 提交操作
				const { rules, messages, type, remark, imageList, chooseGood } = this
				const sendData = { order_id: this.id, order_goods_id: chooseGood.join(','), content: remark, _imgList: imageList.join(','), type }
				orderModel.initValidate(rules, messages)
				if (!orderModel.WxValidate.checkForm(sendData)) return
				this.loading = true
				orderModel.updateRefunds(sendData).then(res => {
					this.$api.msg('售后申请成功！', 1500, false, 'success')
					if (this.$api.prePage()) {
						this.$api.prePage().loadData('refresh')
					}
					setTimeout(() => {
						this.loading = false
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.loading = false
				})
			},
			dele(index) { // 删除选中
				uni.showModal({
					title: '提示',
					content: '确认删除当前图片吗？',
					success: (e) => {
						if (e.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})
			},
			addImage() { // 添加图片操作
				const len = this.imageList.length
				if (len === 5) {
					return this.$api.msg('最多上传5张图片！')
				}
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (data) => {
						const tempFilePaths = data.tempFilePaths;
						uni.showLoading({
							title: '请稍后',
							mask: true
						})
						orderModel.uploadRefundsImg(tempFilePaths[0]).then(res => {
							uni.hideLoading()
							this.$api.msg('图片上传成功！')
							this.imageList.push(res.data.img)
						}).catch(res => {
							uni.hideLoading()
						})
					}
				})
			},
			getDetail() {
				this.pageLoading = true
				orderModel.getOrderDetail({
					id: this.id
				}).then(res => {
					res.data.goods = res.data.goods.map(c => {
						c.img = `${url_image}/${c.img}`
						c.goods_array = JSON.parse(c.goods_array)
						return c
					})
					this.detail = res.data
					this.pageLoading = false
				}).catch(() => {
					this.pageLoading = false
				})
			}
		},
	}
</script>

<style lang="scss">
	.goods-section {
		padding: 0 30upx;
		background: #fff;
		margin-top: 30upx;
	}

	.remark {
		margin-top: 20upx;
		background: #fff;
		padding: 30upx;

		.text-area {
			width: 100%;
			height: 200upx;
			font-size: 28upx;
		}

		.image-box {
			overflow: hidden;

			.img {
				width: 126upx;
				height: 126upx;
				float: left;
				margin-right: 20upx;
				margin-bottom: 20upx;
			}

			.img-add {
				width: 126upx;
				height: 126upx;
				border: 1upx dashed #dedede;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				float: left;

				.icon {
					width: 48upx;
					height: 39upx;
				}

				.t {
					font-size: 24upx;
					margin-top: 10upx;
					color: #999;
				}
			}
		}
	}

	.info-box {
		position: relative;
		z-index: 2;
		margin: 30upx 0 0;
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

	.choose {
		width: 40upx;
		height: 40upx;
		border: 1upx solid #dedede;
		border-radius: 5upx;

		&.act {
			border-color: $base-color;
			display: flex;
			justify-content: center;
			align-items: center;

			&::before {
				content: ' ';
				display: block;
				width: 24upx;
				height: 24upx;
				background: $base-color;
				border-radius: 3upx;
			}
		}
	}

	.goods-box-single {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20upx 0;

		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}

		.right {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;

			.eval-btn {
				padding: 10upx 20upx;
				display: flex;
				justify-content: center;
				align-items: center;
				color: $base-color;
				border: 1upx solid $base-color;
				border-radius: 30upx;
				font-size: 28upx;
				position: absolute;
				right: 0;
				bottom: 0;

				&.grey {
					border-color: #dedede;
					color: #999;
				}
			}

			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}

			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}

			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}
</style>
