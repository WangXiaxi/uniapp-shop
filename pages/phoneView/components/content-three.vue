<template>
	<view class="content-three">
		<view class="num" v-if="number.length > 0">{{number}}</view>
		<view class="num no" v-else>请输入号码</view>
		<scroll-view scroll-with-animation scroll-y class="item-list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view>{{item.phone}}</view>
				<view>{{item.name}}</view>
			</view>
		</scroll-view>
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
				list: []
			}
		},
		methods: {
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
				console.log(JSON.stringify(list))
				this.list = list
			},
			dial() { // 拨号操作
				console.log(this.number)
			},
			addNum(val) {
				this.number = `${this.number}${val}`
				this.search()
			},
			dele(type = null) {
				if (type === 'all') {
					this.number = ''
					this.list = []
					return
				}
				if (this.number.length > 1) {
					this.number = this.number.slice(0, this.number.length - 1)
					this.search()
				} else {
					this.number = ''
					this.list = []
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
		height: calc(100% - 100upx - 750upx);

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
