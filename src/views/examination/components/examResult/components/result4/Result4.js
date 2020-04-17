import moment from 'moment'
import axios from 'axios'
var sta = {
    station: '启东',
    tds: [{
        type: 'windMaxGrade08_08',
        inputValue: '',
        rowspan: '1',
    }, {
        type: 'wdMax08_08',
        inputValue: '',
        rowspan: '1',
    }, {
        type: 'tempMin',
        inputValue: '',
        rowspan: '1',
    }, {
        type: 'tempMax',
        inputValue: '',
        rowspan: '1',
    }, {
        type: 'rainGrade',
        inputValue: '',
        rowspan: '1',
    }, {
        type: 'weather',
        inputValue: '',
        rowspan: '1',
    }]
}
export default {
    data() {
        return {
            moment,
            rowSpan: 4,
            tableData: [],
        }
    },
    created() {
        axios.get('/stweather/proxy/172.22.68.119:8667/api/score?type=4').then(res => {
            if (res.data.status == 0) {
                const result = res.data.data
                this.sk = result.sk
                this.answer = result.answer
                this.score = result.score
                this.tableData = new Array(this.sk.length).fill(null).map(item => {
                    return JSON.parse(JSON.stringify(sta))
                })
                let total = 0
                result.score.forEach(item => {
                    total += item.totleScore
                })

                //借用第一个tr单独加个总分
                this.tableData[0].tds.push({
                    id: 'total',
                    score: total || 0,
                    rowspan: '4',
                })
                this.tableData.map((obj, i) => {
                    obj.station = this.sk[i].stationName
                    obj.stationId = this.sk[i].stationId
                    obj.id = this.sk[i].id
                    obj.dateTime = this.sk[i].dateTime
                    obj.realDateTime = this.sk[i].realDateTime
                    obj.tds.map(td => {
                        for (var k in this.sk[i]) {
                            if (k === td.type) {
                                td.inputValue = this.answer[i][k]
                                td.trueValue = this.sk[i][k]
                                td.score = this.score[i][k]
                            }
                        }
                    })
                })
            }
        })
    },
    mounted() {},
    watch: {

    },
    methods: {

    },
};