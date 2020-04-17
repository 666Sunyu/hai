<template>
  <section class="container">
    <div class="wrapper">
      <!-- <div class="title">用户注册</div> -->
      <div class="form">
        <a-form-model
        inline-message
          id="login"
          ref="ruleForm"
          :model="form"
          :rules="rules"
          class="register-form"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
      <a-form-model-item label='类别' prop='userclass'>
           <a-radio-group name="radioGroup" :defaultValue="1">
          <a-radio :value="1">预报员</a-radio>
          <a-radio :value="2">教练</a-radio>
    </a-radio-group>
      </a-form-model-item>
          <!-- 用户名 -->
          <a-form-model-item label="用户名" prop="userName">
            <a-input v-model="form.userName" />
          </a-form-model-item>
          <!-- 密码 -->
          <a-form-model-item label="密码" has-feedback prop="password">
            <a-input v-model="form.password" />
          </a-form-model-item>
          <!-- 确认密码 -->
          <a-form-model-item label="确认密码" has-feedback prop="checkPass">
            <a-input v-model="form.checkPass" />
          </a-form-model-item>
          <!-- 真实名字 -->
          <a-form-model-item label="真实姓名" prop="trueName">
            <a-input v-model="form.trueName" />
          </a-form-model-item>
          <!-- 所在市(县)气象局 -->
          <a-form-model-item label="所在市(县)气象局" prop="local">
            <a-select defaultValue="hk" v-model="form.local">
              <a-select-option value="hk">海口气象局</a-select-option>
              <a-select-option value="df">东方气象局</a-select-option>
              <a-select-option value="cj">昌江气象局</a-select-option>
            </a-select>
          </a-form-model-item>
          <!-- 电话 -->
          <a-form-model-item label="电话" prop="phone">
            <a-input v-model="form.phone" />
          </a-form-model-item>
          <!-- 短信验证码 -->
          <div class="codes">
            <a-form-model-item label="短信验证码" prop="code">
              <a-input v-model="form.code" />
            </a-form-model-item>
            <template>
              <a-button type="primary" disabled class="sendCode" v-if="codeLoading">剩余{{codeTime }}s</a-button>
              <a-button type="primary" class="sendCode" @click="sendCode" v-else>发送短信验证码</a-button>
            </template>
          </div>

          <!-- 邮箱 -->
          <a-form-model-item label="邮箱" prop="email">
            <a-input v-model="form.email" />
          </a-form-model-item>
          <!-- <a-form-item
          label="用户名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] }
        ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="确认密码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'passwordAgain',
          { rules: [{ required: true, message: '请输入密码' }] }
        ]"
            type="password"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="真实姓名"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'name',
          { rules: [{ required: true, message: '请输入姓名' }, {
              required:false,
              pattern: new RegExp(/[\u4e00-\u9fa5]/),
              message:'请输入正确的姓名'
          }] }
        ]"
            placeholder="请输入姓名"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="工作单位"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'local',
          { rules: [{ required: true, message: '请输入工作单位名称' }] }
        ]"
            placeholder="请输入工作单位名称"
          >
            <a-icon slot="prefix" type="team" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="手机号"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'phone',
          { rules: [{ required: true,message: '请输入手机号' },
          {
              required:false,
              pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/),
              message:'请保证输入正确格式手机号'
          }
          ] }
        ]"
            placeholder="请输入手机号"
          >
            <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="短信验证码"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'code',
          { rules: [{ required: true, message: '请输入短信验证码' }] }
        ]"
            placeholder="请输入短信验证码"
          >
            <a-icon slot="prefix" type="team" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          label="邮箱"
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
          'email',
          { rules: [{ required: true, message: '请输入邮箱' },{
                required: false, 
                message: '请输入正确格式的邮箱账号'
          }] }
        ]"
            placeholder="请输入邮箱"
          >
            <a-icon slot="prefix" type="team" style="color: rgba(0,0,0,.25)" />
          </a-input>
          </a-form-item>-->

          <div class="btnWrap">
            <a-button
              type="primary"
              :loading="loading_reg"
              class="confirm-form-button"
              @click="handleRegister"
            >注册</a-button>
         
          </div>
        </a-form-model>
      </div>
    </div>
  </section>
</template>

<style src="./Register.scss" lang="scss" scoped></style>
<script src="./Register.js"></script>
