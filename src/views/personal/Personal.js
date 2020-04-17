const steps = [{
    title: 'LV1'
}, {
    title: 'LV2'
}, {
    title: 'LV3'
}, {
    title: 'LV4'
}, {
    title: 'LV5'
}, {
    title: 'LV6'
}, {
    title: 'LV7'
}, ]
const columns = [{
        title: '考试时间',
        dataIndex: 'date',
        key: 'date',
        align: 'center',

    },
    {
        title: '考试成绩',
        dataIndex: 'score',
        key: 'score',
        align: 'center',
    },
    {
        title: '获得积分',
        dataIndex: 'accum',
        key: 'accum',
        align: 'center',
    },

];
const tableData = []
export default {
    components: {},
    data() {
        return {
            steps,
            columns,
            tableData
        };
    },
    computed: {},
    watch: {},
    created() {
        for (var i = 0; i < 20; i++) {
            this.tableData.push({
                key: i + 1,
                date: 20190810,
                score: 80,
                accum: 8,

            })
        }
    },
    mounted() {

    },
    methods: {

    },
}