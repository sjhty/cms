<template>
    <div class="login-wrap">
        <div class="ms-title">登录管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="账号" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item prop="nickname">
                    <el-input placeholder="昵称" v-model="ruleForm.nickname"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:14px;line-height:30px;color:#999;cursor: pointer;float:right;" @click="handleCommand()">注册</p>  
            </el-form>
        </div>
    </div>    
</template>

<script>
    export default {
        name: 'login',
        data() {
            return {
                ruleForm: {
                    name: '',
                    password: '',
                    validate: ''                    
                }
            }
        },
        mounted() {
            //this.identifyCode = "";
            //this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(JSON.stringify(self.ruleForm));                        
                        self.$http.post('/api/user/addUser',JSON.stringify(self.ruleForm))
                        .then((response) => {
                            console.log(response);                         
                        }).then((error) => {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleCommand() {
                this.$router.push('/register');
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:240px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .ms-login span {
        color: red;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .code {
        width: 112px;
        height: 35px;
        border: 1px solid #ccc;
        float: right;
        border-radius: 2px;
    }
    .validate-code {
        width: 136px;
        float: left;
    }
</style>