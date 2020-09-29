// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import echarts from 'echarts'
import ElementUI from 'element-ui';  // 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'; // 导入element-ui 样式
Vue.use(ElementUI); // 安装了element-ui
import filterObj from "@/filters" ;
for (let k in filterObj){
    Vue.filter(k,filterObj[k])
} 
Vue.config.productionTip = false
Vue.prototype.$host = "http://localhost:3030"


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
