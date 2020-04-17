<template>
  <section>
    <div class="box2 w">
      <adm></adm>
      <div class="box4">
        <table>
          <tr>
            <th rowspan="2">
              预报起报日
              <br />期及时间
            </th>
            <th rowspan="2">
              站名
              <br />站号
            </th>
            <td colspan="9" class='rainTit'>
              降雨量值(
              <span>mm</span>)
              <span class='tip'>请填入 “无”或≥0.1的一位小数位数值</span>
            </td>
          </tr>
          <tr>
            <th>08-11时</th>
            <th>11-14时</th>
            <th>14-17时</th>
            <th>17-20时</th>
            <th>20-23时</th>
            <th>23-02时</th>
            <th>02-05时</th>
            <th>05-08时</th>
          </tr>
          <tr v-for="(tr,index) in tableData[0].trs" :key="index">
            <th v-if="index==0" :rowspan="rowSpan" style="color:#3467cb">
              {{moment(tr.dateTime,'YYYYMMDDHHmmss').format('YYYY年MM月')}}
              <br />
              {{moment(tr.dateTime,'YYYYMMDDHHmmss').format('DD日HH点')}}
            </th>
            <th class="name" style="color:#3467cb">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>
            <td v-for="(td,index) in tr.tds" :key="index" :class={war:td.isWar}>
              <input  @keyup="save" @mouseleave="onVerify($event,td)" @blur="onVerify($event,td)" type="text" v-model="td.inputValue" autocomplete="off" />
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="8" class="tempTit">
              气温(
              <span>℃</span>)
              <span class='tip'>请填入整数</span>
            </td>
          </tr>
          <tr>
            <td></td>
            <th>11时</th>
            <th>14时</th>
            <th>17时</th>
            <th>20时</th>
            <th>23时</th>
            <th>02时</th>
            <th>05时</th>
            <th>08时</th>
          </tr>
          <tr v-for="(tr,index) in tableData[1].trs" :key="'0'+index" >
            <th class="name" style="color:#3467cb">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>
            <td v-for="(td,index) in tr.tds" :key="'0'+index" :class={war2:td.isWar}>
              <input @keyup="save" @mouseleave="onVerify($event,td)" @blur="onVerify($event,td)" type="text" v-model="td.inputValue" autocomplete="off" />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="w">
      <p>季节提示：{{season}}</p>
    </div>
    <a-button class="btn" type="primary" @click="onSubmit" :loading="loading">提交</a-button>
  </section>
</template>

<style src="./ExamQuestion1.scss" lang="scss" scoped></style>
<script src="./ExamQuestion1.js"></script>

