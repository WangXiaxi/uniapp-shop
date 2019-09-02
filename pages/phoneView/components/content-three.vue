<template>
	<view class="content-three">
		<view class="num" v-if="number.length > 0">{{number}}</view>
		<view class="num no" v-else>请输入号码</view>
		<view class="item-list">
			<view class="item">
				<view>15058559592</view>
				<view>王小星</view>
			</view>
		</view>
		<view class="key-main">
			<view class="key-item" v-for="(item, index) in numberList" :key="index" @click="addNum(item)">{{item}}</view>
			<view class="key-item"></view>
			<view class="key-item" @click="addNum(0)">{{0}}</view>
			<view class="key-item" @click="dele()" @longtap="dele('all')">
				<image class="img" src="../../static/icon/ipone-close.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				number: '',
				numberList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
			}
		},
		methods: {
			dial() { // 拨号操作
				console.log(this.number)
			},
			addNum(val) {
				this.number = `${this.number}${val}`
			},
			dele(type = null) {
				if (type === 'all') {
					this.number = ''
					return
				}
				if (this.number.length > 0) {
					this.number = this.number.slice(0, this.number.length - 1)
				}
			}
		}
	}
</script>

<style lang="scss">
	.item-list {
		height: calc(100% - 100upx - 750upx);
		padding: 0 24upx;
		.item {
			border-bottom: 1px solid #f0f0f0;
			color: #aaa;
			font-size: 28upx;
			line-height: 50upx;
		}
	}
	.num {
		background: #f7f7f7;
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		&.no {
			color: #aaa;
		}
	}
	.key-main {
		position: fixed;
		padding: 30upx 75upx;
		height: 750upx;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background: #fbfbfb;
		box-shadow: 0px 0px 11px 1px rgba(0, 0, 0, 0.1);
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		
		.key-item {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 56upx;
			width: 200upx;
			height: 130upx;
			float: left;
			&.active {
				background: #f7f7f7;
			}
			.img {
				width: 56upx;
				height: 56upx;
			}
		}
	}
</style>
