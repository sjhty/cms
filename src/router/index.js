import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/components/page/home'], resolve)
const Dashboard = resolve => require(['@/components/page/dashboard'], resolve)
const UserList = resolve => require(['@/components/page/user/list'], resolve)
const AddUser = resolve => require(['@/components/page/user/add'], resolve)
const ProductList = resolve => require(['@/components/page/product/list'], resolve)
const test = resolve => require(['@/components/HelloWorld'], resolve)
const Order = resolve => require(['@/components/page/order/order'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-shouye', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '首页', menuShow: true}
      ]
    },
    {
      path: '/',
      name: '用户管理',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-houtaiyonghuguanli', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '用户查询', menuShow: true},
        {path: '/user/add', component: AddUser, name: '添加用户', menuShow: true}
      ]
    },
    {
      path: '/',
      name: '商品管理',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-shangpinguanli', // 图标样式class
      children: [
        {path: '/product/list', component: ProductList, name: '商品查询', menuShow: true},
      ]
    },
    // {
    //   path: '/',
    //   name: 'test',
    //   component: Home,
    //   menuShow: true,
    //   iconCls: 'iconfont icon-shangpinguanli', // 图标样式class
    //   children: [
    //     {path: '/test', component: test, name: 'test', menuShow: true},
    //   ]
    // },
    {
      path: '/',
      name: '订单管理',
      component: Home,
      menuShow: true,
      iconCls: 'iconfont icon-shangpinguanli', // 图标样式class
      children: [
        {path: '/order/order', component: Order, name: '用户下单', menuShow: true},
      ]
    },
  ]
})
