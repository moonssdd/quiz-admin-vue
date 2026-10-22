import Vue from 'vue'
import VueRouter from 'vue-router'
import QuestionManage from '../views/QuestionManage.vue'
import UserManage from '../views/UserManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/questions'
  },
  {
    path: '/questions',
    name: 'QuestionManage',
    component: QuestionManage
  },
  {
    path: '/users',
    name: 'UserManage',
    component: UserManage
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router