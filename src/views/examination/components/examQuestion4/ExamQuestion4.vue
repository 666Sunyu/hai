<template>
  <section>
    <div class="box2 w">
      <adm></adm>
      <div class="box4">
        <table>
          <tr>
            <th rowspan="2">
              竞赛起报日
              <br />期及时间
            </th>
            <th rowspan="2">
              <br />站名
            </th>
            <th rowspan="2">
              08-08
              <br />最大风
              <br />力（级）
            </th>
            <th rowspan="2">
              08-08
              <br />最大风力时
              <br />的风向
            </th>
            <th rowspan="2">
              最低气
              <br />温℃
            </th>
            <th rowspan="2">
              最高气
              <br />温℃
            </th>
            <th rowspan="2">
              降水（雨、雪）
              <br />量级
            </th>
            <th rowspan="2">灾害性天气</th>
          </tr>

          <tr></tr>
          <tr v-for="(tr,index) in tableData" :key="index">
            <th v-if="index==0" :rowspan="rowSpan" style="color:#3467cb">
              {{moment(tableData[0].dateTime,'YYYYMMDDHHmmss').format('YYYY年MM月')}}
              <br />
              {{moment(tableData[0].dateTime,'YYYYMMDDHHmmss').format('DD日HH点')}}
            </th>
            <th class="name">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>
            <td  v-for="(td,index) in tr.tds" :key="'0'+index" :class="{war:td.isWar}">
              <template v-if="td.type==='windMaxGrade08_08'">
                <a-select @change="save" v-model="td.inputValue" style="width:90%">
                  <a-select-option v-for="i in windGrade" :key="i">{{i}}</a-select-option>
                </a-select>
              </template>
              <template v-else-if="td.type==='wdMax08_08'">
                <a-select @change="save" v-model="td.inputValue" style="width:90%">
                  <a-select-option v-for="i in windDir" :key="i">{{i}}</a-select-option>
                </a-select>
              </template>
              <template v-else-if="td.type==='rainGrade'">
                <a-select @change="save" v-model="td.inputValue" style="width:90%">
                  <a-select-option v-for="i in rainGrade" :key="i">{{i}}</a-select-option>
                </a-select>
              </template>
              <template v-else-if="td.type==='weather'">
                <a-select @change="save" v-model="td.inputValue" mode="multiple" style="width:90%">
                  <a-select-option v-for="i in weather" :key="i">{{i}}</a-select-option>
                </a-select>
              </template>
              <template v-else >
                <input @keyup="save" @mouseleave="onVerify($event,td)" @blur="onVerify($event,td)" type="text" v-model="td.inputValue" autocomplete="off" />
              </template>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="w">
      <p>季节提示：{{season}}</p>
    </div>
    <a-button @click="onSubmit" class="btn" type="primary" :loading="loading">提交</a-button>
  </section>
</template>

<style src="./ExamQuestion4.scss" lang="scss" scoped></style>
<script src="./ExamQuestion4.js"></script>

