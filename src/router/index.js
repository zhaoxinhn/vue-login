import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import Auth from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
		{
            path: '/home',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/error',
            component: () =>
				import ( /* webpackChunkName: 'error' */ '@/views/error'),
            children: [{
                    path: '401',
                    component: () =>
                        import ( /* webpackChunkName: 'error' */ '@/views/error/401')
                },
                {
                    path: '403',
                    component: () =>
                        import ( /* webpackChunkName: 'error' */ '@/views/error/403')
                },
                {
                    path: '404',
                    component: () =>
                        import ( /* webpackChunkName: 'error' */ '@/views/error/404')
                },
                {
                    path: '500',
                    component: () =>
                        import ( /* webpackChunkName: 'error' */ '@/views/error/500')
                }
            ]
        }
    ]
})

// 路由跳转前验证
// router.beforeEach((to, from, next) => {
    // 开启进度条
    // NProgress.start();
// 
//     // 判断用户是否处于登录状态
//     // debugger
//     if (Auth.isLogin()) {
//         // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
//         // 这种情况出现在手动修改地址栏地址时
//         if (to.path === '/login') {
//             next({
//                 path: "/home",
//                 replace: true
//             })
//         } else if (to.path.indexOf("/error") >= 0) {
//             // 防止因重定向到error页面造成beforeEach死循环
//             next()
//         } else {
//             next()
// 
//         }
//     } else {
//         console.warn('当前未处于登录状态，请登录:' + to.path)
//         next({
//             path: "/login",
//             replace: true
//         })
// 		console.log('跳转到登陆页面')
//         // NProgress.done()
//     }
// })


export default router
