import axios from 'axios'
import moment from 'moment'
const typeFilt = [{
    text: '雷电',
    value: '雷电',
}, {
    text: '暴雨',
    value: '暴雨',
}, {
    text: '雷暴大风',
    value: '雷暴大风',
}, {
    text: '短时强降水',
    value: '短时强降水',
}, {
    text: '台风',
    value: '台风',
}, {
    text: '龙卷',
    value: '龙卷',
}, {
    text: '高温',
    value: '高温',
}, {
    text: '冰雹',
    value: '冰雹',
}, {
    text: '干旱',
    value: '干旱',
}, {
    text: '寒冷',
    value: '寒冷',
}, {
    text: '成片大雾',
    value: '成片大雾',
}, {
    text: '局地大雾',
    value: '局地大雾',
}, {
    text: '非台暴雨',
    value: '非台暴雨',
}]
const occurredFilt = [{
    text: '全省',
    value: '全省',
}, {
    text: '海口',
    value: '海口',
}, {
    text: '三亚',
    value: '三亚',
}, {
    text: '三沙',
    value: '三沙',
}, {
    text: '儋州',
    value: '儋州',
}, {
    text: '琼海',
    value: '琼海',
}, {
    text: '万宁',
    value: '万宁',
}, {
    text: '东方',
    value: '东方',
}, {
    text: '澄迈',
    value: '澄迈',
}, {
    text: '临高',
    value: '临高',
}, {
    text: '白沙',
    value: '白沙',
}, {
    text: '昌江',
    value: '昌江',
}, {
    text: '屯昌',
    value: '屯昌',
}, {
    text: '定安',
    value: '定安',
}, {
    text: '文昌',
    value: '文昌',
}, {
    text: '陵水',
    value: '陵水',
}, {
    text: '乐东',
    value: '乐东',
}, {
    text: '保亭',
    value: '保亭',
}, {
    text: '琼中',
    value: '琼中',
}, {
    text: '五指山',
    value: '五指山',
}, ]
const columns = [{
        title: '序号',
        dataIndex: 'number',
        align: 'center',
    },
    {
        title: '类型',
        dataIndex: 'type',
        // filters: typeFilt,
        // onFilter: (value, record) => record.type.indexOf(value) === 0,
        align: 'center',
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
    }, {
        title: '发生地',
        dataIndex: 'occurred',
        filters: occurredFilt,
        onFilter: (value, record) => record.occurred.indexOf(value) === 0,
        align: 'center',
    }, {
        title: '消息来源',
        dataIndex: 'source',
        align: 'center',
    }, {
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
        align: 'center',
    },
];


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
                pageSize: 10,
            },
            //默认展示未审核列表
            saveData: {
                state: 1,
                time: "",
                occurred: "",
                type: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18",
                page: 1,
                size: 1000
            },

        }
    },
    created() {
        this.onSearchGeli()
        if (this.$route.params.data) {
            if (this.$route.params.data === 'unCheck') {
                this.listType = 'unCheck'
                this.saveData.state = 1
            }
            if (this.$route.params.data === 'unPass') {
                this.listType = 'unPass'
                this.saveData.state = 2
            }
            if (this.$route.params.data === 'pass') {
                this.listType = 'pass'
                this.saveData.state = 0
            }
        }
    },
    watch: {
        listType(type) {
            console.log(type)
            switch (type) {
                case 'unCheck':
                    this.saveData.state = 1;
                    break;
                case 'unPass':
                    this.saveData.state = 2;
                    break;
                case 'pass':
                    this.saveData.state = 0;
                    break;
            }
            this.onSearchGeli()
        }
    },
    methods: {
        onSearchGeli() {
            const CancelToken = axios.CancelToken
            if (this.typeToken) {
                this.typeToken()
                this.typeToken = null
            }
            this.isLoading = true
            axios.post('/stweather/proxy/172.22.68.119:8667/history/queryPage', this.saveData, {
                    cancelToken: new CancelToken(c => {
                        this.typeToken = c
                    })
                })
                .then(res => {
                    this.isLoading = false
                    if (res.data.status == 0) {
                        let result = res.data.data
                        this.result = result
                        this.tableData = result.object
                        this.tableData.forEach((item, index) => {
                            let type = item.type.split(',').map(type => this.turnType(+type)).join(',')
                            item.type = type

                            item.startTime2 = moment(item.startTime, 'YYYYMMDDHHmmss').format('YYYY年MM月DD日 HH时')
                            item.endTime2 = moment(item.endTime, 'YYYYMMDDHHmmss').format('YYYY年MM月DD日 HH时')
                            item.key = index
                            item.number = index + 1
                        })
                        // console.log(this.tableData)

                    }
                }).catch(err => {
                    this.isLoading = false
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
        //审核
        onAudit(text, record) {
            console.log(text, record)
            this.$router.push({
                name: "CaseSave",
                params: {
                    data: record,
                    isAudit: true
                }
            })
        },
        //未通过修改
        onModific(text, record) {
            this.$router.push({
                name: "CaseSave",
                params: {
                    data: record,
                    unPass: true,
                }
            })
        },
        //已通过修改
        onModificPass(text, record) {
            this.$router.push({
                name: "CaseSave",
                params: {
                    data: record,
                    pass: true
                }
            })
        },
        //删除
        onDelete(text, record) {
            console.log(record)
            console.log(this.tableData)
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
        change(a, b, c) {
            console.log(a, b, c)
        }
    }
}