import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/views/login'
import AuthCookie from '@/utils/auth'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [{
		path:'/',
		redirect:'/home'
	},
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
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        if (AuthCookie.getToken()) {
            next({
                path: "/home",
                replace: true
            })
        } else {
            next();
        }
    } else {
        if (AuthCookie.getToken()) {
            next();
        } else {
			console.log('to:'+to.path+' 请登陆')
            next({
                path: '/login',
                replace: true
            })
        }
    }

})


export default router
