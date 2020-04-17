import Adm from '../adm/Adm.vue'
import axios from 'axios'
import moment from 'moment'
import {
    mapState
} from 'vuex'

var windDir = ['请选择', 'C', 'N', 'NE', 'E', 'SE', 'S', 'WS', 'W', 'NW']
var windGrade = ['请选择', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, '≥12']
var rainGrade = ['请选择', '无雨雪', '雨夹雪', '小雨', '中雨', '大雨', '小雪', '中雪', '大雪', '暴雨', '大暴雨以上', '暴雪']
var weather = ['无', '暴雨', '大雪', '高温', '寒潮', '大风', '雾', '沙尘暴']

var sta = {
    station: '启东',
    tds: [{
        type: 'windMaxGrade08_08',
        inputValue: windGrade[0],
    }, {
        type: 'wdMax08_08',
        inputValue: windDir[0],
    }, {
        type: 'tempMin',
        inputValue: '',
    }, {
        type: 'tempMax',
        inputValue: '',
    }, {
        type: 'rainGrade',
        inputValue: rainGrade[0],
    }, {
        type: 'weather',
        inputValue: weather[0],
    }]
}

export default {
    data() {
        return {
            loading: false,
            tableData: [],
            moment,
            season: '',
            rowSpan: 4,
            windDir,
            windGrade,
            rainGrade,
            weather
        }
    },
    components: {
        Adm
    },
    computed: {
        ...mapState(['userInfo', 'exampleId', 'timeout'])
    },
    created() {
        const params = {
            ltemType: 4
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
                    this.rowSpan = result.length
                    this.tableData = new Array(result.length).fill(null).map(item => {
                        return JSON.parse(JSON.stringify(sta))
                    })
                    console.log(this.tableData)
                    this.tableData.map((obj, i) => {
                        obj.station = result[i].stationName
                        obj.stationId = result[i].stationId
                        obj.id = result[i].id
                        obj.dateTime = res.data.data.dateTime
                        obj.tds.map(td => {
                            for (var k in result[i]) {
                                if (k === td.type) {
                                    td.inputValue = result[i][k]
                                    //针对多选框
                                    if (td.type == 'weather') {
                                        if (result[i][k]) {
                                            td.inputValue = result[i][k].split(',')
                                        }
                                        console.log(td.inputValue)
                                    }
                                    if (result[i][k] === null) {
                                        switch (td.type) {

                                            case 'tempMin':
                                                td.inputValue = null
                                                break;
                                            case 'tempMax':
                                                td.inputValue = null
                                                break;
                                            case 'weather':
                                                td.inputValue = '无'
                                                break;
                                            default:
                                                td.inputValue = '请选择'
                                        }
                                    }
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
        save() {
            clearTimeout(this.tm)
            this.tm = setTimeout(() => {
                this.onlySave()
            }, 500)
        },
        onSubmit() {
            this.loading = true
            const params = []
            this.tableData.map(obj => {
                params.push({
                    id: obj.id,
                    dateTime: obj.dateTime,
                    windMaxGrade08_08: obj.tds.find(td => td.type === 'windMaxGrade08_08').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'windMaxGrade08_08').inputValue,
                    wdMax08_08: obj.tds.find(td => td.type === 'wdMax08_08').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'wdMax08_08').inputValue,
                    tempMin: obj.tds.find(td => td.type === 'tempMin').inputValue,
                    tempMax: obj.tds.find(td => td.type === 'tempMax').inputValue,
                    rainGrade: obj.tds.find(td => td.type === 'rainGrade').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'rainGrade').inputValue,
                    weather: Array.isArray(obj.tds.find(td => td.type === 'weather').inputValue) ? obj.tds.find(td => td.type === 'weather').inputValue.join(',') : obj.tds.find(td => td.type === 'weather').inputValue
                })
            })
            const {
                CancelToken
            } = axios
            if (this.inputToken) {
                this.inputToken()
                this.inputToken = null
            }
            //保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save4', params, {
                    cancelToken: new CancelToken(c => {
                        this.inputToken = c
                    })
                })
                .then(res => {
                    if (res.data.status == 0) {
                        this.loading = false
                        this.$router.replace({
                            name: 'ExamResult',
                            params: {
                                id: '4',
                                data: this.tableData
                            }
                        })
                    } else if (res.data.status == 888) {
                        this.$router.replace('/login')
                    }

                })
                .catch(err => {
                    this.loading = false
                })
        },
        onlySave() {
            const params = []
            this.tableData.map(obj => {
                params.push({
                    id: obj.id,
                    dateTime: obj.dateTime,
                    windMaxGrade08_08: obj.tds.find(td => td.type === 'windMaxGrade08_08').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'windMaxGrade08_08').inputValue,
                    wdMax08_08: obj.tds.find(td => td.type === 'wdMax08_08').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'wdMax08_08').inputValue,
                    tempMin: obj.tds.find(td => td.type === 'tempMin').inputValue,
                    tempMax: obj.tds.find(td => td.type === 'tempMax').inputValue,
                    rainGrade: obj.tds.find(td => td.type === 'rainGrade').inputValue == '请选择' ? null : obj.tds.find(td => td.type === 'rainGrade').inputValue,
                    weather: Array.isArray(obj.tds.find(td => td.type === 'weather').inputValue) ? obj.tds.find(td => td.type === 'weather').inputValue.join(',') : obj.tds.find(td => td.type === 'weather').inputValue
                })
            })
            const {
                CancelToken
            } = axios
            if (this.inputToken) {
                this.inputToken()
                this.inputToken = null
            }
            //保存填写答案
            axios.post('/stweather/proxy/172.22.68.119:8667/api/save4', params, {
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
                .catch(err => {})
        },
        onVerify(e, td) {
            var tempReg = /(^-?[0-9]\d*$)|(^$)|(^null$)/
            if (tempReg.test(td.inputValue)) {
                td.isWar = false
            } else {
                td.isWar = true
            }

        }
    },
};