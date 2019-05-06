//导入vue,因为路由是基于vue的;
import Vue from 'vue'

// 导入路由模块
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1.导入登录组件
import login from './components/login.vue'
// 2.导入首页组件
import index from './components/index.vue'

// 3.导入嵌套路由1
import users from './components/users.vue'

// 导入嵌套路由2
import roles from './components/roles.vue'

// 导入嵌套路由3
import rights from './components/rights.vue'

// 导入嵌套路由4
import goods from './components/goods.vue'

// 导入嵌套路由5
import params from './components/params.vue'

// 导入嵌套路由6
import categories from './components/categories.vue'

// 导入嵌套路由7
import orders from './components/orders.vue'

// 导入嵌套路由8
import reports from './components/reports.vue'
//路由规则
const routes = [
    //1.登录的规则
    { path: '/login', component: login },
    // 2.首页的规则  (为什么这里的首页规则的地址不写出/index而写出'/')=>为了方便后面点击'左侧'的子菜单跳转的路径和实例代码一样
    {
        path: '/', component: index,

        // 3.嵌套路由规则
        children: [
            //嵌套路由规则1
            { path: 'users', component: users },
            // 嵌套路由规则2
            { path: 'roles', component: roles },
            // 嵌套路由规则3
            { path: 'rights', component: rights },
            // 嵌套路由规则4
            { path: 'goods', component: goods },
            // 嵌套路由规则5
            { path: 'params', component: params },
            // 嵌套路由规则6
            { path: 'categories', component: categories },
            // 嵌套路由规则7
            { path: 'orders', component: orders },
            // 嵌套路由规则8
            { path: 'reports', component: reports },
        ]

    },
]

// 实例化路由对象;
const router = new VueRouter({
    //挂载路由对象
    routes
})

// 暴露
export default router