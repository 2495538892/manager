//导入vue,因为路由是基于vue的;
import Vue from 'vue'

// 导入路由模块
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1.导入登录组件
import login from './components/login.vue'
// 2.导入首页组件
import index from './components/index.vue'

//路由规则
const routes=[
    //1.登录的规则
    {path:'/login',component:login},
    // 2.首页的规则  (为什么这里的首页规则的地址不写出/index而写出'/')=>为了方便后面点击'左侧'的子菜单跳转的路径和实例代码一样
    {path:'/',component:index},
]

// 实例化路由对象;
const router = new VueRouter({
    //挂载路由对象
    routes
})

// 暴露
export default router