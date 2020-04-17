import moment from 'moment'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsData from 'highcharts/modules/data';
import XLSX from 'xlsx';
HighchartsData(Highcharts)
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
import axios from 'axios'
import siteData from '../../assets/config/hkSite.json'
export default {
    name: "Statistical",
    data() {
        return {
            jpjpx: -1,
            kpjClass: ['xiangxia', 'xiangshang', ''],
            kpjIdx: 2,
            kpjCopy: {},
            bkpjpx: -1,
            bkpjIdx: 2,
            bkpjCopy: {},
            SnowAndFrostpx: -1,
            SnowAndFrostIdx: 2,
            SnowAndFrostCopy: {},
            value6: '',

            nameSite: [{
                name: '海口',
                isCheckAll: false,
                halfCheck: true,
            }, {
                name: '东方',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '临高',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '澄迈',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '儋州',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '昌江',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '白沙',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '琼中',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '定安',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '屯昌',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '琼海',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '文昌',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '乐东',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '保亭',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '三亚',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '万宁',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '陵水',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '三沙',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '五指山',
                isCheckAll: false,
                halfCheck: false,
            }, {
                name: '石油平台',
                isCheckAll: false,
                halfCheck: false,
            }],
            rtitle: [{
                    name: '气温',
                    title: 'qiwen'
                }, {
                    name: '降水',
                    title: 'jiangshui'
                },
                // {
                //     name: '地温、日照',
                //     title: 'diwen'
                // },
                {
                    name: '积温',
                    title: 'jiwen'
                }, {
                    name: '湿度',
                    title: 'shidu'
                }, {
                    name: '风',
                    title: 'feng'
                },
                // {
                //     name: '天气现象日',
                //     title: 'xianxiang'
                // },
                //  {
                //     name: '指数计算',
                //     title: 'zhishu'
                // },
                {
                    name: '能见度',
                    title: 'nengjian'
                }
            ],
            xzys: [{
                name: '平均气温',
                id: 0
            }, {
                name: '累积降水量',
                id: '11'
            }],
            zhanlist: false,
            activeName: 1,
            rtitle_list: 0,
            selectZhanTxt: '海口,',
            // selectZhan: ['昌平', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
            index: 0,
            cpzd: {},
            kpinjun: [],
            tjdata: {
                avg: [],
                allAvg: [],
                unAvg: []
            },
            shijiankg: false,
            nianfenkg: false,
            yuzhi: {
                pjzgqw: null,
                pjzdqw: null,
                jdzgw: null,
                jdzdw: null,
                zdrpjqw: null,
                jszl: null,
                zdrjsl: null,
            },
            dianjikg: true,
            nian: '',
            shijian: {
                stateyue: '1',
                stateri: '1',
                endyue: '',
                endri: ''
            },
            dyrs: '35',
            cxdyrs: '35',
            xyrs: '-10',
            cxxyrs: '-10',
            dyml: '10',
            changpin: true,
            changpinkg: false,
            zhan: siteData,
            nianfen: [],
            zhanhao: ["", "59758", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            bkpinjun: [],
            rj: [],
            SnowAndFrost: [],
            max: [],
            loading: false,
            selecti: [true, false, false, false, false, false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
            windRoseData: {},
            kn: false,
            timeType: 'everyYear',
            zhanShow: false,
            nowquxian: '',
            zhanSel: [],
            nianArr: [],
            yueArr: [],
            riArr: [],
            staDate2: {
                year: 2018,
                yue: 1,
                ri: 1
            },
            endDate2: {
                year: 2019,
                yue: 1,
                ri: 1
            },
            anyTimeData: null,
            showRainBrands: false,
            showHailBrands: false,
            rainDatas: [],
            hailDatas: []

        }
    },
    created() {
        for (let i = 1; i <= 12; i++) {
            this.yueArr.push(i)
        }
        for (let i = 1; i <= 31; i++) {
            this.riArr.push(i)
        }
    },
    mounted() {
        this.getnian()
        this.chaxun()

    },
    watch: {
        changpin() {
            // console.log(this.changpin)
            if (this.changpin) {
                this.dianjikg = true;
                this.zhan.forEach(item => {
                    item.kg = false
                })
            } else {
                this.dianjikg = false;
            }
        },
        timeType(v) {
            this.clearAll()
            if (v === 'anyTime') {
                if (this.windChart) {
                    // this.windChart.destroy()
                    // this.windChart = null
                    document.querySelector('#warp').style = 'display:none'
                }
                console.log(this.xzys)
            } else {
                this.$nextTick(() => {
                    document.querySelector('#warp').style = 'display:block'
                    if (this.showRainBrands == true) {
                        this.initRainBrands()
                    }
                    if (this.showHailBrands == true) {
                        this.initHailBrands()
                    }
                })

            }
        },
    },
    methods: {
        downImg(url, val) {
            let img = new Image()
            let u = '/proxy/10.224.97.73:8080/' + url.substr(25)
            img.src = `${u}/image_${val}_color.png`
            img.setAttribute('crossOrigin', 'anonymous')
            img.onload = function () {
                var canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                var context = canvas.getContext('2d')
                context.drawImage(img, 0, 0, img.width, img.height)
                var ur = canvas.toDataURL('image/png')
                let a = document.createElement('a')
                a.href = ur
                a.download = `昌平${val}色斑图.png`
                a.click()
            }
        },
        windRose(contain, freq, name) {
            this.windChart = Highcharts.chart(contain, {
                data: {
                    table: freq,
                    startRow: 1,
                    endRow: 17,
                    endColumn: 7
                },
                chart: {
                    polar: true,
                    type: 'column'
                },
                title: {
                    text: name
                },
                credits: {
                    text: '',
                    href: ''
                },
                subtitle: {
                    text: ''
                },
                pane: {
                    size: '85%'
                },
                colors: ['#001281', '#0035cc', '#0f7cf6', '#00b4d4', '#00d2c6', '#0eea85', '#90ed7d'],
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    y: 100,
                    layout: 'vertical'
                },
                xAxis: {
                    tickmarkPlacement: 'on'
                },
                yAxis: {
                    min: 0,
                    endOnTick: false,
                    showLastLabel: true,
                    title: {
                        text: '频率'
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    },
                    reversedStacks: false
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        shadow: false,
                        groupPadding: 0,
                        pointPlacement: 'on'
                    }
                }
            });
        },
        //获取时间
        getnian() {
            var nian = new Date().getFullYear()
            var ri = new Date().getDate()
            var yue = new Date().getMonth() + 1;
            this.shijian.endyue = yue;
            this.shijian.endri = ri;
            this.nian = nian
            for (let i = 1951; i <= nian; i++) {
                this.nianfen.push(i)
            }
        },
        selectnian(nian) {
            this.nian = nian;
            if (this.shijian.endyue == 2 && this.shijian.endri >= 28) {
                let days = moment(this.nian + '02', 'YYYYMM').daysInMonth()
                this.shijian.endri = days
            }
        },
        selectKn(e) {
            this.kn = e.target.checked
            console.log(this.kn)
        },
        //选择时间
        selectSj(sj, a, b, c, checkLeap = false) {
            if (sj == 12 && a == 1 && b == 2 && c == 28) {
                this.kn = true
            } else {
                this.kn = false
            }
            if (checkLeap) {
                //判断平年闰年
                // console.log(this.nian)
                // console.log(moment(this.nian + '02', 'YYYYMM').daysInMonth())
                let days = moment(this.nian + '02', 'YYYYMM').daysInMonth()
                c = days
            }
            switch (sj) {
                case 'jn':
                    this.shijian.endyue = new Date().getMonth() + 1
                    this.shijian.endri = new Date().getDate()
                    this.shijian.stateyue = 1
                    this.shijian.stateri = 1
                    break;
                case 'by':
                    this.shijian.endyue = new Date().getMonth() + 1
                    this.shijian.endri = new Date().getDate()
                    this.shijian.stateyue = new Date().getMonth() + 1
                    this.shijian.stateri = 1
                    break;
                case 'rx':
                    this.shijian.endyue = new Date().getMonth() + 1
                    this.shijian.endri = new Date().getDate()
                    this.shijian.stateyue = 6
                    this.shijian.stateri = 1
                    break;
                case 'qn':
                    this.shijian.endyue = 12
                    this.shijian.endri = 31
                    this.shijian.stateyue = 1
                    this.shijian.stateri = 1
                    break;
                default:
                    this.shijian.endyue = b
                    this.shijian.endri = c
                    this.shijian.stateyue = sj
                    this.shijian.stateri = a
            }
        },
        //选站点
        danxuan(zhanhao, zhan) {
            let idx = this.zhan.findIndex(el => el.zhanhao == zhanhao)
            this.selectZhanTxt = ''
            if (zhanhao.length == 6) {
                var a = zhanhao.substr(0, 2)
                a = String.fromCharCode(a);
                zhanhao = a + zhanhao.substr(2);
            }
            let sezhan = []
            let index = this.zhanhao.indexOf(zhanhao)
            if (index == -1) {
                this.zhanhao.splice(idx, 1, zhanhao)
            } else {
                this.zhanhao[idx] = null
            }
            this.zhanhao.forEach((item, index) => {
                if (item) {
                    sezhan.push(this.zhan[index].name)
                }
            })
            this.selectZhanTxt = sezhan.join(',')
            this.zhan[idx].kg = !this.zhan[idx].kg
            //控制是否全选
            let nowArea = this.zhan.filter(item => item.s === zhan.s)
            console.log(nowArea)
            if (nowArea.every((item) => item.kg)) {
                this.nameSite.find(item => item.name === zhan.s).isCheckAll = true
                this.nameSite.find(item => item.name === zhan.s).halfCheck = false

            } else {
                this.nameSite.find(item => item.name === zhan.s).isCheckAll = false
                if (nowArea.some(item => item.kg)) {
                    this.nameSite.find(item => item.name === zhan.s).halfCheck = true
                } else {
                    this.nameSite.find(item => item.name === zhan.s).halfCheck = false

                }

            }
        },
        changeZhanLabel(name) {
            this.zhanSel = this.zhan.filter(item => {
                return item.s === name
            })
            this.nowquxian = name
            this.zhanShow = true

        },
        kpjSort(i) {
            if (this.jpjpx == i) {
                this.kpjIdx++
                if (this.kpjIdx > 2) {
                    this.kpjIdx = 0
                }
                if (this.kpjIdx == 0) {
                    this.tjdata.allAvg.sort((a, b) => {
                        return b[this.kpinjun[i]] - a[this.kpinjun[i]]
                    })
                } else if (this.kpjIdx == 1) {
                    this.tjdata.allAvg.sort((a, b) => {
                        return a[this.kpinjun[i]] - b[this.kpinjun[i]]
                    })
                } else if (this.kpjIdx == 2) {
                    this.tjdata.allAvg = JSON.parse(JSON.stringify(this.kpjCopy))
                }
            } else if (this.jpjpx != i) {
                this.jpjpx = i
                this.kpjIdx = 0
                this.kpjCopy = JSON.parse(JSON.stringify(this.tjdata.allAvg))
                // console.log(this.kpjCopy)
                this.tjdata.allAvg.sort((a, b) => {
                    return b[this.kpinjun[i]] - a[this.kpinjun[i]]
                })
            }
        },
        SnowAndFrostSort(i) {
            // console.log(this.tjdata.SnowAndFrost)
            if (i != this.SnowAndFrostpx) {
                this.SnowAndFrostpx = i
                this.SnowAndFrostIdx = 0
                this.SnowAndFrostCopy = JSON.parse(JSON.stringify(this.tjdata.SnowAndFrost))
                this.tjdata.SnowAndFrost.sort((a, b) => {
                    if (moment(a[this.SnowAndFrost[i]])) {
                        return moment(b[this.SnowAndFrost[i]]).valueOf() - moment(a[this.SnowAndFrost[i]]).valueOf()
                    } else {
                        return b[this.SnowAndFrost[i]] - a[this.SnowAndFrost[i]]
                    }
                })
            } else {
                this.SnowAndFrostIdx++
                if (this.SnowAndFrostIdx > 2) {
                    this.SnowAndFrostIdx = 0
                }
                if (this.SnowAndFrostIdx == 0) {
                    this.tjdata.SnowAndFrost.sort((a, b) => {
                        if (moment(a[this.SnowAndFrost[i]])) {
                            return moment(b[this.SnowAndFrost[i]]).valueOf() - moment(a[this.SnowAndFrost[i]]).valueOf()
                        } else {
                            return b[this.SnowAndFrost[i]] - a[this.SnowAndFrost[i]]
                        }
                    })
                } else if (this.SnowAndFrostIdx == 1) {
                    this.tjdata.SnowAndFrost.sort((a, b) => {
                        if (moment(a[this.SnowAndFrost[i]])) {
                            return moment(a[this.SnowAndFrost[i]]).valueOf() - moment(b[this.SnowAndFrost[i]]).valueOf()
                        } else {
                            return b[this.SnowAndFrost[i]] - a[this.SnowAndFrost[i]]
                        }
                    })
                } else if (this.SnowAndFrostIdx == 2) {
                    this.tjdata.SnowAndFrost = JSON.parse(JSON.stringify(this.SnowAndFrostCopy))
                }
            }

        },
        bkpjSort(i) {
            if (i != this.bkpjpx) {
                this.bkpjpx = i
                this.bkpjIdx = 0
                this.bkpjCopy = JSON.parse(JSON.stringify(this.tjdata.unAvg))
                // console.log(this.kpjCopy)
                this.tjdata.unAvg.sort((a, b) => {
                    return b[this.bkpinjun[i]] - a[this.bkpinjun[i]]
                })
            } else {
                this.bkpjIdx++
                if (this.bkpjIdx > 2) {
                    this.bkpjIdx = 0
                }
                if (this.bkpjIdx == 0) {
                    this.tjdata.unAvg.sort((a, b) => {
                        return b[this.bkpinjun[i]] - a[this.bkpinjun[i]]
                    })
                } else if (this.bkpjIdx == 1) {
                    this.tjdata.unAvg.sort((a, b) => {
                        return a[this.bkpinjun[i]] - b[this.bkpinjun[i]]
                    })
                } else if (this.bkpjIdx == 2) {
                    this.tjdata.unAvg = JSON.parse(JSON.stringify(this.bkpjCopy))
                }
            }
        },
        anytimeSort(item) {
            let {
                data
            } = this.anyTimeData
            console.log(data)
            let arr = []
            // Object.entries(data).forEach((item, i) => {
            //     let obj = {
            //         item[0]:item[1]
            //     }
            //     arr.push({
            //         name: item[1]
            //     })
            // })
            for (let i in data) {
                let o = {}
                o[i] = data[i]
                arr.push(o)
            }
            let arr2 = arr.sort((a, b) => {
                return a[item] - b[item]
            })
            console.log(item, arr2[0])
        },
        goDetails() {
            let {
                href
            } = this.$router.resolve({
                name: 'Details'
            });
            window.open(href, '_blank')
        },
        goDrawing() {
            let {
                href
            } = this.$router.resolve({
                name: 'Drawing'
            });
            window.open(href, '_blank')
        },

        //获取降水日数（小雨、中雨、大雨）
        getRain() {
            let endtime
            if (this.kn) {
                endtime = 1
            } else {
                endtime = 0
            }
            const url = '/stweather/proxy/172.22.68.119:8667/listQHTJ_CGTJData'
            const startTime = moment(`${this.nian == '1951-2018' ? '1951' : this.nian}-${this.shijian.stateyue}-${this.shijian.stateri} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')
            const endTime = moment(`${this.nian == '1951-2018' ? '2018' : this.nian}-${this.shijian.endyue}-${this.shijian.endri} 00:00:00`).add(endtime, 'year').format('YYYY-MM-DD HH:mm:ss')
            var zh = '';
            this.tjdata.avg = []
            this.tjdata.allAvg = []
            this.tjdata.unAvg = []
            this.zhanhao.forEach(item => {
                if (item) {
                    zh += item + ','
                }
            })
            zh = zh.split(',')
            zh.pop()
            zh = zh.join(',')
            var ys = '小雨日数,中雨日数,大雨日数'

            var data = {
                'avg_tmax_value': this.yuzhi.pjzgqw,
                'avg_tmin_value': this.yuzhi.pjzdqw,
                'tmax_value': this.yuzhi.jdzgw,
                'tmin_value': this.yuzhi.jdzdw,
                'day_tmin_value': this.yuzhi.zdrpjqw,
                'sum_rain_value': this.yuzhi.jszl,
                'max_rain_value': this.yuzhi.zdrjsl,
                "siteInfo": zh,
                "showDataType": "table",
                "startTime": startTime,
                "endTime": endTime,
                "elename": ys,
                "historyFlag": false
            }
            var CancelToken = axios.CancelToken;
            axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },

            }).then(res => {
                if (res.data.success) {
                    let {
                        allAvgMap
                    } = res.data.data
                    if (allAvgMap.length) {
                        let currData = allAvgMap[0]
                        let datas = [{
                            name: '小雨',
                            y: currData['小雨日数'] * 1,
                            sliced: true,
                            selected: true
                        }, {
                            name: '中雨',
                            y: currData['中雨日数'] * 1
                        }, {
                            name: '大雨',
                            y: currData['大雨日数'] * 1
                        }]
                        this.rainDatas = datas
                        console.log('rain', datas)
                        this.$nextTick(() => {
                            this.initRainBrands()
                        })
                    }


                }
            })



        },
        getHail() {
            let endtime
            if (this.kn) {
                endtime = 1
            } else {
                endtime = 0
            }
            const url = '/stweather/proxy/172.22.68.119:8667/listQHTJ_CGTJData'
            const startTime = moment(`${this.nian == '1951-2018' ? '1951' : this.nian}-${this.shijian.stateyue}-${this.shijian.stateri} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')
            const endTime = moment(`${this.nian == '1951-2018' ? '2018' : this.nian}-${this.shijian.endyue}-${this.shijian.endri} 00:00:00`).add(endtime, 'year').format('YYYY-MM-DD HH:mm:ss')
            var zh = '';
            this.tjdata.avg = []
            this.tjdata.allAvg = []
            this.tjdata.unAvg = []
            this.zhanhao.forEach(item => {
                if (item) {
                    zh += item + ','
                }
            })
            zh = zh.split(',')
            zh.pop()
            zh = zh.join(',')
            var ys = '大雾日数,浓雾日数,雾日数,中雾日数,轻雾日数,能见度不良日数,能见度中等日数,能见度良好日数,能见度很好日数,能见度极好日数'
            var data = {
                'avg_tmax_value': this.yuzhi.pjzgqw,
                'avg_tmin_value': this.yuzhi.pjzdqw,
                'tmax_value': this.yuzhi.jdzgw,
                'tmin_value': this.yuzhi.jdzdw,
                'day_tmin_value': this.yuzhi.zdrpjqw,
                'sum_rain_value': this.yuzhi.jszl,
                'max_rain_value': this.yuzhi.zdrjsl,
                "siteInfo": zh,
                "showDataType": "table",
                "startTime": startTime,
                "endTime": endTime,
                "elename": ys,
                "historyFlag": false
            }
            var CancelToken = axios.CancelToken;
            axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
            }).then(res => {
                if (res.data.success) {
                    let {
                        allAvgMap
                    } = res.data.data
                    if (allAvgMap.length) {
                        let currData = allAvgMap[0]
                        let datas = [{
                            name: '中雾',
                            y: currData['中雾日数'] * 1 ? currData['中雾日数'] * 1 : null,
                        }, {
                            name: '轻雾',
                            y: currData['轻雾日数'] * 1 ? currData['轻雾日数'] * 1 : null,
                        }, {
                            name: '良好',
                            y: currData['能见度良好日数'] * 1 ? currData['能见度良好日数'] * 1 : null,
                        }, {
                            name: '极好',
                            y: currData['能见度极好日数'] * 1 ? currData['能见度极好日数'] * 1 : null,
                            sliced: true,
                            selected: true
                        }, {
                            name: '浓雾',
                            y: currData['浓雾日数'] * 1 ? currData['浓雾日数'] * 1 : null,
                        }, {
                            name: '大雾',
                            y: currData['大雾日数'] * 1 ? currData['大雾日数'] * 1 : null,
                        }, {
                            name: '很好',
                            y: currData['能见度很好日数'] * 1 ? currData['能见度很好日数'] * 1 : null,
                        }, {
                            name: '雾',
                            y: currData['雾日数'] * 1 ? currData['雾日数'] * 1 : null,
                        }, {
                            name: '不良',
                            y: currData['能见度不良日数'] * 1 ? currData['能见度不良日数'] * 1 : null,
                        }, {
                            name: '中等',
                            y: currData['能见度中等日数'] * 1 ? currData['能见度中等日数'] * 1 : null,
                        }]
                        this.HailDatas = datas
                        console.log('HailDatas', this.HailDatas)

                        this.$nextTick(() => {
                            this.initHailBrands(this.HailDatas)
                        })
                    }


                }
            })
        },
        chaxun() {
            this.showRainBrands = false
            this.showHailBrands = false
            if (this.xzys.length == 0) {
                alert('请选择要素')
            } else {
                if (this.loading) {
                    this.cancel()
                }
                let that = this
                this.loading = true;
                var CancelToken = axios.CancelToken;
                var zh = '';
                this.tjdata.avg = []
                this.tjdata.allAvg = []
                this.tjdata.unAvg = []
                this.zhanhao.forEach(item => {
                    if (item) {
                        zh += item + ','
                    }
                })
                zh = zh.split(',')
                zh.pop()
                zh = zh.join(',')
                var ys = ''
                var xdata = {}
                var xzyscopy = JSON.parse(JSON.stringify(this.xzys))
                xzyscopy.forEach(item => {
                    if (item.id == 7) {
                        item.name = `最高气温日数_${this.dyrs}`
                        xdata.count_tmax_value = this.dyrs
                    }
                    if (item.id == 8) {
                        item.name = `持续最高气温日数_${this.cxdyrs}`
                        xdata.count_tmax_day_value = this.cxdyrs
                    }
                    if (item.id == 9) {
                        item.name = `最低气温日数_${this.xyrs}`
                        xdata.count_tmin_value = this.xyrs
                    }
                    if (item.id == 10) {
                        item.name = `持续最低气温日数_${this.cxxyrs}`
                        xdata.count_tmin_day_value = this.cxxyrs
                    }
                    if (item.id == 20) {
                        item.name = `降水量日数_${this.dyml}`
                        xdata.count_rain_day_value = this.dyml
                    }
                    //降水日数饼图
                    if (item.id == 16 || item.id == 17 || item.id == 18) {
                        this.showRainBrands = true
                        this.getRain()
                    }
                    if (item.id == 100) {
                        this.showHailBrands = true
                        this.getHail()
                    }
                })


                xzyscopy.forEach(item => {
                    ys += ',' + item.name
                })
                ys = ys.substr(1)
                let endtime
                if (this.kn) {
                    endtime = 1
                } else {
                    endtime = 0
                }

                let url = ''
                let startTime = null
                let endTime = null

                if (this.timeType === 'everyYear') {
                    url = '/stweather/proxy/172.22.68.119:8667/listQHTJ_CGTJData'
                    startTime = moment(`${this.nian == '1951-2018' ? '1951' : this.nian}-${this.shijian.stateyue}-${this.shijian.stateri} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')
                    endTime = moment(`${this.nian == '1951-2018' ? '2018' : this.nian}-${this.shijian.endyue}-${this.shijian.endri} 00:00:00`).add(endtime, 'year').format('YYYY-MM-DD HH:mm:ss')
                } else {
                    url = '/stweather/proxy/172.22.68.119:8667/wantonlyTimeQuery'
                    startTime = moment(`${this.staDate2.year}-${this.staDate2.yue}-${this.staDate2.ri} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')
                    endTime = moment(`${this.endDate2.year}-${this.endDate2.yue}-${this.endDate2.ri} 00:00:00`).format('YYYY-MM-DD HH:mm:ss')
                }
                var data = {
                    'avg_tmax_value': this.yuzhi.pjzgqw,
                    'avg_tmin_value': this.yuzhi.pjzdqw,
                    'tmax_value': this.yuzhi.jdzgw,
                    'tmin_value': this.yuzhi.jdzdw,
                    'day_tmin_value': this.yuzhi.zdrpjqw,
                    'sum_rain_value': this.yuzhi.jszl,
                    'max_rain_value': this.yuzhi.zdrjsl,
                    "siteInfo": zh,
                    "showDataType": "table",
                    "startTime": startTime,
                    "endTime": endTime,
                    "elename": ys,
                    "historyFlag": false
                }
                for (const key in xdata) {
                    if (xdata.hasOwnProperty(key)) {
                        data[key] = xdata[key]
                    }
                }
                if (this.timeType === 'everyYear') {
                    axios.post(url, JSON.stringify(data), {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        cancelToken: new CancelToken(function executor(c) {
                            that.cancel = c
                        })
                    }).then(res => {
                        this.loading = false;
                        document.querySelector('#warp').innerHTML = ''
                        if (res.data.msg == '操作失败') {
                            alert('查询失败')
                        } else {
                            // console.log(res.data.data)
                            if (res.data.data.Avg) {
                                if ((typeof res.data.data.Avg) != 'object') {
                                    this.tjdata.avg = JSON.parse(res.data.data.Avg);
                                } else {
                                    this.tjdata.avg = res.data.data.Avg
                                }
                            } else {
                                this.tjdata.avg = []
                            }
                            if (res.data.data.windAll) {
                                let data;
                                data = res.data.data.windAll
                                for (const key in data) {
                                    if (data.hasOwnProperty(key)) {
                                        for (const k in data[key]) {
                                            if (data[key].hasOwnProperty(k)) {
                                                let val
                                                if (!parseFloat(k)) {

                                                    val = k.substr(0, 1)
                                                    val = val.charCodeAt(0) + k.substr(1)
                                                } else {
                                                    val = k
                                                }
                                                this.zhan.forEach(item => {
                                                    if (item.zhanhao == val) {
                                                        console.log(data[key][k])
                                                        this.windRoseFn(data[key][k], item.name, key)
                                                    }
                                                })
                                            }
                                        }
                                    }
                                }
                            }
                            if (res.data.data.max) {
                                if (typeof res.data.data.max != 'object') {
                                    this.tjdata.max = JSON.parse(res.data.data.max)
                                } else {
                                    this.tjdata.max = res.data.data.max
                                }
                                this.tjdata.max.forEach(item => {
                                    // console.log(item)
                                    if (!parseInt(item.站号)) {
                                        var str = item.站号.charCodeAt(0)
                                        item.站号 = str + item.站号.substr(1)
                                    }
                                    this.zhan.forEach(ite => {
                                        if (ite.zhanhao == item.站号) {
                                            item.站号 = ite.name
                                            return
                                        }
                                    })
                                })
                            }


                            this.tableData(res.data.data.allAvgMap, 'allAvg', 'kpinjun')
                            this.tableData(res.data.data.rj, 'rj', 'rj')
                            this.tableData(res.data.data.allUnAvgMap, 'unAvg', 'bkpinjun')
                            this.tableData(res.data.data.SnowAndFrost, 'SnowAndFrost', 'SnowAndFrost')
                            this.max = []
                            if (res.data.data.max) {
                                let maxobj = this.tjdata.max[0]
                                if (this.tjdata.max[0]) {
                                    for (const key in maxobj) {
                                        if (maxobj.hasOwnProperty(key)) {
                                            let index = this.max.indexOf(key)
                                            if (index == -1) {
                                                this.max.push(key)
                                            } else {
                                                this.max.splice(index, 1)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }).catch(err => {
                        this.loading = false;
                    })
                } else {

                    axios.post(url, JSON.stringify(data), {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        cancelToken: new CancelToken(function executor(c) {
                            that.cancel = c
                        })
                    }).then(res => {
                        this.loading = false;
                        let {
                            data,
                            title
                        } = res.data
                        this.anyTimeData = res.data
                        console.log(Object.values(data))
                    }).catch(err => {
                        this.loading = false;
                    })
                }

                this.zhanlist = false;
            }
        },

        tableData(data, str1, th) {
            // this.tjdata[str]
            if (data && data != 'null') {
                if ((typeof data) != 'object') {
                    this.tjdata[str1] = JSON.parse(data)
                } else {
                    this.tjdata[str1] = data
                }
                this[th] = []
                var obj = this.tjdata[str1][0]
                if (obj) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            let index = this.rj.indexOf(key)
                            if (index == -1) {
                                this[th].push(key)
                            } else {
                                this[th].splice(index, 1)
                            }
                        }
                    }
                }
                // console.log(JSON.parse(JSON.stringify(this.tjdata.unAvg)))
                if (str1 == 'unAvg') {
                    this.tjdata.unAvg.forEach(item => {
                        if (!parseInt(item.站号)) {
                            let z = item.站号.substr(0, 1)
                            var str = item.站号.charCodeAt(0)
                            item.站号 = str + item.站号.substr(1)
                        }
                        // console.log(this.zhan)
                        this.zhan.forEach(ite => {
                            if (ite.zhanhao == item.站号) {
                                item.站号 = ite.name
                                return
                            }
                        })



                    })
                }
            } else {
                this.tjdata[str1] = null
            }
        },
        initRainBrands() {
            let that = this
            this.rainChart = Highcharts.chart(this.$refs.rainBrands, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: that.nian + '年降水量统计'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data: that.rainDatas
                }]
            })
        },
        initHailBrands(data) {
            var that = this
            console.log(1, data)
            this.hailChart = Highcharts.chart(this.$refs.HailBrands, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: that.nian + '年平均能见度统计'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    data
                }]
            })
        },
        initData() {
            this.windRoseData.N = {}
            this.windRoseData.NNE = {}
            this.windRoseData.NE = {}
            this.windRoseData.ENE = {}
            this.windRoseData.E = {}
            this.windRoseData.ESE = {}
            this.windRoseData.SE = {}
            this.windRoseData.SSE = {}
            this.windRoseData.S = {}
            this.windRoseData.SSW = {}
            this.windRoseData.SW = {}
            this.windRoseData.WSW = {}
            this.windRoseData.W = {}
            this.windRoseData.WNW = {}
            this.windRoseData.NW = {}
            this.windRoseData.NNW = {}
            for (const key in this.windRoseData) {
                if (this.windRoseData.hasOwnProperty(key)) {
                    this.windRoseData[key].zero = 0
                    this.windRoseData[key].five = 0
                    this.windRoseData[key].ten = 0
                    this.windRoseData[key].fifteen = 0
                    this.windRoseData[key].twenty = 0
                    this.windRoseData[key].twentyFive = 0
                    this.windRoseData[key].thirty = 0
                    this.windRoseData[key].thirtyFive = 0
                }
            }
            console.log('initDatat', this.windRoseData)
        },
        windRoseFn(data, name, type) {
            this.initData()
            console.log(data, name, type)
            let that = this
            if (type == '二分钟风向') {
                data.forEach(item => {
                    let fx = Math.floor(item.windDirect / 22.5)
                    let fs = item.windVelocity
                    that.operation(fx, fs)
                })
            } else if (type == '10分钟风向') {
                data.forEach(item => {
                    let fx = Math.floor(item.windD10ms / 22.5)
                    let fs = item.windV10ms
                    that.operation(fx, fs)
                })
            } else if (type == '最大风速的风向') {
                data.forEach(item => {
                    let fx = Math.floor(item.maxWindD10ms / 22.5)
                    let fs = item.maxWindV10ms
                    that.operation(fx, fs)
                })
            }
            // console.log(this.windRoseData)
            for (const key in this.windRoseData) {
                if (this.windRoseData.hasOwnProperty(key)) {
                    // console.log(this.windRoseData[key])s
                    for (const k in this.windRoseData[key]) {
                        if (this.windRoseData[key].hasOwnProperty(k)) {
                            this.windRoseData[key][k] = (this.windRoseData[key][k] / data.length).toFixed(2)
                        }
                    }
                }
            }
            // console.log(this.windRoseData,data.length)
            let contain = document.createElement('div')
            let table = document.createElement('table')
            let ztr = document.createElement('tr')
            ztr.innerHTML = '<th colspan="9" class="hdr">Table of Frequencies (percent)</th>'
            let qjtr = document.createElement('tr')
            qjtr.innerHTML = `<th class="freq">Direction</th>
                <th class="freq">0-0.2m/s</th>
                <th class="freq">0.3-1.5m/s</th>
                <th class="freq">1.6-3.3m/s</th>
                <th class="freq">3.4-5.4m/s</th>
                <th class="freq">5.5-7.9m/s</th>
                <th class="freq">8-10.7m/s</th>
                <th class="freq">>10.8m/s</th>
                <th class="freq">Total</th>`
            table.appendChild(ztr)
            table.appendChild(qjtr)
            for (const key in this.windRoseData) {
                if (this.windRoseData.hasOwnProperty(key)) {
                    let tr = document.createElement('tr')
                    tr.innerHTML = `
              <td class="dir">${key}</td>
                <td class="data">${this.windRoseData[key].zero}</td>
                <td class="data">${this.windRoseData[key].five}</td>
                <td class="data">${this.windRoseData[key].ten}</td>
                <td class="data">${this.windRoseData[key].fifteen}</td>
                <td class="data">${this.windRoseData[key].twenty}</td>
                <td class="data">${this.windRoseData[key].twentyFive}</td>
                <td class="data">${this.windRoseData[key].thirty}</td>
                <td class="data">${this.windRoseData[key].thirtyFive}</td>`
                    table.appendChild(tr)
                }
            }
            contain.style.width = document.querySelector('#warp').offsetWidth / 2 - 3 + 'px'
            contain.style.height = '400px'
            let title = `${name}${type}`
            this.windRose(contain, table, title)
            document.querySelector('#warp').appendChild(contain)

        },
        operation(fx, fs) {
            switch (fx) {
                case 0: {
                    let data = this.windRoseData.N
                    switch (true) {
                        case fs < 0.2:
                            data.zero++
                            break;
                        case fs < 1.5:
                            data.five++
                            break;
                        case fs < 3.3:
                            data.ten++
                            break;
                        case fs < 5.4:
                            data.fifteen++
                            break;
                        case fs < 7.9:
                            data.twenty++
                            break;
                        case fs < 10.7:
                            data.twentyFive++
                            break;
                        case fs < 13.8:
                            data.thirty++
                            break;
                        case 13.8 < fs:
                            data.thirtyFive++
                            break;
                    }
                }
                break;
            case 1: {
                let data = this.windRoseData.NNE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 2: {
                let data = this.windRoseData.NE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 3: {
                let data = this.windRoseData.ENE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 4: {
                let data = this.windRoseData.E
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 5: {
                let data = this.windRoseData.ESE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 6: {
                let data = this.windRoseData.SE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 7: {
                let data = this.windRoseData.SSE
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 8: {
                let data = this.windRoseData.S
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 9: {
                let data = this.windRoseData.SSW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 10: {
                let data = this.windRoseData.SW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 11: {
                let data = this.windRoseData.WSW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 12: {
                let data = this.windRoseData.W
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 13: {
                let data = this.windRoseData.WNW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 14: {
                let data = this.windRoseData.NW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            case 15: {
                let data = this.windRoseData.NNW
                switch (true) {
                    case fs < 0.2:
                        data.zero++
                        break;
                    case fs < 1.5:
                        data.five++
                        break;
                    case fs < 3.3:
                        data.ten++
                        break;
                    case fs < 5.4:
                        data.fifteen++
                        break;
                    case fs < 7.9:
                        data.twenty++
                        break;
                    case fs < 10.7:
                        data.twentyFive++
                        break;
                    case fs < 13.8:
                        data.thirty++
                        break;
                    case 13.8 < fs:
                        data.thirtyFive++
                        break;
                }
            }
            break;
            }
        },
        exportExecl(br) {
            let arr = []
            let data = ''
            let name = ''
            if (br) {
                data = this.tjdata.allAvg
                name = '逐年可平均要素.xlsx'
            } else {
                data = this.tjdata.unAvg
                name = '逐年不可平均要素.xlsx'
            }
            // if (br) {
            let oarr = []
            for (const key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                    oarr.push(key)
                }
            }
            arr.push(oarr)
            console.log(arr)
            data.forEach(item => {
                oarr = []
                for (const key in item) {
                    if (item.hasOwnProperty(key)) {
                        oarr.push(item[key])
                    }
                }
                arr.push(oarr)
            })
            console.log(arr)
            let sheet = XLSX.utils.aoa_to_sheet(arr);

            function sheet2blob(sheet, sheetName) {
                sheetName = sheetName || 'sheet1';
                var workbook = {
                    SheetNames: [sheetName],
                    Sheets: {}
                };
                workbook.Sheets[sheetName] = sheet;
                // 生成excel的配置项
                var wopts = {
                    bookType: 'xlsx', // 要生成的文件类型
                    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                    type: 'binary'
                };
                var wbout = XLSX.write(workbook, wopts);
                var blob = new Blob([s2ab(wbout)], {
                    type: "application/octet-stream"
                });
                // 字符串转ArrayBuffer
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                return blob;
            }

            function openDownloadDialog(url, saveName) {
                if (typeof url == 'object' && url instanceof Blob) {
                    url = URL.createObjectURL(url); // 创建blob地址
                }
                var aLink = document.createElement('a');
                aLink.href = url;
                aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
                var event;
                if (window.MouseEvent) event = new MouseEvent('click');
                else {
                    event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                }
                aLink.dispatchEvent(event);
            }
            openDownloadDialog(sheet2blob(sheet), name);


        },
        export2() {
            let {
                title,
                data
            } = this.anyTimeData
            let name = '要素详情.xlsx'
            let oarr = []
            let arr = []
            arr.push(['站名', ...title.split(',')])
            for (let key in data) {
                oarr = []
                oarr.push(key)
                title.split(',').forEach(tit => {
                    oarr.push(data[key][tit])
                })
                arr.push(oarr)

            }
            console.log(22, arr)
            let sheet = XLSX.utils.aoa_to_sheet(arr);

            function sheet2blob(sheet, sheetName) {
                sheetName = sheetName || 'sheet1';
                var workbook = {
                    SheetNames: [sheetName],
                    Sheets: {}
                };
                workbook.Sheets[sheetName] = sheet;
                // 生成excel的配置项
                var wopts = {
                    bookType: 'xlsx', // 要生成的文件类型
                    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                    type: 'binary'
                };
                var wbout = XLSX.write(workbook, wopts);
                var blob = new Blob([s2ab(wbout)], {
                    type: "application/octet-stream"
                });
                // 字符串转ArrayBuffer
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
                return blob;
            }

            function openDownloadDialog(url, saveName) {
                if (typeof url == 'object' && url instanceof Blob) {
                    url = URL.createObjectURL(url); // 创建blob地址
                }
                var aLink = document.createElement('a');
                aLink.href = url;
                aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
                var event;
                if (window.MouseEvent) event = new MouseEvent('click');
                else {
                    event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                }
                aLink.dispatchEvent(event);
            }
            openDownloadDialog(sheet2blob(sheet), name);

        },
        xuanze(i) {

            if (i) {
                this.nameSite.forEach(item => {
                    item.isCheckAll = false
                })
                this.zhan.forEach((item, index) => {
                    item.kg = false
                    this.zhanhao[index] = null
                });
                this.selectZhanTxt = ''

            } else {
                this.selectZhanTxt = ''
                this.nameSite.forEach(item => {
                    item.isCheckAll = true
                })
                this.zhan.forEach((item, index) => {
                    item.kg = true
                    // this.zhanhao[index] = item.zhanhao
                    if (item.zhanhao.length == 6) {
                        var val = item.zhanhao.substr(0, 2)
                        val = String.fromCharCode(val) + item.zhanhao.substr(2)
                        this.zhanhao[index] = val
                    } else {
                        this.zhanhao[index] = item.zhanhao
                    }
                    this.selectZhanTxt += item.name + ','
                })

            }
            // console.log(this.zhanhao)
        },
        //弹框中的area
        areaClick(area) {
            // this.selectZhanTxt = ''
            setTimeout(() => {
                console.log(area.isCheckAll)
                this.nameSite.find(item => item.name === area.name).halfCheck = false
                if (area.isCheckAll) {
                    console.log(area, this.nameSite)
                    this.zhan.forEach((item, index) => {
                        if (item.s === area.name) {
                            item.kg = true
                            if (item.zhanhao.length == 6) {
                                var val = item.zhanhao.substr(0, 2)
                                val = String.fromCharCode(val) + item.zhanhao.substr(2)
                                this.zhanhao[index] = val
                            } else {
                                this.zhanhao[index] = item.zhanhao
                            }
                            this.selectZhanTxt += item.name + ','
                        }
                    })
                } else {
                    let zhanArr = this.selectZhanTxt.split(',')
                    this.zhan.forEach((item, index) => {
                        if (item.s === area.name) {
                            item.kg = false
                            this.zhanhao[index] = null
                            let idx = zhanArr.findIndex(el => el === item.name)
                            zhanArr.splice(idx, 1)
                            // console.log(item.name, idx)
                            // this.selectZhanTxt = zhanArr.join(',')
                            this.selectZhanTxt = ''


                        }
                    })

                }
            }, 10)
        },
        // 列表中的area
        areaChekc(area) {
            area.isCheckAll = !area.isCheckAll
            this.areaClick(area)
            this.changeZhanLabel(area.name)
        },
        tab(i, title) {
            this.rtitle_list = i;
            this.index = i
        },
        //要素选择
        ysxuanze(ys, i) {
            var kg = false;
            if (ys == '最高气温日数') {
                ys = `≥${this.dyrs}℃日数`
            }
            if (ys == '持续最高气温日数') {
                ys = `持续≥${this.cxdyrs}℃日数`
            }
            if (ys == '最低气温日数') {
                ys = `≤${this.xyrs}℃日数`
            }
            if (ys == '持续最低气温日数') {
                ys = `持续≤${this.cxxyrs}℃日数`
            }
            if (ys == '降水量日数') {
                ys = `≥${this.dyml}毫米日数`
            }

            this.selecti[i] = !this.selecti[i]
            // console.log(this.xzys)
            for (const key in this.xzys) {
                if (this.xzys.hasOwnProperty(key)) {

                    // console.log(this.xzys[key].name == ys)
                    if (this.xzys[key].name == ys) {
                        this.xzys.splice(key, 1)
                        kg = true;
                        break;
                    }
                }
            }
            if (kg == false) {
                var obj = {}
                obj.name = ys;
                obj.id = i;
                this.xzys.push(obj)
                // console.log(22, this.xzys)
            }
        },
        clearAll() {
            this.xzys = [];
            this.selecti.forEach((item, index) => {
                // this.selecti[index] = false
                this.$set(this.selecti, index, false)
            })
            // console.log(this.selecti)
        },


    },
};