<template>
  	<div class="login_page">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer">
                <div class="titleArea">
                    <img :src="headImg"  alt="logo" class="logo">
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
                    <el-form-item prop="username" class="login-item">
					    <span class="loginTips"><icon-svg icon-class="user" /></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')" class="area" type="text" placeholder="用户名" v-model="loginForm.username" ></el-input>
					</el-form-item>
					<el-form-item prop="password" class="login-item"> 
					    <span class="loginTips"><icon-svg icon-class="lock" /></span>
						<el-input @keyup.enter.native ="submitForm('loginForm')" class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
                    <!-- <el-checkbox v-model="checked" checked>记住密码</el-checkbox> -->
					<el-form-item>
				    	<el-button type="primary"  @click="submitForm('loginForm')" class="submit_btn">SIGN IN</el-button>
				  	</el-form-item>
                </el-form>

                <div class="sanFangArea">
                    <p class="title">第三方账号登录</p>
                    <ul class="rflex">
                        <li @click="loginByWechat">
                            <icon-svg icon-class="wechat" />
                        </li>
                        <li>
                            <icon-svg icon-class="qq" />
                        </li>
                        <li>
                            <icon-svg icon-class="github" />
                        </li>
                    </ul>
                </div>
            </section>    
	  	</transition>
  	</div>
</template>

<script>

import { login } from "@/api/user";
import { setToken } from '@/utils/auth'
import headImg from "@/assets/headImg.png"

export default {
    name:'',

    data(){
        return {
            headImg: headImg,
            // checked: true, //是否选中记住密码 true为选中

            loginForm: {
					username: 'admin',
					password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        }
    },

    methods: {
        showMessage(type,message){
            this.$message({
                type: type,
                message: message
            });
        },
        submitForm(loginForm) {
            this.$refs[loginForm].validate((valid) => {
                if (valid) {
                    let userinfo = this.loginForm;
                    window.console.log("this.loginForm",userinfo)
                
                    login(userinfo).then(res => {
                        window.console.log("this.loginForm",res.code)
                        const data = res.data
                        if(res.code == 200){
                            console.log('登录成功')
                            let userInfo = data.userInfo;
                            setToken("Token",userInfo.token)
                            this.$router.push({ path: '/' })
                            this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
                        }else if(data.code == -1){
                            alert(res.data.msg)
                        }else{
                            console.log('登录失败') 
                        }
                    })
                }
            });
        },
        loginByWechat(){
        },
    }
}
</script>

<style lang='less' scoped>
.form_contianer{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: fff;
    width:360px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 25px;
    text-align: center;
    .titleAera{
        align-items: center;
        width: 100%;
        padding-bottom: 20px;
    }
    .logo{
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin-bottom: 20px;
    }


    .loginTips{
        position: absolute;
        left: 10px;
        padding-top: 5px;
        z-index: 20;
        font-size: 18px;
        top: 50%;
        transform: translateY(-50%);
    }
    .login-item{
        width: 100%;
        // height: 40px;
        & /deep/ .el-input--mini .el-input__inner {
            height: 36px;
            line-height: 36px;
            font-size: 18px;
        }
        & /deep/ .el-input__inner{
            padding-left:35px;
            height:36px;
        }
    
    }
    & /deep/ .submit_btn{
        width: 100%;
        height: 35px;
        font-size: 18px;
    }
    
}
.login_page{
    // position: absolute;
    width: 100%;
    // height: 100%;
    background-color: #fff;
    // background-size: 100% 100%;
    
    
}
.sanFangArea{
		border-top: 1px solid #DCDFE6;
		padding: 10px 0;
		// display: none;
		.title{
			font-size: 14px;
			color: #8b9196;
			margin-bottom: 10px;
		}
		ul{
			li{
				flex:1;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.svg-icon{
					font-size: 24px;
				}
			}
		}
	}



.form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}

</style>
