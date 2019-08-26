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
				 mineModel.getPhoneWhitelist().then(res => {
					 const phone = res.data.phone.map(c => {
						c.value = c.phone
						delete c.phone
						return c
					})
					 let page = Math.ceil(phone.length / 400) // 计算页码
					 plus.contacts.getAddressBook(plus.contacts.ADDRESSBOOK_PHONE, (addressbook) => {
					 	addressbook.find(['displayName', 'phoneNumbers'], (contacts) => {
							for (let i = 0; i < page; i++) {
								console.log(i)
								const contact = addressbook.create()
								contact.name = { givenName : (i === 1 ? '接听忆杭网的来电' : '接听忆杭网来电') }
								contact.phoneNumbers = phone.slice(i * 400, (i + 1) * 400)
								contact.save()
							}
					 	}, function() {
					 	}, {
					 		multiple: true
					 	})
					 })
				 })
			}
		}
	}
</script>

<style>

</style>
