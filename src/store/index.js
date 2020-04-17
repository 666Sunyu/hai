import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        exampleId: '',
        userInfo: null,
        examTime: null,
        timeout: false,
        exam2IsEnd: false,
        exam3IsEnd: false,

        //个例
        startTime: '',
        endTime: '',
        weatherKind: '',
        weatherSystem: '',
        adminInfo: null,
        isShowAdmModal: false,
    },
    getters: {
        isEnd({
            exam2IsEnd,
            exam3IsEnd
        }) {
            console.log('getters', exam2IsEnd && exam3IsEnd)
            return exam2IsEnd && exam3IsEnd
        }
    },
    mutations: {
        changeExampleId(state, data) {
            state.exampleId = data
            console.log('exampleId', state.exampleId)
        },
        //考试用户
        changeUserInfo(state, data) {
            state.userInfo = data
            console.log('userInfo', state.userInfo)
        },
        // 个例用户
        changeAdminInfo(state, data) {
            state.adminInfo = data
            console.log('adminInfo', state.adminInfo)
        },
        changeAdminModal(state, data) {
            console.log('isShowAdmModal', state.isShowAdmModal)
            state.isShowAdmModal = data
        },
        changeSleInfo(state, data) {
            const {
                startTime,
                endTime,
                weatherKind,
                weatherSystem
            } = data
            state.startTime = startTime
            state.endTime = endTime
            state.weatherKind = weatherKind
            state.weatherSystem = weatherSystem
        },
        changeExamTimeRemain(state, data) {
            console.log('获取考试剩余时间', data)
            // state.examTime[data.type] = data.value
            state.examTime = data.value
        },
        changeTimeout(state, data) {
            console.log('timeout', data)
            state.timeout = data
        },
        saveExam2IsEnd(state, data) {
            state.exam2IsEnd = data
        },
        saveExam3IsEnd(state, data) {
            state.exam3IsEnd = data
        }
    },
    actions: {}
})