<template>
  <section>
    <div class="box2 w">
      <adm>
        <a-select style="width: 100px"
                  defaultValue="2"
                  @change="onChangeSubject">
          <a-select-option value="1">第一题</a-select-option>
          <a-select-option value="2">第二题</a-select-option>
        </a-select>
      </adm>
      <div class="box4">
        <div class="box5">
          <p style="text-indent:2em;">请分析一下4个站点在{{moment(tableData[0].startTime,'YYYYMMDDHHmmss').format('YYYY年M月D日HH时')}}-{{moment(tableData[0].endTime,'YYYYMMDDHHmmss').format('HH点')}}间发生的强对流天气。填充表格(有：画圈圈，没有：画叉)，并简要给出预报理由。阐述理由时需包括环境条件和雷达回波特征。</p>

        </div>
        <div class="box6">
          <table>
            <tr>
              <th rowspan="2">
                站名
                <br />站号
              </th>
              <th colspan="3">强对流天气预报</th>
            </tr>
            <tr>
              <th>强冰雹</th>
              <th>雷暴大风</th>
              <th>短时强降雨</th>
            </tr>
            <tr v-for="(tr,index) in tableData"
                :key="index">
              <th style="color:#3467cb">{{tr.station}}<br />{{tr.stationId}}</th>
              <td v-for="(td,index) in tr.tds"
                  :key="'0'+index">
                <a-select @change="changeSelect(td)"
                          style="width: 70px"
                          v-model="td.inputValue">
                  <a-select-option value="o">○</a-select-option>
                  <a-select-option value="x">×</a-select-option>
                </a-select>
                <span class="tip"
                      v-if="td.isCheck">{{`(${td.isCheck=='o'?'有':'无'})`}}</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <a-button @click="onSubmit"
              class="btn"
              type="primary"
              :loading="loading">提交</a-button>
  </section>
</template>

<style src="./ExamQuestion3.scss" lang="scss" scoped></style>
<script src="./ExamQuestion3.js"></script>

