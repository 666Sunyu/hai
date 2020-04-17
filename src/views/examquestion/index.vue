<template>
  <div class="container">
    <div class="w">
      <div class="bj">
        <header>
          <div>
            <span>姓名</span>
            <i>王强</i>
          </div>
          <div>
            <span>电话</span>
            <i>13123456789</i>
          </div>
          <div>
            <span>邮箱</span>
            <i>123456789@qq.com</i>
          </div>
          <div>
            <span>单位</span>
            <i>三亚市气象局</i>
          </div>
          <div></div>
          <div>
            <img src="./img/修改密码.png" /> 修改密码
          </div>
        </header>
        <div class="fgx"></div>
        <div class="content">
          <div class="left">
            <div class="title">
              <img src="./img/试题列表.png" />
              <img src="./img/提示.png" alt />
              <span>点击行查看答题情况</span>
            </div>
            <el-table border :data="leftTable" style="width: 100%">
              <el-table-column
                header-align="center"
                align="center"
                type="index"
                label="序号"
                width="36"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="name"
                label="名称"
                width="215"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="sj1"
                label="MICAPS数据1"
                width="65"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="sj2"
                label="MICAPS数据2"
                width="65"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="xz"
                label="试卷下载"
                width="50"
              ></el-table-column>
              <el-table-column header-align="center" align="center" label="试卷状态" width="70">
                <template slot-scope="stData">
                  <span class="red" v-if="stData.row.zt===1">未发布</span>
                  <span class="green" v-else>已发布</span>
                </template>
              </el-table-column>
              <el-table-column header-align="center" align="center" label="答案公布" width="72">
                <template slot-scope="stData">
                  <span class="red" v-if="stData.row.da===1">未发布</span>
                  <span class="green" v-else>已发布</span>
                </template>
              </el-table-column>
              <el-table-column header-align="center" label="操作">
                <template slot-scope="stData">
                  <el-button>删除</el-button>
                  <el-button v-if="stData.row.da===1">发布试题</el-button>
                  <el-button v-else-if="stData.row.da===2">公布答案</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                :current-page="1"
                :page-size="10"
                layout="total,prev, pager, next, jumper"
                :total="40"
              ></el-pagination>
            </div>
          </div>
          <div class="right">
            <div class="title">
              <span>2019年12月14日海南省竞赛考试答题情况</span>
            </div>
            <el-table height="572" border :data="rightTable" style="width: 100%">
              <el-table-column
                header-align="center"
                align="center"
                type="index"
                label="序号"
                width="50"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="xm"
                label="答题人姓名"
                width="120"
              ></el-table-column>
              <el-table-column
                header-align="center"
                align="center"
                prop="sj"
                label="试卷提交时间"
                width="150"
              ></el-table-column>
              <el-table-column header-align="center" align="center" prop="df" label="得分" width="88"></el-table-column>
              <el-table-column header-align="center" align="center" label="阅卷人">
                <template slot-scope="stData">
                  {{stData.row.yjr}}
                  <el-button v-if="!stData.row.yjr" @click="$router.push({name:'examPages'})">阅卷</el-button>
                </template>
              </el-table-column>
            </el-table>
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
      //试题列表表格
      leftTable: [],
      //大体情况
      rightTable: []
    };
  },
  methods: {
    getLeftTable() {
      let a = {
        name: "2019年09月08日海南省竞赛考试",
        sj1: "题1",
        sj2: "题2",
        xz: "下载",
        zt: 2,
        da: 1
      };
      let b = {
        name: "2019年09月08日海南省竞赛考试",
        sj1: "题1",
        sj2: "题2",
        xz: "下载",
        zt: 1,
        da: 2
      };
      for (var i = 0; i < 5; i++) {
        this.leftTable.push(a);
        this.leftTable.push(b);
        this.leftTable.push(a);
      }
    },
    getRigthTable() {
      let a = {
        xm: "苗文兵",
        sj: "2018/1/7  15:44",
        df: "88",
        yjr: "李斯荣"
      };
      let b = {
        xm: "苗文兵",
        sj: "2018/1/7  15:44",
        df: "88",
        yjr: ""
      };
      for (let i = 0; i < 20; i++) {
        this.rightTable.push(a);
        this.rightTable.push(b);
      }
    }
  },
  created() {
    this.getLeftTable();
    this.getRigthTable();
  }
};
</script>
<style lang="scss" scoped>
.container {
  .red {
    color: red;
  }
  .green {
    color: #207a00;
  }
  height: 100%;
  background-color: #d4ecff;
  .w {
    background-color: #fff;
  }
  .bj {
    padding-bottom: 60px;
    background: url("./img/背景.jpg") no-repeat center bottom;
  }
  header {
    height: 80px;

    display: flex;
    align-items: center;
    div:nth-of-type(1) {
      margin-left: 155px;
    }
    div:nth-of-type(2) {
      margin-left: 40px;
    }
    div:nth-of-type(3) {
      margin-left: 45px;
    }
    div:nth-of-type(4) {
      margin-left: 40px;
    }
    div:nth-of-type(5) {
      margin-left: 30px;
      height: 44px;
      width: 200px;
      background: url("./img/按钮.png") no-repeat top center;
      background-size: 200px;
    }
    div:nth-of-type(5):hover {
      background: url("./img/按钮.png") no-repeat bottom center;
      background-size: 200px;
    }
    div:nth-of-type(6) {
      cursor: pointer;
      margin-left: 35px;
      color: #8aacd9;
      font-size: 15px;
    }
    span {
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 15px;
      color: #b8b8b8;
    }
    i {
      margin-left: 5px;
      font-family: "lato";
      font-style: normal;
      font-size: 15px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 15px;
      color: #3b3b3b;
    }
  }
  .fgx {
    background: url("./img/分割线.png") no-repeat bottom center;
    height: 18px;
  }
  .content {
    display: flex;
    padding: 0 20px;
    .left {
      width: 710px;
      .title {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        img:nth-of-type(2) {
          margin: 0 5px;
        }
        span {
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 18px;
          letter-spacing: 0px;
          color: #679ed2;
        }
      }
      /deep/ .el-table .cell {
        padding: 0;
      }
      /deep/ .el-table__header-wrapper {
        .has-gutter {
          tr {
            height: 38px;
            th {
              padding: 0;
              margin: 0;
              font-size: 12px !important;
              font-weight: normal;
              font-family: "lato";
              color: #222;
              background-color: #c9eafe;
            }
          }
        }
      }
      /deep/.el-table__body-wrapper {
        tr {
          height: 35px;
          td {
            padding: 0;
            font-size: 12px;
            font-family: "lato";
          }
          td:nth-of-type(2),
          td:nth-of-type(3),
          td:nth-of-type(4),
          td:nth-of-type(5) {
            color: #0053b9;
          }
        }
        tr:hover > td {
          background-color: #e1f4ff;
        }
      }
      .el-button:nth-of-type(1) {
        width: 40px;
        height: 25px;
        color: #fff;
        background-color: #47b1e7;
        font-family: "lato";
        padding: 0;
        border-radius: 12px;
      }
      .el-button:nth-of-type(1):hover,
      .el-button:nth-of-type(2):hover,
      .el-button:nth-of-type(3):hover {
        background-color: #6ac9f6;
      }
      .el-button:nth-of-type(2),
      .el-button:nth-of-type(3) {
        height: 25px;
        width: 65px;
        color: #fff;
        background-color: #47b1e7;
        font-family: "lato";
        padding: 0;
        border-radius: 12px;
      }
      .pagination {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      /deep/.el-pagination {
        button {
          background-color: #f2f8ff;
        }
        ul {
          li {
            background-color: #f2f8ff;
          }
        }
      }
    }
    .right {
      margin-left: 20px;
      width: 515px;
      .title {
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          font-size: 15px;
          line-height: 34px;
          color: #0053b9;
        }
      }
      /deep/ .el-table__header-wrapper {
        .has-gutter {
          tr {
            height: 47px;
            th {
              padding: 0;
              margin: 0;
              font-size: 11px !important;
              font-weight: normal;
              font-family: "lato";
              color: #222;
              background-color: #c9eafe;
            }
          }
        }
      }
      /deep/.el-table__body-wrapper {
        tr {
          td {
            padding: 0;
            height: 25px;
            color: #222;
            font-family: "lato";
          }
        }
      }
      .el-button:nth-of-type(1) {
        width: 40px;
        height: 25px;
        color: #fff;
        background-color: #47b1e7;
        font-family: "lato";
        padding: 0;
        border-radius: 12px;
      }
      .el-button:nth-of-type(1):hover {
        background-color: #6ac9f6;
      }
    }
  }
}
</style>