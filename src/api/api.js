import axios from 'axios';
import Vue from 'vue';

// Vue.use(axios);
Vue.prototype.$http = axios;

axios.defaults.baseURL = '/api';
// 生产环境
// axios.defaults.baseURL = 'http://121.4.159.144:3000';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    authorization: 'Bearer ' + localStorage.getItem('authorization')
  }
});

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

// 获取个人信息
export function getInfo() {
  return instance.get('/user/showInfo');
}

// 修改个人信息
export function updateInfo(data) {
  return instance.post('/user/updateInfo', {...data});
}
