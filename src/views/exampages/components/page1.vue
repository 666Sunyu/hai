<template>
  <div class="container">
    <div class="top">
      <div class="card">
        <div class="title">
          <span>预报员精细化要素预报个例预报实况</span>
        </div>
        <div class="content">
          <div class="tableTr">
            <div class="title1">
              <span>预报起报日期及时间</span>
            </div>
            <div class="date">
              <span>2019年02月17日08点</span>
            </div>
          </div>
          <div class="tableCon">
            <div class="top">
              <el-table :data="value1" border style="width:798px">
                <el-table-column
                  fixed
                  header-align="center"
                  align="center"
                  label="站名站号"
                  width="157"
                >
                  <template>
                    <span>琼山</span>
                    <span>46326</span>
                  </template>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="降雨量值(mm)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08-11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    label="11-14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14-17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17-20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20-23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23-02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02-05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05-08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom1">
              <el-table :data="value1" border style="width:798px">
                <el-table-column fixed header-align="center" align="center" prop="name" width="157">
                  <el-table-column fixed header-align="center" align="center" width="157">
                    <template>
                      <span>琼山</span>
                      <span>46326</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="气温(°C)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="title">
          <span>预报员精细化要素预报个例预报答案</span>
        </div>
        <div class="content">
          <div class="tableTr">
            <div class="title1">
              <span>预报起报日期及时间</span>
            </div>
            <div class="date">
              <span>2019年02月17日08点</span>
            </div>
          </div>
          <div class="tableCon">
            <div class="top">
              <el-table :data="value1" border style="width:798px">
                <el-table-column
                  fixed
                  header-align="center"
                  align="center"
                  label="站名站号"
                  width="157"
                >
                  <template>
                    <span>琼山</span>
                    <span>46326</span>
                  </template>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="降雨量值(mm)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08-11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    label="11-14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14-17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17-20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20-23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23-02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02-05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05-08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom1">
              <el-table :data="value1" border style="width:798px">
                <el-table-column fixed header-align="center" align="center" prop="name" width="157">
                  <el-table-column fixed header-align="center" align="center" width="157">
                    <template>
                      <span>琼山</span>
                      <span>46326</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="气温(°C)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="card">
        <div class="title">
          <span>预报员精细化要素预报个例预报分项得分</span>
        </div>
        <div class="content">
          <div class="tableTr">
            <div class="title1">
              <span>预报起报日期及时间</span>
            </div>
            <div class="date">
              <span>2019年02月17日08点</span>
            </div>
          </div>
          <div class="tableCon">
            <div class="top">
              <el-table :data="value1" border style="width:798px">
                <el-table-column
                  fixed
                  header-align="center"
                  align="center"
                  label="站名站号"
                  width="157"
                >
                  <template>
                    <span>琼山</span>
                    <span>59767</span>
                  </template>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="降雨量值(mm)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08-11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    label="11-14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14-17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17-20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20-23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23-02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02-05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05-08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
            <div class="bottom1">
              <el-table :data="value1" border style="width:798px">
                <el-table-column fixed header-align="center" align="center" prop="name" width="157">
                  <el-table-column fixed header-align="center" align="center" width="157">
                    <template>
                      <span>琼山</span>
                      <span>46326</span>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column fixed header-align="center" width="640" label="气温(°C)">
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="11时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="14时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="17时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="20时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="23时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="02时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="05时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed
                    align="center"
                    header-align="center"
                    prop="date"
                    label="08时"
                    width="80"
                  >
                    <template slot-scope="stData">
                      <span>{{stData.row.date}}</span>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //左边上表格数据
      value1: [
        { name: "琼山59767", date: 1 },
        { name: "琼山59767", date: 2 },
        { name: "琼山59767", date: 3 }
      ],
      //左边下表格数据
      value2: [
        { name: "琼山59767", date: 1 },
        { name: "琼山59767", date: 1 },
        { name: "琼山59767", date: 1 }
      ]
    };
  }
};
</script>   
<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 15px;
  .top,
  .bottom {
    display: flex;
    justify-content: space-around;
    .card {
      height: 450px;
      width: 915px;
      border: 1px solid #bbbbbb;
      .title {
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #bde1fb;
        font-weight: 700;
      }
      .content {
        box-sizing: border-box;
        margin-top: 5px;
        margin-left: 5px;
        width: 880px;
        height: 403px;
        border-left: 1px solid #dddddd;
        display: flex;
        .tableTr {
          width: 80px;
          height: 408px;
          border-bottom: 1px solid #dddddd;
          .title1 {
            height: 56px;
            padding-top: 5px;
            text-align: center;
            border-top: 1px solid #dddddd;
            border-bottom: 1px solid #dddddd;
            span {
              color: #000;
            }
          }
          .date {
            span {
              display: inline-block;
              margin-top: 130px;
              color: #3466cb;
              font-weight: 700;
            }
          }
        }
        .tableCon {
          display: flex;
          flex-direction: column;

          .top,
          .bottom1 {
            /deep/ .el-table__header {
              tr {
                th {
                  padding: 0;
                  color: #000;
                  font-weight: 400;
                  height: 28px;
                  background-color: #fff;
                }
              }
              tr:nth-of-type(1) {
                th:nth-of-type(1) {
                  color: #3466cb;
                  font-weight: 700;
                  padding: 0 50px;
                }
              }
            }
            /deep/.el-table__body {
              tr {
                td:nth-of-type(1) {
                  color: #3466cb;
                  font-weight: 700;
                  padding: 0 45px;
                  span {
                    border: 0;
                    width: 45px;
                    height: 20px;
                  }
                }
                td {
                  span {
                    display: inline-block;
                    border: 1px solid #7c7c7c;
                    height: 22px;
                    width: 50px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 10px;
    .card {
      display: inline-block;
      height: 450px;
      width: 915px;
      border: 1px solid #bbbbbb;
    }
  }
}
</style>