// 抽取所以有关网络请求的文件;
import axios from 'axios';

// 设置基地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

const request = {
    login(params) {
        return axios.post('login', params);
    },
    // 封装获取用户列表的请求
    getuser(params) {
        return axios.get('users', {
            params, headers: { //第一个为需要传入的参数,第二个文档规定要设置;
                Authorization: sessionStorage.getItem('token')
            }
        })
    }
}

// 在全局需要用到就暴露出去
export default {
    // 用另一种方法封装(install),然后用Vue.use调用,写的是插件
    install(Vue) {
        Vue.prototype.$request = request
    }

}