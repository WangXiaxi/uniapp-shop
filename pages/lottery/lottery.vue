<template>
	<view class="content">
		<view class="main">
			<view class="row">
				<input class="input" type="text" v-model="formData.true_name" placeholder="请输入姓名" placeholder-class="placeholder" />
			</view>
			<view class="row">
				<input class="input" type="number" v-model="formData.mobile" placeholder="请输入手机号" placeholder-class="placeholder" />
			</view>
			
			<view class="row">
				<input class="input" type="text" v-model="formData.id_num" placeholder="请输入身份证号" placeholder-class="placeholder" />
			</view>
			
			<button class="btn" :loading="loading" :disabled="disabled" @click="confirm">{{btn}}</button>
		</view>
		
	</view>
</template>

<script>
	import lotteryModel from '../../api/lottery/index.js'
	import { IdentityCodeValid } from '../../utils/isIDCardNo.js'
	const formFields = {
		true_name: '',
		mobile: '',
		id_num: '',
	}
	export default {
		data() {
			return {
				btn: '立即提交',
				loading: false,
				disabled: false,
				formData: JSON.parse(JSON.stringify(formFields)),
				rules: {
					true_name: {
						required: true
					},
					mobile: {
						required: true,
						tel: true
					},
					id_num: {
						required: true
					}
				},
				messages: {
					true_name: {
						required: '请输入正确的姓名！'
					},
					mobile: {
						required: '请输入正确的手机号！'
					},
					id_num: {
						required: '请输入正确的身份证号！'
					}
				}
			};
		},
		onLoad(option) {
			this.gift_id = option.gift_id
			// this.loadData()
		},
		methods: {
			confirm() {
				const {
					gift_id,
					formData: {
						true_name,
						mobile,
						id_num
					},
					rules: {
						true_name: truenameRule,
						mobile: mobileRule
					},
					messages: {
						true_name: truenameMessage,
						mobile: mobileMessage
					}
				} = this
				const sendData = {
					true_name,
					mobile,
					id_num,
					gift_id
				}
				lotteryModel.initValidate({
					true_name: truenameRule,
					mobile: mobileRule
				}, {
					true_name: truenameMessage,
					mobile: mobileMessage
				})
				if (!lotteryModel.WxValidate.checkForm(sendData)) return
				if (!IdentityCodeValid(id_num)) return this.$api.msg('请输入正确的身份证号码！')
				this.loading = true
				this.disabled = true
				lotteryModel.lotterySave(sendData).then(res => {
					this.btn = '报名成功'
					this.loading = false
					uni.showToast({
						title: '报名成功',
						duration: 2500,
						icon: 'none'
					})
				}).catch(() => {
					this.loading = false
					this.disabled = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: url(../../static/active/lottery-bg.jpg) no-repeat;
		background-size: 100% auto;
		padding-top: 16upx;
	}
	
	.main {
		width: 480upx;
		height: 500upx;
		margin: 580upx auto 0;
		
		.row {
			height: 60upx;
			line-height: 60upx;
			margin-bottom: 28upx;
			padding-left: 60upx;
		}
		
		.btn{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 316upx;
			height: 66upx;
			margin: 50upx auto 0;
			font-size: 30upx;
			color: #fff;
			background:linear-gradient(180deg,rgba(253,130,7,1),rgba(255,68,3,1));
			border-radius:10upx;
		}
	}
	
</style>
