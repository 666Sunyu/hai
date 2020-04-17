<template>
  <div class="container">

    
 
    <div class="w">
      <div class="bjt">
      <div class="left">
        <div class="title">
          <img src="./img/标题.png" />
          <div class="switch">
            <span class="active">今年</span>
            <span>本月</span>
          </div>
          <div class="select">
            排名区域筛选:
            <select name="a" id="pa">
              <option value="1">全省</option>
            </select>
          </div>
        </div>
        <div class="content">
          <el-table :data="tableData"  style="width: 975px">
            <el-table-column header-align='center' align='center' prop="pm" label="排名" width="85">
              <template slot-scope="stDate">
              
               <img v-if="stDate.row.pm===1" src="./img/排1.png" >
               <img v-else-if="stDate.row.pm===2" src="./img/排2.png" >
               <img v-else-if="stDate.row.pm===3" src="./img/排3.png" >
               <span v-else>{{stDate.row.pm}}</span>
              </template>
            </el-table-column>
            <el-table-column header-align='center' align='center' prop="xm" label="姓名" width="80"></el-table-column>
            <el-table-column header-align='center' align='center' prop="jf" label="积分总数"  width="100"></el-table-column>
            <el-table-column header-align='center' align='center' prop="jb" label="级别"  width="75"></el-table-column>
            <el-table-column header-align='center' align='center' prop="cs" label="次数"  width="70"></el-table-column>
            <el-table-column header-align='center' align='center' prop="pj" label="平均分"  width="85"></el-table-column>
            <el-table-column header-align='center' align='center' prop="dy" label="今年第一次考试时间"  width="152"></el-table-column>
            <el-table-column header-align='center' align='center' prop="zh" label="最后一次考试时间"  width="135"></el-table-column>
            <el-table-column header-align='center' align='center' prop="sz" label="所在区县"  width="80"></el-table-column>
            <el-table-column header-align='center' align='center' prop="szpm" label="所在区县排名" ></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="right">
        <div class="js">
          <span>关于海南省气象竞赛考试的通知</span>
          <span>2020年3月15日(周日)</span>
          <span>上午9:00-11:00</span>
          <a href="javascript:;">参加考试人员名单.xls</a>
          <span>届时考生提前5分钟登录系统</span>
          <span>特此通知</span>
          <div>
            <i>2020年1月2日</i>
            <i>海南省气象台</i>
          </div>
        </div>
        <div class="dl">
          <span class="kszc" @click="$router.push({name:'examLogin'})"></span>
          <span class="zc" @click="$router.push({name:'Examregister'})"></span>
        </div>
        <div class="ts">
          教练版(出题)和个人版(正式考试和平日训练)均在此处登录。
        </div>
        <div class="da">
        <ul>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">2019年12月14日海南省竞赛考试</a></li>
          <li><a href="javascript:;">查看全部</a></li>
        </ul>
          
        </div>
      </div></div>
    </div>
      
  </div>
</template>
<script>
export default {
    data() {
        return {
            tableData:[]
        }
    },
    methods: {
        getTablae() {
            let colum = {
                pm: 1,
                xm: '魏建明',
                jf: 1600,
                jb: 'LV5',
                cs: 215,
                pj: '7.8',
                dy: '2019-02-01',
                zh: '2019-02-02',
                sz: '三亚',
                szpm:1
            } 
            for (let i = 1; i <= 20;i++){
                colum.pm = i
                this.tableData.push({...colum})
            }
        }
    },
    created() {
        this.getTablae()
    }
}
</script>
<style src='./exam.scss' lang="scss" scoped >
</style>