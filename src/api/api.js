import axios from 'axios';
import Vue from 'vue';

Vue.use(axios);

axios.defaults.baseURL = '/api';

export function sendEmail() {
  return axios.get('/mail/api.php',
    {params: {address: '577171673@qq.com', name: '注册', certno: '验证码：123456'}});
}
