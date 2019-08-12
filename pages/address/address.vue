<template>
	<view class="content b-t">
		<view class="empty" v-if="!addressList.length">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view class="empty-tips">
				还没有添加收货地址
			</view>
		</view>
		<view v-else>
			<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
				<view class="wrapper">
					<view class="address-box">
						<text v-if="Number(item.is_default)" class="tag">默认</text>
						<text class="address">{{item.province_str}}-{{item.city_str}}-{{item.area_str}} {{item.address}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.accept_name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
				</view>
				<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
				<text class="yticon icon-iconfontshanchu1" @click.stop="dele(item)"></text>
			</view>
		</view>
		<button class="add-btn" @click="addAddress('add')">新增地址</button>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import mineModel from '../../api/mine/index.js'
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				source: 0,
				pageLoading: false,
				addressList: [
				]
			}
		},
		onLoad(option){
			this.refreshList()
			this.source = option.source;
		},
		methods: {
			dele({ id }) { // 删除操作
				uni.showModal({
					title: '删除地址',
					content: '确定删除地址吗？',
					success: (e) => {
						if (e.confirm) {
							mineModel.addressDel({ id }).then(res => {
								this.$api.msg(`地址删除成功`);
								this.refreshList()
							})
						}
					}
				})
				
			},
			//选择地址
			checkAddress(item){
				if(this.source == 1){
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().setAddress(item)
					uni.navigateBack()
				}
			},
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(){
				this.pageLoading = true
				mineModel.getUcenterAddressList().then(res => {
					this.pageLoading = false
					const { address, areas } = res.data
					if (!address) {
						this.addressList = []
						return
					}
					this.addressList = address.map(c => {
						c.city_str = areas[c.city]
						c.province_str = areas[c.province]
						c.area_str = areas[c.area]
						return c
					})
				}).catch(() => {
					this.pageLoading = false
				})
			}
		}
	}
</script>

<style lang='scss'>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		/* display: flex; */
		align-items: center;
		.tag{
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			flex: 1;
			width: 0;
			font-size: 30upx;
			color: $font-color-dark;
		}
	}
	.u-box{
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	.yticon{
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
