import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/LogIn.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component:Login
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/TestTranslation',
    name: 'TestTranslation',
    //meta: {requireAuth: true,  },
    component: () => import('../views/useless/TestTranslation.vue')
  },
  {
    path: '/manage',
    name: 'Manage',
    //meta: {requireAuth: true,},
    component: () => import('../views/useless/Manage')
  },
  {
    path: '/translation/:id',
    name: 'Translation',
    //meta: {requireAuth: true,  },
    component: () => import('../views/Translation.vue')
  },
  {
    path: '/about_us',
    name: 'AboutUs',
    //meta: {requireAuth: true,  },
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/help',
    name: 'Help',
    //meta: {requireAuth: true,  },
    component: () => import('../views/Help.vue')
  },
  {
    path: '/group',
    name: 'Group',
    //meta: {requireAuth: true,  },
    component: () => import('../views/Group.vue')
  },
  //only enter with the button in group project 'open'
  {
    path: '/categories/:id',
    name: 'Categories',
    //meta: {requireAuth: true,  },
    component: () => import('../views/Categories.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach( (to,from,next)=>{

  if(to.meta.requireAuth){  // 判断该路由是否需要登录权限
    if(localStorage.getItem("access_token")) {  // 从本地存储localStorage获取当前的token是否存在
      next()
    }else{
      next('/login') //如果token不存在，就跳到首页
    }
  }else{
    if(localStorage.getItem("access_token") && to.path === '/login') {  //token存在时候，进去登录页面就自动跳转到首页
      next('/manage')
    }else{
      next()
    }
  }

});
export default router