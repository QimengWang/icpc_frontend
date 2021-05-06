import axios from 'axios'
import Vue from 'vue';
Vue.prototype.$http = axios;

// import store from '../store/index'
import Router from '../router/index'

// 引入iview Message组件
import {Message} from 'view-design'
import 'view-design/dist/styles/iview.css'

// console.log(Message);

let instance = axios.create({
  baseURL: '/api'
});

instance.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('authorization');
    // if(token) {
      config.headers.authorization = 'Bearer ' + token;
      return config;
    // } else {
    //   console.log("身份过期！");
    //   Message.error("登录身份已过期，请重新登陆!");
    //   Router.push('/login');
    // }
  },
  err => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    // console.log("拦截器res");
    let msg;
    if(err.response.status === 401) {
      // msg = err.response.status + ": " + err.response.statusText;
      Message.error("登录身份已过期，请重新登陆!");
      Router.push('/login');
    } else {
      msg = err.response.status + ": " + err.response.data;
      Message.error(msg);
    }
    // console.log(msg);
    return Promise.reject(err.response);
  }
);

export default instance;
