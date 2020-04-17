<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <div class="scoreBox">
          <!-- 等级图 -->
          <span class="images">
            <img src alt />
          </span>
          <!-- 等级条 -->
          <div class="levelBox">
            <div class="title">
              <p class="now">
                <span>当前积分 :</span>
                <span class="score">700</span>
              </p>
              <p class="get">您已达到700分!继续努力~</p>
            </div>
            <a-steps class="steps" :current="3" size="small">
              <div slot="progressDot" slot-scope="{index, status, prefixCls}">
                <span class="dott" :class="[`${prefixCls}-icon-dot`,`dott${index+1}`]"></span>
              </div>
              <a-step v-for="step in steps" :key="step.title" :title="step.title" />
            </a-steps>
          </div>
        </div>

        <div class="person">
          <p>
            <span class="tit">姓名:</span>
            <span>张三</span>
          </p>
          <p>
            <span class="tit">电话:</span>
            <span>13055231212</span>
          </p>
        </div>
        <div class="person">
          <p>
            <span class="tit">邮箱:</span>
            <span>33215675@qq.com</span>
          </p>
          <p>
            <span class="tit">单位:</span>
            <span>三亚气象局</span>
          </p>
        </div>
      </div>
      <div class="main">
        <div class="examList">
          <h3 class="title">平日考试记录</h3>
          <a-table
            class="my_table"
            :columns="columns"
            :dataSource="tableData"
            :pagination="{pageSize:13}"
          ></a-table>
        </div>
        <div class="examBegin">
          <span class="begin">开始平日考试</span>
          <p class="surp">
            今日剩余
            <span>10</span> 次
          </p>
          <div class="explain">
            <h3 class="title">平日训练考试说明</h3>
            <ul>
              <li>1)每年年底积分到达700分及格,下一年重新计算</li>
              <li>2)考试成绩低于50分,积分为0</li>
              <li>3)高于50分考试成绩,乘0.1,四舍五入保留个位数</li>
              <li>4)每日最多考试15次</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./Personal.js'></script>
<style lang='scss' scoped src='./Personal.scss'></style>