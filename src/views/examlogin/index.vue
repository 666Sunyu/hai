<template>
  <div class="container">
    <div class="login">
      <div class="loginform">
<el-form ref="form" :model="loginForm" >
  <el-form-item >
    <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="loginForm.password" show-password placeholder="请输入密码"></el-input>
  </el-form-item>
</el-form>
<el-button round  @click="login()" type="primary">登录</el-button>
<el-button round  @click="$router.push({name:'Examregister'})" >注册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
           loginForm:{
               userName:'admin',
               password:'123456'
           } 
        }
    },
    methods:{
        login(){
            this.$router.push({name:'examQuestion'})
        }
    }
};
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  background: url("./img/bj.jpg") no-repeat center;
  background-size: 100%;
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 798px;
    height: 454px;
    background: url("./img/login.png") no-repeat;
    .loginform {
        width: 240px;
      margin-top: 160px;
      margin-left: 440px;
    .el-button{
        width: 110px;
        height: 30px;
       padding: 0;
       margin-top: 20px;
    }
    }
  }
}
</style>