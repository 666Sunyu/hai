<template>
  <section class="container">
    <!-- 考试时间 -->
    <HeadTime v-if="$route.meta.needTime"></HeadTime>
    <!-- 中间表格 -->
    <router-view></router-view>
  </section>
</template>

<style src="./Examination.scss" lang="scss" scoped></style>
<script src="./Examination.js"></script>

