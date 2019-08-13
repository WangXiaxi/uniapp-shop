<template>
	<view class="content">
		<view class="goods-box-single">
			<image class="goods-img" :src="detail.image" mode="aspectFill"></image>
			<view class="right">
				<text class="title">{{detail.name}}</text>
			</view>
		</view>
		<view class="star-box">
			<view class="item">
				<view class="tit">满意度</view>
				<sunui-star @changeStar="changeStar" :defaultStar="point"></sunui-star>
			</view>
		</view>
		<view class="remark">
			<textarea class="text-area" v-model="remark" placeholder="写一写您的想法和评价，说一说这里的优点和特点。您的评价对其他人很有用，晒图更好哦！"
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
	</view>
</template>

<script>
	import sunuiStar from '@/components/sunui-star/sunui-star.vue'
	import orderModel from '../../api/order/index.js'
	import {
		url_base_image
	} from '../../common/config/index.js'
	export default {
		components: {
			sunuiStar
		},
		data() {
			return {
				loading: false,
				url_base_image,
				detail: {},
				remark: '',
				imageList: [],
				point: 5
			}
		},
		onLoad(option) {
			this.detail = JSON.parse(option.data)
		},
		methods: {
			confirm() { // 评论提交操作
				const {
					imageList,
					remark,
					point,
					detail: {
						id
					}
				} = this
				if (!remark) return this.$api.msg('请输入评价内容！')
				const sendData = {
					id,
					contents: remark,
					point,
					_imgList: imageList.join(',')
				}
				this.loading = true
				orderModel.getCommonDetail(sendData).then(res => {
					this.$api.msg('评价成功！', 1500, false, 'success')
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
			changeStar(data) {
				this.point = data.curStar
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
							title: '请稍后'
						})
						orderModel.uploadCommonImg(tempFilePaths[0]).then(res => {
							uni.hideLoading()
							this.$api.msg('图片上传成功！')
							this.imageList.push(res.data.img)
						}).catch(res => {
							uni.hideLoading()
						})
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

	.goods-box-single {
		display: flex;
		padding: 20upx 30upx;
		background: #fff;

		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}

		.right {
			position: relative;
			flex: 1;
			display: flex;
			align-items: center;
			padding: 0 0 0 24upx;
			width: 0;
		}

		.title {
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			line-height: 1.3;
		}
	}

	.star-box {
		padding-bottom: 20upx;
		background: #fff;
		font-size: 28upx;

		.item {
			display: flex;
			align-items: center;

			.tit {
				font-size: 26upx;
				width: 120upx;
				margin-left: 30upx;
			}
		}
	}

	.remark {
		margin-top: 20upx;
		background: #fff;
		padding: 30upx;

		.text-area {
			width: 100%;
			height: 200upx;
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
</style>
