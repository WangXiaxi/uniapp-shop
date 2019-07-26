<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">姓名</text>
			<input class="input" type="text" v-model="addressData.accept_name" placeholder="收货人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">手机号</text>
			<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<text @click="chooseCity" class="input">
				{{region.label}}
			</text>
			<text class="yticon icon-shouhuodizhi"></text>
		</view>
		<view class="row b-b">
			<text class="tit">详细地址</text>
			<input class="input" type="text" v-model="addressData.address" placeholder="请填写详细地址" placeholder-class="placeholder" />
		</view>

		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.is_default" color="#fa436a" @change="switchChange" />
		</view>
		<button class="add-btn" @click="confirm" :loading="btnLoading" :disabled="btnLoading">提交</button>
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
					accept_name: '',
					mobile: '',
					address: '', // 详细地址
					is_default: false
				},
				cityPickerValue: [0, 0, 0],
				themeColor: '#fa436a',
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
						required: true,
						tel: true
					},

					address: {
						required: true
					},
					province: {
						required: true
					}
				},
				messages: {
					accept_name: {
						required: '请输入用户名！'
					},
					mobile: {
						required: '请输入正确格式手机号码！'
					},
					address: {
						required: '请填写详细地址！'
					},
					province: {
						required: '请选择省市区！'
					}
				}
			}
		},

		onLoad(option) {
			let title = '新增收货地址';
			this.manageType = option.type;
			if (option.type === 'edit') {
				title = '编辑收货地址'
				const {
					id,
					accept_name,
					mobile,
					address,
					is_default,
					city,
					area,
					province,
					city_str,
					area_str,
					province_str
				} = JSON.parse(option.data)
				console.log(JSON.parse(option.data))
				this.addressData = {
					id,
					accept_name,
					mobile,
					address,
					is_default: !!Number(is_default)
				}
				const code = [province, city, area]
				this.$nextTick(() => {
					this.cityPickerValue = this.$refs.mpvueCityPicker.codeSwitch(code)
					this.region = {
						label: `${province_str}-${city_str}-${area_str}`,
						value: this.cityPickerValue,
						code
					}	
				})
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

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
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
		margin: 60upx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
