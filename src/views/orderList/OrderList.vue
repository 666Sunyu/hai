<template>
  <div class="container">
    <div class="content">
      <!-- 排行 -->
      <div class="rankingList">
        <div class="header">
          <span></span>
          <h3>海南省平日训练考试积分排行</h3>
          <!-- <div class="areaBox">
            <span>区域筛选:</span>
            <a-select defaultValue="全省" style="width: 120px">
              <a-select-option v-for="item in area" :key="item" :value="item">{{item}}</a-select-option>
            </a-select>
          </div>-->
        </div>
        <div class="table">
          <a-table
            :columns="columns"
            :dataSource="tableData"
            :pagination="{pageSize:16}"
            :rowClassName="setName"
            :customRow="customRow"
          >
            <!-- 排名 -->
            <span slot="numbers" slot-scope="text" class="number" :class="{top3:text<=3}">{{text}}</span>
            <!-- 积分总数 -->
            <span slot="scores" slot-scope="text" class="scores">{{text}}</span>
            <!-- 级别 -->
            <span slot="levels" slot-scope="text" class="levels">{{text}}</span>
            <!-- 第一次考试时间 -->
            <span slot="firstTimes" slot-scope="text" class="date">{{text}}</span>
            <!-- 最近一次考试时间 -->
            <span slot="latestTimes" slot-scope="text" class="date">{{text}}</span>
          </a-table>
        </div>
      </div>
      <!-- 操作部分 -->
      <div class="operate">
        <!-- 登录注册 -->
        <div class="logins">
          <div @click="$router.push('/login')">预报员登录</div>
          <div @click="$router.push('/register')">预报员注册</div>
        </div>
        <!-- 通知栏 -->
        <div class="notification">
          <h3>全国气象竞赛考试</h3>
          <div class="time">
            <span class="title">考试时间:</span>
            <p>2020年3月15日(周日)</p>
            <p>上午9点-11点</p>
          </div>
          <div class="xls">
            <span class="title">参加考试人员名单:</span>
            <div>
              <a href="javascript:;">考生人员名单.xls</a>
              <p>届时考生直接登录即可答题</p>
            </div>
          </div>
          <div class="bottom">
            <p>2020年1月2日</p>
            <p>海南省气象台</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='./OrderList.js'></script>
<style lang='scss' scoped src='./OrderList.scss'></style>