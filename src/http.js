// 抽取所以有关网络请求的文件;
import axios from 'axios';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 请求拦截器===回调函数,请求的时候携带Authorization=token ,这样就可以统一设置token
axios.interceptors.request.use(function (config) {
    console.log(config)
    config.headers.Authorization = sessionStorage.getItem('token')
    return config;
}, function (error) {
    return error
});


const request = {
    login(params) {
        return axios.post('login', params);
    },
    // 封装获取用户列表的请求
    getuser(params) {
        return axios.get('users', { params })
    }
}

// 在全局需要用到就暴露出去
export default {
    // 用另一种方法封装(install),然后用Vue.use调用,写的是插件
    install(Vue) {
        Vue.prototype.$request = request
    }

}