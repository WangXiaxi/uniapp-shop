<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in flist" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-'+item.id">
				<text class="s-item">{{item.name}}</text>
				<view class="t-list">
					<view @click="navToList(titem.id)" v-if="titem.parent_id === item.id" class="t-item" v-for="titem in tlist" :key="titem.id">
						<image :src="titem.cat_pic" @error="onImageError(titem)"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<mix-loading v-if="pageLoading"></mix-loading>
	</view>
</template>

<script>
	import mixLoading from '../../components/mix-loading/mix-loading.vue'
	import categoryModel from '../../api/category/index.js'
	import {
		url_image
	} from '../../common/config/index.js'
	export default {
		components: {
			mixLoading
		},
		data() {
			return {
				pageLoading: false,
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				flist: [],
				slist: [],
				tlist: [],
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			//监听image加载失败
			onImageError(key, index) {
				this.$set(key, 'cat_pic', '/static/errorImage.jpg')
			},
			loadData() {
				this.pageLoading = true
				categoryModel.getAllCategoryList({
					ydui: true
				}).then(res => {
					const list = res.data.map(c => {
						const cur = c
						this.flist.push(JSON.parse(JSON.stringify(cur))) //parent_id为父级id, 没有parent_id或者parent_id=0是一级分类
						const sCur = JSON.parse(JSON.stringify(cur))
						sCur.parent_id = cur.id
						this.slist.push(sCur) //parent_id为父级id, 没有parent_id或者parent_id=0是一级分类
						if (cur.childrens) {
							this.tlist.push(...cur.childrens.map(c => {
								c.cat_pic = `${url_image}/${c.cat_pic}`
								return c
							}))
						}
						return cur
					})
					this.currentId = this.flist[0].id
					this.pageLoading = false
				}).catch(() => {
					this.pageLoading = false
				})
				
			},
			//一级分类点击
			tabtap(item) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				this.currentId = item.id;
				let index = this.slist.findIndex(sitem => sitem.parent_id === item.id);
				this.tabScrollTop = this.slist[index].top;
			},
			//右侧栏滚动
			asideScroll(e) {
				if (!this.sizeCalcState) {
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
				let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
				if (tabs.length > 0) {
					this.currentId = tabs[0].parent_id;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize() {
				let h = 0;
				this.slist.forEach(item => {
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(id) {
				uni.navigateTo({
					url: `/pages/product/list?id=${id}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}

	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}

	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;

		&.active {
			color: $base-color;
			background: #f8f8f8;

			&:before {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside {
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}

	.s-item {
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}

	.t-list {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;

		&:after {
			content: '';
			flex: 99;
			height: 0;
		}
	}

	.t-item {
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;

		image {
			width: 140upx;
			height: 140upx;
		}
	}
</style>
