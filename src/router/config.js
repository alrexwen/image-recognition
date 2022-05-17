import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'


// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/center',
      name: 'home',
      component: () => import('@/pages/home/index'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: {
            icon: 'dashboard'
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/workplace'),
            },
          ]
        },
            {
              name: '个人中心',
              path: 'info',
              component: () => import('@/pages/center/index')
            },
        {
          name: '管理员中心',
          path: 'admin',
          meta: {
                    // icon: 'file-excel',
                    authority: {
                      permission: 'form'
                    }
                  },
          component: () => import('@/pages/admin/index')
        },
        {
          name: '个人中心',
          path: '/info',
          meta: {
            icon: 'project',
          },
          component: () => import('@/pages/center')
        },

      ]
   },
  ]
}

export default options
