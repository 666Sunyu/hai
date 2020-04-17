<template>
  <div class="container">
    <header>
      <div>
        <span>2019年12月14日海南省竞赛考试</span>
        <span>考试姓名：赵某</span>
      </div>
      <div class="active">
        <img src="./img/箭头.png" alt />
        <span>考题1 精细化要素预报 得分:41分</span>
      </div>
      <div>
        <span>考题2 灾害性天气预报 得分:39分</span>
      </div>
      <div>
        <span>总分:80分</span>
      </div>
      <div></div>
    </header>
    <pa-ges1></pa-ges1>
  </div>
</template>
<script>
import PaGes1 from '@/views/exampages/components/page1.vue'
export default {
    components:{
        PaGes1
    }
};
</script>
<style lang="scss" scoped>
.container {
  header {
    height: 45px;
    display: flex;
    align-items: center;
    padding-left: 400px;
    div:nth-of-type(1) {
   
      height: 30px;
      line-height: 30px;
     background-color: #e2f4ff;
      border-radius: 2px;
      border: solid 1px #bad0de;
      padding: 0 15px;
      span:nth-of-type(2) {
        margin-left: 40px;
      }
    }
    div:nth-of-type(2) {
  cursor:pointer;
      margin-left: 38px;
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      padding: 0 15px;
      background-color: #fbf2dc;
        border: solid 1px #d1c6ab;
      img {
        margin-right: 5px;
      }
      span {
        font-weight: 700;
      }
    }
    div:nth-of-type(3) {
  
        cursor:pointer;
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      margin-left: 10px;
      background-color: #fbf2dc;
      border: solid 1px #d1c6ab;
    }
    div:nth-of-type(4) {
      
      height: 30px;
      line-height: 30px;
      padding: 0 15px;
      margin-left: 20px;
      span {
        font-weight: bold;
        font-stretch: normal;

        color: #1b2f61;
      }
    }
    div:nth-of-type(5) {
        cursor:pointer;
        margin-left: 70px;
      width: 107px;
      height: 29px;
      background: url("./img/阅卷.png") no-repeat top center;
    }
    div:nth-of-type(5):hover{
        background: url('./img/阅卷.png') no-repeat bottom center;
    }
    .active{
        background-color: #fed328 !important;
        border:0 !important;
    }
  }
}
</style>