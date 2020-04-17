import {
    mapState,
    mapMutations
} from 'vuex'
import * as axios from 'axios'
import moment from 'moment'
import XLSX from 'xlsx'
import BScroll from 'better-scroll'
import L from 'leaflet'

const productType = [
    // {
    //   name: "综合",
    //   checked: false
    // },
    {
        name: '监测',
        checked: true
    },
    {
        name: '实况',
        checked: false
    },
    // {
    //   name: "短临",
    //   checked: false
    // },
    {
        name: '模式',
        checked: false
    }
]
const menus = [{
        type: '累计',
        disabled: false,
        ref: 'leiji',
        lists: [{
                name: '24h',
                checked: false
            },
            {
                name: '21h',
                checked: false
            },
            {
                name: '12h',
                checked: false
            },
            {
                name: '06h',
                checked: false
            },
            {
                name: '03h',
                checked: false
            },
            {
                name: '01h',
                checked: false
            }
        ]
    },
    {
        type: '时效',
        disabled: false,
        ref: 'shixiao',
        lists: [{
                name: '006',
                checked: false
            },
            {
                name: '012',
                checked: false
            },
            {
                name: '018',
                checked: false
            },
            {
                name: '021',
                checked: false
            },
            {
                name: '024',
                checked: false
            },
            {
                name: '048',
                checked: false
            },
            {
                name: '072',
                checked: false
            }
        ]
    }
]
export default {
    data() {
        return {
            moment,
            getData: null,
            fileNames: [],
            downloadList: null,
            //--------------------------------------
            //筛选的树节点信息
            treeData: [],
            // 天气类型多选
            typeCheckedList: [],
            //预警级别
            levelCheckedList: ['蓝色', '黄色', '橙色', '红色'],
            levelChecked: [],
            checkedList: [],
            checkAll: false,
            // 开始结束时间
            beginDate: null,
            endDate: null,
            //用于查询的数据
            searchData: {
                startTime: '',
                endTime: '',
                weatherKind: '',
                weatherSystem: [],
                local: []
            },
            weatherSystem: [],
            testDetail: {},
            local: [],
            resData: [],
            //用于提交图片请求的数据
            body: {
                modeName: '',
                eleName: '',
                forecastTime: '',
                level: '',
                userDefinedParas: '',
                strTime: ''
            },
            //参数eleName项
            eleName: [],
            ele: {
                fir: 'OBSConvection',
                type: '强对流综合',
                searchArea: '全国',
                hour: '24h'
            },

            // tbody是否选中
            isTbodyCheck: false,
            selected: '1',
            selectData: null,
            // 筛选的数据
            filter: [],
            pipArr: [],
            pipArrC: [],
            proKey: '',
            //请求回来的图片
            picIdx: 0,
            picAll: [],
            // 详情是否显示
            isDetailVisibal: false,
            cancelRequests: [],
            imgsUrl: '',
            imgsUrl_fcst: ''.strTime,
            timeIdx: '',
            dropArr: [],
            defaultImg: 'this.src="' + require('./imgs/404.jpg') + '"',
            activeKey: [],
            nodesArr: [],
            examplename: '',
            defaultCheckedKeys: [],
            selectedKeys: [],
            productType,
            menus,
            onShowSearchPage: false,
            areaList: false,
            showTimeList: false,
            time: false,
            info: null,
            productTime: null,
            timeinList: [],
            minuteList: [],
            timeHour: '',
            timeMinute: '',
            bodyText: '',
            searchLoading: false,
            loading: false,
            spinning: false,
            formItemLayout: {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 19
                }
            },
            showUpload: false,
            tree: [],
            uploadItem: {},
        }
    },
    created() {
        this.getData = this.$route.params
        this.onCheckTbody(this.getData.item)
        //获取附件名字
        let data = this.$route.params.item
        console.log('view', data)
        this.tree = JSON.parse(data.uploadTree)
        // axios.get(`/stweather/proxy/172.22.68.119:8667/history/findFilePathById?id=${data.id}`).then(res => {
        //     if (res.data.status == 0) {
        //         let result = res.data.data
        //         this.tree = JSON.parse(result[0].uploadTree)
        //     }
        // })
    },
    beforeCreate() {
        this.form = this.$form.createForm(this)
    },
    beforeDestroy() {
        this.cancelAllRequest()
    },
    computed: {
        ...mapState(['isShowAdmModal', 'adminInfo'])
    },
    watch: {
        checkedList() {
            this.searchData.local = [...this.checkedList]
        }
    },
    async mounted() {
        this.getTree()
        //选择产品类型（监测、诊断、短期）
        this.checkProduct = this.productType.find(item => item.checked).name
        //-----------------------------------
        this.beginDate = moment(
            moment()
            .subtract(1, 'month')
            .format('YYYY-MM-DD'),
            'YYYYMMDDHHmmss'
        )
        this.endDate = moment(moment().format('YYYY-MM-DD'))
        //当没有选择时间时，默认的时间
        this.searchData.startTime = moment(this.beginDate._i, 'YYYY-MM-DD').format(
            'YYYYMMDD000000'
        )
        this.searchData.endTime = moment(this.endDate._i, 'YYYY-MM-DD').format(
            'YYYYMMDD230000'
        )
        this.initScroll();
    },
    methods: {
        ...mapMutations(['changeAdminModal', 'changeAdminInfo']),
        //初始化
        initScroll() {
            // this.qyScroll = new BScroll(this.$refs.quyu[0], {
            //   probeType: 1,
            //   scrollX: true,
            //   click: true,
            // })
            // this.sjScroll = new BScroll(this.$refs.shijian[0], {
            //   probeType: 1,
            //   scrollX: true,
            //   click: true
            // });
            this.ljScroll = new BScroll(this.$refs.leiji[0], {
                probeType: 1,
                scrollX: true,
                click: true
            });
            this.sxScroll = new BScroll(this.$refs.shixiao[0], {
                probeType: 1,
                scrollX: true,
                click: true
            })
            if (this.$refs.dengji) {
                this.djScroll = new BScroll(this.$refs.dengji[0], {
                    probeType: 1,
                    scrollX: true,
                    click: true
                })
            }
            if (this.$refs.yangjiao) {
                this.djScroll = new BScroll(this.$refs.yangjiao[0], {
                    probeType: 1,
                    scrollX: true,
                    click: true
                })
            }

        },
        //产品类型tree
        getTree() {
            axios
                .get('/stweather/proxy/172.22.68.119:8667/hainan/picData')
                .then(res => {
                    const result = res.data.data
                    this.treeInfo = JSON.parse(result)
                    console.log(this.treeInfo)
                    this.treeData = this.treeInfo[this.checkProduct]
                })
        },
        //显示文件下载功能
        handelShowUpload() {
            this.showUpload = true
        },
        //选择目录
        handleCheckChange(curr, node) {
            this.uploadItem = curr
            console.log(curr)
            if (curr.editName == "micaps") {
                let {
                    fileList
                } = curr
            }
        },

        createIFrame(url, triggerDelay, removeDelay) {
            //动态添加iframe，设置src，然后删除
            setTimeout(function () {
                const frame = document.createElement('iframe')
                frame.style.display = 'none'
                frame.src = url
                document.body.appendChild(frame)
                setTimeout(function () {
                    frame.remove()
                }, removeDelay)
            }, triggerDelay)
        },

        download() {
            // 触发下载的间隔
            let triggerDelay = 100
            // 删除下载组件的间隔
            let removeDelay = 1000
            let checkArr = []
            let datums = []
            let loop = function (data) {
                if (!Array.isArray(data)) {
                    return
                }
                if (data.length) {
                    data.forEach(item => {
                        if (item.children && item.children.length) {
                            loop(item.children)
                        }
                        if (item.fileList.length) {
                            item.fileList.forEach(file => {
                                if (file.checked) {
                                    checkArr.push(file)
                                }
                            })
                        }
                    })
                }
                return checkArr
            }
            this.downloadList = loop(this.tree)

            console.log(this.downloadList)
            if (this.downloadList.length) {

                this.downloadList.forEach((item, index) => {
                    this.createIFrame(
                        `http://172.22.68.119:8667/exportFile?fileName=${item.response.data}`,
                        index * triggerDelay,
                        removeDelay
                    )
                })
                let micapsFile = this.downloadList.filter(item => item.paName == "micaps")
                if (micapsFile && micapsFile.length) {
                    setTimeout(() => {
                        this.openMicaps()
                    }, 600)

                }
            }
        },
        //打开micaps工具
        openMicaps() {
            window.open('ff://C:/runtime/MICAPS4.6.0_X64/MICAPS.exe')
        },
        // 考试数据下载
        downCaseDate() {
            console.log(this.getData)
            window.open(`http://172.22.68.119:8667/history/exportFileDownload?startTime=${this.getData.item.startTime}&endTime=${this.getData.item.endTime}`);
        },

        //-------------------------------------------------------
        //登录
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true
                    console.log('Received values of form: ', values)
                    const {
                        userName,
                        password
                    } = values
                    axios
                        .post('/stweather/proxy/172.22.68.119:8667/hainan/login', {
                            loginName: userName,
                            passWord: password
                        })
                        .then(res => {
                            this.loading = false
                            if (res.data.status == 0) {
                                // 登录成功
                                const result = res.data.data
                                this.changeAdminInfo(result)
                                //关闭登陆框
                                this.changeAdminModal(false)
                                sessionStorage.setItem('adminInfo', result)
                            } else {
                                //用户名密码错误
                                this.$message.error('用户名或密码错误')
                            }
                        })
                        .catch(err => {
                            this.loading = false
                            this.$message.error('当前暂无法登录,请稍后再试')
                        })
                }
            })
        },

        //开始日期变化
        onBeginData(e, date) {
            this.searchData.startTime = date.split('-').join('') + '000000'
        },
        //结束日期变化
        onEndData(e, date) {
            this.searchData.endTime = date.split('-').join('') + '230000'
        },
        // 天气类型多选变更
        onTypeChange() {
            this.searchData.weatherKind = [...this.typeCheckedList].join(',')
        },
        //天气系统多选变更
        onSysChange(e) {
            if (e.target.checked) {
                this.weatherSystem.push(e.target.value)
            } else {
                this.weatherSystem.splice(
                    this.weatherSystem.findIndex(v => v == e.target.value),
                    1
                )
            }
            this.searchData.weatherSystem = this.weatherSystem.join(',')
        },

        onHide() {
            this.activeKey = ['']
        },

        // 选择tbody
        onCheckTbody(tbody) {
            console.log(tbody)
            this.selected = tbody.id
            this.defaultCheckedKeys = []
            this.stime = tbody.startTime
            this.bodyHour = moment(tbody.startTime, 'YYYYMMDDHHmmss').format('HH')
            this.etime = tbody.endTime

            this.strTime = tbody.startTime
            this.productTime = moment(this.strTime, 'YYYYMMDDHHmmss')
            this.endTime = moment(tbody.endTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
            this.forecastTime = moment(tbody.startTime, 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')
        },

        displayRender({
            labels
        }) {
            return labels[labels.length - 1]
        },

        //选择产品类型
        onCheckProduct(product) {
            this.productType.map(item => (item.checked = false))
            product.checked = true
            this.checkProduct = product.name
            this.treeData = this.treeInfo[this.checkProduct]
            this.autoSearchImg()
        },
        //自动查询
        autoSearchImg() {
            //产品类型变化自动查询第一个
            let fun = function (data) {
                if (data.children && data.children.length) {
                    return fun(data.children[0])
                } else {
                    return data
                }
            }
            if (this.treeData && this.treeData.length) {
                var res = fun(this.treeData[0])
                this.scope = res.scope.split(',')[0] || ''
                this.times = res.times.split(',')[0] || ''
                this.time = res.time.split(',')[0] || ''
                this.level = res.level.split(',')[0] || ''
                this.reqImg()
            }
        },
        //选择树节点
        onSelectTree(v, e) {
            //选择的是最后一个子节点
            if (
                e.selectedNodes[0] &&
                !e.selectedNodes[0].data.props.dataRef.children.length
            ) {
                this.info = e.selectedNodes[0].data.props
                console.log(this.info)
                let yjArr = []
                let yjList = []
                if (this.info.title === '雷达') {
                    yjArr.push('0.6', '2.3', '3.3', '4.2', '5.9', '9.8', '14.5', '19.4')
                    for (let i = 0; i < yjArr.length; i++) {
                        let obj = {}
                        obj.name = yjArr[i]
                        obj.checked = i === 0 ? true : false
                        yjList.push(obj)
                    }
                    console.log(yjList)
                }
                this.initScroll()
                let scopeArr =
                    this.info.scope === '0' || this.info.scope === '' ? [] :
                    this.info.scope.split(',')
                //特殊
                let timeinStr = this.info.timein
                let timeinArr = []
                let minuteArr = []

                let timeArr =
                    this.info.time === '0' || this.info.time === '' ? [] :
                    this.info.time.split(',')
                let timesArr =
                    this.info.times === '0' || this.info.times === '' ? [] :
                    this.info.times.split(',')
                let levelArr =
                    this.info.level === '0' || this.info.level === '' ? [] :
                    this.info.level.split(',')
                let scopeList = []
                let timeinList = []
                let timeList = []
                let timesList = []
                let levelList = []
                let minuteList = []

                if (scopeArr.length) {
                    for (let i = 0; i < scopeArr.length; i++) {
                        let obj = {}
                        obj.name = scopeArr[i]
                        obj.checked = i === 0 ? true : false
                        scopeList.push(obj)
                    }
                }
                if (timeinStr) {
                    axios
                        .get(
                            `/stweather/proxy/172.22.68.119:8667/history/timein?timein=${timeinStr}`
                        )
                        .then(res => {
                            if (res.data.status == 0) {
                                const result = res.data.data
                                timeinArr = result.hour || []
                                minuteArr = result.minute || []
                                for (let i = 0; i < timeinArr.length; i++) {
                                    let obj = {}
                                    obj.name = timeinArr[i]
                                    obj.checked = i === 0 ? true : false
                                    timeinList.push(obj)
                                }
                                for (let i = 0; i < minuteArr.length; i++) {
                                    let obj = {}
                                    obj.name = minuteArr[i]
                                    obj.checked = i === 0 ? true : false
                                    minuteList.push(obj)
                                }
                                console.log(timeinList, minuteList)
                            }
                            this.timeinList = timeinList
                            this.minuteList = minuteList
                            if (timeinList && timeinList.length) {
                                this.timeHour = timeinList[0].name
                                console.log('hour', this.timeHour)
                            }
                            if (minuteList && minuteList.length) {
                                this.timeMinute = minuteList[0].name
                                console.log('timeMinute', this.timeMinute)
                            }
                        })
                }
                if (timeArr.length) {
                    for (let i = 0; i < timeArr.length; i++) {
                        let obj = {}
                        obj.name = timeArr[i]
                        obj.checked = i === 0 ? true : false
                        timeList.push(obj)
                    }
                }
                if (timesArr.length) {
                    for (let i = 0; i < timesArr.length; i++) {
                        let obj = {}
                        obj.name = timesArr[i]
                        obj.checked = i === 0 ? true : false
                        timesList.push(obj)
                    }
                }
                if (levelArr.length) {
                    for (let i = 0; i < levelArr.length; i++) {
                        let obj = {}
                        obj.name = levelArr[i]
                        obj.checked = i === 0 ? true : false
                        levelList.push(obj)
                    }
                }
                this.timeList = timeList
                //重置menus
                setTimeout(() => {
                    this.menus = [
                        // {
                        //   type: "区域",
                        //   ref: 'quyu',
                        //   lists: scopeList,
                        //   disabled: scopeList.length ? false : true
                        // },
                        // {
                        //   type: "时间",
                        //   ref: "shijian",
                        //   lists: timeinList,
                        //   disabled: timeinList.length ? false : true
                        // },
                        // {
                        //   type: "分钟",
                        //   ref: "minute",
                        //   lists: minuteList,
                        //   disabled: minuteList.length ? false : true
                        // },
                        {
                            type: '时效',
                            ref: 'shixiao',
                            lists: timeList,
                            disabled: timeList.length ? false : true
                        },
                        {
                            type: '累计',
                            ref: 'leiji',
                            lists: timesList,
                            disabled: timesList.length ? false : true
                        },
                        {
                            type: '等级',
                            ref: 'dengji',
                            lists: levelList,
                            disabled: levelList.length ? false : true
                        },
                        {
                            type: '仰角',
                            ref: 'yangjiao',
                            lists: yjList,
                            disabled: yjList.length ? false : true
                        }
                    ]
                    this.scope = scopeList.find(item => item.checked) ?
                        scopeList.find(item => item.checked)['name'] :
                        ''
                    // this.timeHour = timeinList.find(item => item.checked)
                    //   ? timeinList.find(item => item.checked)["name"]
                    //   : this.bodyHour;
                    // this.timeMinute = minuteList.find(item => item.checked)
                    //   ? minuteList.find(item => item.checked)["name"]
                    //   : "00";

                    this.times = timesList.find(item => item.checked) ?
                        timesList.find(item => item.checked)['name'] :
                        ''
                    this.time = timeList.find(item => item.checked) ?
                        timeList.find(item => item.checked)['name'] :
                        ''
                    this.level = levelList.find(item => item.checked) ?
                        levelList.find(item => item.checked)['name'] :
                        ''
                    this.strTime =
                        moment(this.strTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                        ' ' +
                        this.timeHour +
                        ':' +
                        this.timeMinute +
                        ':00'
                    this.reqImg()
                }, 800)
            }
        },
        //选择菜单选项
        onCheckMenu(list) {
            //只要能选就说明数据存在
            let menu = this.menus.find(item =>
                item.lists.find(el => el.name === list.name)
            )
            menu.lists.map(item => (item.checked = false))
            list.checked = true
            if (menu.type === '区域') {
                this.scope = list.name
            }
            // if (menu.type === "时间") {
            //   this.timeHour = list.name;
            // }
            // if (menu.type === "分钟") {
            //   this.timeMinute = parseFloat(list.name);
            // }
            if (menu.type === '累计') {
                this.times = list.name
            }
            if (menu.type === '时效') {
                this.time = list.name
            }
            if (menu.type === '等级') {
                this.level = list.name
            }
            if (menu.type === '仰角') {
                this.angle = list.name
            }
            this.strTime =
                moment(this.strTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                ' ' +
                this.timeHour +
                ':' +
                this.timeMinute +
                ':00'
            this.reqImg()
        },

        onHourChange(val) {
            this.timeHour = val
            this.strTime =
                moment(this.strTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                ' ' +
                this.timeHour +
                ':' +
                this.timeMinute +
                ':00'
            this.reqImg()
        },
        onMinuteChange(val) {
            this.timeMinute = val
            this.strTime =
                moment(this.strTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                ' ' +
                this.timeHour +
                ':' +
                this.timeMinute +
                ':00'
            this.reqImg()
        },
        //翻页
        onChangePage(next) {
            let minutesLength = this.minuteList.length
            let timeinLength = this.timeinList.length
            if (next) {
                // console.log('时间列表', this.timeinList)
                // console.log('分钟列表', this.minuteList)
                //分钟
                if (minutesLength && timeinLength) {
                    let minuteIdx = this.minuteList.findIndex(item => item.name == this.timeMinute)
                    if (minuteIdx >= minutesLength - 1) {
                        //分钟数加到最大且小时列表>1时重置分钟
                        if (timeinLength > 1) {
                            this.timeMinute = this.minuteList[0].name
                        }
                        //对小时进行操作
                        let hourIdx = this.timeinList.findIndex(item => item.name == this.timeHour)
                        if (hourIdx >= timeinLength - 1) {
                            this.$message.warning('已是当前最后一张图片')
                            return
                        } else {
                            hourIdx++
                            this.timeHour = this.timeinList[hourIdx].name
                        }

                    } else {
                        minuteIdx++
                        this.timeMinute = this.minuteList[minuteIdx].name
                    }

                } else if (timeinLength) {
                    //对小时进行操作
                    let hourIdx = this.timeinList.findIndex(item => item.name == this.timeHour)
                    if (hourIdx >= timeinLength - 1) {
                        this.$message.warning('已是当前最后一张图片')
                        return
                    } else {
                        hourIdx++
                        this.timeHour = this.timeinList[hourIdx].name
                    }

                }

            } else {
                //分钟
                if (minutesLength && timeinLength) {
                    let minuteIdx = this.minuteList.findIndex(item => item.name == this.timeMinute)
                    if (minuteIdx <= 0) {
                        //分钟数减到最小且小时列表>1时重置分钟
                        if (timeinLength > 1) {
                            this.timeMinute = this.minuteList[minutesLength - 1].name
                        }
                        //对小时进行操作
                        let hourIdx = this.timeinList.findIndex(item => item.name == this.timeHour)
                        console.log(hourIdx)

                        if (hourIdx <= 0) {
                            this.$message.warning('已是当前第一张图片')
                            return
                        } else {
                            hourIdx--
                            this.timeHour = this.timeinList[hourIdx].name
                        }

                    } else {
                        minuteIdx--
                        this.timeMinute = this.minuteList[minuteIdx].name
                    }

                } else if (timeinLength) {
                    //对小时进行操作
                    let hourIdx = this.timeinList.findIndex(item => item.name == this.timeHour)
                    if (hourIdx <= 0) {
                        this.$message.warning('已是当前第一张图片')
                        return
                    } else {
                        hourIdx--
                        this.timeHour = this.timeinList[hourIdx].name
                    }

                }

            }
            //能点击就有时次
            this.strTime =
                moment(this.strTime, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') +
                ' ' +
                this.timeHour +
                ':' +
                this.timeMinute +
                ':00'
            this.reqImg()
        },
        //选择产品日期
        onChangeDate(mo, date) {
            this.strTime = date + ' ' + this.timeHour + ':' + this.timeMinute + ':00'
            this.reqImg()
        },

        reqImg() {
            this.forecastTime = moment(this.strTime, 'YYYY-MM-DD HH:mm:ss')
                .add(this.time * 1, 'hour')
                .format('YYYY-MM-DD HH:mm:ss')
            try {
                this.commonParams = {
                    modeName: 'qiangtianqi',
                    eleName: this.info.eleName,
                    forecastTime: this.forecastTime,
                    level: this.level,
                    userDefinedParas: '',
                    strTime: this.strTime,
                    scope: '全国',
                    times: this.times,
                    angle: this.angle
                }

                // 存储取消时的token
                const CancelToken = axios.CancelToken
                if (this.imgToken) {
                    this.imgToken()
                    this.imgToken = null
                }
                this.spinning = true
                axios
                    .get(
                        '/stweather/proxy/172.22.68.119:8667/getFilePathV2', {
                            params: this.commonParams
                        }, {
                            cancelToken: new CancelToken(c => {
                                this.imgToken = c
                            })
                        }
                    )
                    .then(res => {
                        const path = res.data.path
                        this.spinning = false
                        let timeStr = this.stime + '_' + this.etime
                        this.imgsUrl = `http://172.22.68.119:8181/${path}`
                        console.log('选择日期图片路径', this.imgsUrl)
                    })
            } catch (err) {
                this.spinning = false
            }
        },
        // 取消所有请求
        cancelAllRequest() {
            if (this.cancelRequests.length) {
                this.cancelRequests = []
            }
        },

        // 查询详细信息
        onSearchDetail(isShow, tbody) {
            this.isDetailVisibal = isShow
            if (tbody) {
                this.testDetail = tbody
            }
        },
        modiInfo(testDetail) {
            console.log(testDetail)
        },
        //添加个例
        addCase() {
            if (this.adminInfo) {
                if (this.adminInfo.power === 'admin') {
                    this.$router.push('/caseSave')
                } else {
                    this.$message.warning('您暂无权限操作此项内容')
                }
            } else {
                this.$message.warning('请登陆管理员账号后操作')
            }
        },

        //选择区域
        onSelectArea(e) {
            console.log(e.target.value)
            this.ele.searchArea = e.target.value
        }
    }
}