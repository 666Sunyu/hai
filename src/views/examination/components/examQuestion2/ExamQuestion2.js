import Adm from '../adm/Adm.vue'
import axios from 'axios'
import moment from 'moment'
import {
    mapState,
    mapMutations
} from 'vuex'
var sta = {
    station: '',
    reasonInfo: null,
    reasonInput: '',
    tds: [{
        type: 'hail',
        inputValue: 'o x',
    }, {
        type: 'thunderWind',
        inputValue: 'o x',
    }, {
        type: 'rain',
        inputValue: 'o x',
    }]
}
export default {
    data() {
        return {
            loading: false,
            tableData: [],
            moment,
        }
    },
    components: {
        Adm
    },
    computed: {
        ...mapState(['userInfo', 'exampleId', 'timeout'])
    },
    created() {
        // 获取答案
        const params = {
            ltemType: 2
        }
        axios.post('/stweather/proxy/172.22.68.119:8667/api/ltemQuery', params)
            .then(res => {
                if (res.data.status == 0) {

                    const result = res.data.data.data
                    this.tableData = new Array(result.length).fill(null).map(item => {
                        return JSON.parse(JSON.stringify(sta))
                    })
                    let reason = res.data.data.reason
                    this.reasonInfo = reason
                    this.reasonInput = reason.reason
                    this.tableData.map((obj, i) => {
                        obj.station = result[i].stationName
                        obj.stationId = result[i].stationId
                        obj.id = result[i].id
                        obj.startTime = res.data.data.startTime
                        obj.endTime = res.data.data.endTime
                        obj.reason = result[i].reason
                        obj.tds.map(td => {
                            for (var k in result[i]) {
                                if (k === td.type) {
                                    td.inputValue = result[i][k] ? 'o' : 'x'
                                    //显示（有 无）文字
                                    if (td.inputValue == 'o x') {
                                        td.isCheck = ''
                                    } else {
                                        td.isCheck = td.inputValue
                                    }
                                }
                            }
                        })
                    })

                } else if (res.data.status == 888) {
                    this.$message.warning('当前登陆信息已过期,请重新登录')
                    setTimeout(() => {
                        this.$router.replace({
                            name: 'Login'
                        })
                    }, 500)
                }
            })
    },
    mounted() {},
    watch: {
        timeout: {
            handler: function (val) {
                if (val) {
                    //时间过期
                    this.$message.warning('当前考试已结束')
                    this.onSubmit()
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapMutations(['changeExamTimeRemain', 'saveExam2IsEnd']),
        changeSelect(val) {
            //显示文字
            val.isCheck = val.inputValue
            //保存答案
            this.onlySave()
        },
        //选择题目
        onChangeSubject(sub) {
            if (sub == 1) {
                alert('当前选择为第一题')
            } else if (sub == 2) {
                let id = 3
                //获取考试剩余时间
                //这里两道题时间是否是共享时间？？？
                axios.get(`/stweather/proxy/172.22.68.119:8667/api/examTime?type=2`)
                    .then(res => {
                        if (res.data.status == 0) {
                            this.loading = false;
                            const result = res.data.data
                            //保存
                            const saveData = {
                                value: result,
                                type: 'type2' //type类型,现在暂不使用该属性
                            }
                            this.changeExamTimeRemain(saveData)
                            this.$router.replace(`/examination/examQuestion${id}`)
                        }
                    })
            }
        },
        onSubmit() {
            this.loading = true
            const params = []
            this.tableData.map(obj => {
                obj.tds.map(td => {
                    if (td.inputValue === 'o') {
                        td.saveValue = 1
                    }
                    if (td.inputValue === 'x') {
                        td.saveValue = 0
                    }
                    if (td.inputValue === 'o x') {
                        td.saveValue = null
                    }
                })
                params.push({
                    id: obj.id,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    hail: obj.tds.find(td => td.type === 'hail').saveValue,
                    thunderWind: obj.tds.find(td => td.type === 'thunderWind').saveValue,
                    rain: obj.tds.find(td => td.type === 'rain').saveValue,
                    reason: obj.reasonInput
                })
            })
            //保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save2', params)
                .then(res => {
                    if (res.data.status == 0) {
                        this.loading = false
                        this.$router.replace({
                            name: 'ExamResult',
                            params: {
                                id: '2',
                            }
                        })
                        this.saveExam2IsEnd(true)
                    } else if (res.data.status == 888) {
                        this.$router.replace('/login')
                    }

                })
                .catch(err => {
                    this.loading = false
                    this.$message.warning('请确认是否有未选择的内容');
                })
        },
        onlySave() {
            const params = []
            this.tableData.map(obj => {
                obj.tds.map(td => {
                    if (td.inputValue === 'o') {
                        td.saveValue = 1
                    }
                    if (td.inputValue === 'x') {
                        td.saveValue = 0
                    }
                    if (td.inputValue === 'o x') {
                        td.saveValue = '-'
                    }
                })
                params.push({
                    id: obj.id,
                    startTime: obj.startTime,
                    endTime: obj.endTime,
                    hail: obj.tds.find(td => td.type === 'hail').saveValue,
                    thunderWind: obj.tds.find(td => td.type === 'thunderWind').saveValue,
                    rain: obj.tds.find(td => td.type === 'rain').saveValue,
                    reason: obj.reasonInput
                })
            })
            //保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save2', params)
                .then(res => {
                    if (res.data.status == 0) {
                        // this.$message.info('保存');
                    } else if (res.data.status == 888) {
                        // this.$message.warning('失败');
                        // this.$router.replace('/login')
                    }
                })
                .catch(err => {})
        }

    },
};