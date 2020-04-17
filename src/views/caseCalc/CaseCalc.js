import axios from 'axios'
import moment from 'moment'
const typeFilt = [{
        text: '雷电',
        value: '雷电'
    },
    {
        text: '暴雨',
        value: '暴雨'
    },
    {
        text: '雷暴大风',
        value: '雷暴大风'
    },
    {
        text: '短时强降水',
        value: '短时强降水'
    },
    {
        text: '台风',
        value: '台风'
    },
    {
        text: '龙卷',
        value: '龙卷'
    },
    {
        text: '高温',
        value: '高温'
    },
    {
        text: '冰雹',
        value: '冰雹'
    },
    {
        text: '干旱',
        value: '干旱'
    },
    {
        text: '寒冷',
        value: '寒冷'
    },
    {
        text: '成片大雾',
        value: '成片大雾'
    },
    {
        text: '局地大雾',
        value: '局地大雾'
    },
    {
        text: '非台暴雨',
        value: '非台暴雨'
    }
]
const occurredFilt = [{
        text: '全省',
        value: '全省'
    },
    {
        text: '海口',
        value: '海口'
    },
    {
        text: '三亚',
        value: '三亚'
    },
    {
        text: '三沙',
        value: '三沙'
    },
    {
        text: '儋州',
        value: '儋州'
    },
    {
        text: '琼海',
        value: '琼海'
    },
    {
        text: '万宁',
        value: '万宁'
    },
    {
        text: '东方',
        value: '东方'
    },
    {
        text: '澄迈',
        value: '澄迈'
    },
    {
        text: '临高',
        value: '临高'
    },
    {
        text: '白沙',
        value: '白沙'
    },
    {
        text: '昌江',
        value: '昌江'
    },
    {
        text: '屯昌',
        value: '屯昌'
    },
    {
        text: '定安',
        value: '定安'
    },
    {
        text: '文昌',
        value: '文昌'
    },
    {
        text: '陵水',
        value: '陵水'
    },
    {
        text: '乐东',
        value: '乐东'
    },
    {
        text: '保亭',
        value: '保亭'
    },
    {
        text: '琼中',
        value: '琼中'
    },
    {
        text: '五指山',
        value: '五指山'
    }
]
const columns = [{
        title: '序号',
        dataIndex: 'number',
        align: 'center'
    },
    {
        title: '类型',
        dataIndex: 'type',
        filters: typeFilt,
        onFilter: (value, record) => record.type.indexOf(value) === 0,
        align: 'center'
    },
    {
        title: '开始时间',
        dataIndex: 'startTime2',
        align: 'center'
    },
    {
        title: '结束时间',
        dataIndex: 'endTime2',
        align: 'center'
    },
    {
        title: '发生地',
        dataIndex: 'occurred',
        filters: occurredFilt,
        onFilter: (value, record) => record.occurred.indexOf(value) === 0,
        align: 'center'
    },
    {
        title: '消息来源',
        dataIndex: 'source',
        align: 'center'
    },
    {
        title: '创建时间',
        dataIndex: 'creationTime',
        align: 'center'
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
export default {
    data() {
        return {
            //标签选中项（未审核）
            listType: 'unCheck',
            columns,
            tableData: [],
            // 表格loading
            isLoading: false,
            total: null,
            //分页属性
            pagination: {
                pageSize: 10
            },
            //默认展示未审核列表
            searchData: {
                state: 3,
                time: '',
                occurred: '',
                type: '1,2,3,4,5,6,7,8,9,10,11,12,13',
                page: 1,
                size: 1000
            },
            selectedRows: [],
            //弹窗
            beTiem: [moment(), moment()],
            loading: false,
            plainOptionsHappen,
            happenCheckedList: [],
            isCheckAllHappen: false,
            happenArea: '',
            weatherOptions,
            saveData: {
                state: 0,
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
            showModal: false,
            //---------------------------
            beginDate: moment(),
            endDate: moment(),
            //天气类型/系统全选
            weatherTypeOptions,
            typeCheckedList: [],
            isCheckAllType: false,
            indeterminateType: false,
            showUpload: false,
            tree,
            uploadItem: {},
        }
    },
    created() {
        this.onSearchGeli()
    },
    computed: {
        rowSelection() {
            const {
                selectedRowKeys
            } = this;
            return {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    this.selectedRows = selectedRows
                },

            };
        },
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
        changeDate() {}
    },
    methods: {

        onSearchGeli() {
            const CancelToken = axios.CancelToken
            if (this.typeToken) {
                this.typeToken()
                this.typeToken = null
            }
            this.isLoading = true
            axios
                .post(
                    '/stweather/proxy/172.22.68.119:8667/history/queryPage',
                    this.searchData, {
                        cancelToken: new CancelToken(c => {
                            this.typeToken = c
                        })
                    }
                )
                .then(res => {
                    this.isLoading = false
                    if (res.data.status == 0) {
                        let result = res.data.data
                        this.result = result
                        this.tableData = result.object
                        this.tableData.map((item, index) => {
                            let type = item.type.split(',').map(type => this.turnType(+type)).join(',')
                            item.type = type
                            item.startTime2 = moment(item.startTime, 'YYYYMMDDHHmmss').format(
                                'YYYY年MM月DD日 HH时'
                            )
                            item.endTime2 = moment(item.endTime, 'YYYYMMDDHHmmss').format(
                                'YYYY年MM月DD日 HH时'
                            )
                            item.key = index
                            item.number = index + 1
                        })
                    }
                })
                .catch(err => {
                    this.isLoading = false
                })
        },
        turnType(num) {
            let type = ''
            switch (num) {
                case 1:
                    type = '雷电'
                    break
                case 2:
                    type = '暴雨'
                    break
                case 3:
                    type = '雷暴大风'
                    break
                case 4:
                    type = '短时强降水'
                    break
                case 5:
                    type = '台风'
                    break
                case 6:
                    type = '龙卷'
                    break
                case 7:
                    type = '高温'
                    break
                case 8:
                    type = '冰雹'
                    break
                case 9:
                    type = '干旱'
                    break
                case 10:
                    type = '寒冷'
                    break
                case 11:
                    type = '成片大雾'
                    break
                case 12:
                    type = '局地大雾'
                    break
                case 13:
                    type = '非台暴雨'
                    break
                case 14:
                    type = '强对流'
                    break
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
        turnNum(name) {
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
        // 天气类型多选变化
        onTypeChange(typeCheckedList) {
            this.isCheckAllType = typeCheckedList.length === weatherTypeOptions.length
        },
        // 天气类型全选
        onCheckAllChange(e) {
            Object.assign(this, {
                typeCheckedList: e.target.checked ? weatherTypeOptions.map(item => item.value) : [],
                isCheckAllType: e.target.checked
            })
        },

        //审核
        onAudit(text, record) {
            this.$router.push({
                name: 'CaseSave',
                params: {
                    data: record,
                    isAudit: true
                }
            })
        },
        //修改
        onModific(text, record) {
            this.$router.push({
                name: 'CaseSave',
                params: {
                    data: record
                }
            })
        },
        //删除
        onDelete(text, record) {
            this.$confirm({
                content: "确定删除此项个例?",
                okText: "删除",
                cancelText: "取消",
                onOk: () => {
                    axios
                        .get(
                            `/stweather/proxy/172.22.68.119:8667/history/deleteById?id=${record.id}`
                        )
                        .then(res => {
                            if (res.data.status == 0) {
                                let index = this.tableData.findIndex(res => res.id === record.id)
                                this.tableData.splice(index, 1)
                                this.tableData.forEach((item, index) => {
                                    item.number = index + 1
                                })
                                this.$message.success("个例删除成功");
                            }
                        })
                        .catch(err => {
                            this.$message.error("个例删除失败");
                        });
                }
            });
        },
        //合并
        onMerge() {
            this.showModal = true
            let startTimes = this.selectedRows.map(item => item.startTime * 1)
            let endTimes = this.selectedRows.map(item => item.endTime * 1)
            console.log('this.selectedRows', this.selectedRows)
            const minTime = Math.min(...startTimes)
            const maxTime = Math.max(...endTimes)
            this.beginDate = moment(minTime, 'YYYYMMDDHHmmss')
            this.endDate = moment(maxTime, 'YYYYMMDDHHmmss')
            this.beTiem[0] = moment(minTime, 'HHmmss')
            this.beTiem[1] = moment(maxTime, 'HHmmss')
            //id
            let ids = new Set()
            //发生地
            let occurreds = new Set()
            //天气类型
            let types = new Set()
            //消息来源
            let source = ''
            //deathToll injuryToll disappearToll
            let deathToll = 0
            let injuryToll = 0
            let disappearToll = 0
            let lose = 0
            //上传列表
            let uploadTrees = []

            //这里不将灾情详情、录入人写进来，这些操作在个例修改 提交审核的时候进行
            this.selectedRows.forEach(item => {
                ids.add(item.id)
                occurreds.add(item.occurred)
                types.add(this.turnNum(item.type))
                source = item.source
                deathToll += item.deathToll
                injuryToll += item.injuryToll
                disappearToll += item.disappearToll
                lose += item.lose
                uploadTrees.push(item.uploadTree)
            })
            // console.log(uploadTrees)
            this.happenCheckedList = [...occurreds]
            this.typeCheckedList = [...types]
            //id
            this.saveData.mergeId = [...ids].join(',')
            //发生地
            this.saveData.occurred = [...occurreds].join(',')
            // 天气类型
            this.saveData.type = [...types].join(',')
            //消息来源
            this.saveData.source = source
            //死亡 受伤 失踪人数 经济损失
            this.saveData.deathToll = deathToll
            this.saveData.injuryToll = injuryToll
            this.saveData.disappearToll = disappearToll
            this.saveData.lose = lose
            //上传列表
            this.saveData.uploadTree = JSON.stringify(this.tree)

            console.log(this.saveData)
        },
        //合并确定
        onSave() {
            axios.post('/stweather/proxy/172.22.68.119:8667/history/merge',
                this.saveData).then(res => {
                if (res.data.status == 0) {
                    this.$message.success('合并成功')
                    this.showModal = false
                    this.onSearchGeli()
                } else {
                    this.$message.error('合并失败,请稍后再试')
                }
            }).catch(err => {
                this.$message.error('合并失败,请稍后再试')
            })
        },
        change(a, b, c) {
            console.log(a, b, c)
        },
        //上传
        //显示文件上传功能
        handelShowUpload() {
            this.showUpload = true
            const nod = document.querySelectorAll(".el-tree-node__content");
            const apd = document.querySelectorAll(".apd");
        },
        //点击上传按钮
        handleChange(info) {
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
                // this.saveData.filePath = files.join(',')

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
    }
}