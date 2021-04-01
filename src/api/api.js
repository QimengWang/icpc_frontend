import axios from 'axios';
import Vue from 'vue';

// Vue.use(axios);
Vue.prototype.$http = axios;

axios.defaults.baseURL = '/api';

// 发送邮箱验证码
export function sendCode(email) {
  return axios.post('/user/sendCode',
    {"email": email});
}

// 注册
export function register(data) {
  return axios.post('/user/register', {...data});
}

// 登录
export function login(data) {
  return axios.post('/user/login', {...data});
}
