<template>
  <el-row class="container">
    <el-col :span="24" class="header">
    <!-- 折叠的logo -->
      <el-col :span="8" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="8">
      <!-- 折叠的触发按钮 -->
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>       
      </el-col>
      <el-col :span='4'>
        <audio class="success" 
            src="/static/shinian.mp3"  autoplay loop controls>
        </audio>           
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
          <!-- 头像的导入 -->
            <img :src="Avatar" /> {{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="setOut">点我有惊喜</el-dropdown-item>
            <!-- 注销登录 -->
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
       <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <!-- unique-opened是否只保持一个子菜单的展开 -->
        <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo hua" @open="handleopen" @close="handleclose" @select="handleselect"
           unique-opened router v-show="!collapsed" theme='dark'>
         <!-- 根据路由的内容进行菜单的渲染 -->
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls" style='margin-right:10px'></i>{{item.name}}
              </template>
              <!-- 根据自路由的内容渲染页面 -->
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}
              </el-menu-item>
            </el-submenu>
          <!-- 只有一个节点且子路 -->
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <i :class="item.iconCls" style='margin-right:10px'></i>{{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>
       
        <!--导航菜单-折叠后-->
       <ul class="el-menu el-menu-vertical-demo collapsed" style="collapsed?width='64px':width='230px'"v-show="collapsed" ref="menuCollapsed" theme='dark'>
       <!-- 根据路由内容渲染 模板-->
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
          <!-- 只有一个子节点的时候没有此模板 -->
            <template v-if="!item.leaf">
            <!-- mouseover和mouseout鼠标移入移除时的效果 -->

              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <i :class="item.iconCls"></i>
              </div>
              <!-- 子菜单 -->
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item"  style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}
                </li>
              </ul>
            </template>
            <template v-else>
              <li class="el-submenu">
                <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height:56px;padding: 0 20px;min-width:60px" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
                  <i :class="item.iconCls"></i>
                </div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
           
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import lyf from '@/assets/lyf.jpg'
  export default {
    data() {
      return {
        sysName:'后台管理系统',
        collapsed:false,
        sysUserName: '',
        Avatar: lyf,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        
      },
      handleopen() {
      },
      handleclose() {
    
      },
      handleselect: function (a, b) {
      },
      setOut:function () {
        this.$confirm('我已经炸成一团烟花！！！','提示 ',{
          type: 'info'
        })
      },
      //退出登录
      logout: function () {
        // 预留this
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'info'
        }).then(() => {
          // 退出的时候将用户输入的信息移除并跳转到登录页面
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {
            
        });


      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
      },
      //鼠标移入 显示隐藏
      showMenu(i,status){
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
      }
    },
    mounted() {
      // 从本地获取用户x信息
      var user = sessionStorage.getItem('user');
      if (user) {
        // 从一个字符串解析为一个json对象
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }

    }
  }

</script>

<style scoped lang="scss">
  @import '../styles/vars.scss';
  //解决垂直导航条留白的问题
  .hua{
    width:230px !important;
  }

 .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    //头部的样式
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color:#fff;
      .success{
        margin-top:15px; 
      }
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    
     }
      .main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }
        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        flex:1;  
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          height:100%;
          box-sizing: border-box;
          margin-top:10px;
        }
      }
    }
  }
</style>