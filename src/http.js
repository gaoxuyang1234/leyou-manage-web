import Vue from 'vue'
import axios from 'axios'
import config from './config'

// 所有的axios发起的请求，都会以baseURL作为基本路径
axios.defaults.baseURL = config.api;// http://api.leyou.com/api
axios.defaults.timeout = 6000; // 请求的超时时间

// axios.interceptors.request.use(function (config) {
//   // console.log(config);
//   return config;
// })

Vue.prototype.$http = axios;// 把axios对象赋值给了Vue原型中的$http属性，以后所有的Vue实例都可以调用$http
