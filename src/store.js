import Vue from 'vue';

import Vuex from 'vuex'

Vue.use(Vuex);

// 创建仓库
const store = new Vuex.Store({
    // 数据
    state: {
        menulist: []
    },

    // 方法
    mutations: {
        changeMenulist(state, newlist) {
            state.menulist = newlist
        }
    }
})

export default store