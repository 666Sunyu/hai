<template>
  <section class="wrap">
    <!-- 答案 -->
    <div class="box2 w">
      <div class="head">
        <p>预报员精细化要素预报个例预报实况</p>
      </div>
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
            <td colspan="9">
              降雨量值(
              <span>mm</span>)
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
          <tr v-for="(tr, index) in tableData[0].trs" :key="index">
            <th v-if="index == 0" rowspan="8" style="color:#3467cb">
              {{
              moment(tr.realDateTime, "YYYYMMDDHHmmss").format("YYYY年MM月")
              }}
              <br />
              {{ moment(tr.realDateTime, "YYYYMMDDHHmmss").format("DD日HH点") }}
            </th>
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <template v-for="(td, index) in tr.tds">
              <td v-if="td.id!='total'" :key="index">
                <input type="text" v-model="td.trueValue" readonly />
              </td>
            </template>
          </tr>
          <tr>
            <td></td>
            <td colspan="8">
              气温(
              <span>℃</span>)
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
          <tr v-for="(tr, index) in tableData[1].trs" :key="'0' + index">
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <td v-for="(td, index) in tr.tds" :key="'0' + index">
              <input type="text" v-model="td.trueValue" readonly />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 试题 -->
    <div class="box2 w">
      <div class="head">
        <p>预报员精细化要素预报个例预报答案</p>
      </div>
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
            <td colspan="9">
              降雨量值(
              <span>mm</span>)
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
          <tr v-for="(tr, index) in tableData[0].trs" :key="index">
            <th v-if="index == 0" rowspan="8" style="color:#3467cb">
              {{
              moment(tr.realDateTime, "YYYYMMDDHHmmss").format("YYYY年MM月")
              }}
              <br />
              {{ moment(tr.realDateTime, "YYYYMMDDHHmmss").format("DD日HH点") }}
            </th>
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <template v-for="(td, index) in tr.tds">
              <td v-if="td.id!='total'" :key="index">
                <input type="text" v-model="td.inputValue" readonly />
              </td>
            </template>
          </tr>
          <tr>
            <td></td>
            <td colspan="8">
              气温(
              <span>℃</span>)
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
          <tr v-for="(tr, index) in tableData[1].trs" :key="'0' + index">
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <td v-for="(td, index) in tr.tds" :key="'0' + index">
              <input type="text" v-model="td.inputValue" readonly />
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 得分 -->
    <div class="box2 w">
      <div class="head">
        <p>预报员精细化要素预报个例预报分项得分</p>
      </div>
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
            <td colspan="8">
              降雨量值(
              <span>mm</span>)
            </td>
            <td rowspan="2">总分</td>
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
          <tr v-for="(tr, index) in tableData[0].trs" :key="index">
            <th v-if="index == 0" rowspan="8" style="color:#3467cb">
              {{
              moment(tr.realDateTime, "YYYYMMDDHHmmss").format("YYYY年MM月")
              }}
              <br />
              {{ moment(tr.realDateTime, "YYYYMMDDHHmmss").format("DD日HH点") }}
            </th>
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <td v-for="(td, index) in tr.tds" :key="index" :rowspan="td.rowspan">
              <input type="text" v-model="td.score" readonly />
            </td>
          </tr>
          <tr>
            <td></td>
            <td colspan="8">
              气温(
              <span>℃</span>)
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
          <tr v-for="(tr, index) in tableData[1].trs" :key="'0' + index">
            <th class="name" style="color:#3467cb">
              {{ tr.station }}
              <br />
              {{ tr.stationId }}
            </th>
            <td v-for="(td, index) in tr.tds" :key="'0' + index">
              <input type="text" v-model="td.score" readonly />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<style src="./Result1.scss" lang="scss" scoped></style>
<script src="./Result1.js"></script>
