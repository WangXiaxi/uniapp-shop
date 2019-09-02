<template>
	<view class="content-two">
		<view class="input-search">
			<image class="ic" src="../../static/icon/ipone_searh.png"></image>
			<input class="search" v-model="search" placeholder="搜索" placeholder-class="placeholder" />
		</view>
		<view class="mobile-list">
			<scroll-view class="contact-scroll" scroll-y :scroll-into-view="scrollViewId">
				<view class="box" v-for="(item,key) in contacts" :key="key">
					<view class="divider" :id="item.letter"> <text class="divider-text">{{item.letter}}</text> </view>
					<view class="item" hover-class="hover" :hover-start-time="20" v-for="(contact,index) in item.contacts" :key="index"
					 @click='onSelectClick(contact)'>
						<image class="portrait" src="../../static/icon/gywm.png"></image>
						<view class="name">{{contact.name}}</view>
					</view>
				</view>
			</scroll-view>
			<!-- 右侧滚动 -->
			<view class="indexBar-bg">
				<view class="indexBar" catchtouchmove>
					<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove="tMove">
						<view class="indexBar-item" v-for="(item, index) in contacts" :key="index" :id="item.letter" @touchstart="getCur"
						 @touchend="setCur">
							{{item.letter}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-show="!hidden" class="indexToast">{{letter}}</view>
	</view>
</template>

<script>
	import pinyin from './pinyin/pinyin3.js'
	const platform = uni.getSystemInfoSync().platform
	export default {
		props: {
			contactsCopy: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				scrollViewId: 'we',
				search: '',
				hidden: true,
				boxTop: 0,
				barHeight: 0,
				letter: '',
				isSearch: false,
				contactItems: [],
				contacts: []
			}
		},
		created() {
			const res = uni.getSystemInfoSync();
			this.barHeight = res.windowHeight / 27;
		},
		methods: {
			/*
			 * 滑动的侧边选择器
			 */
			getCur(e) {
				this.hidden = false
				this.letter = e.target.id
			},
			setCur(e) {
				this.hidden = true;
				this.letter = e.target.id
			},
			tStart() {
				this.hidden = false
			},
			tEnd() {
				this.hidden = true;
			},
			tMove(e) {
				let y = e.touches[0].clientY
				let offsettop = this.boxTop
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					var num = Math.floor((y - offsettop) / this.barHeight);
					if (num < this.contacts.length) {
						this.letter = this.contacts[num].letter
						this.scrollViewId = this.letter
					}
				}
			},
			
			onSelectClick: function(contact) {
				uni.showActionSheet({
					itemList: ['电话联系'],
					success: (e) => {
						if (e.tapIndex == 0) {
							uni.makePhoneCall({
								phoneNumber: contact.phone
							});
						}
					}
				})
			},
			onSearchInput: function(value) {
				var searchVal = value
				this.isSearch = true
				if (searchVal == '') {
					this.contacts = JSON.parse(JSON.stringify(this.contactItems))
					this.isSearch = false
				} else {
					var showList = []
					var list = []
					list = JSON.parse(JSON.stringify(this.contactItems))
					list.forEach((item, index1) => {
						var contacts = []
						item.contacts.forEach((contact, index2) => {
							for (var i = 0; i < searchVal.length; i++) {
								if (contact.name.indexOf(searchVal[i]) != -1) {
									var contain = false;
									contacts.find(function(val) {
										if (val.phone == contact.phone) {
											contain = true;
										}
									});
									if (!contain) {
										contacts.push(contact);
									}
								}
							}
						})
						if (contacts.length > 0) {
							var contacts = {
								letter: item.letter,
								contacts: contacts
							}
							showList = showList.concat(contacts)
						}
					})
					setTimeout(() => {
						this.contacts = JSON.parse(JSON.stringify(showList))
					}, 200)
				}
			}
		},
		watch: {
			search(v) {
				this.onSearchInput(v)
			},
			contactsCopy: {
				handler: function(v) {
					this.contacts = JSON.parse(JSON.stringify(v))
					this.contactItems = JSON.parse(JSON.stringify(v))
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	.input-search {
		background: #f7f7f7;
		padding: 10upx 24upx;
		position: relative;
		.search {
			margin: 0;
			height: 68upx;
			background: #E6E6E6;
			border-radius: 40upx;
			padding: 0 62upx;
			font-size: 32upx;
		}
		.ic {
			position: absolute;
			width: 28upx;
			height: 28upx;
			z-index: 1;
			left: 48upx;
			top: 30upx;
		}
	}


	.indexBar-bg {
		height: 100vh;
		width: 60px;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 1000;
	}

	.indexBar {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(0, -50%);
		display: flex;
		align-items: center;
		z-index: 1003;
	}

	.indexBar .indexBar-box {
		width: 60upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
		z-index: 1004;
	}

	.indexBar-item {
		flex: 1;
		width: 60upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
		z-index: 1005;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		margin: auto auto;
		border-radius: 10upx;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}

	.contact-scroll {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100vw;
		height: calc(100vh - 90upx);
	}

	.box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
	}

	.divider {
		width: 100%;
		background-color: #f7f7f7;
		padding: 5upx 0;
		color: #000;
	}

	.divider-text {
		margin-left: 20upx;
	}

	.item {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		border-bottom: 1px solid #f0f0f0;
	}

	.portrait {
		width: 100upx;
		height: 100upx;
		padding: 15upx;
		margin-right: 10upx;
	}

	.name {
		font-size: 35upx;
	}

	.hover {
		background-color: #e7e7e7;
	}
</style>
