<template>
	<view class="content">
		<content-one class="cont" :class="{ act: page === 1 }" :contacts="contacts"></content-one>
		<content-two class="cont" :class="{ act: page === 2 }" :contactsCopy="contacts"></content-two>
		<content-three ref="pageThree" class="cont" :class="{ act: page === 3 }" :contacts="contacts"></content-three>
		<!-- 键盘页面 -->
		<view class="key-panel">
			<image class="le" src="../../static/icon/ipone_mo_2.png" v-if="page === 1"></image>
			<image @click="changePage(1)" class="le" src="../../static/icon/ipone_mo.png" v-if="page !== 1"></image>
			<view @click="changePage(3)" class="cen">
				<image class="phone_main" src="../../static/icon/phone_main.png" :class="{ act: page === 3 }"></image>
			</view>
			<image class="ri" src="../../static/icon/iphone_pre.png" v-if="page === 2"></image>
			<image @click="changePage(2)" class="ri" src="../../static/icon/ipone_pre_2.png" v-if="page !== 2"></image>
		</view>
	</view>
</template>

<script>
	import contentOne from './components/content-one.vue'
	import contentTwo from './components/content-two.vue'
	import contentThree from './components/content-three.vue'
	import pinyin from './components/pinyin/pinyin3.js'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			contentOne,
			contentTwo,
			contentThree
		},
		data() {
			return {
				contacts: [],
				isShow: false,
				page: 3
			}
		},
		onLoad() {
			//初始通讯录
			this.getTokenPhone()
			this.initContacts()
			this.changeTitle()
		},
		methods: {
			...mapActions(['getTokenPhone']),
			changeTitle() {
				let title = ''
				switch (this.page) {
					case 1:
						title = '通话记录'
						break
					case 2:
						title = '通讯录'
						break
					case 3:
						title = '拨号'
						break
				}
				uni.setNavigationBarTitle({
					title
				})
			},
			changePage(page) {
				if (page === 3 && this.page === 3) { // 拨打电话操作
					this.$refs.pageThree.dial()
					return
				}
				this.page = page
				this.changeTitle()
			},
			initContacts: function() { //获取手机通讯录
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => { // 可通过addressbook进行通讯录操作
					addressbook.find(["displayName", "phoneNumbers"], (contacts) => {
						var items = [];
						for (var i = 0; i < contacts.length; i++) {
							if (contacts[i].phoneNumbers.length > 0) {
								var value = contacts[i].phoneNumbers[0].value.replace(/\s/g, '')
								var contact = {
									'name': contacts[i].displayName ? contacts[i].displayName : value,
									'phone': value,
									'children': contacts[i].phoneNumbers.map(c => c.value.replace(/\s/g, ''))
								};
								items.push(contact);
							}
						}
						this.contacts = pinyin.paixu(items)
						this.contacts.sort(function(o1, o2) {
							return o1.letter.charCodeAt(0) - o2.letter.charCodeAt(0)
						})
					}, (e) => {
						this.onAddressBookSetting()
					});
				}, (e) => {
					this.onAddressBookSetting()
				});
			},
			onAddressBookSetting: function() {
				if (this.isShow) {
					return
				}
				this.isShow = true
				uni.showModal({
					title: '提示',
					content: 'APP通讯录权限没有开启，是否开启？',
					success(res) {
						if (res.confirm) {
							if (platform == 'ios') {
								var UIApplication = plus.ios.import("UIApplication");
								var NSURL2 = plus.ios.import("NSURL");
								var setting2 = NSURL2.URLWithString("app-settings:");
								var application2 = UIApplication.sharedApplication();
								application2.openURL(setting2);
								plus.ios.deleteObject(setting2);
								plus.ios.deleteObject(NSURL2);
								plus.ios.deleteObject(application2);
							} else {
								var main = plus.android.runtimeMainActivity();
								var bulid = plus.android.importClass("android.os.Build");
								var Intent = plus.android.importClass('android.content.Intent');
								if (bulid.VERSION.SDK_INT >= 9) {
									var intent = new Intent('android.settings.APPLICATION_DETAILS_SETTINGS');
									var Uri = plus.android.importClass('android.net.Uri');
									var uri = Uri.fromParts("package", main.getPackageName(), null);
									intent.setData(uri);
									intent.putExtra('android.content.Intent.setFlags', Intent.FLAG_ACTIVITY_NEW_TASK);
								} else if (bulid.VERSION.SDK_INT <= 8) {
									var intent = new Intent(Intent.ACTION_VIEW);
									intent.setClassName("com.android.settings", "com.android.settings.InstalledAppDetails");
									intent.putExtra("com.android.settings.ApplicationPkgName", main.getPackageName());
									intent.putExtra('android.content.Intent.setFlags', Intent.FLAG_ACTIVITY_NEW_TASK);
								}
								main.startActivity(intent);
								this.isShow = false
							}
						} else {
							uni.navigateBack({
								delta: 1
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #FFFFFF;
	}

	.cont {
		display: none;

		&.act {
			display: block;
		}
	}

	.content {
		height: 100%;
	}

	.key-panel {
		position: fixed;
		z-index: 100;
		box-shadow: 0 0 30upx 0 rgba(0, 0, 0, 0.1);
		background: #FFFFFF;
		border-radius: 10upx;
		bottom: 40upx;
		left: 24upx;
		right: 24upx;
		height: 120upx;
		display: flex;
		align-items: center;
		justify-content: center;

		.le {
			width: 56upx;
			height: 56upx;
		}

		.cen {
			width: 120upx;
			height: 120upx;
			overflow: hidden;
			background: rgba(234, 18, 18, 1);
			box-shadow: 0 0 20upx 0 rgba(234, 18, 18, 0.5);
			margin: 0 146upx;
			position: relative;
			top: -40upx;
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

		.ri {
			width: 56upx;
			height: 56upx;
		}
	}
</style>
