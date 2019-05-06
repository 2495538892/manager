import Vue from 'vue'
import App from './App.vue'

// 导入饿了么插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入抽取出来的路由;
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 载入抽取处理的路由
  router
}).$mount('#app')
