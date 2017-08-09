<template >
	<div class='node' :style='node'>

		<el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='0px' label-position='left' class='demo-ruleForm login-container'>
			<el-form-item>
				<h3 class='title'>后台管理系统登录</h3>
			</el-form-item>			
			<el-form-item prop='name'>
				<!-- auto-complete规定禁用自动完成功能 -->
				<el-input type='text' v-model.name='ruleForm.name' auto-complete='off' placeholder='admin'></el-input>
			</el-form-item>
			<el-form-item prop='pass'>
				<el-input type='password' v-model.pass='ruleForm.pass' auto-complete='off' placeholder='密码'></el-input>
			</el-form-item>
			 <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
			<el-form-item>
				<el-button style='width:100%'type='primary' @click.native.prevent='submitForm' :loading='logining'>登录</el-button>
			</el-form-item>
		</el-form>	
	</div>
	
</template>
<script>
	// 引入requestLogin模块

	import {requestLogin} from '../api/api'
	export default{
		name: 'login',
		data () {
			
			return {
				logining:false,
				ruleForm:{
					name:'admin',
					pass:'123456'
				},
				rules: {
					name: [
						{required:true,message:'请输入账号',trigger: 'blur'}
					],
					pass: [
						{required: true,message:'请输入密码',trigger: 'blur'}
					]

				},
				checked:true,
				// 背景图片
				node:{
					backgroundImage: "url(" + require("../assets/hh_02.png") + ")",
		            backgroundRepeat: "no-repeat",
		            // backgroundSize:'cover',
		            width:'100%',
		            height:'100%'
				}
			}
		},
		methods: {
			// 定义登录方法
			submitForm(){
							
				console.log(this);
			    this.$refs.ruleForm.validate((valid) => {
			         if (valid) {
			         
			            this.logining = true;
			        // 获取用户输入的内容保存到对象中
			            var loginParams = { username: this.ruleForm.name, password: this.ruleForm.pass };
			            // 发送axios请求将数据发送至服务器
			            requestLogin(loginParams).then(data => {
			            	console.log(this);
			              this.logining = false;
			             
			              let { msg, code, user } = data;
			              //失败时
			              if (code !== 200) {
			                this.$message({
			                  message: msg,
			                  type: 'error'
			                });
			                //成功时
			              } else {
			              	// h5设置本地存储
			                sessionStorage.setItem('user', JSON.stringify(user));
			                //跳转页面
			                this.$router.push({ path: '/Table' });
			              }
			            });
				        } else {
				            console.log('error submit!!');
				            return false;
         			 	}
        		})
			}		 
		}
	}
</script>
<style scoped>
	.node{

		padding: 200px 0px 0px 0px;
	}
	.login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin:0 auto;
    margin-bottom:400px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
   
     }
 	.title {
      margin: 0px auto;
      text-align: center;
      color: #505458;
    }  
	.remember {
      margin: 0px 0px 15px 0px;
    }  
	
</style>