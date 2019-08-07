<template>
	<view>
		<view class="password plane " :class="show?'active':''">
			<view class="plane-close" @click="close()"></view>
			<view class="plane-content">
				<view class="title_1 flex-row">
					<view class="left slide" @click="close()">
						<image src="/static/icon_close2@2x.png" mode="aspectFill" :lazy-load="true"></image>
					</view>
					<view class="center">
						<text>请输入支付密码</text>
					</view>
					<view class="right slide"></view>
				</view>

				<view class="partation first-partation"></view>


				<view class="code">
					<view class="">
						<view class="code-box flex-row">
							<view class="code-box-item">
								{{password[0] && '*' || ''}}
							</view>
							<view class="code-box-item">{{password[1] && '*' || ''}}</view>
							<view class="code-box-item">{{password[2] && '*' || ''}}</view>
							<view class="code-box-item">{{password[3] && '*' || ''}}</view>
							<view class="code-box-item">{{password[4] && '*' || ''}}</view>
							<view class="code-box-item">{{password[5] && '*' || ''}}</view>
						</view>
					</view>
				</view>
				<input type="number" v-model="password" />
				<view class="keyboard flex-row flex-wrap">
					<button v-for="(item, index) in list" class="keyboard-item" :class="{ hide: index === 9 }" @click="key(item, index)" :key="index">
						<text>{{item}}</text>
					</button>
					<button class="keyboard-item delte" @click="del()">
						<image class="" src="/static/delte.png" mode="aspectFill" :lazy-load="true"></image>
					</button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	const field = '[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]'
	export default {
		data() {
			return {
				password: '',
				list: []
			};
		},
		props: ['show'],
		computed: {
		},
		methods: {
			key(key, index) {
				if (index === 9) return
				if (this.password.length < 6) {
					this.password += key
					if (this.password.length === 6) {
						this.$emit('success', this.password)
					}
				}
			},
			close() {
				this.$emit('close', false)
			},
			del() {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1)
				}
			},
			clear() {
				this.password = ''
			},
			shuffle(a) {
				const len = a.length;
				for (let i = 0; i < len; i++) {
					let end = len - 1;
					let index = (Math.random() * (end + 1)) >> 0;
					let t = a[end];
					a[end] = a[index];
					a[index] = t;
				}
				a.splice(9, 0, '-')
				return a;
			}
		},
		watch: {
			show: {
				handler(v) {
					if (v) {
						this.list = this.shuffle(JSON.parse(field))
					} else {
						this.clear()
					}	
				}
			}
		},
	}
</script>

<style>
	.password.plane .title_1 .slide {
		width: 10%;
	}

	page {
		box-sizing: border-box;
		-webkit-overflow-scrolling: touch
	}



	.eee {
		background: #eee;
	}

	.fff {
		background: #fff;
	}

	/* 使用伪类模仿border  */

	.border-bottom-after::after {
		content: "";
		display: block;
		width: 100%;
		height: 1px;
		background: #eee;
		position: absolute;
		left: 0;
		bottom: 0;
		transform: scaleY(0.5);
	}

	button::after {
		border: 0;
	}

	image {
		max-width: 100%;
	}

	/*每个页面公共css */

	.flex-wrap {
		flex-wrap: wrap;
	}

	.flex-nowrap {
		flex-wrap: nowrap;
	}

	.flex-row {
		display: flex;
		flex-direction: row;
	}

	.flex-col {
		display: flex;
		flex-direction: column;
	}

	.justify-content-around {
		justify-content: space-around;
	}


	/* 隔断 */

	.partation {
		width: 100%;
		height: 1upx;
		background: #f4f4f4;
		transform: scaleY(0.5);
	}

	.partation-30 {
		width: 100%;
		height: 20upx;
		background: #f4f4f4;
		box-sizing: border-box;
	}

	.mlr-30 {
		margin: 0 30upx;
		width: calc(100% - 60upx);
	}

	/* 医生详情公用 */

	.title_1 {
		justify-content: space-between;
		align-items: center;
		height: 100upx;
		padding: 0 30upx;
	}

	.title_1 .left {
		font-size: 30upx;
		color: #333;
		/* font-weight: 500; */
	}

	.title_1 .center {
		font-size: 30upx;
		color: #666;
		margin: 0 auto 0 30upx;
	}

	.title_1 .right text {
		font-size: 26upx;
		color: #999;
	}

	.title_1 image {
		width: 36upx;
		height: 36upx;
		display: block;
	}

	.password input {
		display: none;
	}

	.password.plane .title_1 .center {
		margin: auto;
	}

	.password.plane {
		visibility: hidden;
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0;
		top: 0;
		display: flex;
		align-items: flex-end;
		z-index: -1;
		transition: all 0s;
		transition-delay: .3s;
	}

	.password.plane.active {
		visibility: visible;
		transition-delay: 0s;
		z-index: 999;
	}

	.password.plane .plane-close {
		background: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0;
		transition: all .3s;
		transition-delay: 0s;
	}

	.password.plane.active .plane-close {
		transition-delay: .1s;
		opacity: 1;
	}

	.password.plane .plane-content {
		width: 100%;
		min-height: 380upx;
		max-height: 80vh;
		overflow-y: auto;
		background: #fff;
		transition: all .3s;
		transform: translateY(100%);
		background: #fff;
		width: 100%;
		/* padding: 30upx; */
	}

	.password.plane.active .plane-content {
		transform: translateY(0);
		transition-delay: 0.3s;
	}

	.password .code {
		width: 100%;
		height: 256upx;
		background: #F4F4F4;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
	}

	.password .code-box {
		justify-content: center;
		align-items: center;
		border: 1px solid #D0D0D0;
	}

	.password .code-box-item {
		width: 100upx;
		height: 100upx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 60upx;
	}

	.password .code-box-item:not(:last-child) {
		border-right: 1px solid #D0D0D0;
	}

	.password .forget {
		text-align: right;
		font-size: 26upx;
		line-height: 60upx;
		color: #666;
	}


	.password .keyboard {
		width: 100%;
		min-height: 432upx;
		background: #D2D5DB;
		padding-bottom: 24upx;
	}

	.password .keyboard-item {
		width: calc(100vw / 3 - 32upx);
		margin: 0 0 0 24upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 20upx;
		margin-top: 24upx;
		font-size: 50upx;
		color: #333;
		box-shadow: 0 2upx 3upx rgba(0, 0, 0, .5);
		height: 100upx;
	}

	.password .keyboard-item.button-hover {
		opacity: .5;
	}

	.password .keyboard-item text {
		line-height: 50upx;
	}

	.password .keyboard-item text.zimu {
		font-size: 20upx;
		line-height: 30upx;
	}

	.password .keyboard .hide {
		opacity: 0;
	}

	.password .delte {
		background: none;
		box-shadow: none;
	}

	.password .delte image {
		width: 46upx;
		height: 36upx;
	}
</style>
