import {
    mapState,
    mapMutations
} from "vuex";
import * as axios from "axios";
import moment from "moment";
import XLSX from "xlsx";
import BScroll from "better-scroll";
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
import hainan from '../../assets/json/hainancityline.json'
import domtoimage from 'dom-to-image'
const params = new URLSearchParams();

const happenList = [{
        name: '全部',
        key: ''
    },
    {
        name: '全省',
        key: '全省'
    }, {
        name: '海口',
        key: '海口'
    }, {
        name: '三亚',
        key: '三亚'
    }, {
        name: '三沙',
        key: '三沙'
    }, {
        name: '儋州',
        key: '儋州'
    }, {
        name: '琼海',
        key: '琼海'
    }, {
        name: '万宁',
        key: '万宁'
    }, {
        name: '东方',
        key: '东方'
    }, {
        name: '澄迈',
        key: '澄迈'
    }, {
        name: '临高',
        key: '临高'
    }, {
        name: '白沙',
        key: '白沙'
    }, {
        name: '昌江',
        key: '昌江'
    }, {
        name: '屯昌',
        key: '屯昌'
    }, {
        name: '定安',
        key: '定安'
    }, {
        name: '文昌',
        key: '文昌'
    }, {
        name: '陵水',
        key: '陵水'
    }, {
        name: '乐东',
        key: '乐东'
    }, {
        name: '保亭',
        key: '保亭'
    }, {
        name: '琼中',
        key: '琼中'
    }, {
        name: '五指山',
        key: '五指山'
    }
]
const plainOptionsType = [
    "雷电",
    "寒冷",
    '龙卷',
    "台风",
    '高温',
    '蝗灾',
    '火灾',
    "暴雨",
    "冰雹",
    "干旱",
    "强对流",
    "局地大雾",
    '洪涝',
    "成片大雾",
    "非台暴雨",
    '低温阴雨',
    "雷雨大风",
    "短时强降水",

];
const plainOptionsHappen = [
    "全省",
    "海口",
    "三亚",
    "三沙",
    "儋州",
    "琼海",
    "万宁",
    "东方",
    "澄迈",
    "临高",
    "白沙",
    "昌江",
    "屯昌",
    "定安",
    "文昌",
    "陵水",
    "乐东",
    "保亭",
    "琼中",
    "五指山",

];
//根据occurredToll名字配置
const names = [{
    name: '海口',
    latLng: [19.83906000930461, 110.43731689453126]
}, {
    name: '东方',
    latLng: [19.01278705937288, 108.82781982421876]
}, {
    name: '昌江',
    latLng: [19.21780295966795, 109.03381347656251]
}, {
    name: '白沙',
    latLng: [19.210022196386095, 109.33593750000001]
}, {
    name: '儋州',
    latLng: [19.55202569751752, 109.42382812500001]
}, {
    name: '临高',
    latLng: [19.815806165386956, 109.71221923828126]
}, {
    name: '澄迈',
    latLng: [19.696900138883937, 109.99786376953126]
}, {
    name: '文昌',
    latLng: [19.766703551716976, 110.79711914062501]
}, {
    name: '定安',
    latLng: [19.518375478601566, 110.32745361328126]
}, {
    name: '屯昌',
    latLng: [19.339653419491874, 110.04730224609376]
}, {
    name: '琼海',
    latLng: [19.215209412824127, 110.41809082031251]
}, {
    name: '琼中',
    latLng: [19.033559718886284, 109.73419189453126]
}, {
    name: '万宁',
    latLng: [18.843913201134143, 110.27801513671875]
}, {
    name: '五指山',
    latLng: [18.841313810317015, 109.4952392578125]
}, {
    name: '保亭',
    latLng: [18.63583516062285, 109.54467773437501]
}, {
    name: '陵水',
    latLng: [18.594188856740427, 109.86877441406251]
}, {
    name: '乐东',
    latLng: [18.67747125852608, 109.08325195312501]
}, {
    name: '三亚',
    latLng: [18.427501971948608, 109.38537597656251]
}]
var filtersType = []
const columns = [{
        title: '序号',
        dataIndex: 'number',
        align: 'center'
    },
    {
        title: '开始时间',
        dataIndex: 'startTime2',
        align: 'center',
        sorter: (a, b) => a.startTime - b.startTime,
    },
    {
        title: '结束时间',
        dataIndex: 'endTime2',
        align: 'center',
        sorter: (a, b) => a.endTime - b.endTime,

    },
    {
        title: '类型',
        dataIndex: 'type',
        align: 'center',
        filters: filtersType,
        onFilter: (value, record) => record.type.indexOf(value) === 0,
    },

    {
        title: '发生地',
        dataIndex: 'occurred',
        align: 'center',
    },
    {
        title: '消息来源',
        dataIndex: 'source',
        align: 'center'
    },
    {
        title: '死亡/失踪/受伤',
        dataIndex: 'peopleToll',
        align: 'center',
        sorter: (a, b) => (a.deathToll + a.disappearToll + a.injuryToll) - (b.deathToll + b.disappearToll + b.injuryToll),

    },
    {
        title: '经济损失(万元)',
        dataIndex: 'lose',
        align: 'center',
        sorter: (a, b) => a.lose - b.lose,

    },
    {
        title: '创建时间',
        dataIndex: 'creationTime',
        align: 'center',
        sorter: (a, b) => moment(a.creationTime) - moment(b.creationTime),
    },
    {
        title: '操作',
        dataIndex: 'operate',
        scopedSlots: {
            customRender: 'operation'
        },
        align: 'center'
    }
]

const month = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
export default {
    data() {
        return {
            moment,
            season: '',
            spinning: false,
            month,
            happenList,
            yearOptions: [],
            plainOptionsType,
            plainOptionsHappen,
            yearCheckedList: null,
            disCheckedList: ["雷电",
                "寒冷",
                '龙卷',
                "台风",
                '高温',
                '蝗灾',
                '火灾',
                "暴雨",
                "冰雹",
                "干旱",
                "强对流",
                "局地大雾",
                '洪涝',
                "成片大雾",
                "非台暴雨",
                '低温阴雨',
                "雷雨大风",
                "短时强降水",
            ],
            happenCheckedList: ["全省",
                "海口",
                "三亚",
                "三沙",
                "儋州",
                "琼海",
                "万宁",
                "东方",
                "澄迈",
                "临高",
                "白沙",
                "昌江",
                "屯昌",
                "定安",
                "文昌",
                "陵水",
                "乐东",
                "保亭",
                "琼中",
                "五指山",
            ],
            isCheckAllYear: false,
            isCheckAllDis: true,
            isCheckAllHappen: true,
            timeType: 'everyYear',
            nianfenkg: false,
            //年份选择项
            nianfen: [],
            nianArr: [],
            yueArr: [],
            riArr: [],
            shijian: {
                stateyue: '1',
                stateri: '1',
                endyue: '',
                endri: ''
            },
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
            saveData: {
                state: 0,
                time: "",
                occurred: "",
                type: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
                deathToll: 0,
                injuryToll: 0,
                disappearToll: 0,
                lose: 0,
                page: 1,
                size: 1000
            },
            titleTime: null,
            titleYear: null,
            titleData: null,
            mapTitle: '',
            // 是否收缩
            isShrink: false,
            //查询结果
            result: null,
            tableData: [],
            columns,
            //点击地图的表格
            tableDataFilt: [],
            isShowTableDataFilt: false,
            markerLayers: [],
            tollLayers: [],
            isShowTip: false,
            markerTooltip: {},
            auditNumber: null,
            typeTolls: [],
            //--------------------------------------

            loading: false,
            formItemLayout: {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 19
                }
            },
        };
    },
    created() {
        let date = new Date().getFullYear()
        for (var i = date, num = 14; num > 0; i--, num--) {
            this.yearOptions.push(i + '')
        }
        for (let i = 1; i <= 12; i++) {
            this.yueArr.push(i)
        }
        for (let i = 1; i <= 31; i++) {
            this.riArr.push(i)
        }
        this.getnian()

        //获取待审核数量
        this.getAuditNumber()

    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    beforeDestroy() {},
    computed: {
        ...mapState(['isShowAdmModal', 'adminInfo']),
        postTime() {
            let times = [],
                titleTime = [],
                begin = '',
                end = '',
                titleTxt = ''

            if (this.disCheckedList.length > 3) {
                titleTxt = `${this.disCheckedList.slice(0,3).join(',')}等${this.disCheckedList.length}种灾害落区分布`
            } else {
                titleTxt = `${this.disCheckedList.join(',')}${this.disCheckedList.length}种灾害落区分布`
            }
            if (this.timeType == 'everyYear') {
                let beginDate = (this.shijian.stateyue < 10 ? '0' + this.shijian.stateyue : '' + this.shijian.stateyue) + (this.shijian.stateri < 10 ? '0' + this.shijian.stateri : '' + this.shijian.stateri) + '000000'
                let beginFormat = this.shijian.stateyue + '月' + this.shijian.stateri + '日'

                let endDate = (this.shijian.endyue < 10 ? '0' + this.shijian.endyue : '' + this.shijian.endyue) + (this.shijian.endri < 10 ? '0' + this.shijian.endri : '' + this.shijian.endri) + '230000'
                let endFormat = this.shijian.endyue + '月' + this.shijian.endri + '日'
                this.nianArr.forEach(nian => {
                    begin = nian + beginDate
                    end = nian + endDate
                    times.push(begin + ":" + end)
                    //标题年份
                    this.nianArr.sort((a, b) => {
                        return b - a
                    })
                    let length = this.nianArr.length
                    this.titleYear = length > 1 ? `(${this.nianArr[length-1]}-${this.nianArr[0]}年)` : `(${this.nianArr[0]}年)`
                    this.titleDate = beginFormat + '——' + endFormat
                    this.mapTitle = this.titleDate + titleTxt + this.titleYear
                })
            } else {
                begin = this.staDate2.year + (this.staDate2.yue < 10 ? '0' + this.staDate2.yue : '' + this.staDate2.yue) + (this.staDate2.ri < 10 ? '0' + this.staDate2.ri : '' + this.staDate2.ri) + '000000'
                end = this.endDate2.year + (this.endDate2.yue < 10 ? '0' + this.endDate2.yue : '' + this.endDate2.yue) + (this.endDate2.ri < 10 ? '0' + this.endDate2.ri : '' + this.endDate2.ri) + '230000'
                times.push(begin + ":" + end)
                titleTime.push(moment(begin, 'YYYYMMDDHHmmss').format('YYYY年.MM月.DD日') + '-' + moment(end, 'YYYYMMDDHHmmss').format('YYYY年.MM月.DD日'))
                this.mapTitle = titleTime.join(',') + titleTxt
            }
            this.saveData.time = times.join(',')



            return begin + end
        },
    },
    watch: {
        postTime(v) {},
        disCheckedList(v) {
            let list = v.map(item => {
                switch (item) {
                    case '雷电':
                        item = 1;
                        break
                    case '暴雨':
                        item = 2;
                        break
                    case '雷雨大风':
                        item = 3;
                        break
                    case '短时强降水':
                        item = 4;
                        break
                    case '台风':
                        item = 5;
                        break
                    case '龙卷':
                        item = 6;
                        break
                    case '高温':
                        item = 7;
                        break
                    case '冰雹':
                        item = 8;
                        break
                    case '干旱':
                        item = 9;
                        break
                    case '寒冷':
                        item = 10;
                        break;
                    case '成片大雾':
                        item = 11;
                        break;
                    case '局地大雾':
                        item = 12;
                        break;
                    case '非台暴雨':
                        item = 13;
                        break;
                    case '强对流':
                        item = 14;
                        break;
                    case '蝗灾':
                        item = 15;
                        break;
                    case '洪涝':
                        item = 16;
                        break;
                    case '低温阴雨':
                        item = 17;
                        break;
                    case '火灾':
                        item = 18;
                        break;
                }
                return item
            })
            this.saveData.type = list.join(',')
        },
        happenCheckedList(v) {
            console.log(v)
            // this.saveData.occurred = v.join(',')
        }



    },
    mounted() {
        this.initMap()
        this.initJson()
        //获取个例列表
        this.onSearchGeli()
    },
    methods: {
        ...mapMutations(['changeAdminModal', 'changeAdminInfo']),
        getAuditNumber() {
            axios.get('/stweather/proxy/172.22.68.119:8667/history/findByState?state=1').then(res => {
                if (res.data.status == 0) {
                    this.auditNumber = res.data.data
                }
            })
        },
        unReSize() {
            document.onmousemove = () => {};
        },
        reSize(i) {
            function $(id) {
                return document.querySelector(id);
            }
            let e = event;
            let left = parseFloat($(".selectRange").offsetLeft);
            let top = parseFloat($(".selectRange").offsetTop);
            let right = parseFloat($(".Range").getAttribute("right"));
            let bottom = parseFloat($(".Range").getAttribute("bottom"));
            let width = parseFloat($(".Range").offsetWidth);
            let height = parseFloat($(".Range").offsetHeight);
            let ox = e.clientX;
            let oy = e.clientY;
            if (i != 4 && e.target.className == "control") {
                if (i == 0) {
                    document.onmousemove = e => {
                        let ix = e.clientX;
                        let iy = e.clientY;
                        console.log(ix, ox)
                        $(".selectRange").style.left = left + (ix - ox) + "px";
                        $(".selectRange").style.top = top + (iy - oy) + "px";
                        $(".selectRange").style.width = width - (ix - ox) + "px";
                        $(".selectRange").style.height = height - (iy - oy) + "px";
                    };
                } else if (i == 1) {
                    document.onmousemove = e => {
                        let ix = e.clientX;
                        let iy = e.clientY;
                        $(".selectRange").style.width = width + (ix - ox) + "px";
                        $(".selectRange").style.height = height - (iy - oy) + "px";
                        $(".selectRange").style.top = top + (iy - oy) + "px";
                    };
                } else if (i == 2) {
                    document.onmousemove = e => {
                        let ix = e.clientX;
                        let iy = e.clientY;
                        $(".selectRange").style.width = width + (ix - ox) + "px";
                        $(".selectRange").style.height = height + (iy - oy) + "px";
                    };
                } else if (i == 3) {
                    // let ox = e.clientX
                    // let oy = e.clientY
                    document.onmousemove = e => {
                        let ix = e.clientX;
                        let iy = e.clientY;
                        // $('.Range').style.width=width - (ix - ox) + 'px'
                        // $('.Range').style.height=height + (iy - oy) + 'px'
                        $(".selectRange").style.width = width - (ix - ox) + "px";
                        $(".selectRange").style.height = height + (iy - oy) + "px";
                        $(".selectRange").style.left = left + (ix - ox) + "px";
                    };
                }
            } else if (i == 4 && e.target.className == "Range") {
                // let sLeft=$('.selectRange').offsetLeft
                document.onmousemove = e => {
                    let ix = e.clientX;
                    let iy = e.clientY;
                    $(".selectRange").style.left = left + (ix - ox) + "px";
                    $(".selectRange").style.top = top + (iy - oy) + "px";
                };
            }
        },
        screenShot(i) {
            if (i) {
                //区域截屏
                let node = document.querySelector(".map");
                let ow = document.querySelector(".Range").offsetWidth;
                let oh = document.querySelector(".Range").offsetHeight;
                let ox = document.querySelector(".selectRange").offsetLeft + 10000;
                let oy = document.querySelector(".selectRange").offsetTop + 10000;
                domtoimage.toJpeg(node, {
                    quality: 1
                }).then(dataUrl => {
                    let img = new Image();
                    img.src = dataUrl;
                    let canvas = document.createElement("canvas");
                    canvas.width = ow;
                    canvas.height = oh;
                    let ctx = canvas.getContext("2d");
                    img.onload = () => {
                        ctx.drawImage(img, ox, oy, ow, oh, 0, 0, ow, oh);
                        var url = canvas.toDataURL("image/jpeg");
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = "强天气诊断分析.jpg";
                        a.click();
                        this.isAreaScreenshot = false;

                    };

                });
            } else {
                //全屏
                let node = document.querySelector(".mapWrap");
                let ow = node.offsetWidth;
                let oh = node.offsetHeight;
                console.log(ow)
                let that = this
                domtoimage.toJpeg(node, {
                    quality: 1
                }).then(function (dataUrl) {
                    let img = new Image();
                    img.src = dataUrl;
                    let canvas = document.createElement("canvas");
                    // canvas.width = ow;

                    canvas.width = 1050;
                    canvas.height = oh;
                    let ctx = canvas.getContext("2d");
                    img.onload = () => {
                        console.log(this, that)
                        // ctx.drawImage(img, 0, 0, ow, oh, 0, 0, ow, oh);
                        if (that.isShrink) {
                            ctx.drawImage(img, 400, 0, ow, oh, 0, 0, ow, oh);
                        } else {
                            ctx.drawImage(img, 850, 0, ow, oh, 0, 0, ow, oh);
                        }

                        var url = canvas.toDataURL("image/jpeg");
                        let a = document.createElement("a");
                        a.href = url;
                        a.download = "灾害性天气类型分布.jpg";
                        a.click();
                    };
                });
            }
        },
        changeMap() {
            this.isShrink = !this.isShrink
            if (this.isShrink) {
                this.map.setView([19.20742852680121, 109.83581542968751])
            } else {
                this.map.setView([19.2345687328717, 108.78686523437501])
            }
        },
        initMap() {
            this.map = L.map('map', {
                attributionControl: false,
                zoomControl: false,
                minZoom: 8,
                maxZoom: 12,
            }).setView([19.2345687328717, 108.78686523437501], 9);

            this.map.on('click', (e) => {
                console.log(e.latlng)
            })
            //水印
            this.shuiyinMarker = L.marker([18.22413378742241, 110.16265869140626], {
                icon: L.divIcon({
                    // iconUrl: './imgs/水印.png',
                    // iconSize: [338, 41],
                    // iconAnchor: [22, 94],
                    // popupAnchor: [-3, -76],
                    html: '',
                    className: 'mapShuiyin'

                })
            })
            this.shuiyinMarker.addTo(this.map)

        },
        initJson(data = {}) {
            if (this.markerLayers.length) {
                this.markerLayers.forEach(item => {
                    this.map.removeLayer(item)
                })
                this.markerLayers = []
            }
            if (this.tollLayers.length) {
                this.tollLayers.forEach(item => {
                    this.map.removeLayer(item)
                })
                this.tollLayers = []
            }
            if (this.titleMarker) {
                this.map.removeLayer(this.titleMarker)
                this.titleMarker = null
            }
            var that = this
            let {
                occurredMap,
                occurredToll
            } = data
            L.geoJSON(hainan, {
                    style(feature) {
                        return {
                            color: 'rgb(169,152,153)',
                            fillColor: 'rgb(253,254,208)',
                            fillOpacity: '1',
                            weight: 3,
                        }
                    },
                    onEachFeature(feature, layer) {
                        if (feature.properties.DNAME === '三沙市') {
                            return
                        }
                        layer.on('mouseover', (e) => {
                            if (occurredMap) {
                                that.isShowTip = true
                                var data = null
                                for (let key in occurredMap) {
                                    if (feature.properties.DNAME.includes(key)) {
                                        data = occurredMap[key]
                                    }
                                }
                                layer.on('mousemove', (e) => {
                                    var p = that.map.latLngToContainerPoint(e.latlng);
                                    that.markerTooltip = {
                                        data,
                                        left: p.x + 15,
                                        top: p.y - 10
                                    };
                                })

                            }
                            layer.setStyle({
                                fillColor: 'rgb(199,249,174)'
                            })
                        })

                        layer.on('mouseout', (e) => {
                            that.isShowTip = false
                            layer.setStyle({
                                fillColor: 'rgb(253,254,208)'
                            })
                        })
                        layer.on('click', (e) => {
                            that.isShowTableDataFilt = true
                            that.tableDataFilt = []
                            that.tableData.forEach(item => {
                                item.occurred.split(',').forEach(occ => {
                                    // console.log(occ)
                                    if (feature.properties.DNAME.includes(occ)) {
                                        that.tableDataFilt.push(item)
                                    }
                                })
                            })

                            console.log(that.tableDataFilt)
                            that.tableDataFilt.forEach((item, index) => {
                                item.number = index + 1
                            })
                        })
                        //----------
                        var latLng = []
                        var className = 'dName'
                        var html = feature.properties.DNAME
                        //渲染地图颜色
                        if (data.occurredToll) {
                            Object.keys(data.occurredToll).forEach(key => {
                                if (html.includes(key)) {
                                    let val = data.occurredToll[key]
                                    let fillColor = that.renderColor(val)
                                    layer.setStyle({
                                        fillColor
                                    })

                                    layer.on('mouseout', (e) => {
                                        layer.setStyle({
                                            fillColor
                                        })
                                    })
                                }
                            })
                        }
                        switch (html) {
                            case '东方市':
                                latLng = [19.01278705937288, 108.82781982421876];
                                break;
                            case '昌江黎族自治县':
                                latLng = [19.21780295966795, 109.03381347656251];
                                html = '';
                                className = 'cj'
                                break;
                            case '白沙黎族自治县':
                                latLng = [19.210022196386095, 109.33593750000001];
                                break;
                            case '儋州市':
                                latLng = [19.55202569751752, 109.42382812500001];
                                break;
                            case '临高县':
                                latLng = [19.815806165386956, 109.71221923828126];
                                break;
                            case '澄迈县':
                                latLng = [19.696900138883937, 109.99786376953126];
                                break;
                            case '海口市':
                                latLng = [19.83906000930461, 110.43731689453126];
                                break;
                            case '文昌市':
                                latLng = [19.766703551716976, 110.79711914062501];
                                break;
                            case '定安县':
                                latLng = [19.518375478601566, 110.32745361328126];
                                break;
                            case '屯昌县':
                                latLng = [19.339653419491874, 110.04730224609376];
                                break;
                            case '琼海市':
                                latLng = [19.215209412824127, 110.41809082031251];
                                break;
                            case '琼中黎族苗族自治县':
                                latLng = [19.033559718886284, 109.73419189453126];
                                break;
                            case '万宁市':
                                latLng = [18.843913201134143, 110.27801513671875];
                                break;
                            case '五指山市':
                                latLng = [18.841313810317015, 109.4952392578125];
                                break;
                            case '保亭黎族苗族自治县':
                                latLng = [18.63583516062285, 109.54467773437501];
                                break;
                            case '陵水黎族自治县':
                                latLng = [18.594188856740427, 109.86877441406251];
                                break;
                            case '乐东黎族自治县':
                                latLng = [18.67747125852608, 109.08325195312501];
                                break;
                                // case '三沙市':
                                //     latLng=[18.427501971948608,109.38537597656251];
                                //     break;
                            case '三亚市':
                                latLng = [18.427501971948608, 109.38537597656251];
                                break;

                        }
                        var myIcon = L.divIcon({
                            html,
                            className
                        });
                        that.markerLayers.push(L.marker(latLng, {
                            icon: myIcon
                        }))

                    }
                })
                .addTo(this.map)
            this.markerLayers.forEach(item => {
                item.addTo(this.map)
            })
            //数字
            if (occurredToll) {
                names.forEach(item => {
                    if (occurredToll[item.name]) {
                        var myIcon = L.divIcon({
                            html: occurredToll[item.name],
                            className: 'toll'
                        });
                        this.tollLayers.push(L.marker(item.latLng, {
                            icon: myIcon
                        }))
                    }
                })
                this.tollLayers.forEach(item => {
                    item.addTo(this.map)
                })
            }
            //标题
            this.titleMarker = L.marker([20.195190636474504, 109.16564941406251], {
                icon: L.divIcon({
                    html: this.mapTitle,
                    className: 'mapTitle'
                })
            })
            this.titleMarker.addTo(this.map)
        },
        //渲染地图颜色
        renderColor(val) {
            let color = ''
            if (val >= 1 && val < 5) {
                color = '#a5e9cd'
            } else if (val >= 5 && val < 10) {
                color = '#53c6f6'
            } else if (val >= 10 && val < 20) {
                color = '#fff339'
            } else if (val >= 20 && val < 30) {
                color = '#ffc438'
            } else if (val >= 30 && val < 40) {
                color = '#ff7327'
            } else if (val >= 40 && val < 60) {
                color = '#fd3015'
            } else if (val > 60) {
                color = '#cf003a'
            } else {
                color = 'rgb(253,254,208)'
            }
            return color;
        },
        //获取时间
        getnian() {
            var nian = new Date().getFullYear()
            var ri = new Date().getDate()
            var yue = new Date().getMonth() + 1;
            this.shijian.endyue = yue;
            this.shijian.endri = ri;
            this.nianArr.push(nian)
            for (let i = 1951; i <= nian; i++) {
                this.nianfen.push(i)
            }
        },
        // 右侧菜单跳转
        toCasePage(type) {
            if (this.adminInfo) {
                if (this.adminInfo.power === 'admin') {
                    switch (type) {
                        case 'add':
                            this.$router.push('/caseSave');
                            break;
                        case 'audit':
                            this.$router.push('/caseAudit')
                            break;
                        case 'list':
                            this.$router.push({
                                name: 'CaseAudit',
                                params: {
                                    data: 'unPass',
                                }
                            });
                            break;
                        case 'fenxi':
                            this.$router.push('/caseCalc');
                            break;
                    }
                } else {
                    this.$message.warning('您暂无权限操作此项内容');
                }
            } else {
                this.$message.warning('请登陆管理员账号后操作');
                this.changeAdminModal(true)
            }

        },
        // 跳转到查看个例
        viewCase(id) {
            let item = this.tableData.find(item => item.id == id)
            this.$router.push({
                name: 'CaseView',
                params: {
                    data: this.result,
                    item
                }
            })
        },
        viewCaseFilt(text, record) {
            this.viewCase(record.id)
        },
        //编辑个例
        compileCase(id) {
            if (this.adminInfo) {
                if (this.adminInfo.power === 'admin') {
                    let item = this.tableData.find(item => item.id == id)
                    this.$router.push({
                        name: 'CaseSave',
                        params: {
                            data: item,
                            pass: true
                        }
                    })
                } else {
                    this.$message.warning('您暂无权限操作此项内容');
                }
            } else {
                this.$message.warning('请登陆管理员账号后操作');
                this.changeAdminModal(true)
            }

        },
        compileCaseFilt(text, record) {
            this.compileCase(record.id)
        },
        //删除个例
        removeCase(id) {
            if (this.adminInfo) {
                if (this.adminInfo.power === 'admin') {
                    this.$confirm({
                        content: "确定删除此项个例?",
                        okText: "删除",
                        cancelText: "取消",
                        onOk: () => {
                            axios
                                .get(
                                    `/stweather/proxy/172.22.68.119:8667/history/deleteById?id=${id}`
                                )
                                .then(res => {
                                    if (res.data.status == 0) {
                                        let index = this.tableData.findIndex(res => res.id === id)
                                        this.tableData.splice(index, 1)
                                        let index2 = this.tableDataFilt.findIndex(res => res.id === id)
                                        this.tableDataFilt.splice(index2, 1)
                                        this.initJson(this.tableData)
                                        this.$message.success("个例删除成功");
                                    }
                                })
                                .catch(err => {
                                    this.$message.error("个例删除失败");
                                });
                        }
                    });
                } else {
                    this.$message.warning('您暂无权限操作此项内容');
                }
            } else {
                this.$message.warning('请登陆管理员账号后操作');
                this.changeAdminModal(true)
            }

        },
        removeCaseFilt(text, record) {
            this.removeCase(record.id)
        },
        checkAllYear(e) {
            Object.assign(this, {
                yearCheckedList: e.target.checked ? this.yearOptions : [],
                isCheckAllYear: e.target.checked,
            });
        },
        checkAllDis(e) {
            Object.assign(this, {
                disCheckedList: e.target.checked ? this.plainOptionsType : [],
                isCheckAllDis: e.target.checked,
            });
        },
        checkAllHappen(e) {
            Object.assign(this, {
                happenCheckedList: e.target.checked ? this.plainOptionsHappen : [],
                isCheckAllHappen: e.target.checked,
            });
        },
        yearListChange() {
            this.isCheckAllYear = this.yearCheckedList.length === this.yearOptions.length;
        },
        disListChange() {
            this.isCheckAllDis = this.disCheckedList.length === this.plainOptionsType.length;
        },
        happenListChange() {
            this.isCheckAllHappen = this.happenCheckedList.length === this.plainOptionsHappen.length;
        },
        changeYears() {
            this.nianArr = this.yearCheckedList
            this.nianfenkg = false
        },
        selectSj(sj, a, b, c, checkLeap = false) {
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
        onSearchGeli() {
            this.spinning = true
            filtersType.length = 0
            axios.post('/stweather/proxy/172.22.68.119:8667/history/queryPage', this.saveData)
                .then(res => {
                    this.spinning = false
                    if (res.data.status == 0) {
                        let result = res.data.data
                        this.result = result
                        this.typeTolls = []
                        for (let key in result.typeToll) {
                            this.typeTolls.push({
                                [key]: result.typeToll[key]
                            })
                        }
                        this.tableData = result.object
                        this.tableData.map((item, index) => {
                            let type = item.type.split(',').map(type => this.turnType(+type)).join(',')
                            item.type = type
                            item.number = index + 1
                            item.startTime2 = moment(item.startTime, 'YYYYMMDDHHmmss').format(
                                'YYYY年MM月DD日 HH时'
                            )
                            item.endTime2 = moment(item.endTime, 'YYYYMMDDHHmmss').format(
                                'YYYY年MM月DD日 HH时'
                            )
                            item.peopleToll = item.deathToll + '/' + item.disappearToll + '/' + item.injuryToll
                        })
                        Object.keys(result.typeToll).forEach(key => {
                            filtersType.push({
                                text: key,
                                value: key
                            })
                        })
                        // console.log(filtersType)
                        if (result) {
                            this.initJson(result)
                        }
                    }
                }).catch(err => {
                    this.spinning = false
                })
        },
        turnType(num) {
            let type = ''
            switch (num) {
                case 1:
                    type = '雷电';
                    break
                case 2:
                    type = '暴雨';
                    break
                case 3:
                    type = '雷暴大风';
                    break
                case 4:
                    type = '短时强降水';
                    break
                case 5:
                    type = '台风';
                    break
                case 6:
                    type = '龙卷';
                    break
                case 7:
                    type = '高温';
                    break
                case 8:
                    type = '冰雹';
                    break
                case 9:
                    type = '干旱';
                    break
                case 10:
                    type = '寒冷';
                    break;
                case 11:
                    type = '成片大雾';
                    break;
                case 12:
                    type = '局地大雾';
                    break;
                case 13:
                    type = '非台暴雨';
                    break;
                case 14:
                    type = '强对流';
                    break;
                case 15:
                    type = '蝗灾';
                    break;
                case 16:
                    type = '洪涝';
                    break;
                case 17:
                    type = '低温阴雨';
                    break;
                case 18:
                    type = '火灾';
                    break;
            }
            return type
        },
        // 表格排序、筛选、分页时
        onChangeTable(pagination, filters, sorter) {
            console.log(pagination, filters, sorter)

        },
        //-------------------------------------------------------
        //登录
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true;
                    console.log("Received values of form: ", values);
                    const {
                        userName,
                        password
                    } = values;
                    axios.post('/stweather/proxy/172.22.68.119:8667/hainan/login', {
                            loginName: userName,
                            passWord: password
                        })
                        .then(res => {
                            this.loading = false;
                            if (res.data.status == 0) {
                                // 登录成功
                                const result = res.data.data;
                                this.changeAdminInfo(result);
                                //关闭登陆框
                                this.changeAdminModal(false)
                                sessionStorage.setItem("adminInfo", result);
                            } else {
                                //用户名密码错误
                                this.$message.error('用户名或密码错误')
                            }
                        })
                        .catch(err => {
                            this.loading = false;
                            this.$message.error('当前暂无法登录,请稍后再试')
                        })
                }
            });
        },
        downExcel() {
            let data = [];
            let headData = [
                "序号",
                "开始时间/结束时间",
                "类型(别名)",
                "发生地",
                "消息来源",
                '死亡/失踪/受伤',
                '经济损失(万元)',

            ];
            data.push(headData);
            let bodyData = [];
            this.tableData.forEach((item, index) => {
                let type = item.name ? `${item.type}(${item.name})` : item.type
                bodyData = [
                    index + 1,
                    item.startTime + '-' + item.endTime,
                    type,
                    item.occurred,
                    item.source,
                    item.deathToll + '/' + item.disappearToll + '/' + item.injuryToll,
                    item.lose
                ];
                data.push(bodyData);
            });
            console.log('excelData', data);


            let sheel = XLSX.utils.aoa_to_sheet(data);
            // sheel["!merges"] = merges;

            function sheet2blob(sheet, sheetName) {
                sheetName = sheetName || "sheet1";
                var workbook = {
                    SheetNames: [sheetName],
                    Sheets: {}
                };
                workbook.Sheets[sheetName] = sheet;
                // 生成excel的配置项
                var wopts = {
                    bookType: "xlsx", // 要生成的文件类型
                    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
                    type: "binary"
                };
                var wbout = XLSX.write(workbook, wopts);
                var blob = new Blob([s2ab(wbout)], {
                    type: "application/octet-stream"
                });
                // 字符串转ArrayBuffer
                function s2ab(s) {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
                    return buf;
                }
                return blob;
            }

            function openDownloadDialog(url, saveName) {
                if (typeof url == "object" && url instanceof Blob) {
                    url = URL.createObjectURL(url); // 创建blob地址
                }
                var aLink = document.createElement("a");
                aLink.href = url;
                aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
                var event;
                if (window.MouseEvent) event = new MouseEvent("click");
                else {
                    event = document.createEvent("MouseEvents");
                    event.initMouseEvent(
                        "click",
                        true,
                        false,
                        window,
                        0,
                        0,
                        0,
                        0,
                        0,
                        false,
                        false,
                        false,
                        false,
                        0,
                        null
                    );
                }
                aLink.dispatchEvent(event);
            }
            openDownloadDialog(sheet2blob(sheel), "历史个例.xlsx");
        },
        displayRender({
            labels
        }) {
            return labels[labels.length - 1];
        },

    },

};