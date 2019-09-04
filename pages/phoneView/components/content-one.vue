<template>
	<view class="content-one">
		<!-- 空白页 -->
		<empty v-if="list.length === 0" text="暂无通话记录"></empty>
		<view v-else class="mobile-list">
			<view class="item" :class="{ act: item.status === '未接通' }" v-for="(item, index) in list" :key="index">
				<image class="header" src="../../static/icon/gywm.png"></image>
				<view class="info">
					<view class="name">王晓欣</view>
					<view class="mobile">
						<view class="tell">{{item.calle164}}</view>
						<view class="date">29/8 呼出</view>
						<image class="trans" src="../../static/icon/phone_4.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	import phoneModel from '../../../api/phone/index.js'
	import empty from '@/components/empty'
	export default {
		components: {
			empty
		},
		data() {
			return {
				list: []
			}
		},
		computed: {
			...mapGetters(['tokenPhone'])
		},
		methods: {
			getLogData() {
				const {
					mobile
				} = uni.getStorageSync('userInfo')
				phoneModel.getCallLog({ mobile }).then(res => {
					this.list = res.data.json
				})
			}
		},
		watch: {
			tokenPhone(val) {
				if(val) {
					this.getLogData()
				}
			}
		}
	}
</script>

<style lang="scss">
	.content-one {
		// 通话记录
		padding-top: 32upx;
		margin: 0 24upx;

		.item {
			height: 100upx;
			margin-bottom: 32upx;
			display: flex;
			justify-content: center;
			align-items: center;
			&.act {
				.info {
					.name {
						color: $base-color;
					}
					.mobile {
						color: $base-color;
					}
				}
			}
			.header {
				width: 100upx;
				height: 100upx;
			}

			.info {
				flex: 1;
				margin-left: 24upx;

				.name {
					font-size: 30upx;
					color: #000000;
					margin-bottom: 20upx;
				}

				.mobile {
					display: flex;
					align-items: center;
					color: #999999;
					font-size: 28upx;

					.date {
						color: #999999;
						margin-left: 10upx;
					}

					.trans {
						width: 16upx;
						height: 16upx;
						margin-left: 6upx;

						&.act {
							transform: rotate(180deg);
						}
					}
				}
			}
		}
	}
</style>
