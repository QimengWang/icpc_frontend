import Vue from 'vue'
import VueRouter from 'vue-router'

// 在vue-router中想要访问vuex必须导入
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/visitor'
  },
  {
    path: '/visitor',
    // name: 'Visitor',
    component: () => import('../views/Visitor.vue'),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('../components/Home/index.vue')
      },
      {
        path: 'introduction',
        name: 'Introduction',
        component: () => import('../components/Introduction/index.vue')
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('../components/Info/index.vue')
      },
      {
        path: 'contest',
        name: 'Contest',
        component: () => import('../components/Contest/index.vue'),
      },
      {
        path: 'contest/:id',
        // name: 'Detail',
        component: () => import('../components/Contest/detail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/user',
    // name: 'User',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '',
        redirect: 'profile'
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../components/News/index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../components/Profile/index.vue')
      },
      {
        path: 'contest',
        // name: 'Contest',
        component: () => import('../components/PublishCenter/index.vue'),
        children: [
          {
            path: '',
            redirect: 'signUp'
          },
          {
            path: 'signUp',
            name: 'SignUp',
            component: () => import('../components/SignUp/index.vue')
          }
        ]
      },
      {
        path: 'contestManagement',
        name: 'ContestManagement',
        component: () => import('../components/ContestManagement/index.vue')
      },
      {
        path: 'teacherManagement',
        name: 'TeacherManagement',
        component: () => import('../components/TeacherManagement/index.vue'),
      },
      {
        path: 'signUpManagement',
        name: 'SignUpManagement',
        component: () => import('../components/SignUpManagement/index.vue')
      },
      {
        path: 'schoolManagement',
        name: 'SchoolManagement',
        component: () => import('../components/SchoolManagement/index.vue'),
      },
      {
        path: 'studentManagement',
        // name: 'StudentManagement',
        component: () => import('../components/PublishCenter/index.vue'),
        children: [
          {
            path: '',
            redirect: 'studentChecking'
          },
          {
            path: 'studentChecking',
            name: 'StudentChecking',
            component: () => import('../components/StudentChecking/index.vue')
          },
          {
            path: 'studentList',
            name: 'StudentList',
            component: () => import('../components/StudentList/index.vue')
          }
        ]
      },
      {
        path: 'roomManagement',
        component: () => import('../components/PublishCenter/index.vue'),
        children: [
          {
            path: '',
            redirect: 'roomList'
          },
          {
            path: 'roomList',
            name: 'RoomList',
            component: () => import('../components/RoomList/index.vue')
          },
          {
            path: 'roomArrangement',
            name: 'RoomArrangement',
            component: () => import('../components/RoomArrangement/index.vue')
          }
        ]
      }
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to.path);
  if(to.path.includes('user')) {
    // console.log(store.state.email);
    if(!sessionStorage.getItem('authorization')) {
      return next('/login');
    }
  }
  next();
});
export default router
