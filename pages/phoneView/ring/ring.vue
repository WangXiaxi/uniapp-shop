<template>
	<view class="content">
		<image class="bg" mode="aspectFill" src="../../../static/bj-phone.png"></image>
		<view class="iphone-box">
			<view class="o" v-if="detail.name !== detail.phone">{{detail.name}}</view>
			<view class="o">{{detail.phone}}</view>
			<view class="des">正在接通中...</view>
			<view class="dex">请注意接听电话</view>
		</view>
		<view class="btn-red">
			<image @click="goback()" class="phone_main act" src="../../../static/icon/phone_main.png"></image>
		</view>
	</view>
</template>

<script>
	import phoneModel from '../../../api/phone/index.js'
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				index: false,
				detail: {}
			}
		},
		computed: {
			...mapGetters(['tokenPhone', 'userInfo'])
		},
		onLoad(options) {
			this.detail = options
			const { name, phone } = options
			const { mobile } = this.userInfo
			phoneModel.callUser({ answer_name: name, answerer: phone.replace(/-/g, ''), caller: mobile, token: this.tokenPhone }).then(res => {
			}).catch((e) => {
				setTimeout(() => {
					this.goback()
				}, 2000)
			})
		},
		onShow() {
			if(this.index) {
				this.goback()
				return
			}
			this.index = true
		},
		methods: {
			goback() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.iphone-box {
		position: relative;
		text-align: center;
		color: #FFFFFF;
		padding-top: 140upx;
		.o {
			font-size: 72upx;
		}
		.des {
			font-size: 32upx;
			margin-top: 20upx;
		}
		.dex {
			margin-top: 20upx;
			font-size: 28upx;
			color: #F2F2F2;
		}
	}
	.bg {
		position: absolute;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
	}
	.btn-red {
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		background: rgba(234,18,18,1);
		box-shadow: 0 0 20upx 0 rgba(234, 18, 18, 0.5);
		margin: 0 146upx;
		position: absolute;
		bottom: 40upx;
		z-index: 2;
		left: 50%;
		margin-left: -60upx;
		border-radius: 50%;
		.phone_main {
			width: 120upx;
			height: 240upx;
			position: relative;
			top: 0;
			transition: all 0.3s;
			&.act {
				top: -120upx;
			}
		}
	}
</style>
