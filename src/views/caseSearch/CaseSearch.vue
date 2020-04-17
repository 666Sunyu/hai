<template>
  <div class="container" @click="zhanShow = false;nianfenkg=false">
    <div
      class="tip"
      v-if="isShowTip&&markerTooltip.data"
      :style="{left:markerTooltip.left+'px',top:markerTooltip.top+'px'}"
    >
      <template>
        <div v-for="(item,index) in (Object.keys(markerTooltip.data))" :key="index">
          <span>{{item}}</span>
          <span>{{markerTooltip.data[item]}}例</span>
        </div>
      </template>
    </div>
    <!-- table -->
    <div class="tableModal" v-if="isShowTableDataFilt&&tableDataFilt.length">
      <div class="mapTable">
        <span class="close" @click="isShowTableDataFilt=false">X</span>
        <a-table :columns="columns" :dataSource="tableDataFilt" @change="onChangeTable">
          <template slot="operation" slot-scope="text, record">
            <span class="td_look" @click="viewCaseFilt(text,record)"></span>
            <span class="td_compile" @click="compileCaseFilt(text,record)">编辑</span>
            <span class="td_delete" @click="removeCaseFilt(text,record)">删除</span>
          </template>
        </a-table>
      </div>
    </div>
    <!-- 截屏 -->
    <div class="screenCap" title="截取天气类型分布图" @click="screenShot(false)"></div>
    <!-- 图例 -->

    <div class="mapWrap">
      <div id="map" class="map"></div>
      <div class="legend" :class="{move:isShrink}">
        <i>灾害个数图例</i>
        <span>1-5</span>
        <span>5-10</span>
        <span>10-20</span>
        <span>20-30</span>
        <span>30-40</span>
        <span>40-60</span>
        <span>>60</span>
      </div>
    </div>
    <div :class="['left',{'shrink':isShrink}]">
      <div :class="['sk',{'shrink':isShrink}]" @click="changeMap"></div>
      <div :class="['operation',{'shrink':isShrink}]">
        <!-- 个例新增 -->
        <div class="add" @click="toCasePage('add')"></div>
        <!-- 个例审核 -->
        <div class="audit" @click="toCasePage('audit')">
          <span class="num" v-if="auditNumber">{{auditNumber}}</span>
        </div>
        <!-- 审核列表 -->
        <div class="list" @click="toCasePage('list')"></div>
        <!-- 自动计算列表 -->
        <div class="fenxi" @click="toCasePage('fenxi')"></div>
      </div>
      <div class="searchs">
        <h2>灾害自定义查询统计</h2>
        <div class="xuantime">
          <div class="shijianxuanze">
            <div class="timeType">
              <div :class="{active:timeType==='everyYear'}" @click="timeType='everyYear'">每年时间段</div>
              <div :class="{active:timeType==='anyTime'}" @click="timeType='anyTime'">任意时间段</div>
            </div>
            <div class="dates1" v-show="timeType==='everyYear'">
              <div class="dateShow">
                <a-input class="ipt" type="text" v-model="shijian.stateyue" />
                <label>月</label>
                <a-input class="ipt" type="text" v-model="shijian.stateri" />
                <label>日---</label>
                <a-input class="ipt" type="text" v-model="shijian.endyue" />
                <label>月</label>
                <a-input class="ipt" type="text" v-model="shijian.endri" />
                <label>日</label>
                <!-- 选择年份 -->
                <span class="nianfen" @click.stop="nianfenkg=true;shijiankg=false">
                  <span>{{nianArr.join(',')}}</span>

                  <i></i>
                </span>
                <div class="nianfenxuanze" v-if="nianfenkg" @click.stop>
                  <div class="years">
                    <span>选择年份</span>
                    <span :style="{ marginLeft: '14px' }">
                      <a-checkbox @change="checkAllYear" :checked="isCheckAllYear">全选</a-checkbox>
                    </span>
                    <div :style="{ marginTop: '5px' }">
                      <a-checkbox-group
                        :options="yearOptions"
                        v-model="yearCheckedList"
                        @change="yearListChange"
                      />
                    </div>
                  </div>
                  <a-button class="btn" @click="changeYears" type="primary">确定</a-button>
                </div>
              </div>
              <ul class="jnList">
                <li>
                  <label for="jnyl">
                    <input type="radio" id="jnyl" name="five" @click="selectSj('jn')" />今年以来
                  </label>

                  <label for="byyl">
                    <input type="radio" id="byyl" name="five" @click="selectSj('by')" />本月以来
                  </label>

                  <!-- <label for="rxyl">
                    <input type="radio"
                           id="rxyl"
                           name="five"
                           @click="selectSj('rx')" />入汛以来
                  </label>-->
                </li>
                <li>
                  <label for="chun">
                    <input type="radio" id="chun" name="five" @click="selectSj(3,1,5,31)" />春季
                  </label>

                  <label for="xia">
                    <input type="radio" id="xia" name="five" @click="selectSj(6,1,8,31)" />夏季
                  </label>

                  <label for="qiu">
                    <input type="radio" id="qiu" name="five" @click="selectSj(9,1,11,30)" />秋季
                  </label>

                  <label for="dong">
                    <input type="radio" id="dong" name="five" @click="selectSj(12,1,2,28,true)" />冬季
                  </label>

                  <label for="quan">
                    <input type="radio" id="quan" name="five" @click="selectSj('qn')" />全年
                  </label>
                </li>
              </ul>
              <ul>
                <li>
                  <label for="yiyue">
                    <input type="radio" id="yiyue" name="five" @click="selectSj(1,1,1,31)" />1月
                  </label>

                  <label for="eryue">
                    <input type="radio" id="eryue" name="five" @click="selectSj(2,1,2,28,true)" />2月
                  </label>

                  <label for="sanyue">
                    <input type="radio" id="sanyue" name="five" @click="selectSj(3,1,3,31)" />3月
                  </label>

                  <label for="siyue">
                    <input type="radio" id="siyue" name="five" @click="selectSj(4,1,4,30)" />4月
                  </label>

                  <label for="wuyue">
                    <input type="radio" id="wuyue" name="five" @click="selectSj(5,1,5,31)" />5月
                  </label>

                  <label for="liuyue">
                    <input type="radio" id="liuyue" name="five" @click="selectSj(6,1,6,30)" />6月
                  </label>

                  <label for="qiyue">
                    <input type="radio" id="qiyue" name="five" @click="selectSj(7,1,7,31)" />7月
                  </label>

                  <label for="bayue">
                    <input type="radio" id="bayue" name="five" @click="selectSj(8,1,8,31)" />8月
                  </label>

                  <label for="jiuyue">
                    <input type="radio" id="jiuyue" name="five" @click="selectSj(9,1,9,30)" />9月
                  </label>

                  <label for="shiyue">
                    <input type="radio" id="shiyue" name="five" @click="selectSj(10,1,10,31)" />10月
                  </label>

                  <label for="syyue">
                    <input type="radio" id="syyue" name="five" @click="selectSj(11,1,11,30)" />11月
                  </label>

                  <label for="seyue">
                    <input type="radio" id="seyue" name="five" @click="selectSj(12,1,12,31)" />12月
                  </label>
                </li>
              </ul>
            </div>
            <div class="dates2" v-show="timeType==='anyTime'">
              <div class="dateShow">
                <div class="begin">
                  <span>开始时间</span>
                  <div>
                    <a-select v-model="staDate2.year">
                      <a-select-option v-for="nian in nianfen" :key="nian" :value="nian">{{nian}}</a-select-option>
                    </a-select>
                    <label>年</label>
                    <a-select v-model="staDate2.yue">
                      <a-select-option v-for="yue in yueArr" :value="yue">{{yue}}</a-select-option>
                    </a-select>
                    <label>月</label>
                    <a-select v-model="staDate2.ri">
                      <a-select-option v-for="ri in riArr" :value="ri">{{ri}}</a-select-option>
                    </a-select>
                    <label>日</label>
                  </div>
                </div>
                <div class="end">
                  <span>结束时间</span>
                  <div>
                    <a-select v-model="endDate2.year">
                      <a-select-option v-for="nian in nianfen" :key="nian" :value="nian">{{nian}}</a-select-option>
                    </a-select>
                    <label>年</label>
                    <a-select v-model="endDate2.yue">
                      <a-select-option v-for="yue in yueArr" :value="yue">{{yue}}</a-select-option>
                    </a-select>
                    <label>月</label>
                    <a-select v-model="endDate2.ri">
                      <a-select-option v-for="ri in riArr" :value="ri">{{ri}}</a-select-option>
                    </a-select>
                    <label>日</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="happend">
          <div class="disaster">
            <span>灾害类型</span>
            <span :style="{ marginLeft: '14px' }">
              <a-checkbox @change="checkAllDis" :checked="isCheckAllDis">全选</a-checkbox>
            </span>
            <div>
              <a-checkbox-group
                :options="plainOptionsType"
                v-model="disCheckedList"
                @change="disListChange"
              />
            </div>
          </div>
          <div class="happenPlace">
            <!-- <div>选择发生地</div>
            <a-select v-model="saveData.occurred">
              <a-select-option :value=item.key
                               v-for="item in happenList"
                               :key="item.name">{{item.name}}</a-select-option>
            </a-select>-->
            <span>选择发生地</span>
            <span :style="{ marginLeft: '14px' }">
              <a-checkbox @change="checkAllHappen" :checked="isCheckAllHappen">全选</a-checkbox>
            </span>
            <div>
              <a-checkbox-group
                :options="plainOptionsHappen"
                v-model="happenCheckedList"
                @change="happenListChange"
              />
            </div>
          </div>
        </div>
        <div class="search" @click="onSearchGeli"></div>
      </div>
      <div class="result">
        <div class="tongji">
          <h3 class="title">
            <span></span>
            <span v-if="result">
              共有
              <span class="num">{{result.total}}</span>条个例
            </span>
          </h3>
          <div class="typeWrap" v-if="typeTolls.length">
            其中
            <span v-for="(type,index) in typeTolls" :key="index">
              <span>{{Object.keys(type)[0]}}</span>:
              <span style="color:red">{{Object.values(type)[0]}}例</span>;
            </span>
          </div>
          <div class="content" v-if="result">
            <p v-for="(item,index) in result.historieYearList" :key="index">
              {{moment(item.startTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日')}}-{{ moment(item.endTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日')}}有
              <span
                class="num"
              >{{item.numToll}}</span>
              例灾害,总计死亡{{item.deathToll}}人,失踪{{item.disappearToll}}人,受伤{{item.injuryToll}}人,经济损失{{item.lose.toFixed(2)}}万元,其中
              <span
                class="num"
              >{{item.type}}</span>最多有
              <span class="num">{{item.typeNumber}}</span>例
            </p>
          </div>
        </div>
        <div class="lists">
          <h3 class="title">
            <span></span>
            <span class="export" @click="downExcel">
              <img src="./imgs/export.png" alt />
              <span>导出统计</span>
            </span>
          </h3>
          <div class="tableWrap">
            <a-spin :spinning="spinning">
              <table class="table">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>
                      开始时间
                      <br />结束时间
                    </th>
                    <th>类型(别名)</th>
                    <th>发生地</th>
                    <th>消息来源</th>
                    <th>死亡/失踪/受伤</th>
                    <th>经济损失(万元)</th>
                    <th>操作</th>
                  </tr>
                </thead>

                <tbody v-if="tableData.length">
                  <tr v-for="(tr,index) in tableData" :key="tr.id">
                    <td>
                      <span class="number">{{index+1}}</span>
                    </td>
                    <td class="date">
                      <span>{{moment(tr.startTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日 HH时')}}</span>
                      <br />
                      <span>{{moment(tr.endTime,'YYYYMMDDHHmmss').format('YYYY年MM月DD日 HH时')}}</span>
                    </td>
                    <td style="width:70px" class="lang">
                      {{tr.type}}
                      <span v-if="tr.name">({{tr.name}})</span>
                    </td>
                    <td class="lang">{{tr.occurred}}</td>
                    <td>{{tr.source}}</td>
                    <td>{{tr.deathToll}}/{{tr.disappearToll}}/{{tr.injuryToll}}</td>
                    <td style="width:60px">{{tr.lose}}</td>
                    <td>
                      <span class="look" @click="viewCase(tr.id)"></span>
                      <span class="compile" @click="compileCase(tr.id)">编辑</span>
                      <span class="delete" @click="removeCase(tr.id)">删除</span>
                    </td>
                  </tr>
                </tbody>
                <tbody class="empty" v-else>
                  <tr>
                    <td colspan="8">暂无数据</td>
                  </tr>
                </tbody>
              </table>
            </a-spin>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录 -->
    <transition name="modFade">
      <div class="admModal" v-if="isShowAdmModal">
        <div class="loginWrapper">
          <h3>请您登录</h3>
          <a-form id="login" :form="form" class="login-form" @submit="handleSubmit">
            <a-form-item
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[
                  'userName',
                  { rules: [{ required: true, message: '请输入用户名' }] }
                ]"
                placeholder="请输入用户名"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码' }] }
                ]"
                type="password"
                placeholder="请输入密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <div class="btnWrap">
              <a-button
                type="primary"
                :loading="loading"
                html-type="submit"
                class="login-form-button sub"
              >登录</a-button>
              <a-button
                type="danger"
                ghost
                class="login-form-button cancel"
                @click="changeAdminModal(false)"
              >取消</a-button>
            </div>
          </a-form>
        </div>
      </div>
    </transition>
  </div>
</template>
<style>
.container .ant-radio-button-wrapper {
  padding: 0 8px !important;
}
</style>

<style src="./CaseSearch.scss" lang="scss" scoped></style>
<script src="./CaseSearch.js"></script>
