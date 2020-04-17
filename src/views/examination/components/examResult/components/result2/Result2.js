import moment from 'moment'
import axios from 'axios'
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
            moment,
            tableData: [],
        }
    },
    created() {
        axios.get('/stweather/proxy/172.22.68.119:8667/api/score?type=2').then(res => {
            if (res.data.status == 0) {
                const result = res.data.data
                this.sk = result.sk
                this.answer = result.answer
                this.score = result.score
                this.tableData = new Array(this.sk.length).fill(null).map(item => {
                    return JSON.parse(JSON.stringify(sta))
                })
                this.tableData.map((obj, i) => {
                    obj.station = this.sk[i].stationName
                    obj.stationId = this.sk[i].stationId
                    obj.id = this.sk[i].id
                    obj.startTime = this.sk[i].startTime
                    obj.endTime = this.sk[i].endTime
                    obj.tds.map(td => {
                        for (var k in this.sk[i]) {
                            if (k === td.type) {
                                td.inputValue = this.answer[i][k] ? 'o' : 'x'
                                td.trueValue = this.sk[i][k] ? 'o' : 'x'
                                td.score = this.score[i][k]
                            }
                        }
                    })
                })
                console.log(this.tableData)
            }
        })
    },
    mounted() {},
    watch: {

    },
    methods: {

    },
};