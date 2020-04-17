import axios from 'axios'
import {
    mapState,
    mapMutations
} from 'vuex'
var sleData = [{
        value: '1',
        name: '精细化要素预报',
        pathName: 'ExamQuestion1',
        path: '/examination/examQuestion1'
    }, {
        value: '2',
        name: '强对流天气',
        pathName: 'ExamQuestion2',
        path: '/examination/examQuestion2'
    },
    //  {
    //     value: '3',
    //     name: '强对流天气',
    //     pathName: 'ExamQuestion3',
    //     path: '/examination/examQuestion3'
    // },
    {
        value: '4',
        name: '灾害性天气预报个例',
        pathName: 'ExamQuestion4',
        path: '/examination/examQuestion4'
    },
]
export default {
    data() {
        return {
            sleData,
            routePath: '/examination/examQuestion1',
            // 默认选项
            examType: '1',
            pathName: 'ExamQuestion1',
            result: {},
            loading: false,
        }
    },
    components: {},
    computed: {
        ...mapState(['userInfo', 'exampleId'])
    },
    created() {

    },
    mounted() {},
    watch: {

    },
    methods: {
        ...mapMutations(['changeExamTimeRemain',
            "saveExam2IsEnd",
            "saveExam3IsEnd"
        ]),
        sleChange(sle) {
            this.pathName = this.sleData.find(item => item.value === sle).pathName
            this.examType = this.sleData.find(item => item.value === sle).value
        },
        onConfirm() {
            this.loading = true;
            //获取当前时间 考试剩余时间
            const params = {
                userId: this.userInfo.userId,
                exampleId: this.exampleId,
                type: 1,
                ltemType: 'type' + this.examType
            }
            //重置第二种题型默认都没有做
            this.saveExam2IsEnd(false);
            this.saveExam3IsEnd(false);
            //获取考试剩余时间
            axios.get(`/stweather/proxy/172.22.68.119:8667/api/examTime?type=${this.examType}`)
                .then(res => {
                    if (res.data.status == 0) {
                        this.loading = false;
                        const result = res.data.data
                        //保存
                        const saveData = {
                            value: result,
                            type: 'type' + this.examType //type类型,现在暂不使用该属性
                        }
                        this.changeExamTimeRemain(saveData)
                        console.log(this.pathName)
                        this.$router.replace({
                            name: this.pathName,
                        })
                    }
                })
            // axios.post('/stweather/proxy/172.22.68.119:8667/api/ltemQuery', params)
            //     .then(res => {
            //         this.loading = false
            //         if (res.data.status == 0) {
            //             if (Object.keys(res.data.data).length) {
            //                 //获取考试剩余时间
            //                 axios.get(`/stweather/proxy/172.22.68.119:8667/api/examTime?type=${this.examType}`)
            //                     .then(res => {
            //                         if (res.data.status == 0) {
            //                             const result = res.data.data
            //                             //保存
            //                             const saveData = {
            //                                 value: result,
            //                                 type: 'type' + this.examType
            //                             }
            //                             this.changeExamTimeRemain(saveData)
            //                             this.$router.replace({
            //                                 name: this.pathName,
            //                                 params: {
            //                                     time: result
            //                                 }
            //                             })
            //                         }
            //                     })
            //             }
            //         } else if (res.data.status == 888) {
            //             this.$message.warning('当前登陆信息已过期,请重新登录')
            //             setTimeout(() => {
            //                 this.$router.replace({
            //                     name: 'Login'
            //                 })
            //             }, 500)
            //         }
            //     })
            //     .catch(err => {
            //         this.loading = false
            //     })

        },
    },
};