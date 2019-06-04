import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: 'dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: 'profile',
    children: [{
      name: 'Profile',
      path: 'profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人信息', icon: 'user' }
    }]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   children: [{
  //     name: 'Profile',
  //     path: 'index',
  //     component: () => import('@/views/profile/index'),
  //     meta: { title: '个人信息', icon: 'user' }
  //   }]
  // },

  {
    path: '/course',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'CourseSelect',
        component: () => import('@/views/course/index'),
        meta: { title: '课程选择', icon: 'list' }
      }
    ]
  },
  {
    path: '/elective',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Elective',
      component: () => import('@/views/elective/index'),
      meta: { title: '已选课程', icon: 'elective' }
    }]
  },
  {
    path: '/grade',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Grade',
      component: () => import('@/views/grade/index'),
      meta: { title: '成绩查询', icon: 'grade' }
    }]
  },

  {
    path: '/plan',
    component: Layout,
    children: [{
      name: 'Plan',
      path: 'index',
      component: () => import('@/views/plan/index'),
      meta: { title: '培养计划', icon: 'plan' }
    }]
  },
  {
    path: '/manage/course',
    component: Layout,
    children: [{
      name: 'courseManage',
      path: 'index',
      component: () => import('@/views/manage/course/index'),
      meta: { title: '课程管理', icon: 'college' }
    }]
  },
  {
    path: '/statistics',
    component: Layout,
    children: [{
      name: 'courseManage',
      path: 'index',
      component: () => import('@/views/statistics/index'),
      meta: { title: '课程统计', icon: 'course' }
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    children: [{
      name: 'Teacher',
      path: 'index',
      component: () => import('@/views/manage/teachers/index'),
      meta: { title: '教师管理', icon: 'teacher', roles: ['admin', 'stu', 'edit'] }
    }]
  },
  {
    path: '/student',
    component: Layout,
    children: [{
      name: 'Student',
      path: 'index',
      component: () => import('@/views/manage/students/index'),
      meta: { title: '学生管理', icon: 'student' }
    }]
  },

  {
    path: 'cqut',
    component: Layout,
    children: [
      {
        // path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        path: 'https://www.cqut.edu.cn/',
        meta: { title: 'CQUT', icon: 'link' }
      }
    ]
  },
  {
    path: 'icqut',
    component: Layout,
    children: [
      {
        // path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        path: 'http://i.cqut.edu.cn/zfca/login',
        meta: { title: '数字化校园', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  {
    path: '/teacher',
    component: Layout,
    meta: { roles: ['admin', 'stu', 'edit'] },
    children: [{
      name: 'Teacher',
      path: 'index',
      component: () => import('@/views/manage/teachers/index'),
      meta: { title: '教师管理', icon: 'teacher', roles: ['admin', 'stu', 'edit'] }
    }]
  },
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
