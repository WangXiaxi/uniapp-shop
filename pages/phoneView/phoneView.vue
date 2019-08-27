<template>
	<web-view src="https://sbd.sbdznkj.com/SbdVoip/wxhtml/PhoneCall.html">
	</web-view>
</template>

<script>
	import mineModel from '../../api/mine/index.js'
	export default {
		data() {
			return {}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData() {
				plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
					mineModel.getPhoneWhitelist().then(res => {
						const phone = res.data.phone.map(c => {
							c.value = c.phone
							delete c.phone
							return c
						})
						let page = Math.ceil(phone.length / 400) // 计算页码
						addressbook.find(['displayName', 'phoneNumbers'], (contacts) => {
							for (let i = 0; i < page; i++) {
								const contact = addressbook.create()
								contact.name = {
									givenName: (i === 1 ? '接听忆杭网的来电' : '接听忆杭网来电')
								}
								contact.phoneNumbers = phone.slice(i * 400, (i + 1) * 400)
								contact.save()
							}
						}, function() {}, {
							multiple: true
						})
					})
				}, () => {
					uni.showModal({
					    title: '提示',
					    content: '获取通讯录权限失败，请前往设置允许访问通讯录权限！',
					    complete: function (res) {
					       uni.navigateBack()
					    }
					});
				})
			}
		}
	}
</script>

<style>

</style>
