<template>
	<view class="content">
		<view class="top-part">
			<image class="bg" src="/static/qbbj.png"></image>
			<view class="box">
				<image src="../../../static/icon/gywm.png"></image>
				<view class="info">
					<view>{{userInfo.mobile}}</view>
					<view>账户余额：{{detail.Money | nf}}元</view>
					<view>到期时间：{{detail.Time | fill}}</view>
					</view>
			</view>
			
		</view>
		<view class="form-box">
			<view class="title">话费充值卡</view>
			<view class="row b-b">
				<text class="tit">卡号</text>
				<input class="input" type="text" v-model="formData.code" placeholder="请输入充值卡号" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">卡密</text>
				<input class="input" type="password" v-model="formData.pass" placeholder="请输入充值卡密" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="tips">1、卡号和卡密是唯一的，请仔细输入</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">立即充值</button>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	import phoneModel from '../../../api/phone/index.js'
	const formData = {
		code: '',
		pass: ''
	}
	
	export default {
		data() {
			return {
				detail: {},
				formData: JSON.parse(JSON.stringify(formData)),
				btnLoading: false,
				rules: {
					cardno: {
						required: true
					},
					password: {
						required: true
					}
				},
				messages: {
					cardno: {
						required: '请输入卡号！'
					},
					password: {
						required: '请输入密码！'
					}
				}
			}
		},
		computed: {
			...mapGetters(['tokenPhone', 'userInfo'])
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				phoneModel.getCallBalance({ token: this.tokenPhone }).then(res => {
					this.detail = res.data.json
				})
			},
			confirm() {
				const {
					formData: {
						code,
						pass
					},
					mobile,
					token,
					rules,
					messages
				} = this
				const sendData = {
					mobile: this.userInfo.mobile,
					cardno: code,
					password: pass,
					token: this.tokenPhone
				}
				phoneModel.initValidate(rules, messages)
				if (!phoneModel.WxValidate.checkForm(sendData)) return
				this.btnLoading = true
				phoneModel.rechangeCall(sendData).then(res => {
					this.btnLoading = false
					this.formData = JSON.parse(JSON.stringify(formData))
					this.$api.msg('充值成功!')
				}).catch(() => {
					this.btnLoading = false
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}
	.tips {
		color: #909399;
		font-size: 26upx;
		line-height: 60upx;
		padding-left: 32upx;
	}
	.top-part {
		position: relative;
		width: 100%;
		height: 370upx;
		text-align: left;
		padding-left: 32upx;
		padding-top: 80upx;
		.box {
			position: relative;
			z-index: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 120upx;
				height: 120upx;
			}
			view {
				flex: 1;
				margin-left: 16upx;
				color: #FFFFFF;
				font-size: 36upx;
				& + view {
					margin-top: 10upx;
					font-size: 28upx;
				}
			}
		}

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 370upx;
		}
	}
	.form-box {
		margin-top: -90upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
		background: #FFFFFF;
		overflow: hidden;
		z-index: 2;
		position: relative;
		padding: 20upx 32upx;
		.title {
			font-size: 32upx;
			line-height: 60upx;
		}
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
</style>
