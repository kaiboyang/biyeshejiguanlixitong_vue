import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-house' }
    }]
  },

  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/student',
    name: 'UserManage',
    meta: { title: '角色管理', icon: 'el-icon-menu' },
    children: [
      {
        path: 'base',
        name: 'Base',
        component: () => import('@/views/userManage/base/index'),
        meta: { title: '基地管理', icon: 'el-icon-office-building' }
      },    
      {
        path: 'baseTeacher',
        name: 'BaseTeacher',
        component: () => import('@/views/userManage/baseTeacher/index'),
        meta: { title: '基地负责人', icon: 'user' }
      },
      {
        path: 'schoolTeacher',
        name: 'SchoolTeacher',
        component: () => import('@/views/userManage/schoolTeacher/index'),
        meta: { title: '校内老师', icon: 'user' }
      },
      {
        path: 'noSchoolTeacher',
        name: 'NoSchoolTeacher',
        component: () => import('@/views/userManage/noSchoolTeacher/index'),
        meta: { title: '校外老师', icon: 'el-icon-s-custom' }
      },
      {
        path: 'student',
        name: 'Student',
        component: () => import('@/views/userManage/student/index'),
        meta: { title: '学生', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/productManage',
    component: Layout,
    redirect: '/productManage/checkTopic',
    name: 'ProductManage',
    meta: { title: '毕业设计管理', icon: 'el-icon-s-grid' },
    children: [
      {
        path: 'checkTopic',
        name: 'CheckTopic',
        component: () => import('@/views/productManage/checkTopic/index'),
        meta: { title: '审批题目', icon: 'el-icon-edit' }
      },
      {
        path: 'topicList',
        name: 'TopicList',
        component: () => import('@/views/productManage/topicList/index'),
        meta: { title: '题目列表', icon: 'form' }
      }
    ]
  },
  {
    path: '/toplcUpload',
    component: Layout,
    redirect: '/toplcUpload/student',
    name: 'ToplcUpload',
    meta: { title: '题目上传', icon: 'el-icon-upload2' },
    children: [
      {
        path: 'submitTopic',
        name: 'SubmitTopic',
        component: () => import('@/views/toplcUpload/submitTopic/index'),
        meta: { title: '提交题目', icon: 'el-icon-upload2' }
      },
      {
        path: 'checkStatus',
        name: 'CheckStatus',
        component: () => import('@/views/toplcUpload/checkStatus/index'),
        meta: { title: '查看审核状态', icon: 'el-icon-view' }
      }
    ]
  },

  {
    path: '/annoManage',
    component: Layout,
    children: [{
      path: 'annoManage',
      name: 'AnnoManage',
      component: () => import('@/views/annoManage/index'),
      meta: { title: '公告管理', icon: 'el-icon-chat-round' }
    }]
  },
  {
    path: '/systemManage',
    component: Layout,
    children: [{
      path: 'systemManage',
      name: 'SystemManage',
      component: () => import('@/views/systemManage/index'),
      meta: { title: '系统管理', icon: 'el-icon-setting' }
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router