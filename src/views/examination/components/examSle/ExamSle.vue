<template>
  <section class="container">
    <div class="wrapper">
      <div class="sleBox">
        <a-select @change="sleChange"
                  placeholder="Select a person"
                  v-model="examType"
                  style="width: 200px;">
          <a-select-option v-for="(sle,index) in sleData"
                           :value="sle.value"
                           :key="index">{{sle.name}}</a-select-option>
        </a-select>
        <div class="btn"
             @click="onConfirm">
          <a-button class="my-btn"
                    type="primary"
                    :loading="loading">提交</a-button>
        </div>
      </div>
    </div>
  </section>
</template>

<style src="./ExamSle.scss" lang="scss" scoped></style>
<script src="./ExamSle.js"></script>

