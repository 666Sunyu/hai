// 天气类型
const weatherTypeOptions = [{
        label: '雷电',
        value: 1
    },
    {
        label: '暴雨',
        value: 2
    },
    {
        label: '雷暴大风',
        value: 3
    },
    {
        label: '短时强降水',
        value: 4
    },
    {
        label: '台风',
        value: 5
    },
    {
        label: '龙卷',
        value: 6
    },
    {
        label: '高温',
        value: 7
    },
    {
        label: '冰雹',
        value: 8
    },
    {
        label: '干旱',
        value: 9
    },
    {
        label: '寒冷',
        value: 10
    },
    {
        label: '成片大雾',
        value: 11
    },
    {
        label: '局地大雾',
        value: 12
    },
    {
        label: '非台暴雨',
        value: 13
    },
    {
        label: '强对流',
        value: 14
    },
    {
        label: '蝗灾',
        value: 15
    },
    {
        label: '洪涝',
        value: 16
    },
    {
        label: '低温阴雨',
        value: 17
    },
    {
        label: '火灾',
        value: 18
    },

]
const weatherOptions = [{
        name: '雷电',
        id: 1
    },
    {
        name: '暴雨',
        id: 2
    },
    {
        name: '雷暴大风',
        id: 3
    },
    {
        name: '短时强降水',
        id: 4
    },
    {
        name: '台风',
        id: 5
    },
    {
        name: '龙卷',
        id: 6
    },
    {
        name: '高温',
        id: 7
    },
    {
        name: '冰雹',
        id: 8
    },
    {
        name: '干旱',
        id: 9
    },
    {
        name: '寒冷',
        id: 10
    },
    {
        name: '成片大雾',
        id: 11
    },
    {
        name: '局地大雾',
        id: 12
    },
    {
        name: '非台暴雨',
        id: 13
    },
    {
        name: '强对流',
        id: 14
    },
    {
        name: '蝗灾',
        id: 15
    },
    {
        name: '洪涝',
        id: 16
    },
    {
        name: '低温阴雨',
        id: 17
    },
    {
        name: '火灾',
        id: 18
    },

]
const plainOptionsHappen = [
    '全省',
    '海口',
    '三亚',
    '三沙',
    '儋州',
    '琼海',
    '万宁',
    '东方',
    '澄迈',
    '临高',
    '白沙',
    '昌江',
    '屯昌',
    '定安',
    '文昌',
    '陵水',
    '乐东',
    '保亭',
    '琼中',
    '五指山'
]
const tree = [{
    id: "0",
    label: "文件列表",
    showInput: false,
    editName: '文件列表',
    fileList: [],
    children: [{
            id: "0-1",
            label: "文档",
            showInput: false,
            editName: '文档',
            fileList: [],
            children: [],
        },
        {
            id: "0-2",
            label: "卫星",
            showInput: false,
            editName: '卫星',
            fileList: [],
            children: [],
        }, {
            id: "0-3",
            label: "雷达",
            showInput: false,
            editName: '雷达',
            fileList: [],
            children: [],
        }, {
            id: "0-4",
            label: "自动站",
            showInput: false,
            editName: '自动站',
            fileList: [],
            children: [],
        }, {
            id: "0-5",
            label: "micaps",
            showInput: false,
            editName: 'micaps',
            fileList: [],
            children: [],
        },
    ]
}]
import axios from 'axios'
import moment from 'moment'
export default {
    data() {
        return {
            moment,
            loading: false,
            plainOptionsHappen,
            happenCheckedList: [],
            isCheckAllHappen: false,
            happenArea: '',
            weatherOptions,
            saveData: {
                startTime: null,
                endTime: null,
                source: null,
                occurred: null,
                type: null,
                name: null,
                deathToll: null,
                injuryToll: null,
                disappearToll: null,
                lose: null,
                enterName: null,
                remarks: null,
                filePath: '',
                uploadTree: null,
            },
            //是否为审核页面
            isAudit: false,
            // 审核意见
            auditMind: '',
            // 审核人
            auditorName: '',
            fileNames: [],
            downloadList: [],
            //---------------------------
            beTiem: [moment(), moment()],
            beginDate: moment(),
            endDate: moment(),
            //天气类型/系统全选
            weatherTypeOptions,
            typeCheckedList: [],
            isCheckAllType: false,
            indeterminateType: false,
            showUpload: false,
            tree: [],
            uploadItem: {},
        }
    },
    computed: {
        changeDate() {
            const startTime =
                this.beginDate.format('YYYYMMDD') + this.beTiem[0].format('HH0000')
            const endTime =
                this.endDate.format('YYYYMMDD') + this.beTiem[1].format('HH0000')
            this.saveData.startTime = startTime
            this.saveData.endTime = endTime
            console.log(this.saveData.startTime + '-' + this.saveData.endTime)
        }
    },
    watch: {
        changeDate(v) {
            console.log(v)
        },
        //天气类型
        typeCheckedList(v) {
            console.log(v)
            this.saveData.type = v.join(',')
        },
        // 发生地
        happenCheckedList(v) {
            console.log(v)
            this.saveData.occurred = v.join(',')
        }
    },
    created() {
        //如果是修改,重置params
        if (this.$route.params.data) {
            if (!this.$route.params.isAudit) {
                let data = this.$route.params.data
                console.log('修改', data)
                let type = data.type.split(',').map(type => this.turnType(type))
                this.typeCheckedList = type
                // let type = this.turnType(data.type)
                data.type = type.join(',')
                this.beginDate = moment(data.startTime, 'YYYYMMDDHHmmss')
                this.endDate = moment(data.endTime, 'YYYYMMDDHHmmss')
                this.beTiem = [
                    moment(data.startTime, 'YYYYMMDDHHmmss'),
                    moment(data.endTime, 'YYYYMMDDHHmmss')
                ]
                this.tree = data.uploadTree ? JSON.parse(data.uploadTree) : tree
                console.log('tree', this.tree)
                let state = 1
                //从已通过的列表中进来
                if (this.$route.params.pass) {
                    state = 0
                }
                if (this.$route.params.unPass) {
                    axios.get(`/stweather/proxy/172.22.68.119:8667/history/auditMind?id=${data.id}`).then(res => {
                        if (res.data.status == 0) {
                            let result = res.data.data
                            this.auditMind = result[result.length - 1].remark
                            console.log(result[0], this.auditMind)
                        }
                    })
                }
                this.saveData = {
                    id: data.id,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    source: data.source,
                    occurred: data.occurred,
                    type: data.type,
                    name: data.name,
                    deathToll: data.deathToll,
                    injuryToll: data.injuryToll,
                    disappearToll: data.disappearToll,
                    lose: data.lose,
                    enterName: data.enterName,
                    remarks: data.remarks,
                    filePath: '',
                    uploadTree: JSON.stringify(this.tree),
                    state
                }
            } else {
                //审核
                this.isAudit = true
                let data = this.$route.params.data
                console.log('审核', data)
                let type = data.type.split(',').map(type => this.turnType(type))
                this.typeCheckedList = type
                data.type = type.join(',')
                this.beginDate = moment(data.startTime, 'YYYYMMDDHHmmss')
                this.endDate = moment(data.endTime, 'YYYYMMDDHHmmss')
                this.beTiem = [
                    moment(data.startTime, 'YYYYMMDDHHmmss'),
                    moment(data.endTime, 'YYYYMMDDHHmmss')
                ]
                this.tree = data.uploadTree ? JSON.parse(data.uploadTree) : tree
                // 此处的saveData仅作为v-modal显示使用，并不进行提交
                this.saveData = {
                    id: data.id,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    source: data.source,
                    occurred: data.occurred,
                    type: data.type,
                    name: data.name,
                    deathToll: data.deathToll,
                    injuryToll: data.injuryToll,
                    disappearToll: data.disappearToll,
                    lose: data.lose,
                    enterName: data.enterName,
                    remarks: data.remarks,
                    filePath: '',
                    uploadTree: data.uploadTree,
                }
                //获取附件名字
                // axios
                //     .get(
                //         `/stweather/proxy/172.22.68.119:8667/history/findFilePathById?id=${data.id}`
                //     )
                //     .then(res => {
                //         if (res.data.status == 0) {
                //             let result = res.data.data
                //             this.tree = JSON.parse(result[0].uploadTree)
                //           
                //         }
                //     })
            }
            this.happenCheckedList = this.saveData.occurred.split(',')

        } else {
            //录入
            this.tree = tree
            console.log('录入', this.tree)
        }
    },
    mounted() {

    },
    methods: {
        turnType(name) {
            let type = ''
            switch (name) {
                case '雷电':
                    type = 1
                    break
                case '暴雨':
                    type = 2
                    break
                case '雷暴大风':
                    type = 3
                    break
                case '短时强降水':
                    type = 4
                    break
                case '台风':
                    type = 5
                    break
                case '龙卷':
                    type = 6
                    break
                case '高温':
                    type = 7
                    break
                case '冰雹':
                    type = 8
                    break
                case '干旱':
                    type = 9
                    break
                case '寒冷':
                    type = 10
                    break
                case '成片大雾':
                    type = 11
                    break
                case '局地大雾':
                    type = 12
                    break
                case '非台暴雨':
                    type = 13
                    break
                case '强对流':
                    type = 14
                    break
                case '蝗灾':
                    type = 15;
                    break;
                case '洪涝':
                    type = 16;
                    break;
                case '低温阴雨':
                    type = 17;
                    break;
                case '火灾':
                    type = 18;
                    break;
            }
            return type
        },
        happenListChange() {
            this.isCheckAllHappen = this.happenCheckedList.length === this.plainOptionsHappen.length;
        },
        checkAllHappen(e) {
            Object.assign(this, {
                happenCheckedList: e.target.checked ? this.plainOptionsHappen : [],
                isCheckAllHappen: e.target.checked,
            });
        },
        //显示文件上传功能
        handelShowUpload() {
            this.showUpload = true
            const nod = document.querySelectorAll(".el-tree-node__content");
            const apd = document.querySelectorAll(".apd");
            // this.addClass(apd, "hidden");
            // nod.forEach(item => {
            //     item.addEventListener("mouseover", e => {
            //         this.removeClass(item.querySelector(".apd"), "hidden");
            //     });
            //     item.addEventListener("mouseleave", e => {
            //         this.addClass(apd, "hidden");
            //     });
            // });
        },
        //点击上传按钮
        handleChange(info) {
            console.log(info.file.percent)
            if (info.file.status === 'uploading') {
                if (info.file.percent == 0) {
                    this.$set(info.file, 'checked', false)
                    this.$set(info.file, "paName", this.uploadItem.label)
                    this.uploadItem.fileList.push(info.file)
                }
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} 上传成功`)
                let files = []
                info.fileList.forEach(item => {
                    files.push(item.response.data)
                })
                this.saveData.filePath = files.join(',')

                console.log('tree', this.saveData.uploadTree)
                // console.log('---saveData.filePath---', this.saveData.filePath, this.tree)

            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} 上传失败`)
            }
        },

        //选择目录
        handleCheckChange(curr, node) {
            console.log('选择目录', curr);
            this.uploadItem = curr
        },
        addClass(dom, name) {
            if (dom.length) {
                dom.forEach(item => {
                    item.classList.add(name);
                });
            } else {
                dom.classList.add(name);
            }
        },
        removeClass(dom, name) {
            if (dom.length) {
                dom.forEach(item => {
                    item.classList.remove(name);
                });
            } else {
                dom.classList.remove(name);
            }
        },
        //编辑目录名称
        editName(data) {
            data.showInput = true
        },
        //目录名称确认修改
        handelEnter(data) {
            data.showInput = false
            data.label = data.editName == '' ? data.label : data.editName
        },
        //添加子目录
        append(data) {
            console.log(data)
            const newChild = {
                id: data.id + '-' + (data.children.length + 1),
                label: "新建目录",
                showInput: false,
                editName: '新建目录',
                fileList: [],
                children: []
            };
            if (!data.children) {
                this.$set(data, "children", []);
            }
            data.children.push(newChild);
        },
        //删除子目录
        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        //删除文件
        removeFile(file, fileList) {
            console.log('删除文件', file, fileList)
            let index = fileList.findIndex(item => item.uid == file.uid)
            fileList.splice(index, 1)
        },
        //下载列表
        selectDownloadList(v) {
            this.downloadList = v
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
        // 天气类型多选变化
        onTypeChange(typeCheckedList) {
            // this.indeterminateType = !!typeCheckedList.length && (typeCheckedList.length < weatherTypeOptions.length)
            this.isCheckAllType = typeCheckedList.length === weatherTypeOptions.length
        },
        // 天气类型全选
        onCheckAllChange(e) {
            Object.assign(this, {
                typeCheckedList: e.target.checked ? weatherTypeOptions.map(item => item.value) : [],
                isCheckAllType: e.target.checked
            })
        },
        //点击存档
        onSave() {
            this.saveData.deathToll *= 1
            this.saveData.injuryToll *= 1
            this.saveData.disappearToll *= 1
            this.saveData.lose *= 1
            this.saveData.uploadTree = JSON.stringify(this.tree)
            for (let key in this.saveData) {
                if (key != 'name') {
                    if (this.saveData[key] == null) {
                        console.log(key, this.saveData[key])
                        this.$message.warning('请将信息录入完整')
                        return
                    }
                }
            }
            this.loading = true
            //修改
            if (this.$route.params.data) {
                axios
                    .post(
                        '/stweather/proxy/172.22.68.119:8667/history/update',
                        this.saveData
                    )
                    .then(res => {
                        this.loading = false
                        if (res.data.status == 0) {
                            //保存成功
                            this.$message.success('保存成功')
                            setTimeout(() => {
                                if (this.$route.params.pass) {
                                    this.$router.push({
                                        name: "CaseAudit",
                                        params: {
                                            data: 'pass'
                                        }
                                    })
                                } else if (this.$route.params.unPass) {
                                    this.$router.push({
                                        name: "CaseAudit",
                                        params: {
                                            data: 'unPass'
                                        }
                                    })
                                } else {
                                    this.$router.push('/caseAudit')
                                }
                            }, 1000)
                        } else {
                            this.$message.error('保存失败')
                        }
                    })
                    .catch(err => {
                        this.loading = false
                        this.$message.error('保存失败')
                    })
            } else {
                // 存入
                axios
                    .post(
                        '/stweather/proxy/172.22.68.119:8667/history/save',
                        this.saveData
                    )
                    .then(res => {
                        this.loading = false
                        if (res.data.status == 0) {
                            //保存成功
                            this.$message.success('保存成功')
                            setTimeout(() => {
                                this.$router.push('/caseAudit')
                            }, 1000)
                        } else {
                            this.$message.error('保存失败')
                        }
                    })
                    .catch(err => {
                        this.loading = false
                        this.$message.error('保存失败')
                    })
            }
        },
        // 审核
        onAudit(state) {
            const {
                auditorName,
                auditMind
            } = this
            if (state == 0) {
                //点击通过
                if (!auditorName) {
                    this.$message.warning('请将信息填写完整')
                    return
                }
            } else {
                //点击退回
                if ((!auditorName) || (!auditMind)) {
                    this.$message.warning('请将信息填写完整')
                    return
                }
            }
            axios
                .post('/stweather/proxy/172.22.68.119:8667/history/toExamine', {
                    id: this.$route.params.data.id,
                    state,
                    auditorName,
                    auditMind
                })
                .then(res => {
                    if (res.data.status == 0) {
                        if (state == 0) {
                            this.$message.success('审核操作完成')
                        } else {
                            this.$message.success('个例已成功退回')
                        }
                        setTimeout(() => {
                            this.$router.push('/caseAudit')
                        }, 1000)
                    }
                })
                .catch(err => {
                    this.$message.error('操作失败')
                })
        }
    }
}