<template>
  <section class="container">
    <div class="wrapper">
      <div class="sleBox">
        <!-- 选择日期 -->
        <div class="weather_date select">
          <h2 class="w_title fir">
            <!-- <img src="../../../caseSearch/imgs/a1.png" alt /> -->
            <a-icon type="schedule" theme="twoTone" style="margin-right:10px;" />选择日期
          </h2>
          <a-date-picker @change="changeBeginDate" placeholder="请选择开始日期" class="datePicker" />
          <a-date-picker @change="changeEndDate" placeholder="请选择结束日期" class="datePicker" />
        </div>
        <!-- 选择站 -->
        <div class="weather_type select">
          <h2 class="w_title">
            <!-- <img src="../../../caseSearch/imgs/a3.png" alt /> -->
            <a-icon type="code" theme="twoTone" style="margin-right:10px" />选择站名
            <span>(可选)</span>
          </h2>
          <a-select
            mode="multiple"
            size="small"
            placeholder="请选择站名"
            class="sysCheck"
            @change="changeStation"
            v-model="sta"
          >
            <a-select-option v-for="(item, index) in allStations" :key="index">{{ item.name }}</a-select-option>
          </a-select>
        </div>
        <!-- 天气系统 -->
        <!-- <div class="weather_system select">
          <h2 class="w_title">
            <a-icon type="project"
                    theme="twoTone"
                    style="margin-right:10px" />天气系统
            <span>(可选)</span>
          </h2>
          <a-select mode="multiple"
                    size="small"
                    placeholder="请选择天气系统"
                    class="sysCheck"
                    @change="changeSystem">
            <a-select-option v-for="item in system"
                             :key="item.key">{{item.name}}</a-select-option>
          </a-select>
        </div>-->
        <!-- 天气类型 -->
        <div class="weather_type select">
          <h2 class="w_title">
            <!-- <img src="../../../caseSearch/imgs/a2.png" alt /> -->
            <a-icon type="cloud" theme="twoTone" style="margin-right:10px" />天气类型
            <span>(可选)</span>
          </h2>
          <a-select
            mode="multiple"
            size="small"
            placeholder="请选择天气类型"
            class="sysCheck"
            @change="onTypeChange"
          >
            <a-select-option v-for="item in plainOptionsType" :key="item">{{ item }}</a-select-option>
          </a-select>
        </div>
        <div class="btn" @click="onConfirm">
          <a-button type="primary" :loading="loading">提交</a-button>
        </div>
      </div>
    </div>
    <div class="mapWrap">
      <div id="map" class="map"></div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.container {
  background: url("../../../../assets/images/login/bj.jpg") no-repeat;
  background-size: 100%;
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 25%;
  z-index: 500;
  transform: translate(-50%, -50%);
  width: 800px;
  min-height: 408px;
  background: url("../../../../assets/images/examCase.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;

  .sleBox {
    position: absolute;
    top: 85px;
    left: 50px;
    width: 685px;
    height: 280px;
    overflow: auto;
    text-align: center;
    .w_title {
      margin-right: 15px;
      &.fir {
        margin-right: 55px;
      }
    }
    // 日期选择框
    .datePicker {
      width: 200px;
      line-height: 38px;
      margin-right: 15px;
    }
    //天气系统多选框
    .sysCheck {
      margin-top: 5px;
      margin-bottom: 10px;
      width: 260px;
      /deep/.ant-select-selection--multiple {
        min-height: 30px;
      }
      /deep/.ant-select-selection__placeholder {
        line-height: 23px;
      }
    }

    //天气类型多选框
    .tyCheck {
      line-height: 38px;
    }
    > .select {
      display: flex;
      text-align: center;
      padding-left: 100px;
      > h2 {
        padding-top: 5px;
        font-size: 16px;
        color: #305364;
      }
    }
    > .weather_date {
      margin-top: 40px;
    }
    > .weather_type {
      margin-top: 18px;
      span {
        font-size: 14px;
        color: #5d555a;
      }
    }
    > .weather_system {
      margin-top: 18px;
      span {
        font-size: 14px;
        color: #5d555a;
      }
    }
    .btn {
      width: 80px;
      margin-top: 35px;
      margin-left: 320px;
    }
  }
}
.mapWrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background: rgb(138, 212, 255);

  /deep/.dName {
    width: 110px !important;
    margin-top: 20px !important;
  }
  /deep/.stationActive {
    width: 130px !important;
    height: 42px !important;
    color: red;
  }
  /deep/.station {
    width: 130px !important;
    height: 42px !important;
    color: darkcyan;
  }

  /deep/.cj {
    position: relative;

    &::after {
      position: absolute;
      top: -35px;
      left: 15px;
      content: "昌江黎族自治县";
      color: #000;
      transform: rotateZ(-45deg);
    }
  }
  /deep/.icon {
    display: inline-block;
    width: 19px;
    height: 19px;
    background: url("../../../../assets/images/aging/generate.png") no-repeat;
  }
}
</style>
<script>
import moment from "moment";
import axios from "axios";
import { mapMutations } from "vuex";
import L from "leaflet";
import rh from "@/assets/js/leaflet-rh.js";
import "leaflet/dist/leaflet.css";
import hainan from "../../../../assets/json/hainancityline.json";
import IntersectMixin from "../../../../mixin/intersect.js";
const plainOptionsType = [
  "短时强降水",
  "寒冷",
  "成片大雾",
  "局地大雾",
  "暴雨",
  "非台暴雨",
  "雷电",
  "雷暴大风",
  "台风",
  "龙卷",
  "冰雹",
  "干旱"
];
const station = [
  {
    key: "59757",
    name: "海南省 琼山 59757"
  },
  {
    key: "59758",
    name: "海南省 海口 59758"
  },
  {
    key: "59838",
    name: "海南省 东方 59838"
  },

  {
    key: "59842",
    name: "海南省 临高 59842"
  },
  {
    key: "59843",
    name: "海南省 澄迈 59843"
  },
  {
    key: "59845",
    name: "海南省 儋州 59845"
  },
  {
    key: "59847",
    name: "海南省 昌江 59847"
  },
  {
    key: "59848",
    name: "海南省 白沙 59848"
  },
  {
    key: "59849",
    name: "海南省 琼中 59849"
  },
  {
    key: "59851",
    name: "海南省 定安 59851"
  },
  {
    key: "59854",
    name: "海南省 屯昌 59854"
  },
  {
    key: "59855",
    name: "海南省 琼海 59855"
  },
  {
    key: "59856",
    name: "海南省 文昌 59856"
  },
  {
    key: "59940",
    name: "海南省 乐东 59940"
  },
  {
    key: "59941",
    name: "海南省 五指山 59941"
  },
  {
    key: "59945",
    name: "海南省 保亭 59945"
  },
  {
    key: "59948",
    name: "海南省 三亚 59948"
  },
  {
    key: "59951",
    name: "海南省 万宁 59951"
  },
  {
    key: "59954",
    name: "海南省 陵水 59954"
  },
  {
    key: "59981",
    name: "海南省 海南三沙市西沙群岛永兴岛 59981"
  },
  {
    key: "59985",
    name: "海南省 珊瑚 59985"
  },
  {
    key: "58724",
    name: "福建省 光泽 58724"
  },
  {
    key: "58725",
    name: "福建省 邵武 58725"
  },
  {
    key: "58731",
    name: "福建省 浦城 58731"
  },
  {
    key: "58734",
    name: "福建省 建阳 58734"
  },
  {
    key: "58735",
    name: "福建省 松溪 58735"
  },
  {
    key: "58736",
    name: "福建省 政和 58736"
  },
  {
    key: "58737",
    name: "福建省 建瓯 58737"
  },
  {
    key: "58744",
    name: "福建省 寿宁 58744"
  },
  {
    key: "58747",
    name: "福建省 周宁 58747"
  },
  {
    key: "58748",
    name: "福建省 福安 58748"
  },
  {
    key: "58749",
    name: "福建省 柘荣 58749"
  },
  {
    key: "58754",
    name: "福建省 福鼎 58754"
  },
  {
    key: "58818",
    name: "福建省 宁化 58818"
  },
  {
    key: "58819",
    name: "福建省 清流 58819"
  },
  {
    key: "58820",
    name: "福建省 泰宁 58820"
  },
  {
    key: "58821",
    name: "福建省 将乐 58821"
  },
  {
    key: "58822",
    name: "福建省 建宁 58822"
  },
  {
    key: "58823",
    name: "福建省 顺昌 58823"
  },
  {
    key: "58824",
    name: "福建省 明溪 58824"
  },
  {
    key: "58826",
    name: "福建省 沙县 58826"
  },
  {
    key: "58828",
    name: "福建省 三明 58828"
  },
  {
    key: "58834",
    name: "福建省 南平 58834"
  },
  {
    key: "58836",
    name: "福建省 古田 58836"
  },
  {
    key: "58837",
    name: "福建省 尤溪 58837"
  },
  {
    key: "58839",
    name: "福建省 闽清 58839"
  },
  {
    key: "58843",
    name: "福建省 霞浦 58843"
  },
  {
    key: "58844",
    name: "福建省 闽侯 58844"
  },
  {
    key: "58845",
    name: "福建省 罗源 58845"
  },
  {
    key: "58846",
    name: "福建省 宁德 58846"
  },
  {
    key: "58847",
    name: "福建省 福州 58847"
  },
  {
    key: "58848",
    name: "福建省 连江 58848"
  },
  {
    key: "58850",
    name: "福建省 三沙 58850"
  },
  {
    key: "58911",
    name: "福建省 长汀 58911"
  },
  {
    key: "58912",
    name: "福建省 连城 58912"
  },
  {
    key: "58917",
    name: "福建省 武平 58917"
  },
  {
    key: "58918",
    name: "福建省 上杭 58918"
  },
  {
    key: "58921",
    name: "福建省 永安 58921"
  },
  {
    key: "58923",
    name: "福建省 大田 58923"
  },
  {
    key: "58926",
    name: "福建省 漳平 58926"
  },
  {
    key: "58927",
    name: "福建省 龙岩 58927"
  },
  {
    key: "58928",
    name: "福建省 华安 58928"
  },
  {
    key: "58929",
    name: "福建省 安溪 58929"
  },
  {
    key: "58931",
    name: "福建省 九仙山 58931"
  },
  {
    key: "58932",
    name: "福建省 永泰 58932"
  },
  {
    key: "58933",
    name: "福建省 屏南 58933"
  },
  {
    key: "58934",
    name: "福建省 永春 58934"
  },
  {
    key: "58935",
    name: "福建省 德化 58935"
  },
  {
    key: "58936",
    name: "福建省 仙游 58936"
  },
  {
    key: "58938",
    name: "福建省 秀屿 58938"
  },
  {
    key: "58940",
    name: "福建省 晋安 58940"
  },
  {
    key: "58941",
    name: "福建省 长乐 58941"
  },
  {
    key: "58942",
    name: "福建省 福清 58942"
  },
  {
    key: "58944",
    name: "福建省 平潭 58944"
  },
  {
    key: "58946",
    name: "福建省 莆田 58946"
  },
  {
    key: "59113",
    name: "福建省 永定 59113"
  },
  {
    key: "59122",
    name: "福建省 长泰 59122"
  },
  {
    key: "59124",
    name: "福建省 南靖 59124"
  },
  {
    key: "59125",
    name: "福建省 平和 59125"
  },
  {
    key: "59126",
    name: "福建省 漳州 59126"
  },
  {
    key: "59127",
    name: "福建省 龙海 59127"
  },
  {
    key: ",59129",
    name: "福建省 漳浦 ,59129"
  },
  {
    key: "59130",
    name: "福建省 同安 59130"
  },
  {
    key: "59131",
    name: "福建省 南安 59131"
  },
  {
    key: "59133",
    name: "福建省 崇武 59133"
  },
  {
    key: "59134",
    name: "福建省 厦门 59134"
  },
  {
    key: "59137",
    name: "福建省 晋江 59137"
  },
  {
    key: "59320",
    name: "福建省 诏安 59320"
  },
  {
    key: "59321",
    name: "福建省 东山 59321"
  },
  {
    key: "59322",
    name: "福建省 云霄 59322"
  },
  {
    key: "57988",
    name: "广东省 乐昌 57988"
  },
  {
    key: "57989",
    name: "广东省 仁化 57989"
  },
  {
    key: "57996",
    name: "广东省 南雄 57996"
  },
  {
    key: "59071",
    name: "广东省 连南 59071"
  },
  {
    key: "59072",
    name: "广东省 连州 59072"
  },
  {
    key: "59074",
    name: "广东省 连山 59074"
  },
  {
    key: "59075",
    name: "广东省 阳山 59075"
  },
  {
    key: "59081",
    name: "广东省 乳源 59081"
  },
  {
    key: "59082",
    name: "广东省 韶关 59082"
  },
  {
    key: "59087",
    name: "广东省 佛冈 59087"
  },
  {
    key: "59088",
    name: "广东省 英德 59088"
  },
  {
    key: "59090",
    name: "广东省 始兴 59090"
  },
  {
    key: "59094",
    name: "广东省 翁源 59094"
  },
  {
    key: "59096",
    name: "广东省 连平 59096"
  },
  {
    key: "59097",
    name: "广东省 新丰 59097"
  },
  {
    key: "59099",
    name: "广东省 和平 59099"
  },
  {
    key: "59106",
    name: "广东省 平远 59106"
  },
  {
    key: "59107",
    name: "广东省 龙川 59107"
  },
  {
    key: "59109",
    name: "广东省 兴宁 59109"
  },
  {
    key: "59114",
    name: "广东省 蕉岭 59114"
  },
  {
    key: "59116",
    name: "广东省 大埔 59116"
  },
  {
    key: "59117",
    name: "广东省 梅县 59117"
  },
  {
    key: "59264",
    name: "广东省 封开 59264"
  },
  {
    key: "59268",
    name: "广东省 郁南 59268"
  },
  {
    key: "59269",
    name: "广东省 德庆 59269"
  },
  {
    key: "59270",
    name: "广东省 怀集 59270"
  },
  {
    key: "59271",
    name: "广东省 广宁 59271"
  },
  {
    key: "59276",
    name: "广东省 四会 59276"
  },
  {
    key: "59278",
    name: "广东省 高要 59278"
  },
  {
    key: "59279",
    name: "广东省 三水 59279"
  },
  {
    key: "59280",
    name: "广东省 清远 59280"
  },
  {
    key: "59284",
    name: "广东省 花都 59284"
  },
  {
    key: "59285",
    name: "广东省 从化 59285"
  },
  {
    key: "59287",
    name: "广东省 广州 59287"
  },
  {
    key: "59288",
    name: "广东省 南海 59288"
  },
  {
    key: "59289",
    name: "广东省 东莞 59289"
  },
  {
    key: "59290",
    name: "广东省 龙门 59290"
  },
  {
    key: "59293",
    name: "广东省 河源 59293"
  },
  {
    key: "59294",
    name: "广东省 增城 59294"
  },
  {
    key: "59297",
    name: "广东省 博罗 59297"
  },
  {
    key: "59298",
    name: "广东省 惠阳 59298"
  },
  {
    key: "59303",
    name: "广东省 五华 59303"
  },
  {
    key: "59304",
    name: "广东省 紫金 59304"
  },
  {
    key: "59306",
    name: "广东省 揭西 59306"
  },
  {
    key: "59310",
    name: "广东省 丰顺 59310"
  },
  {
    key: "59312",
    name: "广东省 潮州 59312"
  },
  {
    key: "59313",
    name: "广东省 饶平 59313"
  },
  {
    key: "59314",
    name: "广东省 普宁 59314"
  },
  {
    key: "59315",
    name: "广东省 揭阳 59315"
  },
  {
    key: "59317",
    name: "广东省 惠来 59317"
  },
  {
    key: "59318",
    name: "广东省 潮阳 59318"
  },
  {
    key: "59319",
    name: "广东省 澄海 59319"
  },
  {
    key: "59324",
    name: "广东省 南澳 59324"
  },
  {
    key: "59456",
    name: "广东省 信宜 59456"
  },
  {
    key: "59462",
    name: "广东省 罗定 59462"
  },
  {
    key: "59469",
    name: "广东省 阳春 59469"
  },
  {
    key: "59470",
    name: "广东省 新兴 59470"
  },
  {
    key: "59471",
    name: "广东省 云浮 59471"
  },
  {
    key: "59473",
    name: "广东省 鹤山 59473"
  },
  {
    key: "59475",
    name: "广东省 开平 59475"
  },
  {
    key: "59476",
    name: "广东省 新会 59476"
  },
  {
    key: "59477",
    name: "广东省 恩平 59477"
  },
  {
    key: "59478",
    name: "广东省 台山 59478"
  },
  {
    key: "59480",
    name: "广东省 顺德 59480"
  },
  {
    key: "59481",
    name: "广东省 番禺 59481"
  },
  {
    key: "59485",
    name: "广东省 中山 59485"
  },
  {
    key: "59487",
    name: "广东省 斗门 59487"
  },
  {
    key: "59488",
    name: "广东省 珠海 59488"
  },
  {
    key: "59492",
    name: "广东省 惠东 59492"
  },
  {
    key: "59493",
    name: "广东省 深圳 59493"
  },
  {
    key: "59500",
    name: "广东省 海丰 59500"
  },
  {
    key: "59502",
    name: "广东省 陆丰 59502"
  },
  {
    key: "59650",
    name: "广东省 遂溪 59650"
  },
  {
    key: "59653",
    name: "广东省 高州 59653"
  },
  {
    key: "59654",
    name: "广东省 廉江 59654"
  },
  {
    key: "59655",
    name: "广东省 化州 59655"
  },
  {
    key: "59656",
    name: "广东省 吴川 59656"
  },
  {
    key: "59658",
    name: "广东省 湛江 59658"
  },
  {
    key: "59659",
    name: "广东省 茂名 59659"
  },
  {
    key: "59663",
    name: "广东省 阳江 59663"
  },
  {
    key: "59664",
    name: "广东省 电白 59664"
  },
  {
    key: "59673",
    name: "广东省 上川岛 59673"
  },
  {
    key: "59750",
    name: "广东省 雷州 59750"
  },
  {
    key: "59754",
    name: "广东省 徐闻 59754"
  },
  {
    key: "57859",
    name: "广西壮族自治区 资源 57859"
  },
  {
    key: "57927",
    name: "广西壮族自治区 天峨 57927"
  },
  {
    key: "57941",
    name: "广西壮族自治区 三江 57941"
  },
  {
    key: "57942",
    name: "广西壮族自治区 龙胜 57942"
  },
  {
    key: "57947",
    name: "广西壮族自治区 融安 57947"
  },
  {
    key: "57948",
    name: "广西壮族自治区 融水 57948"
  },
  {
    key: "57949",
    name: "广西壮族自治区 永福 57949"
  },
  {
    key: "57954",
    name: "广西壮族自治区 临桂 57954"
  },
  {
    key: "57955",
    name: "广西壮族自治区 兴安 57955"
  },
  {
    key: "57956",
    name: "广西壮族自治区 灵川 57956"
  },
  {
    key: "57957",
    name: "广西壮族自治区 桂林 57957"
  },
  {
    key: "57958",
    name: "广西壮族自治区 雁山 57958"
  },
  {
    key: "57960",
    name: "广西壮族自治区 全州 57960"
  },
  {
    key: "57964",
    name: "广西壮族自治区 灌阳 57964"
  },
  {
    key: "59001",
    name: "广西壮族自治区 隆林 59001"
  },
  {
    key: "59004",
    name: "广西壮族自治区 西林 59004"
  },
  {
    key: "59012",
    name: "广西壮族自治区 乐业 59012"
  },
  {
    key: "59015",
    name: "广西壮族自治区 凌云 59015"
  },
  {
    key: "59017",
    name: "广西壮族自治区 田林 59017"
  },
  {
    key: "59021",
    name: "广西壮族自治区 凤山 59021"
  },
  {
    key: "59022",
    name: "广西壮族自治区 南丹 59022"
  },
  {
    key: "59023",
    name: "广西壮族自治区 河池 59023"
  },
  {
    key: "59025",
    name: "广西壮族自治区 东兰 59025"
  },
  {
    key: "59027",
    name: "广西壮族自治区 巴马 59027"
  },
  {
    key: "59031",
    name: "广西壮族自治区 环江 59031"
  },
  {
    key: "59033",
    name: "广西壮族自治区 罗城 59033"
  },
  {
    key: "59034",
    name: "广西壮族自治区 宜州 59034"
  },
  {
    key: "59037",
    name: "广西壮族自治区 都安 59037"
  },
  {
    key: "59038",
    name: "广西壮族自治区 忻城 59038"
  },
  {
    key: "59041",
    name: "广西壮族自治区 柳城 59041"
  },
  {
    key: "59044",
    name: "广西壮族自治区 沙塘 59044"
  },
  {
    key: "59045",
    name: "广西壮族自治区 鹿寨 59045"
  },
  {
    key: "59046",
    name: "广西壮族自治区 柳州 59046"
  },
  {
    key: "59047",
    name: "广西壮族自治区 柳江 59047"
  },
  {
    key: "59051",
    name: "广西壮族自治区 阳朔 59051"
  },
  {
    key: "59052",
    name: "广西壮族自治区 恭城 59052"
  },
  {
    key: "59053",
    name: "广西壮族自治区 平乐 59053"
  },
  {
    key: "59055",
    name: "广西壮族自治区 荔浦 59055"
  },
  {
    key: "59057",
    name: "广西壮族自治区 金秀 59057"
  },
  {
    key: "59058",
    name: "广西壮族自治区 蒙山 59058"
  },
  {
    key: "59059",
    name: "广西壮族自治区 昭平 59059"
  },
  {
    key: "59061",
    name: "广西壮族自治区 富川 59061"
  },
  {
    key: "59064",
    name: "广西壮族自治区 钟山 59064"
  },
  {
    key: "59065",
    name: "广西壮族自治区 贺州 59065"
  },
  {
    key: "59209",
    name: "广西壮族自治区 那坡 59209"
  },
  {
    key: "59211",
    name: "广西壮族自治区 百色 59211"
  },
  {
    key: "59213",
    name: "广西壮族自治区 田阳 59213"
  },
  {
    key: "59215",
    name: "广西壮族自治区 德保 59215"
  },
  {
    key: "59218",
    name: "广西壮族自治区 靖西 59218"
  },
  {
    key: "59224",
    name: "广西壮族自治区 田东 59224"
  },
  {
    key: "59227",
    name: "广西壮族自治区 天等 59227"
  },
  {
    key: "59228",
    name: "广西壮族自治区 平果 59228"
  },
  {
    key: "59229",
    name: "广西壮族自治区 隆安 59229"
  },
  {
    key: "59230",
    name: "广西壮族自治区 马山 59230"
  },
  {
    key: "59235",
    name: "广西壮族自治区 上林 59235"
  },
  {
    key: "59237",
    name: "广西壮族自治区 武鸣 59237"
  },
  {
    key: "59238",
    name: "广西壮族自治区 宾阳 59238"
  },
  {
    key: "59241",
    name: "广西壮族自治区 象州 59241"
  },
  {
    key: "59242",
    name: "广西壮族自治区 来宾 59242"
  },
  {
    key: "59246",
    name: "广西壮族自治区 武宣 59246"
  },
  {
    key: "59249",
    name: "广西壮族自治区 贵港 59249"
  },
  {
    key: "59254",
    name: "广西壮族自治区 桂平 59254"
  },
  {
    key: "59255",
    name: "广西壮族自治区 平南 59255"
  },
  {
    key: "59256",
    name: "广西壮族自治区 藤县 59256"
  },
  {
    key: "59265",
    name: "广西壮族自治区 梧州 59265"
  },
  {
    key: "59266",
    name: "广西壮族自治区 龙圩 59266"
  },
  {
    key: "59417",
    name: "广西壮族自治区 龙州 59417"
  },
  {
    key: "59419",
    name: "广西壮族自治区 凭祥 59419"
  },
  {
    key: "59421",
    name: "广西壮族自治区 大新 59421"
  },
  {
    key: "59425",
    name: "广西壮族自治区 崇左 59425"
  },
  {
    key: "59426",
    name: "广西壮族自治区 扶绥 59426"
  },
  {
    key: "59427",
    name: "广西壮族自治区 宁明 59427"
  },
  {
    key: "59429",
    name: "广西壮族自治区 上思 59429"
  },
  {
    key: "59431",
    name: "广西壮族自治区 南宁 59431"
  },
  {
    key: "59432",
    name: "广西壮族自治区 南宁城区 59432"
  },
  {
    key: "59435",
    name: "广西壮族自治区 邕宁 59435"
  },
  {
    key: "59441",
    name: "广西壮族自治区 横县 59441"
  },
  {
    key: "59446",
    name: "广西壮族自治区 灵山 59446"
  },
  {
    key: "59448",
    name: "广西壮族自治区 浦北 59448"
  },
  {
    key: "59449",
    name: "广西壮族自治区 博白 59449"
  },
  {
    key: "59451",
    name: "广西壮族自治区 北流 59451"
  },
  {
    key: "59452",
    name: "广西壮族自治区 容县 59452"
  },
  {
    key: "59453",
    name: "广西壮族自治区 玉林 59453"
  },
  {
    key: "59454",
    name: "广西壮族自治区 岑溪 59454"
  },
  {
    key: "59457",
    name: "广西壮族自治区 陆川 59457"
  },
  {
    key: "59626",
    name: "广西壮族自治区 东兴 59626"
  },
  {
    key: "59631",
    name: "广西壮族自治区 防城 59631"
  },
  {
    key: "59632",
    name: "广西壮族自治区 钦州 59632"
  },
  {
    key: "59635",
    name: "广西壮族自治区 防城港 59635"
  },
  {
    key: "59640",
    name: "广西壮族自治区 合浦 59640"
  },
  {
    key: "59644",
    name: "广西壮族自治区 北海 59644"
  },
  {
    key: "59647",
    name: "广西壮族自治区 涠洲岛 59647"
  }
];
const system = [
  {
    key: "高空冷涡、槽(500hpa)",
    name: "高空冷涡、槽(500hpa)"
  },
  {
    key: "切变线(700hpa、850hpa、925hpa)",
    name: "切变线(700hpa、850hpa、925hpa)"
  },
  {
    key: "气旋(江淮、蒙古、西南涡)",
    name: "气旋(江淮、蒙古、西南涡)"
  },
  {
    key: "锋面系统(冷锋、暖锋、静止锋)",
    name: "锋面系统(冷锋、暖锋、静止锋)"
  },
  {
    key: "副热带高压",
    name: "副热带高压"
  },
  {
    key: "热带低值系统(热带风暴、台风)",
    name: "热带低值系统(热带风暴、台风)"
  },
  {
    key: "低空急流",
    name: "低空急流"
  },
  {
    key: "高空急流",
    name: "高空急流"
  },
  {
    key: "边界层辐合线",
    name: "边界层辐合线"
  },
  {
    key: "干线",
    name: "干线"
  },
  {
    key: "中尺度地形(地形强迫作用)",
    name: "中尺度地形(地形强迫作用)"
  }
];

export default {
  data() {
    return {
      moment,
      plainOptionsType,
      system,
      allStations: [], //未抽稀的station
      stations: [], //抽稀后的station
      strTime: "",
      endTime: "",
      sta: [],
      weatherKind: "",
      weatherSystem: "",
      loading: false,
      markerLayers: [],
      stationLayers: []
    };
  },
  mixins: [IntersectMixin],
  created() {
    axios.get("/hnStationInfo.txt").then(res => {
      const data = res.data.split(/\n/).map(item => {
        return item.split(",");
      });
      let stations = data.map((el, idx) => {
        return {
          key: el[0],
          name: el[1],
          lon: el[2],
          lat: el[3],
          pro: el[4],
          checked: false,
          value: idx
        };
      });
      this.allStations = JSON.parse(JSON.stringify(stations));
      this.stations = this.getNoIntersectData(this.allStations);
      this.initStaions();
    });
  },
  watch: {
    sta(v) {
      if (this.sta.length > 4) {
        alert("最多选择4个");
        this.sta.pop();
        return;
      }
      this.allStations.forEach(el => {
        el.checked = false;
      });
      this.sta.forEach(item => {
        this.allStations.forEach(el => {
          if (item == el.value) {
            el.checked = true;
          }
        });
      });
      this.initStaions();
    }
  },
  mounted() {
    this.initMap();
    this.initJson();
  },
  methods: {
    ...mapMutations(["changeSleInfo", "changeExampleId", "changeUserInfo"]),
    initMap() {
      this.map = L.map("map", {
        attributionControl: false,
        zoomControl: false,
        minZoom: 8,
        maxZoom: 12,
        zIndex: 0
      }).setView([19.2345687328717, 108.78686523437501], 9);
      this.map.on("zoomend", () => {
        this.stations = this.getNoIntersectData(this.allStations);
        this.initStaions();
      });
      this.map.on("moveend", () => {
        this.stations = this.getNoIntersectData(this.allStations);
        this.initStaions();
      });
    },
    initJson(data = {}) {
      if (this.markerLayers.length) {
        this.markerLayers.forEach(item => {
          this.map.removeLayer(item);
        });
        this.markerLayers = [];
      }

      var that = this;
      L.geoJSON(hainan, {
        style(feature) {
          return {
            color: "rgb(169,152,153)",
            opacity: "0.6",
            fillColor: "rgb(253,254,208)",
            fillOpacity: "0.2",
            weight: 2,
            className: "aa"
          };
        },
        pane: "tilePane",
        onEachFeature(feature, layer) {
          if (feature.properties.DNAME === "三沙市") {
            return;
          }
          layer.on("mouseover", e => {
            layer.setStyle({
              fillColor: "rgb(199,249,174)"
            });
          });

          layer.on("mouseout", e => {
            layer.setStyle({
              fillColor: "rgb(253,254,208)"
            });
          });
          //   layer.on("click", e => {
          //     console.log(e);
          //   });
          //----------
          var latLng = [];
          var className = "dName";
          var html = feature.properties.DNAME;

          switch (html) {
            case "东方市":
              latLng = [19.01278705937288, 108.82781982421876];
              break;
            case "昌江黎族自治县":
              latLng = [19.21780295966795, 109.03381347656251];
              html = "";
              className = "cj";
              break;
            case "白沙黎族自治县":
              latLng = [19.210022196386095, 109.33593750000001];
              break;
            case "儋州市":
              latLng = [19.55202569751752, 109.42382812500001];
              break;
            case "临高县":
              latLng = [19.815806165386956, 109.71221923828126];
              break;
            case "澄迈县":
              latLng = [19.696900138883937, 109.99786376953126];
              break;
            case "海口市":
              latLng = [19.83906000930461, 110.43731689453126];
              break;
            case "文昌市":
              latLng = [19.766703551716976, 110.79711914062501];
              break;
            case "定安县":
              latLng = [19.518375478601566, 110.32745361328126];
              break;
            case "屯昌县":
              latLng = [19.339653419491874, 110.04730224609376];
              break;
            case "琼海市":
              latLng = [19.215209412824127, 110.41809082031251];
              break;
            case "琼中黎族苗族自治县":
              latLng = [19.033559718886284, 109.73419189453126];
              break;
            case "万宁市":
              latLng = [18.843913201134143, 110.27801513671875];
              break;
            case "五指山市":
              latLng = [18.841313810317015, 109.4952392578125];
              break;
            case "保亭黎族苗族自治县":
              latLng = [18.63583516062285, 109.54467773437501];
              break;
            case "陵水黎族自治县":
              latLng = [18.594188856740427, 109.86877441406251];
              break;
            case "乐东黎族自治县":
              latLng = [18.67747125852608, 109.08325195312501];
              break;
            // case '三沙市':
            //     latLng=[18.427501971948608,109.38537597656251];
            //     break;
            case "三亚市":
              latLng = [18.427501971948608, 109.38537597656251];
              break;
          }
          var myIcon = L.divIcon({
            html,
            className
          });
          that.markerLayers.push(
            L.marker(latLng, {
              icon: myIcon
            })
          );
        }
      }).addTo(this.map);
      this.markerLayers.forEach(item => {
        item.addTo(this.map);
      });
    },
    initStaions() {
      setTimeout(() => {
        if (this.stationLayers.length) {
          this.stationLayers.forEach(item => {
            this.map.removeLayer(item);
          });
          this.stationLayers = [];
        }
        let dats = [];
        this.stations.forEach(item => {
          dats.push(item);
          this.stationLayers.push(
            L.marker([item.lat, item.lon], {
              icon: L.divIcon({
                html: `<div><span class='icon'></span><p>${item.name}</p></div>`,
                _item: item,
                className: item.checked ? "stationActive" : "station"
              })
            })
          );
        });

        this.stationLayers.forEach((sta, index) => {
          sta.on("click", e => {
            let data = e.target.options.icon.options._item;
            data.checked = !data.checked;
            if (data.checked) {
              this.sta.push(data.value);
              console.log("sta", this.sta);
            } else {
              let i = this.sta.findIndex(s => s == data.value);
              this.sta.splice(i, 1);
            }
            sta.setIcon(
              L.divIcon({
                html: `<div><span class='icon'></span><p>${data.name}</p></div>`,
                _item: dats[index],
                className: data.checked ? "stationActive" : "station"
              })
            );
          });
          sta.addTo(this.map);
        });

        // if (this.stationLayerGroup) {
        //   this.stationLayerGroup.remove();
        // }
        // const stationData = this.stations.map(el => {
        //   return {
        //     stationId: el.key,
        //     stationName: el.name,
        //     lng: el.lon,
        //     lat: el.lat,
        //     datas: [],
        //     showAnyway: false, //true表示显示全部|false表示抽稀
        //     stationImageUrl: require("@/assets/images/aging/generate.png"),
        //     stationImageWidth: 19,
        //     stationImageHeight: 19,
        //     _myData: el
        //   };
        // });
        // this.stationLayerGroup = L.RH.zdzLayer({
        //   showStationName: true,
        //   showWind: false,
        //   stationNameColor: "blue",
        //   clickHandler: function(e) {
        //     console.log(123);
        //   },
        //   datasVisibilityMask: [] //控制要素的显示，与datas一一对应
        // });
        // this.stationLayerGroup.setData(stationData);
        // this.stationLayerGroup.addTo(this.map);
        // this.map.addLayer(this.stationLayerGroup);
      });
    },

    //日期变更
    changeBeginDate(date, dateString) {
      this.strTime = moment(dateString, "YYYY-MM-DD").format("YYYYMMDDHHmmss");
    },
    changeEndDate(date, dateString) {
      this.endTime = moment(dateString, "YYYY-MM-DD").format("YYYYMMDDHHmmss");
    },
    // 天气类型多选
    onTypeChange(arr) {
      this.weatherKind = arr.join();
    },
    //站名多选
    changeStation(staArr) {},
    //天气系统多选
    changeSystem(sysArr) {
      this.weatherSystem = sysArr.join();
    },
    //提交
    onConfirm() {
      if (!(this.strTime && this.endTime)) {
        this.$message.warning("请选择查询日期");
        return;
      }
      const CancelToken = axios.CancelToken;
      let token;
      if (token) {
        token();
        token = null;
      }
      this.loading = true;
      //获取竞赛题id
      axios
        .get(
          `/stweather/proxy/172.22.68.119:8667/api/produceSubject?startTime=${
            this.strTime
          }&endTime=${this.endTime}&siteInfo=${this.sta.join()}&weatherKind=${
            this.weatherKind
          }&weatherSystem=${this.weatherSystem}`,
          {
            cancelToken: new CancelToken(c => {
              token = c;
            })
          }
        )

        .then(res => {
          this.loading = false;
          if (res.data.status == 0) {
            this.result = res.data.data;

            //保存
            this.changeSleInfo({
              startTime: this.strTime,
              endTime: this.endTime,
              weatherKind: this.weatherKind,
              weatherSystem: this.weatherSystem
            });
            this.changeExampleId(this.result.exampleId);
            this.$router.replace({
              name: "ExamSle"
            });
          } else if (res.data.status == "-1") {
            this.$message.warning(res.data.msg);
          } else if (res.data.status == 888) {
            //重新登陆
            this.$message.warning("当前账号已过期,请重新登陆!");
            sessionStorage.removeItem("userInfo");
            this.changeUserInfo(null);
            this.$router.replace("/login");
          }
        })
        .catch(err => {
          this.loading = false;
        });
    }
  }
};
</script>
