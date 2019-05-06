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
    {path:'/login',component:login},
    {path:'/index',component:index},
]

// 实例化路由对象;
const router = new VueRouter({
    //挂载路由对象
    routes
})

// 暴露
export default router