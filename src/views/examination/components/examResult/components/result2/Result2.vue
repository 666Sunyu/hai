<template>
  <section class="wrap">
    <!-- 答案 -->
    <div class="box2 w">
      <div class="head">
        <p>强对流天气预报实况</p>
      </div>
      <div class="box4">
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
            <tr v-for="(tr,index) in tableData" :key="index">
              <th style="color:#3467cb">
                {{tr.station}}
                <br />
                {{tr.stationId}}
              </th>
              <td v-for="(td,index) in tr.tds" :key="'0'+index">{{td.trueValue}}</td>
            </tr>
          </table>
        </div>
        <div class="box7">
          <h3>预报理由</h3>
          <a-textarea :rows="4" />
        </div>
      </div>
    </div>
    <!-- 试题 -->
    <div class="box2 w">
      <div class="head">
        <p>强对流天气预报答案</p>
      </div>
      <div class="box4">
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
            <tr v-for="(tr,index) in tableData" :key="index">
              <th style="color:#3467cb">
                {{tr.station}}
                <br />
                {{tr.stationId}}
              </th>
              <td v-for="(td,index) in tr.tds" :key="'0'+index">{{td.inputValue}}</td>
            </tr>
          </table>
        </div>
        <div class="box7">
          <h3>预报理由</h3>
          <a-textarea :rows="4" />
        </div>
      </div>
    </div>
    <!-- 得分 -->
    <div class="box2 w">
      <div class="head">
        <p>强对流天气预报分项得分</p>
      </div>
      <div class="box4">
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
            <tr v-for="(tr,index) in tableData" :key="index">
              <th style="color:#3467cb">
                {{tr.station}}
                <br />
                {{tr.stationId}}
              </th>
              <td v-for="(td,index) in tr.tds" :key="'0'+index">{{td.score}}</td>
            </tr>
          </table>
        </div>
        <div class="box7">
          <h3>预报理由</h3>
          <a-textarea :rows="4" />
        </div>
        <!-- <div class="total">
          <h3>总分</h3>
          <span>100</span>
        </div>-->
      </div>
    </div>
  </section>
</template>

<style src='./Result2.scss' lang="scss" scoped>
</style>
<script src='./Result2.js'></script>

