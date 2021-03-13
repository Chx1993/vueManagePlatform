import Vue from 'vue'
import Router from 'vue-router'
import { Layout} from "../layout"; // 页面整体布局
// import { topRouterMap } from "./topRouter";

process.env.NODE_ENV === "development" ? Vue.use(Router) : null;


/* Router Modules */
import chartsRouter from './modules/charts'
import componentsRouter from './modules/components'

/**
 * 1、roles:后台返回的权限结构;
 * 
 */
//手动跳转的页面白名单
const whiteList = [
  '/login'
];
/**
 * path:''与path:'*'的区别：
 * 1、path:'*', 会匹配所有路径
 * 2、path:''，也是会匹配到路由
 * 
 */
//默认不需要权限的页面
export const constantRouterMap = [{
    path: '',
    component: Layout,
    redirect: '/index/index',
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/index',
    name: 'index',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'dashboard',
    },
    noDropdown: true,
    children: [{
      path: 'index',
      meta: {
        title: '首页',
        icon: 'dashboard',
        routerType: 'leftmenu'
      },
      component: () => import('@/views/index/index'),
    }]
  }
]

//注册路由
export default new Router({
  mode: 'history', // 默认为'hash'模式
  base: '/', // 添加根目录,对应服务器部署子目录
  routes: constantRouterMap
})

//异步路由（需要权限的页面）
export const asyncRouterMap = [
  {
    path: '/icon',
    component: Layout,
    name: 'Icons',
    meta: {
      title: 'Icons',
      icon: 'icon'
    },
    noDropdown:true,
    children: [
    {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { 
          title: 'Icons',
          icon: 'icon',
          noCache: true 
        }
      }
    ]
  },
  chartsRouter,
  componentsRouter,
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

 {
    path: '/error',
    component: Layout,
    name: 'errorPage',
    meta: {
      title: '错误页面',
      icon: 'error'
    },
    children: [{
        path: '401',
        name: 'page401',
        component: () => import('@/views/errorPage/401'),
        meta: {
          title: '401',
          noCache: true
        }
      },
      {
        path: '404',
        name: 'page404',
        component: () => import('@/views/errorPage/404'),
        meta: {
          title: '404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
];

/**
 *  路由设置要求：
 * 1、该路由有子菜单,可以设置多层嵌套路由children;如果没有子菜单,不需要设置children;通过item.children.length来判断路由的级数;
 * 2、登录成功后,定位到系统首页时,需要加载页面整体布局组件Layout并进行子路由定向加载;
 * 
 * 按需加载路由组件的2种方法：
 * 1、component: () => import('@/page/login')
 * 2、component:resolve => require(['@/page/fundPosition'], resolve)
 * 
 * 
 * 
 * 什么情况下，路由会定位到404页面?
 * 路由中redirect:'',不起作用？
 * 三级子菜单要在顶部展示？
 * 
 * 
 * 
 */
