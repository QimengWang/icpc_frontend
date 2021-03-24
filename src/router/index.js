import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/visitor'
  },
  {
    path: '/visitor',
    name: 'Visitor',
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
        component: () => import('../components/Contest/index.vue')
      },
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
    name: 'User',
    component: () => import('../views/User.vue'),
    children: [
      {
        path: '',
        redirect: ''
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../components/Profile/index.vue')
      },
      {
        path: 'news',
        name: 'News',
        component: () => import('../components/News/index.vue')
      },

    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
