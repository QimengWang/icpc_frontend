import axios from 'axios';
import Vue from 'vue';

// Vue.use(axios);
Vue.prototype.$http = axios;

axios.defaults.baseURL = '/api';
// 生产环境
// axios.defaults.baseURL = 'http://121.4.159.144:3000';

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
  return axios.get('/user/showInfo', {headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 获取学校列表
export function getSchoolList() {
  return axios.get('/user/showUniversity', {headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 修改个人信息
export function updateInfo(data) {
  return axios.post('/user/updateInfo', {...data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}



// 管理员：
// 获取&查询赛事列表
export function getContestList(searchItem) {
  return axios.get('/user/showContest', {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    },
    params: searchItem
  });
}

// 新建赛事
export function addContest(data) {
  return axios.post('/user/newContest', {...data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 删除赛事
export function deleteContest(arr) {
  return axios.post('/user/deleteContest', {id: arr}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 修改赛事
export function updateContest(data) {
  return axios.post('/user/updateContest', {...data},{
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 赛事详情
export function showContestDetail(data) {
  return axios.get('/user/showContestInfo', {
    params: data,
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 获取学校列表
export function getSchools(data) {
  return axios.get('/user/manager/showUniversityInfo', {
    params: data,
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 修改学校信息
export function updateSchool(data) {
  return axios.post('/user/manager/updateUniversity', {data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 新增学校
export function addSchool(data) {
  return axios.post('/user/manager/addUniversity', {...data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 删除学校
export function deleteSchool(arr) {
  return axios.post('/user/manager/deleteUniversity', {id: arr}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}
