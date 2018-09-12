import Cookies from 'js-cookie'
import axios from '@/axios'

const authToken = {
    // 当Token超时后采取何种策略
    // jumpAuthPage  每次请求时判断Token是否超时，若超时则跳转到授权页面
    // getNewToken  每次请求时判断Token是否超时，若超时则获取新Token (推荐)
    tokenTimeoutMethod: 'getNewToken',

    // Token是否超时
    getToken: function () {
        return Cookies.get('token')
    },

    // 设置Token
    setToken: function (token) {
        // TODO: 设置token，并填写有效期
        var maxAge = new Date(new Date().getTime() + 30 * 1000)
        Cookies.set('token', token, {
            expires: maxAge
        })
    },

    // 移除Token
    removeToken: function () {
        Cookies.remove('token')
    },

    getUser: function () {
        return Cookies.get('user');
    },

    setUser: function (user) {
        var maxAge = new Date(new Date().getTime() + 30 * 1000)
        Cookies.set('user', user, {
            expires: maxAge
        })
    },

    removeUser: function () {
        return Cookies.remove('user');
    },

    loginByEmail: function (userInfo) {
        return new Promise((resolve) => {
            axios({
                url: '/login',
                method: 'post',
                data: {
                    ...userInfo
                }
            }).then(res => {
                this.setToken(res.token);
                this.setUser(res.name);
                res.login = true;
                resolve(res)
            }).catch(function (error) {
                console.log(error);
            });
        });
    },
    // 登出
    logout: function () {
        return new Promise((resolve) => {
            this.removeUser();
            this.removeToken();
            resolve();
        })
    },
    // 重新获取用户信息及Token
    // TODO: 这里不需要提供用户名和密码，实际中请根据接口自行修改
    relogin: function () {
        return new Promise((resolve) => {
            axios({
                url: '/relogin',
                method: 'get'
            }).then(res => {
                this.setToken(res.token);
                resolve(res)
            })
        });
    },
    getNewToken: function () {
        return new Promise((resolve) => {
            axios({
                url: '/getToken',
                method: 'get',
                param: {
                    token: state.token
                }
            }).then((res) => {
                this.setToken(res.token);
                resolve()
            })
        });
    }
}

export default authToken
