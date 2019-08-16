<template>
	<view class="content">
		<view class="status" v-if="formData.status == '0'">系统审核中</view>
		<view class="status success" v-if="formData.status == '1'">审核已通过</view>
		<view class="status red" v-if="formData.status == '2'">系统已拒绝</view>
		
		<view class="row b-b">
			<text class="tit">真实姓名</text>
			<input class="input" :disabled="disabled" type="text" v-model="formData.real_name" placeholder="请输入真实姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">身份证号</text>
			<input class="input" type="text" :disabled="disabled" v-model="formData.id_num" placeholder="请输入身份证号" placeholder-class="placeholder" />
		</view>
		<view class="row-spec">
			<view class="tit">身份证号</view>
			<view class="card-img-box">
				<view class="card-img" :class="{ act: formData.front_img }" @click="changeHead('front_img')">
					<view class="info" v-if="!formData.front_img">
						<image src="../../static/icon/ad-j.png"></image>
						<view class="name">正面照片</view>
						<view class="tip">(文字清晰，字面齐全)</view>
					</view>
					<image v-else class="info-img" :src="`${url_base_image}/${formData.front_img}`"></image>
				</view>
				<view class="card-img" :class="{ act: formData.back_img }" @click="changeHead('back_img')">
					<view class="info" v-if="!formData.back_img">
						<image src="../../static/icon/ad-j.png"></image>
						<view class="name">反面照片</view>
						<view class="tip">(文字清晰，字面齐全)</view>
					</view>
					<image v-else class="info-img" :src="`${url_base_image}/${formData.back_img}`"></image>
				</view>
			</view>
			<view class="tips"><text>1.</text>格式为jpg/jpeg/png，且大小不得超过8MB！</view>
			<view class="tips"><text>2.</text>请认真仔细填写个人信息，审核通过后不可修改。</view>
		</view>
		<button v-if="!disabled && formData.status !== '2'" class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
		<button v-if="!disabled && formData.status === '2'" class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">重新提交</button>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import mineModel from '../../api/mine/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'

	import {
		url_base_image
	} from '../../common/config/index.js'
	import {
		mapGetters,
		mapActions
	} from 'vuex'
	const fields = {
		real_name: '',
		id_num: '',
		back_img: '',
		front_img: ''
	}

	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				pageLoading: false,
				disabled: true, // 用于编辑
				url_base_image,
				btnLoading: false,
				formData: JSON.parse(JSON.stringify(fields)),
				rules: {
					real_name: {
						required: true
					},
					id_num: {
						required: true
					},
					back_img: {
						required: true
					},
					front_img: {
						required: true
					}
				},
				messages: {
					real_name: {
						required: '请输入真实姓名！'
					},
					id_num: {
						required: '请输入身份证号！'
					},
					back_img: {
						required: '请上传身份证图片！'
					},
					front_img: {
						required: '请上传身份证图片！'
					}
				}
			}
		},
		computed: {
			...mapGetters(['userInfo']),
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			...mapActions(['getUserInfo']),
			loadData() {
				this.pageLoading = true
				mineModel.getRealNameInfo().then(res => {
					this.pageLoading = false
					if(res.data.id) {
						res.data.real_name = res.data.name
						Object.assign(this.formData, res.data)
						if (res.data.status == '2') {
							this.disabled = false
						}
					} else {
						this.disabled = false
					}
				}).catch(() => {
					this.pageLoading = false
				})
			},
			changeHead(str) { // 修改头像
				if(this.disabled) return
				uni.chooseImage({
					count: 1,
					sizeType: ['original'],
					success: (data) => {
						const tempFilePaths = data.tempFilePaths;
						uni.showLoading({
							title: '请稍后',
							mask: true
						})
						mineModel.uploadRealNamePhoto(tempFilePaths[0]).then(res => {
							uni.hideLoading()
							this.$api.msg('照片上传成功！')
							this.formData[str] = res.data.img
						}).catch(res => {
							uni.hideLoading()
						})
					}
				})
			},
			confirm() {
				const { rules, messages, formData } = this
				mineModel.initValidate(rules, messages)
				if (!mineModel.WxValidate.checkForm(formData)) return
				this.btnLoading = true
				mineModel.realNameSave(formData).then(res => {
					this.$api.msg('实名认证操作成功！', 1500)
					this.getUserInfo()
					setTimeout(() => {
						this.btnLoading = false
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.btnLoading = false
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.status {
		margin-top: -16upx;
		margin-bottom: 30upx;
		width: 100%;
		height: 80upx;
		background: #fdf6d6;
		color: #e2ccaa;
		font-size: 28upx;
		text-align: center;
		justify-content: center;
		display: flex;
		align-items: center;
		&.success {
			color: #67c23a;
			background: #f0f9eb;
		}
		&.red {
			color: #f56c6c;
			background: #fef0f0;
		}
	}
	.tips {
		font-size: 24upx;
		color: #999999;
		margin-bottom: 10upx;
		text {
			color: $base-color;
		}
	}
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 140upx;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 36upx;
			color: $font-color-light;
		}
	}

	.row-spec {
		position: relative;
		padding: 30upx 30upx;
		margin-top: 20upx;
		background: #fff;

		.tit {
			font-size: 30upx;
		}
	}

	.card-img-box {
		display: flex;
		margin-top: 24upx;
		margin-bottom: 24upx;
		.card-img {
			border: 1upx dashed #dfdfdf;
			text-align: center;
			flex: 1;
			width: 0;
			height: 240upx;
			border-radius: 20upx;
			&.act {
				border-width: 0;
			}
			.info-img {
				display: block;
				height: 238upx;
				width: 340upx;
			}
			.info {
				padding: 42upx 0;
				image {
					width: 68upx;
					height: 68upx;
				}
				.name {
					font-size: 26upx;
					line-height: 40upx;
				}
				.tip {
					font-size: 24upx;
					color: #999;
					line-height: 32upx;
				}
			}
		}

		.card-img+.card-img {
			margin-left: 10upx;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto 20upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.pass {
		float: right;
		font-size: 24upx;
		color: royalblue;
		margin-right: 30upx;
	}
</style>
