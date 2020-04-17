<template>
  <section class="wrap">
    <div class="box3">准考证号:{{userInfo.number}} 考生姓名:{{userInfo.name}} 考生单位:{{userInfo.company}}</div>
    <div class="down"
         v-if="isShowDown">
      <a-button type="link"
                icon="download"
                @click="downLoad">下载配套数据</a-button>
    </div>
    <div class="select">
      <slot></slot>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.wrap {
  position: relative;
}
.box3 {
  height: 38px;
  color: #5a7fcb;
  line-height: 38px;
  padding-left: 5px;
  background-color: #efefef;
}
.down {
  position: absolute;
  top: 3px;
  right: 20px;
}
.select {
  position: absolute;
  top: 3px;
  right: 400px;
}
</style>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  data () {
    return {
      isShowDown: false
    }
  },
  computed: {
    ...mapState(["userInfo", "exampleId"])
  },
  methods: {
    downLoad () {
      console.log(this.exampleId);
      axios.get(`/stweather/proxy/172.22.68.119:8667/history/findById?id=${this.exampleId}`).then(res => {
        if (res.data.status == 0) {
          let result = res.data.data
          let { startTime, endTime } = result
          this.isShowDown = result.cupyState == 3
          window.location.href = `http://172.22.68.119:8667/history/exportFileDownload?startTime=${startTime}&endTime=${endTime}`;
        }
      })
    }
  }
};
</script>

