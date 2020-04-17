<template>
  <section class="container">
    <div class="wrapper">
      <a-form id="login" :form="form" class="login-form" @submit="handleSubmit">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '请输入用户名' }] }
            ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
        >
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '请输入密码' }] }
            ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <div class="btnWrap">
          <a-button
            type="primary"
            :loading="loading"
            html-type="submit"
            class="login-form-button"
            >登录</a-button
          >
          <!-- <a-button
            type="primary"
            @click="$router.replace('/register')"
            class="login-form-button"
          >注册</a-button> -->
        </div>
      </a-form>
    </div>
  </section>
</template>

<style src="./Login.scss" lang="scss" scoped></style>
<script src="./Login.js"></script>
