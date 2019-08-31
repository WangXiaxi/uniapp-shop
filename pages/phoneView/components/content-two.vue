<template>
	<view class="content-two">
		<view class="input-search">
			<input class="search" v-model="search" />
		</view>
		<view class="mobile-list">
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
	export default {
		data() {
			return {
				search: '',
				hidden: true,
				boxTop: 0,
				barHeight: 0,
				letter: '',
				contacts: []
			}
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
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	
	.input-search {
		background: #f7ff7f7;
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
		height: 60upx;
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
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
