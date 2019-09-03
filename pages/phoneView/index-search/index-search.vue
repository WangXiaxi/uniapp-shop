<template>
	<view>
		<view class="item-list">
			<view class="item" :class="{ act: item.type === 0 }" v-for="(item, index) in list" :key="index" @click="onSelectClick(item)">
				<view>{{item.name}}</view>
				<view v-if="item.type === 1">{{item.phone}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				list: [],
				search: '',
				curData: []
			}
		},
		onLoad() {
			this.curData = JSON.parse(JSON.stringify(this.params))
		},
		computed: {
			...mapGetters(['params']),
		},
		// #ifndef MP
		// 标题栏input搜索框变动
		onNavigationBarSearchInputChanged(e) {
			console.log(e.text)
			this.search = e.text
			if (!this.search.trim()) return
			console.log(e.text, 2)
			this.setSearchText(this.search)
		},
		// 标题栏input搜索框点击
		onNavigationBarSearchInputConfirmed() {
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index
			if (index === 0) {
				uni.navigateBack()
			}
		},
		// #endif
		methods: {
			...mapMutations(['setParams']),
			onSelectClick: function(contact) {
				this.setParams(contact)
				this.navTo('/pages/phoneView/detail/detail')
			},
			setSearchText() {
				const search = this.search
				const list = []
				this.curData.forEach(c => {
					c.contacts.forEach(j => {
						if (j.name.indexOf(search) > -1) {
							list.push({
								name: j.name,
								type: 0,
								children: j.children
							})
						} else {
							j.children.forEach(k => {
								if (k.replace(/\s/g, '').indexOf(search) > -1) {
									list.push({
										name: j.name,
										phone: k,
										type: 1,
										children: j.children
									})
								}
							})
						}
					})
				})
				this.list = list
			}
		}
	}
</script>

<style lang="scss">
	.item-list {
		padding: 0 24upx;
		.item {
			flex-direction: column;
			align-items: center;
			min-height: 100upx;
			border-bottom: 1px solid #f0f0f0;
			color: #aaa;
			font-size: 28upx;
			line-height: 50upx;
			&.act {
				line-height: 100upx;
			}
		}
	}
</style>
