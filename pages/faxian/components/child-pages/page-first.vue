<template>

	<view class="page-section swiper">
		<!-- 查询条件 -->
		<view class="sort">
			<view class="sort-item">
				<picker @change="bindPickerChange1" :value="index1" :range="array1">
					<view class="uni-input">{{array1[index1]}}</view>
				</picker>
			</view>
			<view class="sort-item">
				<picker @change="bindPickerChange2" :value="index2" :range="array2">
					<view class="uni-input">{{array2[index2]}}</view>
				</picker>
			</view>
			<view class="sort-item">
				<picker @change="bindPickerChange3" :value="index3" :range="array3">
					<view class="uni-input">{{array3[index3]}}</view>
				</picker>
			</view>
		</view>

		<!-- 主要 内容区域 -->
		<!-- 空白页 -->
		<empty :relative="true" v-if="loadingType === 'nomore' && list.length === 0" text="暂无相关记录"></empty>
		<view class="main-info" v-else>
			<view class="item-main" v-for="(item, index) in list" :key="index" @click="navTo(`/pages/faxian/pay-choose`, true, item)">
				<image class="img-shop" :src="item.gaslogosmall"></image>
				<view class="info">
					<view class="title">{{item.gasName}}</view>
					<view class="price">优惠价<text class="red">￥{{item.priceYfqSearch}}</text></view>
					<view class="price-2">
						<view class="le">已省￥{{ item.yhMoney }}</view>
						<view class="ri">国标价 ￥{{item.priceOfficialSearch}}</view>
					</view>
					<view class="location">
						<image class="loc-img" src="../../static/icon/location.png"></image>
						<view class="text">{{item.address}}</view>
						<view class="lo-ico" @click.stop="goLocation(item)">
							<image class="ico" src="../../static/icon/ships.png"></image>
							<view class="m">{{item.distanceStr}}km</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>

	</view>

</template>

<script>
	import faxianModel from '@/api/faxian/index.js'
	import empty from '@/components/empty'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue'
	import {
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				longitude: 120.190487,
				latitude: 30.184686,
				loadingType: 'loading', //加载更多状态
				list: [],
				page: 0,
				pages: 0, // 总页数
				array1: [
					'距离优先',
					'价格优先'
				],
				array1Copy: {
					'距离优先': 1,
					'价格优先': 2
				},
				array2: [
					'6km内',
					'10km内',
					'15km内',
					'20km内',
					'50km内'
				],
				array3: ['92#'],
				array3Copy: {
					'92#': 'OIL_2'
				},
				index1: 0,
				index2: 2,
				index3: 0
			}
		},
		computed: {
			...mapGetters(['hasLogin'])
		},
		created() {
			this.getOilType() // 获取油品
		},
		methods: {
			...mapMutations(['setParams']),
			goLocation(item) { // 地图
				uni.openLocation({
					latitude: Number(item.latitude),
					longitude: Number(item.longitude),
					success: function() {}
				})
			},
			navTo(url, type = true, item) {
				
				return uni.showToast({
					icon: 'none',
					title: '即将上线',
					duration: 2000
				})
				
				if (!this.hasLogin && type) {
					url = '/pages/public/login';
				} else {
					this.setParams(item)
				}
				uni.navigateTo({
					url
				})
			},
			async getOilType() { // 获取油品
				const res = await faxianModel.getOilType()
				this.array3Copy = res.data
				this.array3 = Object.keys(res.data)
				this.index3 = this.array3.findIndex(c => c === '92#')
			},
			getLocation() {
				uni.showLoading({
					title: '请求中...',
					mask: true
				})
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						uni.hideLoading()
						this.latitude = res.latitude
						this.longitude = res.longitude
						this.loadData('refresh')
					},
					fail: (res) => {
						uni.hideLoading()
						this.loadData('refresh')
						uni.showModal({
							title: '错误',
							content: '缺少定位权限，请前往设置检查是否允许使用位置信息！',
							success: (e) => {}
						})
					}
				})
			},
			bindPickerChange1(e) {
				this.index1 = e.detail.value
				this.loadData('refresh')
			},
			bindPickerChange2(e) {
				this.index2 = e.detail.value
				this.loadData('refresh')
			},
			bindPickerChange3(e) {
				this.index3 = e.detail.value
				this.loadData('refresh')
			},
			loadData(type = 'add', loading) {
				if (this.loadingType === 'loading' && type !== 'refresh') return // 有数据在加载时 不进行请求
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.page = this.page + 1;
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'loading';
				}

				if (type === 'refresh') {
					this.page = 1;
					this.list = [];
				}
				const {
					index1,
					index2,
					index3,
					array1,
					array2,
					array3,
					array1Copy,
					array3Copy,
					longitude,
					latitude
				} = this
				const sendData = {
					oilNum: array3Copy[array3[index3]],
					distance: `${array2[index2].split('km')[0]}000`,
					priority: array1Copy[array1[index1]], // 1距离 2价格
					longitude: longitude,
					latitude: latitude,
					pageNo: this.page
				}
				faxianModel.searchAllOilByRedis(sendData).then(res => {
					if (!(index1 === this.index1 && index2 === this.index2 && array3[index3] === this.array3[this.index3])) return // 选择不同过滤掉
					const datas = res.data
					if (!datas.json) { // 报错
						this.loadingType = 'nomore'
						// this.$api.msg(datas.data)
						return
					}
					this.list.push(...datas.json.map(c => {
						c.distanceStr = Number((Number(c.distance) / 1000).toFixed(2))
						c.yhMoney = (Number(c.priceOfficialSearch) - Number(c.priceYfqSearch)).toFixed(2)
						c.curOil = array3[index3]
						return c
					}))
					this.pages = datas.otherJson
					//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
					this.loadingType = this.page >= this.pages ? 'nomore' : 'more';
				}).catch(() => {
					this.loadingType = 'loading'
					this.page = 1;
					this.list = [];
				})
			}
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		background: #f5f5f5;
		position: relative;
		z-index: 1;
	}

	.sort {
		background: #FFFFFF;
		width: 702upx;
		margin: 24upx auto 0;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		display: flex;
	}

	.sort-item {
		flex: 1;
		font-size: 24upx;
		color: #111111;
		padding: 26rpx 0;
		text-align: center;
	}

	.uni-input {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-input:after {
		content: ' ';
		border-top: 10rpx solid #DDDDDD;
		border-left: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		margin-left: 10rpx;
	}

	.main-info {
		background: #FFFFFF;
		width: 702upx;
		margin: 0 auto 0;
		border-bottom-left-radius: 10upx;
		border-bottom-right-radius: 10upx;
	}

	.item-main {
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		padding: 30rpx 24rpx;

		.img-shop {
			width: 160rpx;
			height: 160rpx;
		}

		.info {
			flex: 1;
			width: 0;
			margin-left: 20rpx;

			.title {
				font-size: 27rpx;
			}

			.price {
				font-size: 24rpx;
				margin-top: 10rpx;

				.red {
					font-size: 32rpx;
					color: #EA1212;
				}
			}

			.price-2 {
				display: flex;
				align-items: center;
				justify-content: center;

				.le {
					width: 256rpx;
					font-size: 32rpx;
					height: 56rpx;
					padding: 32rpx 0;
					display: flex;
					justify-content: center;
					align-items: center;
					transform: scale(0.5);
					background: #EA1212;
					color: #FFFFFF;
					border-radius: 28rpx;
					transform-origin: 0 54%;
					opacity: 0.5;
				}

				.ri {
					margin-left: -110rpx;
					flex: 1;
					font-size: 24rpx;
					color: #F47878;
				}
			}

			.location {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 1;
				height: 40rpx;

				.loc-img {
					width: 22rpx;
					height: 28rpx;
				}

				.text {
					margin-left: 10rpx;
					font-size: 24rpx;
					color: #333333;
					width: 0;
					flex: 1;
				}

				.lo-ico {
					margin-left: -140rpx;
					background: #EA1212;
					border-radius: 40rpx;
					width: 280rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					transform: scale(0.5);
					transform-origin: 100% 54%;

					.ico {
						margin-right: 10rpx;
						width: 58rpx;
						height: 50rpx;
					}

					.m {
						font-size: 38rpx;
						color: #FFFFFF;
					}
				}
			}
		}
	}

	.empty {
		position: relative !important;
		padding-top: 200upx !important;
		background: transparent !important;
	}
</style>
