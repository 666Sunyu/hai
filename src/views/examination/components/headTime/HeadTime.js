import moment from "moment";
import {
    mapState
} from 'vuex'
import {
    mapMutations
} from 'vuex'
export default {
    data() {
        return {
            moment,
            nowDate: null,
            nowTime: null,
            nowWeek: null,
            remainTimeStr: "",
        }
    },
    mounted() {
        this.getTime()
        this.getRemain()
        this.changeTimeout(false)
        if (this.examTime <= 0) {
            this.changeTimeout(true)
        }
    },
    destroyed() {
        clearInterval(this.timeInterval)
        clearInterval(this.remainInterval)
    },
    computed: {
        ...mapState(['examTime'])
    },

    methods: {
        ...mapMutations(['changeTimeout']),
        getTime() {
            this.nowDate = moment().format('YYYY年MM月DD日')
            this.nowWeek = moment().format('dddd')
            this.timeInterval = setInterval(() => {
                this.nowTime = moment().format('HH时mm分ss秒')
            }, 1000)
        },
        getRemain() {
            let reTime = this.examTime
            if (reTime) {
                this.remainInterval = setInterval(() => {
                    if (reTime <= 0) {
                        clearInterval(this.remainInterval)
                        //通知考试时间到
                        alert('考试时间到！')
                        this.changeTimeout(true)
                    }
                    let hour = Math.floor(reTime / 3600);
                    let minute = Math.floor((reTime - 3600 * hour) / 60);
                    let second = Math.floor(((reTime - 3600 * hour) - 60 * minute) % 60);
                    this.remainTimeStr = `${hour}小时${minute}分钟${second}秒`
                    reTime--
                }, 1000)
            }




        },
    },

}