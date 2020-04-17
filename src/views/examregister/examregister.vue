<template>
  <div class="container">
    <div class="wrapper">
      <el-form :rules="Formrules" ref="form" inline-message :model="registerForm" label-width="130px" size="mini">
        <el-form-item label="类别" prop="userClass">
          <el-radio-group v-model="registerForm.userClass">
            <el-radio :label="3">预报员</el-radio>
            <el-radio :label="6">教练</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="registerForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="trueName">
          <el-input v-model="registerForm.trueName"></el-input>
        </el-form-item>
        <el-form-item label="所在市(县)气象局" prop="local">
          <el-select v-model="registerForm.local" placeholder="请选择">
            <el-option label="item.label" value="item.value"></el-option>
            <el-option label="item.label" value="item.value"></el-option>
            <el-option label="item.label" value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
          <span @click="getCode()" class="border" :class="{'sendcode':showCode}">{{sendCode}}</span>
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <el-input v-model="registerForm.code"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerForm.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button round type="primary">注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
     var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.form.validateField('checkPass');
          }
          callback();
        }
      };
     var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    
    return {
      registerForm: {
        userClass: 3,
        // 用户名
        userName: "",
        // 密码
        password: "",
        //确认密码
        checkPass: "",
        trueNmae: "",
        local: "",
        phone: "",
        code: "",
        email: ""
      },
      Formrules:{
          userClass:[{required:true,message:'请选择类别',trigger: 'blur'}],
          userName:[{required:true,message:'请输入用户名',trigger:'blur'}],
          password:[{required:true,message:'请输入密码',trigger:'blur'},
            { validator: validatePass, trigger: 'blur' }],
          checkPass:[{required:true,message:'两次输入密码不相同',tigger:'blur'},
            { validator: validatePass2, trigger: 'blur' }],
          trueName:[{required:true,message:'请输入姓名',tigger:'blur'}],
          local:[{required:true,message:'请选择区县',tigger:'blur'}],
          phone:[{required:true,message:'请填写手机号码',tigger:"blur"}],
          code:[{required:true,message:'请输入验证码',tigger:'blur'}],
          email:[{required:true,message:'请输入邮箱地址',tigger:'blur'}]
      },
      sendCode:'接收短信验证码',
      showCode:true
    };
  },
  methods:{
      getCode(){
          this.showCode=false
         this.sendCode=60
        let timer=setInterval(()=>{
             this.sendCode--
             if(this.sendCode<=0){
                 this.showCode=true
                 this.sendCode='接收短信验证码'
                 clearInterval(timer)
             }
         },1000)

      }
  }
};
</script>
<style lang="scss" src='./examregister.scss' scoped>
</style>