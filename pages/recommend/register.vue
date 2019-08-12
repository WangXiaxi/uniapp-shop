<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="cur">当前身份：普通会员（{{userName}}）</view>
		</view>
		<view class="info-box">
			<view class="row b-b">
				<text class="tit">收件人</text>
				<input class="input" type="text" v-model="formData.accept_name" placeholder="请输入收件人" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">联系方式</text>
				<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">选择地址</text>
				<text @click="chooseCity" class="input">
					{{region.label}}
				</text>
				<text class="yticon icon-shouhuodizhi"></text>
			</view>
			<view class="row b-b spec">
				<text class="tit">详细地址</text>
				<textarea class="text-area" v-model="formData.address" placeholder="请输入详细地址信息，如道路、门牌号、小 区、楼号、单元等等。 "
				 placeholder-class="placeholder"></textarea>
			</view>
		</view>
		<view class="info-box">
			<view class="tip-title">
				我要开通
			</view>
			<view class="spec-list">
				<view class="item" :class="{ act: item.active_amount === formData.amount }" v-for="(item, index) in amountOptions"
				 :key="index" @click="chooseAmount(item)">
					{{item.agent_show}}
				</view>
			</view>
			<view class="tip-title">
				配送方式
			</view>
			<view class="spec-list">
				<view class="item" :class="{ act: item.key === formData.distribution }" v-for="(item, index) in distributionOptions"
				 :key="index" @click="chooseDis(item)">
					{{item.label}}
				</view>
			</view>
			<view class="pay b-t">
				<view class="tit">支付金额</view>
				<view class="red">￥{{ formData.amount | nf }}</view>
			</view>
		</view>

		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel"
		 @onConfirm="onConfirm"></mpvue-city-picker>
		<mix-loading v-if="pageLoading"></mix-loading>
		<pay-password :show="show" @close="close" @success="success"></pay-password>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import recommendModel from '../../api/recommend/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import payPassword from '../../components/pay_Password.vue'
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	const fields = {
		active_id: '',
		amount: '',
		payment: '1',
		accept_name: '',
		mobile: '',
		address: '',
		distribution: '1',
		province: '',
		city: '',
		area: ''
	}

	export default {
		components: {
			mpvueCityPicker,
			mixLoading,
			payPassword
		},
		data() {
			return {
				show: false,
				userName: '',
				pageLoading: false,
				amountOptions: [],
				distributionOptions: [{
						label: '自提',
						key: '1'
					},
					{
						label: '物流',
						key: '2'
					}
				],
				btnLoading: false,
				formData: JSON.parse(JSON.stringify(fields)),
				cityPickerValue: [0, 0, 0],
				themeColor: '#ea1212',
				region: {
					label: '请点击选择地址',
					value: [],
					code: []
				},
				rules: {
					accept_name: {
						required: true
					},
					mobile: {
						required: true
					},
					address: {
						required: true
					},
					area: {
						required: true
					}
				},
				messages: {
					accept_name: {
						required: '请输入收件人姓名！'
					},
					mobile: {
						required: '请输入手机号！'
					},
					address: {
						required: '请输入详细地址！'
					},
					area: {
						required: '请选择收件地址！'
					}
				}
			}
		},
		onLoad(option) {
			this.loadData()
			if (option.data) {
				const data = JSON.parse(option.data)
				this.formData.active_id = data.id
				this.userName = data.username
			} else {
				this.formData.active_id = this.userInfo.id
				this.userName = this.userInfo.username
			}
		},
		onBackPress() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel();
				return true;
			}
		},
		onUnload() {
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		methods: {
			...mapActions(['getUserInfo']),
			chooseAmount(item) {
				this.formData.amount = item.active_amount
			},
			chooseDis(item) {
				this.formData.distribution = item.key
			},
			close() { // 关闭支付
				this.show = false
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
			loadData() {
				this.pageLoading = true
				recommendModel.getBecomVipAmount().then(res => {
					this.pageLoading = false
					this.amountOptions = res.data.map(c => {
						if (!c.agent_show) {
							c.agent_show = c.level_show
						}
						return c
					})
					this.formData.amount = this.amountOptions[0].active_amount
				}).catch(() => {
					this.pageLoading = false
				})
			},
			confirm() {
				const {
					rules,
					messages
				} = this
				const {
					active_id,
					amount,
					payment,
					accept_name,
					mobile,
					address,
					distribution
				} = this.formData;
				const [province, city, area] = this.region.code
				const sendData = {
					active_id,
					amount,
					payment,
					accept_name,
					mobile,
					address,
					distribution,
					province,
					city,
					area
				}
				recommendModel.initValidate(rules, messages)
				if (!recommendModel.WxValidate.checkForm(sendData)) return
				if (Number(sendData.amount) > Number(this.userInfo.remain_balance)) {
					uni.showModal({
						title: '提示',
						content: '余额不足，前去充值？',
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/money/invest'
								})
							}
						}
					})
					return
				}
				this.show = true
				this.sendData = sendData
			},
			success(password) { // 支付密码输入后提交
				this.close()
				this.btnLoading = true
				this.sendData.password = password
				recommendModel.activateMember(this.sendData).then(res => {
					this.$api.msg('激活用户成功')
					if (this.$api.prePage()) {
						this.$api.prePage().loadData('refresh')
					}
					this.getUserInfo()
					setTimeout(() => {
						this.btnLoading = false
						uni.navigateBack()
					}, 1500)
				}).catch(() => {
					this.btnLoading = false
				})
			}
		},
	}
</script>

<style lang='scss'>
	page {
		background: $page-color-base;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 0upx;
		height: 90upx;
		background: #fff;

		&.spec {
			height: auto;

			.text-area {
				height: 110upx;
				padding: 20upx 0;
				font-size: 30upx;
			}
		}

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

	.top-part {
		position: relative;
		width: 100%;
		height: 320upx;
		padding: 36upx 30upx;

		.cur {
			font-size: 36upx;
			color: #fff;
			position: relative;
			z-index: 2;
		}

		.bg {
			position: absolute;
			z-index: 0;
			left: 0;
			top: 0;
			width: 100%;
			height: 320upx;
		}
	}

	.info-box {
		position: relative;
		z-index: 2;
		margin: -200upx 32upx 0;
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
</style>
