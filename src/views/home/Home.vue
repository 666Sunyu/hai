<template>
  <a-locale-provider :locale="locale">
    <div class="home">
      <header class="header">
        <img
          class="logo-bg"
          src="../../assets/images/header/logo.png"
          alt="强天气诊断分析平台"
          title="强天气诊断分析平台"
        />
        <img class="right-bg" src="../../assets/images/header/right.png" />
        <nav class="nav">
          <!-- 导航 -->
          <router-link
            class="menu-item"
            v-for="menu of menus"
            :key="menu.name"
            :to="menu.path"
            active-class="active"
            :class="[menu.id]"
          ></router-link>
          <!-- 登陆/退出 -->
          <div class="loginWrap">
            <!-- 个例登录 -->
            <template v-if="$route.name==='CaseSearch'">
              <div class="login" v-if="!isAdmin" @click="changeAdminModal(true)"></div>
              <div class="exitWrap" v-else>
                <span class="user">{{adminInfo.userName}},您好</span>
                <div class="exit" @click="signOut"></div>
              </div>
            </template>
            <!-- 考试登录 -->
            <template v-if="$route.path.includes('examination')">
              <div class="login" v-if="!isLogin" @click="$router.push('/login')"></div>
              <div class="exitWrap" v-else>
                <span class="user">您好,{{userInfo.name}}</span>
                <div class="exit" @click="onExit"></div>
              </div>
            </template>
          </div>
        </nav>
      </header>
      <section class="content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </section>
    </div>
  </a-locale-provider>
</template>

<style src="./Home.scss" lang="scss" scoped></style>
<script src="./Home.js"></script>

