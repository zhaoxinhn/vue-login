import Cookies from 'js-cookie'

const state = {
    // 用户名
    name: '',
    navList: []
}

const mutations = {
    setName: (state, data) => {
        state.name = data
    },
    setNavList: (state, data) => {
        state.navList = data
    }
}

const actions = {
    // 获取该用户的菜单列表
    getNavList({
        commit
    }) {
        return new Promise((resolve) => {
            axios({
                url: '/user/navlist',
                methods: 'post',
                data: {}
            }).then((res) => {
                commit("setNavList", res)
                resolve(res)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
	actions
}
