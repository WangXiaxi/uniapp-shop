<template>
	<view class="content">
		<view class="tip" style="margin-top: 10upx;">请绑定持卡人本人的银行卡</view>
		<view class="row b-b" style="margin-top: 30upx;">
			<text class="tit">开户银行</text>
			<input class="input" type="text" v-model="addressData.param1" placeholder="请输入开户银行" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">持卡人</text>
			<input class="input" type="number" v-model="addressData.param2" placeholder="请输入持卡人" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">开户地区</text>
			<text @click="chooseCity" class="input">
				{{region.label}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">开户支行</text>
			<input class="input" type="text" v-model="addressData.param3" placeholder="请输入开户支行" placeholder-class="placeholder" />
		</view>
		
		<view class="row b-b">
			<text class="tit">银行卡号</text>
			<input class="input" type="text" v-model="addressData.param4" placeholder="请输入银行卡号" placeholder-class="placeholder" />
		</view>

		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
		<view class="tip"><text>1.</text>&nbsp;银行卡信息必须填写完整准确；</view>
		<view class="tip"><text>2.</text>&nbsp;绑定的必须是本人的银行卡；</view>
		<view class="tip"><text>3.</text>银行卡信息填写不正确会导致提现失败。</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel"
		 @onConfirm="onConfirm"></mpvue-city-picker>
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	import mineModel from '../../api/mine/index.js'
	
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				btnLoading: false,
				addressData: {
					param1: '',
					param2: '',
					param3: '',
					param4: ''
				},
				cityPickerValue: [0, 0, 0],
				themeColor: '#ea1212',
				region: {
					label: '请点击选择地址',
					value: [],
					code: []
				},
				rules: {
					param1: {
						required: true
					},
					param2: {
						required: true
					},
					param3: {
						required: true
					},
					param4: {
						required: true
					}
				},
				messages: {
					param1: {
						required: '请输入开户银行！'
					},
					param2: {
						required: '请输入持卡人！'
					},
					param3: {
						required: '请输入开户支行！'
					},
					param4: {
						required: '请输入银行卡号！'
					}
				}
			}
		},

		onLoad(option) {
			let title = '绑定银行卡';
			this.manageType = option.type;
			if (option.type === 'edit') {
				title = '更换银行卡'
				// const {
				// 	id,
				// 	accept_name,
				// 	mobile,
				// 	address,
				// 	is_default,
				// 	city,
				// 	area,
				// 	province,
				// 	city_str,
				// 	area_str,
				// 	province_str
				// } = JSON.parse(option.data)
				// this.addressData = {
				// 	id,
				// 	accept_name,
				// 	mobile,
				// 	address
				// }
				// const code = [province, city, area]
				// this.$nextTick(() => {
				// 	this.cityPickerValue = this.$refs.mpvueCityPicker.codeSwitch(code)
				// 	this.region = {
				// 		label: `${province_str}-${city_str}-${area_str}`,
				// 		value: this.cityPickerValue,
				// 		code
				// 	}	
				// })
			}
			uni.setNavigationBarTitle({
				title
			})
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
		methods: {
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel(e) {},
			switchChange(e) {
				this.addressData.is_default = e.detail.value;
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
			},
			//提交
			confirm() {
				const { rules, messages } = this
				const {
					id,
					accept_name,
					mobile,
					is_default,
					address
				} = this.addressData;
				const [province, city, area] = this.region.code
				const sendData = {
					id,
					accept_name,
					mobile,
					is_default: Number(is_default),
					address,
					province,
					city,
					area
				}
				mineModel.initValidate(rules, messages)
				if (!mineModel.WxValidate.checkForm(sendData)) return
				this.btnLoading = true
				mineModel.addressEdit(sendData).then(res => {
					this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
					this.$api.prePage().refreshList();
					setTimeout(() => {
						this.btnLoading = false
						uni.navigateBack()
					}, 800)
				}).catch(() =>{
					this.btnLoading = false
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}
	.tip {
		padding-left: 30upx;
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
</style>
