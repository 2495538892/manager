// 抽取所以有关网络请求的文件;
import axios from 'axios';

const request = {
    sayHis() {
        console.log('你好')
    }
}

// 在全局需要用到就暴露出去
export default {
    // 用另一种方法封装(install),然后用Vue.use调用,写的是插件
    install(Vue) {
        Vue.prototype.$request = request
    }

}