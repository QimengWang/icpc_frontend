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

// 游客端：
// 获取赛事列表
export function getContests() {
  return axios.get('/visitor/showContest');
}

// 个人赛报名
export function singleSignUp(id) {
  return axios.post('/user/applySingle', {...id}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 获取教练列表
export function getTeachers() {
  return axios.get('/user/showTeacher', {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 团队赛报名
export function groupSignUp(data) {
  return axios.post('/user/applyGroup', {...data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 用户端：
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


// 学生：
// 获取个人赛报名列表
export function getSingleList() {
  return axios.get('/user/showSingle',{
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 获取团队赛报名列表
export function getGroupList() {
  return axios.get('/user/showGroup',{
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 修改团体赛报名信息
export function updateGroup(data) {
  return axios.post('/user/updateGroup', {...data}, {
    headers: {
      authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    }
  });
}

// 教练：
// 新增学校
export function addSchoolForTea(data) {
  return axios.post('/user/teacher/newUniversity', {...data},{
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
