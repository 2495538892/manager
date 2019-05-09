// 抽取所以有关网络请求的文件;
import axios from 'axios';

// 导入vue
import Vue from 'vue'

//导入路由
import router from './router'
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

// 响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.meta.status == 200) {
        Vue.prototype.$message.success(response.data.meta.msg)
    } else if (response.data.meta.status == 400 && response.data.meta.msg == '无效token') {
        // 防止伪造token
        Vue.prototype.$message.warning('你在伪造token')
        sessionStorage.clear('token')
        router.push('login')
        //因为我们在其他页面获取的数据的时候(正确的token的时候)response.data.data是有值的,如果伪造token它的值是null,
        //此时如果用点语法会报错,所以我们就给他一个空数组
        response.data.data=[]
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

const request = {
    // 登录请求;
    login(params) {
        return axios.post('login', params);
    },
    // 封装获取用户列表的请求
    getuser(params) {
        return axios.get('users', { params })
    },
    // 封装删除用户的请求
    deleteuser(id) {
        return axios.delete(`users/${id}`)
    },
    // 封装添加用户的请求
    addusers(params) {
        return axios.post('users', params)
    },
    // 封装修改状态的请求;
    changestate(params) {
        return axios.put(`users/${params.uId}/state/${params.type}`)
    },
    //封装编辑用户信息的请求
    // 先要获取用户的信息,进入编辑状态
    getuserbyID(id) {
        return axios.get(`users/${id}`)
    },
    // 保存编辑
    UpdataUser(params) {
        return axios.put(`users/${params.id}`, { email: params.email, mobile: params.mobile })
    },

    // 角色管理 1.先进入角色管理页,一样先获取用户的信息,上面的getuserbyID,然后在调用角色列表;
    // 角色列表
    roles() {
        return axios.get('roles')
    },
    // 修改角色分配;
    Updataroles(params) {
        return axios.put(`users/${params.id}/role`, { rid: params.rid })
    },

    // 添加角色
    addRoles(params) {
        return axios.post(`roles`, params)
    }

}

// 在全局需要用到就暴露出去
export default {
    // 用另一种方法封装(install),然后用Vue.use调用,写的是插件
    install(Vue) {
        Vue.prototype.$request = request
    }

}