const area = [
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
const columns = [{
        title: '排名',
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        scopedSlots: {
            customRender: 'numbers'
        },

    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
    },
    {
        title: '积分总数',
        dataIndex: 'score',
        key: 'score',
        align: 'center',
        scopedSlots: {
            customRender: 'scores'
        },
    },
    {
        title: '级别',
        key: 'level',
        dataIndex: 'level',
        align: 'center',
        scopedSlots: {
            customRender: 'levels'
        },

    },
    {
        title: '今年第一次考试时间',
        key: 'firstTime',
        dataIndex: 'firstTime',
        align: 'center',
        scopedSlots: {
            customRender: 'firstTimes'
        },

    }, {
        title: '最近一次考试时间',
        key: 'latestTime',
        dataIndex: 'latestTime',
        align: 'center',
        scopedSlots: {
            customRender: 'latestTimes'
        },

    }, {
        title: '所在区县',
        key: 'county',
        dataIndex: 'county',
        align: 'center',
        filters: area.map(item => {
            return {
                text: item,
                value: item
            }
        }),
        onFilter: (value, record) => {
            return record.county.indexOf(value) === 0
        },

    }, {
        title: '所在区县排名',
        key: 'rank',
        dataIndex: 'rank',
        align: 'center',

    },
];

const tableData = [];
export default {
    components: {},
    data() {
        return {
            columns,
            tableData,
            area
        };
    },
    computed: {},
    watch: {},
    created() {
        for (var i = 0; i < 20; i++) {
            this.tableData.push({
                key: i + 1,
                number: i + 1,
                name: 'John Brown' + (i + 1),
                score: 1600,
                level: 'LV5',
                firstTime: '20190101',
                latestTime: '20190801',
                county: '海口',
                rank: '1'
            })
        }
    },
    mounted() {

    },
    methods: {
        customRow(record) {
            return {
                on: { // 事件
                    click: (event) => {
                        console.log(record)
                    },
                    dblclick: (event) => {},
                    contextmenu: (event) => {
                        console.log(event)
                    },
                },
            }
        },
        setName(record, index) {
            if (record.number <= 10) {
                return 'light'
            }
        }
    },
}