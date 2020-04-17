<template>
  <section>
    <div>
      <component :is="currComponent"></component>
    </div>
    <div class="btn"
         v-if="$route.params.id==2&&!isEnd">
      <a-button type="primary"
                @click="onNext">下一题</a-button>
    </div>
    <div class="btn"
         v-else-if="$route.params.id==3&&!isEnd">
      <a-button type="primary"
                @click="onPrev">上一题</a-button>
    </div>
    <div class="btn"
         v-else>
      <a-button type="primary"
                @click="$router.replace('/examination/examSle')">返回科目</a-button>
    </div>
  </section>
</template>

<style src='./ExamResult.scss' lang="scss" scoped>
</style>
<script src='./ExamResult.js'></script>

