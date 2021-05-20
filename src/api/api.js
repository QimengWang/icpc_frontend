import axios from 'axios';
import Vue from 'vue';
//
// Vue.use(axios);
Vue.prototype.$http = axios;
import instance from './interceptors';

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
  return instance.post('/user/applySingle', {...id}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 获取教练列表
export function getTeachers() {
  return instance.get('/user/showTeacher', {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 团队赛报名
export function groupSignUp(data) {
  return instance.post('/user/applyGroup', {...data}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 用户端：
// 获取个人信息
export function getInfo() {
  return instance.get('/user/showInfo',
    // {headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 获取学校列表
export function getSchoolList() {
  return instance.get('/user/showUniversity',
  //   {headers: {
  //     authorization: 'Bearer ' + sessionStorage.getItem('authorization')
  //   }
  // }
  );
}

// 修改个人信息
export function updateInfo(data) {
  return instance.post('/user/updateInfo', {...data},
    // {
  //   headers: {
  //     authorization: 'Bearer ' + sessionStorage.getItem('authorization')
  //   }
  // }
  );
}


// 学生：
// 获取报名列表
export function getApplyList() {
  return instance.get('/user/student/showApply');
}


// 获取个人赛报名列表
export function getSingleList() {
  return instance.get('/user/showSingle',
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 取消报名
export function cancelApply(data) {
  return instance.post('/user/cancelContest', {...data},
  //   {
  //   headers: {
  //     authorization: 'Bearer ' + sessionStorage.getItem('authorization')
  //   }
  // }
  );
}

// 查看准考证
export function showAdm(id) {
  return instance.get('/user/student/showAdm', {
    params: {cid: id}
  })
}

// 获取团队赛报名列表
export function getGroupList() {
  return instance.get('/user/showGroup',
  //   {
  //   headers: {
  //     authorization: 'Bearer ' + sessionStorage.getItem('authorization')
  //   }
  // }
  );
}

// 修改团体赛报名信息
export function updateGroup(data) {
  return instance.post('/user/updateGroup', {...data},
  //   {
  //   headers: {
  //     authorization: 'Bearer ' + sessionStorage.getItem('authorization')
  //   }
  // }
  );
}

// 查询成绩
export function getGrades() {
  return instance.get('/user/student/showGrade');
}

// 教练：
// 新增学校
export function addSchoolForTea(data) {
  return instance.post('/user/teacher/newUniversity', {...data},
    // {
    // headers: {
    // authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 获取已经通过审核的学生列表
export function getCheckedStudents() {
  return instance.get('/user/teacher/showStudent',
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 获取待审核学生列表
export function getUncheckedStudents() {
  return instance.get('/user/teacher/showCheckStudent',
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 审核学生通过
export function studentChecked(arr) {
  return instance.post('/user/teacher/checkStudentTrue', {id: arr},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  )
}

// 审核学生不通过
export function studentUnchecked(arr) {
  return instance.post('/user/teacher/checkStudentFalse', {id: arr},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  )
}

// 管理员：
// 获取&查询赛事列表
export function getContestList(searchItem) {
  return instance.get('/user/showContest', {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // },
    params: searchItem
  });
}

// 新建赛事
export function addContest(data) {
  return instance.post('/user/newContest', {...data},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 删除赛事
export function deleteContest(arr) {
  return instance.post('/user/deleteContest', {id: arr},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 修改赛事
export function updateContest(data) {
  return instance.post('/user/updateContest', {...data},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 赛事详情
export function showContestDetail(data) {
  return axios.get('/user/showContestInfo', {
    params: data,
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 获取学校列表
export function getSchools(data) {
  return instance.get('/user/manager/showUniversityInfo', {
    params: data,
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 获取某个学校的教练员列表
export function getTeachersBySid(id) {
  return instance.get('/user/manager/showTeacher', {
    params: {id: id},
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 修改学校信息
export function updateSchool(data) {
  return instance.post('/user/manager/updateUniversity', {...data},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 新增学校
export function addSchool(data) {
  return instance.post('/user/manager/addUniversity', {...data},
    // {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  // }
  );
}

// 删除学校
export function deleteSchool(arr) {
  return instance.post('/user/manager/deleteUniversity', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 获取待审核的学校列表
export function getUncheckedSchool() {
  return instance.get('/user/manager/school/showCheckUn',{
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 审核学校通过
export function schoolChecked(arr) {
  return instance.post('/user/manager/school/checkTrue', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 审核学校不通过
export function schoolUnchecked(arr) {
  return instance.post('/user/manager/school/checkFalse', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 获取待审核的教练列表
export function getUncheckedTeachers() {
  return instance.get('/user/manager/teacher/showCheckTeacher',{
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 审核教练通过
export function teacherChecked(arr) {
  return instance.post('/user/manager/teacher/checkTeacherTrue', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 审核教练不通过
export function teacherUnchecked(arr) {
  return instance.post('/user/manager/teacher/checkTeacherFalse', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 报名管理
// 获取赛事列表
export function showContestList() {
  return instance.get('/user/manager/showContestIng',{
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 根据赛事id获取报名名单
export function getListByCid(id) {
  return instance.get('/user/manager/showApply',{
    params: {id: id},
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 报名审核通过
export function signUpChecked(data) {
  return instance.post('/user/manager/apply/checkApplyTrue', {
    data: [{...data}]
  });
}

// 报名审核不通过
export function signUpUnchecked(data) {
  return instance.post('/user/manager/apply/checkApplyFalse', {
    data: [{...data}]
  });
}

// 生成准考证
export function createAdm(id) {
  return instance.post('/user/manager/createAdm', {
    cid: id
  })
}

// 考场管理
// 获取考场列表
export function getRooms() {
  return instance.get('/user/manager/test/showRoom',{
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 新增考场
export function addRoom(data) {
  return instance.post('/user/manager/test/addRoom', {...data}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 修改考场信息
export function updateRoom(data) {
  return instance.post('/user/manager/test/updateRoom', {...data}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 删除考场
export function deleteRoom(arr) {
  return instance.post('/user/manager/test/deleteRoom', {rid: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 获取考场安排列表
export function getArrangementByCid(cid) {
  return instance.get('/user/manager/test/showArrange', {
    params: {cid: cid},
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 获取某赛事报名总人数
export function getTotalByCid(cid) {
  return instance.get('/user/manager/contest/showTotal', {
    params: {cid: cid},
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 获取可用考场列表
export function getAvailRoom() {
  return instance.get('/user/manager/test/availableRoom', {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  })
}

// 新增考场安排
export function addArrange(arr) {
  return instance.post('/user/manager/test/addArrange', {data: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 修改考场安排
export function updateArrange(data) {
  return instance.post('/user/manager/test/updateArrange', {...data}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 取消考场安排
export function cancelArrange(arr) {
  return instance.post('/user/manager/test/cancelArrange', {id: arr}, {
    // headers: {
    //   authorization: 'Bearer ' + sessionStorage.getItem('authorization')
    // }
  });
}

// 成绩管理：
// 获取成绩列表
export function getGradesByCid(id) {
  return instance.post('/user/manager/showGrade', {cid: id})
}

// 修改成绩
export function updateGrade(data) {
  return instance.post('/user/manager/updateGrade', {...data});
}

// 下载成绩模板
export function downloadExcel(id) {
  return instance.get('/user/manager/showExecl', {
    params: {
      cid: id
    }
  });
}

// 上传成绩
export function uploadExcel(data) {
  return instance.post('/user/manager/addGrade', {
    data
  });
}
