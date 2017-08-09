import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '@/components/login'
import Table from '@/components/nav1/Table'
import Form from '@/components/nav1/Form'
import user from '@/components/nav1/user'
import Page4 from '@/components/nav2/Page4'
import Page5 from '@/components/nav2/Page5'
import Only from '@/components/nav3/Only'
import echarts from '@/components/charts/echarts'


Vue.use(Router)

export default new Router({
  base: '/hot/',
  routes: [
     //重定向至登录页

     {
        path:'/',
        redirect:'/login',
        conmponent: login,
        hidden:true
        
     },
     {
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },


    {
        path: '/home',
        component: Hello,
        name: '员工管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
           
            { path: '/table', component: Table, name: '员工信息' },
            { path: '/form', component: Form, name: '添加活动列表' },
            { path: '/user', component: user, name: '查询信息' },
        ]
    },
    {
        path: '/home',
        component: Hello,
        name: '薪酬管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '工时' },
            { path: '/page5', component: Page5, name: '薪资' }
        ]
    },
    {
        path: '/home',
        component: Hello,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/Only', component: Only, name: '一个人的日子' }
        ]
    }, 
     {
        path: '/home',
        component: Hello,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    }
    
   


  ]
})

