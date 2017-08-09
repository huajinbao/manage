
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.css' 
import axios from 'axios'
import Mock from './mock'
import babelpolyfill from 'babel-polyfill'
Mock.bootstrap();

Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  template: '<App/>',
 	router,
  components: { App }
 
})

