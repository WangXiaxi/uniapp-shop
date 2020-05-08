<template>
	<view class="content-three">
		<view class="num" v-if="number.length > 0">{{number}}</view>
		<view class="num no" v-else>请输入号码</view>
		<scroll-view scroll-with-animation scroll-y class="item-list">
			<view class="item" v-for="(item, index) in list" :key="index" @click="dialPhone(item)">
				<view>{{item.phone}}</view>
				<view>{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="key-main">
			<view @touchend="addClass('')" @touchstart="addClass(item)" :class="{active: isAddClass === item}" class="key-item" v-for="(item, index) in numberList" :key="index" @tap="addNum(item)">{{item}}</view>
			<view class="key-item"></view>
			<view @touchend="addClass('')" @touchstart="addClass('0')" :class="{active: isAddClass === '0'}" class="key-item" @tap="addNum(0)">{{0}}</view>
			<view @touchend="addClass('')" @touchstart="addClass('dele')" :class="{active: isAddClass === 'dele'}" class="key-item" @click="dele()" @longtap="dele('all')">
				<image class="img" src="/static/icon/ipone-close.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import { debounce } from '@/utils/index.js'
	export default {
		props: {
			contacts: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				number: '',
				numberList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				list: [],
				isAddClass: '',
				searchs: null
			}
		},
		created() {
			this.searchs = debounce(this.search)
		},
		methods: {
			addClass(e) {
				this.isAddClass = e
			},
			dialPhone(item) { // 拨号操作
				if (item.phone.length < 5) {
					return this.$api.msg('输入号码不正确！')
				}
				uni.navigateTo({
					url: `/pages/phoneView/ring/ring?name=${item.name}&phone=${item.phone}`
				})
			},
			dial() { // 拨号操作
				if (this.list[0] && this.list[0].phone === this.number) {
					const {
						name,
						phone
					} = this.list[0]
					uni.navigateTo({
						url: `/pages/phoneView/ring/ring?name=${name}&phone=${phone}`
					})
				} else {
					uni.navigateTo({
						url: `/pages/phoneView/ring/ring?name=${this.number}&phone=${this.number}`
					})
				}
			},
			search() { // 搜索操作
				const number = this.number
				const list = []
				this.contacts.forEach(c => {
					c.contacts.forEach(j => {
						j.children.forEach(k => {
							if (k.indexOf(number) > -1) {
								list.push({
									name: j.name,
									phone: k
								})
							}
						})

					})
				})
				this.list = list
			},

			addNum(val) {
				this.number = `${this.number}${val}`
				this.searchs()
			},
			dele(type = null) {
				if (type === 'all') {
					this.number = ''
					return
				}
				if (this.number.length > 1) {
					this.number = this.number.slice(0, this.number.length - 1)
					this.searchs()
				} else {
					this.number = ''
				}
			}
		}
	}
</script>

<style lang="scss">
	page,
	.content-three {
		height: 100%;
	}

	.item-list {
		padding: 0 24upx;
		height: calc(100vh - 850upx);

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
				background: #f2f3f4;
				border-radius: 5upx;
			}

			.img {
				width: 56upx;
				height: 56upx;
			}
		}
	}
</style>
