<template>
  <section class="wrap">
    <!-- 答案 -->
    <div class="box2 w">
      <div class="head">灾害性天气预报个例预报实况</div>
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
            <th v-if="index==0" rowspan="4" style="color:#3467cb">
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('YYYY年MM月')}}
              <br />
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('DD日HH点')}}
            </th>
            <th class="name">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>
            <template v-for="(td, index) in tr.tds">
              <td v-if="td.id!='total'" :key="index">
                <input type="text" v-model="td.trueValue" readonly />
              </td>
            </template>
          </tr>
        </table>
      </div>
    </div>
    <!-- 试题 -->
    <div class="box2 w">
      <div class="head">灾害性天气预报个例预报答案</div>
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
            <th v-if="index==0" rowspan="4" style="color:#3467cb">
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('YYYY年MM月')}}
              <br />
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('DD日HH点')}}
            </th>
            <th class="name">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>
            <template v-for="(td, index) in tr.tds">
              <td v-if="td.id!='total'" :key="index">
                <input type="text" v-model="td.inputValue" readonly />
              </td>
            </template>
          </tr>
        </table>
      </div>
    </div>
    <!-- 得分 -->
    <div class="box2 w">
      <div class="head">灾害性天气预报个例预报分项得分</div>
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
            <td rowspan="2">总分</td>
          </tr>
          <tr></tr>
          <tr v-for="(tr,index) in tableData" :key="index">
            <th v-if="index==0" rowspan="4" style="color:#3467cb">
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('YYYY年MM月')}}
              <br />
              {{moment(tr.realDateTime,'YYYYMMDDHHmmss').format('DD日HH点')}}
            </th>
            <th class="name">
              {{tr.station}}
              <br />
              {{tr.stationId}}
            </th>

            <td :rowspan="td.rowspan" v-for="(td,index) in tr.tds" :key="'0'+index">{{td.score}}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<style src='./Result4.scss' lang="scss" scoped>
</style>
<script src='./Result4.js'></script>

