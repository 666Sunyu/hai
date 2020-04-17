<template>
  <section>
    <!-- 考试时间 -->
    <div class="box1 w">
      <p class="p1">请注意日期和时间为考试服务器时钟(时间)!</p>
      <p class="p2">
        当前时间：
        <span>{{nowDate}} {{nowWeek}} {{nowTime}}</span>
      </p>
      <p class="p3">
        考试剩余时间：
        <span>{{remainTimeStr}}</span>
      </p>
    </div>
  </section>
</template>

<style src="./HeadTime.scss" lang="scss" scoped></style>
<script src="./HeadTime.js">
</script>

