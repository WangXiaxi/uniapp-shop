/**
 * @name    search store
 * @description 缓存一些前端数据
 * @authors wangxiaoxing (995107408@qq.com)
 * @date    2019-07-24 17:43:24
 * @version $Id$
 */

const searchTextStorage  = uni.getStorageSync('searchTextStorage')

const search = {
	state: {
		searchText: searchTextStorage ? searchTextStorage : [] // 搜索过的数据缓存
	},
	getters: {
		searchText: state => state.searchText
	},
	mutations: {
		setSearchText(state, text) {
			if(state.searchText.indexOf(text) === -1) {
				state.searchText.push(text)
			}
			uni.setStorageSync('searchTextStorage', state.searchText)
		},
		clearSearchText(state) {
			state.searchText = []
			uni.removeStorageSync('searchTextStorage')
		}
	},
	actions: {
	}
}

export default search
