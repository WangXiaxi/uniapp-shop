<template>
	<view>
		<dialog-modal :info="info" ref="dialog" width="710rpx">
			<view class="content">
				<scroll-view class="view" scroll-y>
					<rich-text :nodes="htmls"></rich-text>
				</scroll-view>
			</view>
			<view class="footer">
				<view class="btn plain" @click="audit('true')">同意</view>
				<view class="btn plain" @click="audit('false')">拒绝</view>
			</view>
		</dialog-modal>
	</view>
</template>

<script>
	import dialogModal from '@/components/dialog/dialog.vue'
	import loginModel from '@/api/login/index.js'
	export default {
		components: {
			dialogModal
		},
		props: {
			info: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			
			return {
				height: '80vh',
				title: '',
				htmls: ''
			}
		},
		mounted() {
			this.getXiyi()
		},
		methods: {
			audit(type) {
				this.$emit('update', type)
				this.$refs.dialog.toggleSpec(false)
			},
			getXiyi() {
				loginModel.getUserAgreement().then(res=> {
					this.htmls = res.data.replace(/\\"/g, '"').replace(/\\'/g, '\'').replace(/font-size:19px;/g, 'font-size:14px;')
				})
			},
			show() {
				this.$refs.dialog.toggleSpec(true)
			},
			cancel() {
				this.$refs.dialog.toggleSpec(false)
			}
		}
	}
</script>

<style lang="scss">
	.view {
		height: 80vh;
	}
	.content {
		background: #FFFFFF;
		text-align: center;
		display: block;
		margin: 0 auto;
		padding: 28rpx 28rpx 28rpx;
	}
	.footer {
		border-top: 1rpx solid #DDDDDD;
		display: flex;
	}
	.btn {
		flex: 1;
	}
	.btn.plain {
		text-align: center;
		margin: 0 auto;
		color: #0070FF;
		font-size: 36rpx;
		line-height: 100rpx;
		border-left: 1rpx solid #DDDDDD;
		+ .plain {
			color: #999999;
		}
	}
</style>
