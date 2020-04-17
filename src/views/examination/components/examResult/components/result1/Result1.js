import moment from 'moment'
import axios from 'axios'
var rainTr = {
    station: '',
    tds: [{
        id: 'rain08_11',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain11_14',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain14_17',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain17_20',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain20_23',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain23_02',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain02_05',
        inputValue: '',
        rowspan: '1',
    }, {
        id: 'rain05_08',
        inputValue: '',
        rowspan: '1',
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
            moment,
            tableData
        }
    },
    created() {
        axios.get('/stweather/proxy/172.22.68.119:8667/api/score?type=1').then(res => {
            if (res.data.status == 0) {
                const result = res.data.data
                this.sk = result.sk
                this.answer = result.answer
                this.score = result.score
                this.rowSpan = this.sk.length * 2 + 2
                this.tableData[0].trs = new Array(this.sk.length).fill(null).map(item => {
                    return JSON.parse(JSON.stringify(rainTr))
                })

                let total = 0
                result.score.forEach(item => {
                    total += item.totleScore
                })

                //借用第一个tr单独加个总分
                this.tableData[0].trs[0].tds.push({
                    id: 'total',
                    score: total,
                    rowspan: '8',
                })
                this.tableData[0].trs.map((tr, i) => {
                    tr.station = this.sk[i].stationName
                    tr.stationId = this.sk[i].stationId
                    tr.id = this.sk[i].id
                    tr.dateTime = this.sk[i].dateTime
                    tr.realDateTime = this.sk[i].realDateTime

                    tr.tds.map((td, j) => {
                        for (var k in this.sk[i]) {
                            if (k === td.id) {
                                td.inputValue = this.answer[i][k]
                                td.trueValue = this.sk[i][k]
                                td.score = this.score[i][k]
                            }
                        }
                    })
                })

                this.tableData[1].trs = new Array(this.sk.length).fill(null).map(item => {
                    return JSON.parse(JSON.stringify(tempTr))
                })
                this.tableData[1].trs.map((tr, i) => {
                    tr.station = this.sk[i].stationName
                    tr.stationId = this.sk[i].stationId
                    tr.id = this.sk[i].id
                    tr.dateTime = this.sk[i].dateTime
                    tr.realDateTime = this.sk[i].realDateTime

                    tr.tds.map((td, j) => {
                        for (var k in this.sk[i]) {
                            if (k === td.id) {
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