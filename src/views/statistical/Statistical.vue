<template>
  <div class="contain" @click="zhanShow = false;nianfenkg=false">
    <div class="left">
      <div class="top">
        <div class="xuantime">
          <div class="shijianxuanze">
            <div class="timeType">
              <div :class="{active:timeType==='everyYear'}" @click="timeType='everyYear'">每年时间段</div>
              <div :class="{active:timeType==='anyTime'}" @click="timeType='anyTime'">任意时间段</div>
            </div>
            <div class="dates1" v-show="timeType==='everyYear'">
              <div class="dateShow">
                <a-input type="text" v-model="shijian.stateyue" />
                <label>月</label>
                <a-input type="text" v-model="shijian.stateri" />
                <label>日---</label>
                <a-input type="text" v-model="shijian.endyue" />
                <label>月</label>
                <a-input type="text" v-model="shijian.endri" />
                <label>日</label>
                <a-checkbox type="checkbox" class="kn" id="kn" @change="selectKn" />
                <label for="kn">跨年</label>
                <!-- 选择年份 -->
                <span class="nianfen" @click.stop="nianfenkg=true;shijiankg=false">
                  {{nian}}
                  <i></i>
                  <div class="nianfenxuanze" v-if="nianfenkg" @click.stop>
                    <span @click="selectnian('1951-2018')">
                      <input type="radio" id="yj_el" name="nianfen" />
                      <label for="yj_el">1951-2018</label>
                    </span>
                    <br />
                    <div class="nfwrap">
                      <span v-for="(item,index) in nianfen" :key="index" @click="selectnian(item)">
                        <input type="radio" :id="'n'+item" name="nianfen" />
                        <label :for="'n'+item">{{item}}年</label>
                        <!-- <br v-if="(index+1)%6==0" /> -->
                      </span>
                    </div>
                  </div>
                </span>
                年
              </div>
              <ul>
                <li>
                  <label for="jnyl">
                    <input type="radio" id="jnyl" name="five" @click="selectSj('jn')" />今年以来
                  </label>

                  <label for="byyl">
                    <input type="radio" id="byyl" name="five" @click="selectSj('by')" />本月以来
                  </label>

                  <label for="rxyl">
                    <input type="radio" id="rxyl" name="five" @click="selectSj('rx')" />入汛以来
                  </label>
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
                <!-- <li>
                <label for="yiyues">
                  <input type="radio"
                         id="yiyues"
                         name="five"
                         @click="selectSj(1,1,1,10)" />1月上旬
                </label>

                <label for="yiyuez">
                  <input type="radio"
                         id="yiyuez"
                         name="five"
                         @click="selectSj(1,11,1,20)" />1月中旬
                </label>

                <label for="yiyuex">
                  <input type="radio"
                         id="yiyuex"
                         name="five"
                         @click="selectSj(1,21,1,31)" />1月下旬
                </label>

                <label for="eryues">
                  <input type="radio"
                         id="eryues"
                         name="five"
                         @click="selectSj(2,1,2,10)" />2月上旬
                </label>

                <label for="eryuez">
                  <input type="radio"
                         id="eryuez"
                         name="five"
                         @click="selectSj(2,11,2,20)" />2月中旬
                </label>

                <label for="eryuex">
                  <input type="radio"
                         id="eryuex"
                         name="five"
                         @click="selectSj(2,21,2,28)" />2月下旬
                </label>
                <br />

                <label for="sanyues">
                  <input type="radio"
                         id="sanyues"
                         name="five"
                         @click="selectSj(3,1,3,10)" />3月上旬
                </label>

                <label for="sanyuez">
                  <input type="radio"
                         id="sanyuez"
                         name="five"
                         @click="selectSj(3,11,3,20)" />3月中旬
                </label>

                <label for="sanyuex">
                  <input type="radio"
                         id="sanyuex"
                         name="five"
                         @click="selectSj(3,21,3,31)" />3月下旬
                </label>

                <label for="siyues">
                  <input type="radio"
                         id="siyues"
                         name="five"
                         @click="selectSj(4,1,4,10)" />4月上旬
                </label>

                <label for="siyuez">
                  <input type="radio"
                         id="siyuez"
                         name="five"
                         @click="selectSj(4,11,4,20)" />4月中旬
                </label>

                <label for="siyuex">
                  <input type="radio"
                         id="siyuex"
                         name="five"
                         @click="selectSj(4,21,4,30)" />4月下旬
                </label>
                <br />

                <label for="wuyues">
                  <input type="radio"
                         id="wuyues"
                         name="five"
                         @click="selectSj(5,1,5,10)" />5月上旬
                </label>

                <label for="wuyuez">
                  <input type="radio"
                         id="wuyuez"
                         name="five"
                         @click="selectSj(5,11,5,20)" />5月中旬
                </label>

                <label for="wuyuex">
                  <input type="radio"
                         id="wuyuex"
                         name="five"
                         @click="selectSj(5,21,5,31)" />5月下旬
                </label>

                <label for="liuyues">
                  <input type="radio"
                         id="liuyues"
                         name="five"
                         @click="selectSj(6,1,6,10)" />6月上旬
                </label>

                <label for="liuyuez">
                  <input type="radio"
                         id="liuyuez"
                         name="five"
                         @click="selectSj(6,11,6,20)" />6月中旬
                </label>

                <label for="liuyuex">
                  <input type="radio"
                         id="liuyuex"
                         name="five"
                         @click="selectSj(6,21,6,30)" />6月下旬
                </label>

                <br />

                <label for="qiyues">
                  <input type="radio"
                         id="qiyues"
                         name="five"
                         @click="selectSj(7,1,7,10)" />7月上旬
                </label>

                <label for="qiyuez">
                  <input type="radio"
                         id="qiyuez"
                         name="five"
                         @click="selectSj(7,11,7,20)" />7月中旬
                </label>

                <label for="qiyuex">
                  <input type="radio"
                         id="qiyuex"
                         name="five"
                         @click="selectSj(7,21,7,31)" />7月下旬
                </label>

                <label for="bayues">
                  <input type="radio"
                         id="bayues"
                         name="five"
                         @click="selectSj(8,1,8,10)" />8月上旬
                </label>

                <label for="bayuez">
                  <input type="radio"
                         id="bayuez"
                         name="five"
                         @click="selectSj(8,11,8,20)" />8月中旬
                </label>

                <label for="bayuex">
                  <input type="radio"
                         id="bayuex"
                         name="five"
                         @click="selectSj(8,21,8,31)" />8月下旬
                </label>
                <br />

                <label for="jiuyues">
                  <input type="radio"
                         id="jiuyues"
                         name="five"
                         @click="selectSj(9,1,9,10)" />9月上旬
                </label>

                <label for="jiuyuez">
                  <input type="radio"
                         id="jiuyuez"
                         name="five"
                         @click="selectSj(9,11,9,20)" />9月中旬
                </label>

                <label for="jiuyuex">
                  <input type="radio"
                         id="jiuyuex"
                         name="five"
                         @click="selectSj(9,21,9,30)" />9月下旬
                </label>

                <label for="shiyues">
                  <input type="radio"
                         id="shiyues"
                         name="five"
                         @click="selectSj(10,1,10,10)" />10月上旬
                </label>

                <label for="shiyuez">
                  <input type="radio"
                         id="shiyuez"
                         name="five"
                         @click="selectSj(10,11,10,20)" />10月中旬
                </label>

                <label for="shiyuex">
                  <input type="radio"
                         id="shiyuex"
                         name="five"
                         @click="selectSj(10,21,10,31)" />10月下旬
                </label>
                <br />

                <label for="syyues">
                  <input type="radio"
                         id="syyues"
                         name="five"
                         @click="selectSj(11,1,11,10)" />11月上旬
                </label>

                <label for="syyuez">
                  <input type="radio"
                         id="syyuez"
                         name="five"
                         @click="selectSj(11,11,11,20)" />11月中旬
                </label>

                <label for="syyuex">
                  <input type="radio"
                         id="syyuex"
                         name="five"
                         @click="selectSj(11,21,11,30)" />11月下旬
                </label>

                <label for="seyues">
                  <input type="radio"
                         id="seyues"
                         name="five"
                         @click="selectSj(12,1,12,10)" />12月上旬
                </label>

                <label for="seyuez">
                  <input type="radio"
                         id="seyuez"
                         name="five"
                         @click="selectSj(12,11,12,20)" />12月中旬
                </label>

                <label for="seyuex">
                  <input type="radio"
                         id="seyuex"
                         name="five"
                         @click="selectSj(12,21,12,31)" />12月下旬
                </label>
                </li>-->
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
        <div class="zhanlist">
          <div v-for="item in nameSite" class="nameList">
            <div>
              <!-- <input @click="areaClick(item)"
                     type="checkbox"
                     :id="item.name"
              v-model="item.isCheckAll" />-->
              <!-- <label :for=item.name>{{item.name}}</label> -->
              <i
                @click.stop="areaChekc(item)"
                :class="{checkAll:item.isCheckAll,halfCheck:item.halfCheck}"
              ></i>
              <label @click.stop="changeZhanLabel(item.name)">{{item.name}}</label>
              <div class="zhanShow" @click.stop v-show="zhanShow&&item.name===nowquxian">
                <div class="close" @click="zhanShow=false">X</div>
                <div class="checkAll">
                  <input
                    type="checkbox"
                    @click.stop="areaClick(item)"
                    :id="item.name+'2'"
                    v-model="item.isCheckAll"
                  />
                  <label @click.stop :for="item.name+'2'">全选{{item.name}}所有站</label>
                </div>
                <span
                  v-for="(ite,idx) in zhanSel"
                  :key="idx"
                  v-if="item.name==ite.s"
                  class="diming"
                >
                  <input
                    @click.stop="danxuan(ite.zhanhao,ite)"
                    type="checkbox"
                    :id="idx"
                    v-model="ite.kg"
                  />
                  <label @click.stop :for="idx">{{ite.name}}</label>
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="checkAndclear">
            <button class="quanxuan"
                    @click="xuanze(0)">全选</button>
            <button class="qingkong"
                    @click="xuanze(1)">清空</button>
          </div>-->
        </div>
        <div class="search" @click="chaxun"></div>
      </div>
      <div class="selectbox">
        <!-- <div class="tab">
          <span class="active">表格</span>
          <span>历史排位</span>
        </div>-->
        <h3>统计结果</h3>
        <!-- <button class="xuandi"
                @click="zhanlist=!zhanlist">选择站点</button>
        -->
      </div>

      <a-spin :spinning="loading">
        <!-- 每年时间段查询 -->
        <div class="content" style="width: 100%" v-if="timeType=== 'everyYear'">
          <span v-if="!tjdata.avg&&!tjdata.unAvg&&!tjdata.allAvg&&!tjdata.max">暂无数据</span>
          <!-- 要素平均统计 -->
          <p class="pjtitle" v-if="tjdata.avg">
            要素平均统计({{shijian.stateyue}}月{{shijian.stateri}}日至{{shijian.endyue}}月{{shijian.endri}}日 {{selectZhanTxt}})
            <!-- <a
              href="javascript:void(0);"
              class="makePic"
              @click="makePic"
            >出图</a>-->
          </p>
          <table class="pjtable" v-if="tjdata.avg">
            <thead>
              <tr v-if="tjdata.avg.length">
                <th class="tc">要素</th>
                <!-- <th class="tc">年份</th> -->
                <th class="tc">{{tjdata.avg[0].年份}}年</th>
                <th class="tc">{{tjdata.avg[0].年份-1}}年</th>
                <th class="tc">与{{tjdata.avg[0].年份-1}}年比</th>
                <th class="tc">十年({{tjdata.avg[0].年份-10}}~{{tjdata.avg[0].年份-1}})</th>
                <th class="tc">与近十年比</th>
                <th class="tc">常年(1951~{{tjdata.avg[0].年份-1}})</th>
                <th class="tc">与常年比</th>
                <th class="tc">最大值</th>
                <th class="tc">最小值</th>
                <!-- <th class="tc">逐年详情</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.avg" :key="index">
                <td class="tc" :class="{negative:parseFloat(item.要素)<0}">{{item.要素.split('_')[0]}}</td>
                <!-- <td class="tc">{{item.年份}}</td> -->
                <td class="tc" :class="{negative:parseFloat(item.今年)<0}">{{item.今年}}</td>
                <td class="tc" :class="{negative:parseFloat(item.去年)<0}">{{item.去年}}</td>
                <td class="tc" :class="{negative:parseFloat(item.与去年比)<0}">{{item.与去年比}}</td>
                <td
                  class="tc"
                  :class="{negative:parseFloat(item.近十年)<0}"
                >{{item.近十年||item.十年?item.近十年:'-'}}</td>
                <td class="tc" :class="{negative:parseFloat(item.与近十年比)<0}">{{item.与近十年比}}</td>
                <td class="tc" :class="{negative:parseFloat(item.常年)<0}">{{item.常年}}</td>
                <td class="tc" :class="{negative:parseFloat(item.与常年比)<0}">{{item.与常年比}}</td>
                <td class="tc" :class="{negative:parseFloat(item.最大值)<0}">{{item.最大值}}</td>
                <td class="tc" :class="{negative:parseFloat(item.最小值)<0}">{{item.最小值}}</td>
                <!-- <td class="tc" style='cursor: pointer;' @click="goDetails">详情</td> -->
              </tr>
            </tbody>
          </table>
          <div class="warp" id="warp" v-if="timeType=='everyYear'"></div>
          <div class="pieCharts">
            <div class="charts" ref="rainBrands" v-if="showRainBrands"></div>
            <div class="charts" ref="HailBrands" v-if="showHailBrands"></div>
          </div>

          <!-- 历史极值 -->
          <div class="xxtitle" v-if="tjdata.max">历史极值{{selectZhanTxt}}</div>
          <table class="xxtable" v-if="tjdata.max">
            <thead>
              <tr>
                <th class="tc" v-for="(item,index) in max" :key="index">{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.max" :key="index">
                <td class="tc" v-for="(ite,idx) in max" :key="idx">{{item[ite]}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 逐年可平均要素详情 -->
          <div class="xxtitle" v-if="tjdata.allAvg">
            逐年可平均要素详情({{shijian.stateyue}}月{{shijian.stateri}}日至{{shijian.endyue}}月{{shijian.endri}}日 {{selectZhanTxt}})
            <a
              href="javascript:void(0);"
              @click="exportExecl(true)"
            >导出excel</a>
          </div>
          <table class="xxtable" v-if="tjdata.allAvg">
            <thead>
              <tr>
                <th
                  class="tc"
                  v-for="(item,index) in kpinjun"
                  :key="index"
                  :class="[{negative:kpjClass[kpjIdx]<0},jpjpx==index?kpjClass[kpjIdx]:'']"
                  @click="kpjSort(index)"
                >{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.allAvg" :key="index">
                <td
                  class="tc"
                  :class="{negative:item[ite]<0}"
                  v-for="(ite,idx) in kpinjun"
                  :key="idx"
                >{{item[ite]}}</td>
              </tr>
            </tbody>
          </table>

          <!-- 最早最晚日期统计 -->
          <div class="xxtitle" v-if="tjdata.rj">
            最早最晚日期统计
            <!-- <a href="javascript:void(0);" @click="exportExecl(true)">导出excel</a> -->
          </div>
          <table class="xxtable" v-if="tjdata.rj">
            <thead>
              <tr>
                <th
                  class="tc"
                  v-for="(item,index) in rj"
                  :key="index"
                  :class="jpjpx==index?kpjClass[kpjIdx]:''"
                  @click="kpjSort(index)"
                >{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.rj" :key="index">
                <td
                  class="tc"
                  :class="{negative:item[ite]<0}"
                  v-for="(ite,idx) in rj"
                  :key="idx"
                >{{item[ite]}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 初雪终雪，初霜终霜 -->
          <div class="xxtitle" v-if="tjdata.SnowAndFrost">
            初雪终雪，初霜终霜
            <!-- <a href="javascript:void(0);" @click="exportExecl(true)">导出excel</a> -->
          </div>
          <table class="xxtable" v-if="tjdata.SnowAndFrost">
            <thead>
              <tr>
                <th
                  class="tc"
                  v-for="(item,index) in SnowAndFrost"
                  :key="index"
                  :class="SnowAndFrostpx==index?kpjClass[SnowAndFrostIdx]:''"
                  @click="SnowAndFrostSort(index)"
                >{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.SnowAndFrost" :key="index">
                <td
                  class="tc"
                  :class="{negative:item[ite]<0}"
                  v-for="(ite,idx) in SnowAndFrost"
                  :key="idx"
                >{{item[ite]}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 逐年不可平均要素详情 -->
          <div class="xxtitle" v-if="tjdata.unAvg">
            逐年不可平均要素详情({{shijian.stateyue}}月{{shijian.stateri}}日至{{shijian.endyue}}月{{shijian.endri}}日 {{selectZhanTxt}})
            <a
              href="javascript:void(0);"
              @click="exportExecl(false)"
            >导出excel</a>
          </div>
          <table class="xxtable" v-if="tjdata.unAvg">
            <thead>
              <tr>
                <th
                  class="tc"
                  v-for="(item,index) in bkpinjun"
                  :key="index"
                  :class="bkpjpx==index?kpjClass[bkpjIdx]:''"
                  @click="bkpjSort(index)"
                >{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tjdata.unAvg" :key="index">
                <td
                  class="tc"
                  :class="{negative:item[ite]<0}"
                  v-for="(ite,idx) in bkpinjun"
                  :key="idx"
                >{{item[ite]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 任意时间段查询 -->
        <div class="content2" v-else>
          <div class="xxtitle">
            要素详情({{staDate2.year}}年{{staDate2.yue}}月{{staDate2.ri}}日至{{endDate2.year}}年{{endDate2.yue}}月{{endDate2.ri}}日 {{selectZhanTxt}})
            <a
              href="javascript:void(0);"
              @click="export2"
            >导出excel</a>
          </div>
          <table class="xxtable" v-if="anyTimeData">
            <thead>
              <tr>
                <th class="tc zhandian">站号</th>
                <th
                  class="tc"
                  @click="anytimeSort(item)"
                  v-for="(item,index) in anyTimeData.title.split(',')"
                  :key="index"
                >{{item}}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tr,index) of Object.values(anyTimeData.data)" :key="index">
                <td
                  class="tc"
                  :class="{negative:Object.keys(anyTimeData.data)[index]<0}"
                >{{Object.keys(anyTimeData.data)[index]}}</td>
                <td class="tc" :class="{negative:td<0}" v-for="(td,idx) in tr" :key="idx">{{td}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </a-spin>
    </div>
    <div class="right">
      <div class="rtitle_list">
        <span
          :class="rtitle_list==index?item.title:''"
          @click="tab(index,item.title)"
          v-for="(item,index) in rtitle"
          :key="index"
        >{{item.name}}</span>
      </div>
      <div class="rlist_con">
        <!-- 气温 -->
        <ul v-if="index==0">
          <li>
            <input type="checkbox" checked @click="ysxuanze('平均气温',0)" id="pjqw" />
            <i :class="selecti[0]?'selecti':''"></i>
            <label for="pjqw">平均气温</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('平均最高气温',1)" id="pjzgqw" />
            <i :class="selecti[1]?'selecti':''"></i>
            <label for="pjzgqw">平均最高气温</label>
            <input type="text" class="rightinp" v-model="yuzhi.pjzgqw" placeholder="阈值" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('平均最低气温',2)" id="pjzdqw" />
            <i :class="selecti[2]?'selecti':''"></i>
            <label for="pjzdqw">平均最低气温</label>
            <input type="text" class="rightinp" v-model="yuzhi.pjzdqw" placeholder="阈值" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('极端最高气温',3)" id="jdzgw" />
            <i :class="selecti[3]?'selecti':''"></i>
            <label for="jdzgw">极端最高温</label>
            <input type="text" class="rightinp" v-model="yuzhi.jdzgw" placeholder="阈值" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('极端最低气温',4)" id="jdzdw" />
            <i :class="selecti[4]?'selecti':''"></i>
            <label for="jdzdw">极端最低温</label>
            <input type="text" class="rightinp" v-model="yuzhi.jdzdw" placeholder="阈值" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最低日平均气温',5)" id="zdrpjqw" />
            <i :class="selecti[5]?'selecti':''"></i>
            <label for="zdrpjqw">最低日平均气温</label>
            <input type="text" v-model="yuzhi.zdrpjqw" class="rightinp" placeholder="阈值" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('持续低温天数',6)" id="cxdwts" />
            <i :class="selecti[6]?'selecti':''"></i>
            <label for="cxdwts">持续低温天数</label>
          </li>
          <li>
            <input type="checkbox" @click.prevent="ysxuanze('最高气温日数',7)" id="durs" />
            <i :class="selecti[7]?'selecti':''"></i>
            <label for="durs">
              ≥
              <input type="text" class="hangnei" v-model="dyrs" />℃日数
            </label>
          </li>
          <li>
            <input type="checkbox" @click.prevent="ysxuanze('持续最高气温日数',8)" id="cxcxdyrs" />
            <i :class="selecti[8]?'selecti':''"></i>
            <label for="cxcxdyrs">
              持续出现≥
              <input type="text" v-model="cxdyrs" class="hangnei" />℃日数
            </label>
          </li>
          <li>
            <input type="checkbox" @click.prevent="ysxuanze('最低气温日数',9)" id="xyrs" />
            <i :class="selecti[9]?'selecti':''"></i>
            <label for="xyrs">
              ≤
              <input type="text" class="hangnei" v-model="xyrs" />℃日数
            </label>
          </li>
          <li>
            <input type="checkbox" @click.prevent="ysxuanze('持续最低气温日数',10)" id="cxcxxyrs" />
            <i :class="selecti[10]?'selecti':''"></i>
            <label for="cxcxxyrs">
              持续出现≤
              <input type="text" v-model="cxxyrs" class="hangnei" />℃日数
            </label>
          </li>
        </ul>
        <!-- 降水 -->
        <ul v-if="index==1">
          <li>
            <input type="checkbox" checked @click="ysxuanze('累积降水量',11)" id="jszl" />
            <i :class="selecti[11]?'selecti':''"></i>
            <label for="jszl">累积降水量</label>
            <input type="text" class="rightinp" placeholder="阈值" v-model="yuzhi.jszl" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最大日降水量',12)" id="zdrjsl" />
            <i :class="selecti[12]?'selecti':''"></i>
            <label for="zdrjsl">最大日降水量</label>
            <input type="text" class="rightinp" placeholder="阈值" v-model="yuzhi.zdrjsl" />
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('连续降水日数',13)" id="lxjsrs" />
            <i :class="selecti[13]?'selecti':''"></i>
            <label for="lxjsrs">连续降水日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最长连续降水日数',14)" id="zclxjsrs" />
            <i :class="selecti[14]?'selecti':''"></i>
            <label for="zclxjsrs">最长连续降水日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最长连续无降水日数',15)" id="zclxwjsrs" />
            <i :class="selecti[15]?'selecti':''"></i>
            <label for="zclxwjsrs">最长连续无降水日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('小雨日数',16)" id="xyrs" />
            <i :class="selecti[16]?'selecti':''"></i>
            <label for="xyrs">小雨日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('中雨日数',17)" id="zyrs" />
            <i :class="selecti[17]?'selecti':''"></i>
            <label for="zyrs">中雨日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('大雨日数',18)" id="dyrs" />
            <i :class="selecti[18]?'selecti':''"></i>
            <label for="dyrs">大雨日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('降水日数',19)" id="jsrs" />
            <i :class="selecti[19]?'selecti':''"></i>
            <label for="jsrs">降水日数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('降水量日数',20)" id="dydymlrs" />
            <i :class="selecti[20]?'selecti':''"></i>
            <label for="dydymlrs">
              ≥
              <input type="text" class="hangnei" v-model="dyml" />毫米日数
            </label>
          </li>
        </ul>
        <!-- <ul v-if="index==2">
          <p v-if="changpinkg">区域站无法查看此信息</p>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('地表平均温度',21)" id="dbpjwd" />
            <i :class="selecti[21]?'selecti':''"></i>
            <label for="dbpjwd">地表平均温度</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('极端最高地温',22)" id="jdzgdw" />
            <i :class="selecti[22]?'selecti':''"></i>
            <label for="jdzgdw">极端最高地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('极端最低地温',23)" id="jdzddw" />
            <i :class="selecti[23]?'selecti':''"></i>
            <label for="jdzddw">极端最低地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('累积日照时数',24)" id="ljrzss" />
            <i :class="selecti[24]?'selecti':''"></i>
            <label for="ljrzss">累积日照时数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('平均日照',25)" id="pjrz" />
            <i :class="selecti[25]?'selecti':''"></i>
            <label for="pjrz">平均日照</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('连阴日数',26)" id="lyrs" />
            <i :class="selecti[26]?'selecti':''"></i>
            <label for="lyrs">连阴日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('日均5cm地温',27)" id="rj5dw" />
            <i :class="selecti[27]?'selecti':''"></i>
            <label for="rj5dw">日均5cm地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('日均10cm地温',28)" id="rj10dw" />
            <i :class="selecti[28]?'selecti':''"></i>
            <label for="rj10dw">日均10cm地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('日均15cm地温',29)" id="rj15dw" />
            <i :class="selecti[29]?'selecti':''"></i>
            <label for="rj15dw">日均15cm地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('日均20cm地温',30)" id="rj20dw" />
            <i :class="selecti[30]?'selecti':''"></i>
            <label for="rj20dw">日均20cm地温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('日均40cm地温',31)" id="rj40dw" />
            <i :class="selecti[31]?'selecti':''"></i>
            <label for="rj40dw">日均40cm地温</label>
          </li>
        </ul>-->
        <!-- 积温 -->
        <ul v-if="index==2">
          <p v-if="changpinkg">区域站无法查看此信息</p>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('负积温',32)" id="fjw" />
            <i :class="selecti[32]?'selecti':''"></i>
            <label for="fjw">负积温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('≥0°C积温',33)" id="d0fjw" />
            <i :class="selecti[33]?'selecti':''"></i>
            <label for="d0fjw">≥0℃积温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('≥3°C积温',34)" id="d3fjw" />
            <i :class="selecti[34]?'selecti':''"></i>
            <label for="d3fjw">≥3℃积温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('≥5°C积温',35)" id="d5fjw" />
            <i :class="selecti[35]?'selecti':''"></i>
            <label for="d5fjw">≥5℃积温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('≥10°C积温',36)" id="d10fjw" />
            <i :class="selecti[36]?'selecti':''"></i>
            <label for="d10fjw">≥10℃积温</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('≥15°C积温',37)" id="d15fjw" />
            <i :class="selecti[37]?'selecti':''"></i>
            <label for="d15fjw">≥15℃积温</label>
          </li>
        </ul>
        <!-- 湿度 -->
        <ul v-if="index==3">
          <li>
            <input type="checkbox" @click="ysxuanze('平均湿度',38)" id="pjsd" />
            <i :class="selecti[38]?'selecti':''"></i>
            <label for="pjsd">平均湿度</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('日最大相对湿度',39)" id="rzdxdsd" />
            <i :class="selecti[39]?'selecti':''"></i>
            <label for="rzdxdsd">日最大相对湿度</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最小湿度',40)" id="zxsd" />
            <i :class="selecti[40]?'selecti':''"></i>
            <label for="zxsd">最小湿度</label>
          </li>
        </ul>
        <!-- 风 -->
        <ul v-if="index==4">
          <!-- <li>
            <input type="checkbox" @click="ysxuanze('平均能见度',41)" id="fzfs2" />
            <i :class="selecti[41]?'selecti':''"></i>
            <label for="fzfs2">平均能见度</label>
          </li>-->
          <li>
            <input type="checkbox" @click="ysxuanze('极大风速',42)" id="jdfs" />
            <i :class="selecti[42]?'selecti':''"></i>
            <label for="jdfs">极大风速</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('最大风速',43)" id="zxfs" />
            <i :class="selecti[43]?'selecti':''"></i>
            <label for="zxfs">最大风速</label>
          </li>
          <li v-if="timeType==='everyYear'">
            <input type="checkbox" @click="ysxuanze('二分钟风向',101)" id="fzfx2" />
            <i :class="selecti[101]?'selecti':''"></i>
            <label for="fzfx2">二分钟风向</label>
          </li>
          <li v-if="timeType==='everyYear'">
            <input type="checkbox" @click="ysxuanze('10分钟风向',102)" id="jdfx" />
            <i :class="selecti[102]?'selecti':''"></i>
            <label for="jdfx">10分钟风向</label>
          </li>
          <li v-if="timeType==='everyYear'">
            <input type="checkbox" @click="ysxuanze('最大风速的风向',103)" id="zxfx" />
            <i :class="selecti[103]?'selecti':''"></i>
            <label for="zxfx">最大风速的风向</label>
          </li>
        </ul>
        <!-- <ul v-if="index==5">
          <p v-if="changpinkg">区域站无法查看此信息</p>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('持续闷热日数',44)" id="cxmrrs" />
            <i :class="selecti[44]?'selecti':''"></i>
            <label for="cxmrrs">持续闷热日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('重度闷热日数',45)" id="zdrsmrrs" />
            <i :class="selecti[45]?'selecti':''"></i>
            <label for="zdrsmrrs">重度以上闷热日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('极度闷热日数',46)" id="jdmrrs" />
            <i :class="selecti[46]?'selecti':''"></i>
            <label for="jdmrrs">极度闷热日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雾日数',47)" id="wrs" />
            <i :class="selecti[47]?'selecti':''"></i>
            <label for="wrs">雾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('闷热日数',48)" id="mrrs" />
            <i :class="selecti[48]?'selecti':''"></i>
            <label for="mrrs">闷热日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('轻雾日数',49)" id="qwrs" />
            <i :class="selecti[49]?'selecti':''"></i>
            <label for="qwrs">轻雾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('霾日数',50)" id="mrs" />
            <i :class="selecti[50]?'selecti':''"></i>
            <label for="mrs">霾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雾+霾日数',51)" id="w+mrs" />
            <i :class="selecti[51]?'selecti':''"></i>
            <label for="w+mrs">雾+霾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雾+霾+轻雾日数',52)" id="w+m+qwrs" />
            <i :class="selecti[52]?'selecti':''"></i>
            <label for="w+m+qwrs">雾+霾+轻雾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('烟幕日数',53)" id="ymrs" />
            <i :class="selecti[53]?'selecti':''"></i>
            <label for="ymrs">烟幕日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('烟幕+霾日数',54)" id="ym+mrs" />
            <i :class="selecti[54]?'selecti':''"></i>
            <label for="ym+mrs">烟幕+霾日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('大风日数',55)" id="dfrs" />
            <i :class="selecti[55]?'selecti':''"></i>
            <label for="dfrs">大风日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('浮尘日数',56)" id="fcrs" />
            <i :class="selecti[56]?'selecti':''"></i>
            <label for="fcrs">浮尘日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('扬沙日数',57)" id="ycrs" />
            <i :class="selecti[57]?'selecti':''"></i>
            <label for="ycrs">扬沙日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('沙尘暴日数',58)" id="scbrs" />
            <i :class="selecti[58]?'selecti':''"></i>
            <label for="scbrs">沙尘暴日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('浮尘+扬沙+沙尘暴日数',59)" id="fc+ys+scbrs" />
            <i :class="selecti[59]?'selecti':''"></i>
            <label for="fc+ys+scbrs">浮尘+扬沙+沙尘暴日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('尘卷风日数',60)" id="cjfrs" />
            <i :class="selecti[60]?'selecti':''"></i>
            <label for="cjfrs">尘卷风日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('龙卷风日数',61)" id="ljfrs" />
            <i :class="selecti[61]?'selecti':''"></i>
            <label for="ljfrs">龙卷风日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雷暴日数',62)" id="lbrs" />
            <i :class="selecti[62]?'selecti':''"></i>
            <label for="lbrs">雷暴日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('闪电日数',63)" id="sdrs" />
            <i :class="selecti[63]?'selecti':''"></i>
            <label for="sdrs">闪电日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('极光日数',64)" id="jgrs" />
            <i :class="selecti[64]?'selecti':''"></i>
            <label for="jgrs">极光日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('冰雹日数',65)" id="bbrs" />
            <i :class="selecti[65]?'selecti':''"></i>
            <label for="bbrs">冰雹日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('霜日数',66)" id="srs" />
            <i :class="selecti[66]?'selecti':''"></i>
            <label for="srs">霜日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('结冰日数',67)" id="jbrs" />
            <i :class="selecti[67]?'selecti':''"></i>
            <label for="jbrs">结冰日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('积雪日数',68)" id="jixrs" />
            <i :class="selecti[68]?'selecti':''"></i>
            <label for="jixrs">积雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('飑日数',69)" id="brs" />
            <i :class="selecti[69]?'selecti':''"></i>
            <label for="brs">飑日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('吹雪日数',70)" id="cxrs" />
            <i :class="selecti[70]?'selecti':''"></i>
            <label for="cxrs">吹雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雪暴日数',71)" id="xbrs" />
            <i :class="selecti[71]?'selecti':''"></i>
            <label for="xbrs">雪暴日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('阵雪日数',72)" id="zxrs" />
            <i :class="selecti[72]?'selecti':''"></i>
            <label for="zxrs">阵雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雾凇日数',73)" id="wsrs" />
            <i :class="selecti[73]?'selecti':''"></i>
            <label for="wsrs">雾凇日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('毛毛雨日数',74)" id="mmyrs" />
            <i :class="selecti[74]?'selecti':''"></i>
            <label for="mmyrs">毛毛雨日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雨凇日数',75)" id="ysrs" />
            <i :class="selecti[75]?'selecti':''"></i>
            <label for="ysrs">雨凇日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('降雨日数',76)" id="jyrs" />
            <i :class="selecti[76]?'selecti':''"></i>
            <label for="jyrs">降雨日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('雨夹雪日数',77)" id="yjxrs" />
            <i :class="selecti[77]?'selecti':''"></i>
            <label for="yjxrs">雨夹雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('降雪日数',78)" id="jxrs" />
            <i :class="selecti[78]?'selecti':''"></i>
            <label for="jxrs">降雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('冰针日数',79)" id="bzrs" />
            <i :class="selecti[79]?'selecti':''"></i>
            <label for="bzrs">冰针日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('冰雪日数',80)" id="bxrs" />
            <i :class="selecti[80]?'selecti':''"></i>
            <label for="bxrs">冰雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('冰粒日数',81)" id="blrs" />
            <i :class="selecti[81]?'selecti':''"></i>
            <label for="blrs">冰粒日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('阵雨日数',82)" id="zyrs" />
            <i :class="selecti[82]?'selecti':''"></i>
            <label for="zyrs">阵雨日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('阵雨雪日数',83)" id="zyxrs" />
            <i :class="selecti[83]?'selecti':''"></i>
            <label for="zyxrs">阵雨雪日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('霰日数',84)" id="xrs" />
            <i :class="selecti[84]?'selecti':''"></i>
            <label for="xrs">霰日数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('四季入季',85)" id="sjrj" />
            <i :class="selecti[85]?'selecti':''"></i>
            <label for="sjrj">四季入季</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初终雪',86)" id="jxqzrq" />
            <i :class="selecti[86]?'selecti':''"></i>
            <label for="jxqzrq">降雪起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初雷日,终雷日',87)" id="lbqzrq" />
            <i :class="selecti[87]?'selecti':''"></i>
            <label for="lbqzrq">雷暴起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初雹日,终雹日',88)" id="bbqzrq" />
            <i :class="selecti[88]?'selecti':''"></i>
            <label for="bbqzrq">冰雹起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初终霜',89)" id="sqzrq" />
            <i :class="selecti[89]?'selecti':''"></i>
            <label for="sqzrq">霜起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('春季初沙尘日,春季终沙尘日',90)" id="cjscqzrq" />
            <i :class="selecti[90]?'selecti':''"></i>
            <label for="cjscqzrq">春季沙尘起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('秋季初沙尘日,秋季终沙尘日',91)" id="qjscqzrq" />
            <i :class="selecti[91]?'selecti':''"></i>
            <label for="qjscqzrq">秋季沙尘起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初暴雨日,终暴雨日',92)" id="byqzrq" />
            <i :class="selecti[92]?'selecti':''"></i>
            <label for="byqzrq">暴雨起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初高温日,终高温日',93)" id="gwqzrq" />
            <i :class="selecti[93]?'selecti':''"></i>
            <label for="gwqzrq">高温起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('初暴雪日,终暴雪日',94)" id="bxqzrq" />
            <i :class="selecti[94]?'selecti':''"></i>
            <label for="bxqzrq">暴雪起止日期</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('持续大雾天数',95)" id="cxdwts" />
            <i :class="selecti[95]?'selecti':''"></i>
            <label for="cxdwts">持续大雾天数</label>
          </li>
          <li v-if="!changpinkg&&changpin">
            <input type="checkbox" @click="ysxuanze('持续霾天数',96)" id="cxmts" />
            <i :class="selecti[96]?'selecti':''"></i>
            <label for="cxmts">持续霾天数</label>
          </li>
        </ul>-->
        <!-- <ul v-if="index==6">
          <li>
            <input type="checkbox" @click="ysxuanze('平均闷热指数',97)" id="pjmrzs" />
            <i :class="selecti[97]?'selecti':''"></i>
            <label for="pjmrzs">平均闷热指数</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('制冷度日',98)" id="zldr" />
            <i :class="selecti[98]?'selecti':''"></i>
            <label for="zldr">制冷度日</label>
          </li>
          <li>
            <input type="checkbox" @click="ysxuanze('制暖度日',99)" id="zndr" />
            <i :class="selecti[99]?'selecti':''"></i>
            <label for="zndr">制暖度日</label>
          </li>
        </ul>-->
        <ul v-if="index==5">
          <li>
            <input type="checkbox" @click="ysxuanze('平均能见度',100)" id="njd" />
            <i :class="selecti[100]?'selecti':''"></i>
            <label for="njd">平均能见度</label>
          </li>
        </ul>
      </div>
      <button class="yscxbtn" @click="chaxun">要素查询</button>
      <div class="xuanzhong">
        <p>
          <span>已选要素</span>
          <i @click="clearAll()">全部清空</i>
        </p>
        <ul>
          <li v-for="(item,index) in xzys" :key="index">
            <span :for="item" @click="ysxuanze(item.name,item.id)">
              {{item.name}}
              <i></i>
            </span>
          </li>
          <!-- <li><input type="checkbox" name=""><label for="">平均气温</label></li><li><input type="checkbox" name=""><label for="">平均气温</label></li>
          <li><input type="checkbox" name=""><label for="">平均气温</label></li><li><input type="checkbox" name=""><label for="">平均气温</label></li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<style src="./Statistical.scss" lang="scss" scoped></style>
<script src="./Statistical.js"></script>
