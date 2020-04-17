import Adm from '../adm/Adm.vue'
import axios from 'axios'
import moment from 'moment'
import {
    mapState,
    mapMutations
} from 'vuex'
var rainTr = {
    station: '',
    tds: [{
        id: 'rain08_11',
        inputValue: '',
    }, {
        id: 'rain11_14',
        inputValue: '',
    }, {
        id: 'rain14_17',
        inputValue: '',
    }, {
        id: 'rain17_20',
        inputValue: '',
    }, {
        id: 'rain20_23',
        inputValue: '',
    }, {
        id: 'rain23_02',
        inputValue: '',
    }, {
        id: 'rain02_05',
        inputValue: '',
    }, {
        id: 'rain05_08',
        inputValue: '',
    }]
}
var tempTr = {
    station: '',
    tds: [{
        id: 'temp11',
        inputValue: '',
    }, {
        id: 'temp14',
        inputValue: '',
    }, {
        id: 'temp17',
        inputValue: '',
    }, {
        id: 'temp20',
        inputValue: '',
    }, {
        id: 'temp23',
        inputValue: '',
    }, {
        id: 'temp02',
        inputValue: '',
    }, {
        id: 'temp05',
        inputValue: '',
    }, {
        id: 'temp08',
        inputValue: '',
    }]
}
var tableData = [{
    type: 'rain',
    trs: [rainTr]

}, {
    type: 'temp',
    trs: [tempTr]
}]
export default {
    data() {
        return {
            loading: false,
            tableData,
            moment,
            season: '',
            rowSpan: 8,
        }
    },
    components: {
        Adm,
    },
    computed: {
        ...mapState(['userInfo', 'exampleId', 'timeout'])
    },
    created() {
        // 获取之前填写的答案
        const params = {
            // userId: this.userInfo.userId,
            // exampleId: this.exampleId,
            // type: 1,
            ltemType: 1
        }
        axios.post('/stweather/proxy/172.22.68.119:8667/api/ltemQuery', params)
            .then(res => {
                if (res.data.status == 0) {
                    const result = res.data.data.data

                    //获取预报起报时间
                    const fcstTime = moment(res.data.data.realDateTime, 'YYYYMMDDHHmmss').format('M')
                    if (fcstTime >= 3 && fcstTime <= 5) {
                        this.season = '春季'
                    } else if (fcstTime >= 6 && fcstTime <= 8) {
                        this.season = '夏季'
                    } else if (fcstTime >= 9 && fcstTime <= 11) {
                        this.season = '秋季'
                    } else {
                        this.season = '冬季'
                    }
                    this.rowSpan = result.length * 2 + 2
                    this.tableData[0].trs = new Array(result.length).fill(null).map(item => {
                        return JSON.parse(JSON.stringify(rainTr))
                    })
                    this.tableData[0].trs.map((tr, i) => {
                        tr.station = result[i].stationName
                        tr.stationId = result[i].stationId
                        tr.id = result[i].id
                        tr.dateTime = res.data.data.dateTime
                        tr.tds.map((td, j) => {
                            for (var k in result[i]) {
                                if (k === td.id) {
                                    td.inputValue = result[i][k]
                                    this.$set(td, 'isWar', false)
                                }
                            }
                        })
                    })

                    this.tableData[1].trs = new Array(result.length).fill(null).map(item => {
                        return JSON.parse(JSON.stringify(tempTr))
                    })
                    this.tableData[1].trs.map((tr, i) => {
                        tr.station = result[i].stationName
                        tr.stationId = result[i].stationId
                        tr.id = result[i].id
                        tr.dateTime = res.data.data.dateTime
                        tr.tds.map((td, j) => {
                            for (var k in result[i]) {
                                if (k === td.id) {
                                    td.inputValue = result[i][k]
                                    this.$set(td, 'isWar', false)
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
            .catch(err => {
                this.$message.error('当前无法答题,请重试')
                this.$router.replace({
                    name: 'ExamCase'
                })
            })

    },
    mounted() {

    },
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
        ...mapMutations(['changeExamTimeRemain']),
        save() {
            //防抖
            clearTimeout(this.tm);
            this.tm = setTimeout(() => {
                this.onlySave()
            }, 500);
        },
        onSubmit() {
            console.log(this.tableData)
            this.loading = true
            let tableArr = []
            this.tableData[0].trs.map((tr, i) => {
                tableArr.push({
                    dateTime: tr.dateTime,
                    id: tr.id,
                    rain08_11: tr.tds.find(td => td.id === 'rain08_11').inputValue,
                    rain11_14: tr.tds.find(td => td.id === 'rain11_14').inputValue,
                    rain14_17: tr.tds.find(td => td.id === 'rain14_17').inputValue,
                    rain17_20: tr.tds.find(td => td.id === 'rain17_20').inputValue,
                    rain20_23: tr.tds.find(td => td.id === 'rain20_23').inputValue,
                    rain23_02: tr.tds.find(td => td.id === 'rain23_02').inputValue,
                    rain02_05: tr.tds.find(td => td.id === 'rain02_05').inputValue,
                    rain05_08: tr.tds.find(td => td.id === 'rain05_08').inputValue,
                })
            })
            this.tableData[1].trs.map((tr, i) => {
                tr.tds.map((td, j) => {
                    tableArr[i][td.id] = td.inputValue
                })
            })
            const {
                CancelToken
            } = axios
            if (this.saveToken) {
                this.saveToken()
                this.saveToken = null
            }
            // 保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save1', tableArr, {
                    cancelToken: new CancelToken(c => {
                        this.saveToken = c
                    })
                })
                .then(res => {
                    if (res.data.status == 0) {
                        this.loading = false
                        this.$router.replace({
                            name: 'ExamResult',
                            params: {
                                id: '1',
                            }
                        })
                    } else if (res.data.status == 888) {
                        this.$router.replace('/login')
                    }
                })
        },
        onlySave() {
            let tableArr = []
            this.tableData[0].trs.map((tr, i) => {
                tableArr.push({
                    dateTime: tr.dateTime,
                    id: tr.id,
                    rain08_11: tr.tds.find(td => td.id === 'rain08_11').inputValue,
                    rain11_14: tr.tds.find(td => td.id === 'rain11_14').inputValue,
                    rain14_17: tr.tds.find(td => td.id === 'rain14_17').inputValue,
                    rain17_20: tr.tds.find(td => td.id === 'rain17_20').inputValue,
                    rain20_23: tr.tds.find(td => td.id === 'rain20_23').inputValue,
                    rain23_02: tr.tds.find(td => td.id === 'rain23_02').inputValue,
                    rain02_05: tr.tds.find(td => td.id === 'rain02_05').inputValue,
                    rain05_08: tr.tds.find(td => td.id === 'rain05_08').inputValue,
                })
            })
            this.tableData[1].trs.map((tr, i) => {
                tr.tds.map((td, j) => {
                    tableArr[i][td.id] = td.inputValue
                })
            })
            const {
                CancelToken
            } = axios
            if (this.inputToken) {
                this.inputToken()
                this.inputToken = null
            }
            // 保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save1', tableArr, {
                    cancelToken: new CancelToken(c => {
                        this.inputToken = c
                    })
                })
                .then(res => {
                    if (res.data.status == 0) {
                        // this.$message.info('保存成功');
                    } else if (res.data.status == 888) {
                        // this.$message.warning('返回');
                        // this.$router.replace('/login')
                    }
                })
        },
        onVerify(e, td) {
            var rainReg = /(^\d+(.[1-9])?$)|(^无$)|(^$)|(^null$)/
            var tempReg = /(^-?[0-9]\d*$)|(^$)|(^null$)/
            if (td.id.indexOf('rain') >= 0) {
                if (rainReg.test(td.inputValue)) {
                    td.isWar = false
                } else {
                    td.isWar = true
                }
            } else {
                if (tempReg.test(td.inputValue)) {
                    td.isWar = false
                } else {
                    td.isWar = true
                }
            }

        }
    },
};