import Vue from 'vue'
import Router from "vue-router";

import {
    Home,
    CaseSearch,
    CaseSave,
    CaseView,
    CaseCalc,
    CaseAudit,
    Examination,
    AutoStation,
    Statistical,
    ExamCase,
    ExamSle,
    ExamQuestion1,
    ExamQuestion2,
    ExamQuestion3,
    ExamQuestion4,
    ExamResult,
    Login,
    Register,
    OrderList,
    Personal

} from './views'


Vue.use(Router)

export default new Router({

    // mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/caseSearch',
        children: [{
            path: "/caseSearch",
            name: "CaseSearch",
            component: CaseSearch, //个例查询,
            meta: {
                keepAlive: false
            }
        }, {
            path: "/caseSave",
            name: "CaseSave",
            component: CaseSave, //个例存档
            meta: {
                needCaseAdm: true,
            }
        }, {
            path: "/caseView",
            name: "CaseView",
            component: CaseView
        }, {
            path: "/caseAudit",
            name: "CaseAudit",
            component: CaseAudit, //个例审核
            meta: {
                needCaseAdm: true,
            }
        }, {
            path: "/caseCalc",
            name: "CaseCalc",
            component: CaseCalc, //个例计算
            meta: {
                keepAlive: false,
                needCaseAdm: true,
            }
        }, {
            path: "/login",
            name: "Login",
            component: Login //登陆
        }, {
            path: "/register",
            name: "Register",
            component: Register //注册
        }, {
            path: "/examination",
            name: "Examination",
            component: Examination, //随机生成考题
            redirect: '/examination/examCase',
            children: [{
                path: "/examination/examCase",
                name: "ExamCase",
                component: ExamCase,
                meta: {
                    needTime: false,
                    needLogin: true,
                }
            }, {
                path: "/examination/examSle",//考试题类型
                name: "ExamSle",
                component: ExamSle,
                meta: {
                    needTime: false,
                    needLogin: true,
                }
            }, {
                path: "/examination/examQuestion1",//判卷
                name: "ExamQuestion1",
                component: ExamQuestion1,
                meta: {
                    needTime: true,
                    needLogin: true,
                }
            },
            {
                path: "/examination/examQuestion2",
                name: "ExamQuestion2",
                component: ExamQuestion2,
                meta: {
                    needTime: true,
                    needLogin: true,
                }
            }, {
                path: "/examination/examQuestion3",
                name: "ExamQuestion3",
                component: ExamQuestion3,
                meta: {
                    needTime: true,
                    needLogin: true,
                }

            }, {
                path: "/examination/examQuestion4",
                name: "ExamQuestion4",
                component: ExamQuestion4,
                meta: {
                    needTime: true,
                    needLogin: true,
                }
            }, {
                path: "/examination/examResult/:id",
                name: "ExamResult",
                component: ExamResult,
                meta: {
                    needTime: false,
                    needLogin: true,
                }
            }
            ]
        }, {
            path: "/autoStation",
            name: "AutoStation",
            component: AutoStation //自动站信息
        }, {
            path: "/statistical",
            name: "Statistical",
            component: Statistical //统计查询
        }, {
            path: "/orderList",
            name: "OrderList",
            component: OrderList //考试首页
        }, {
            path: "/personal",
            name: "Personal",
            component: Personal //考试用户中心                
        },
        //考试首页
        {
            path: '/exam',
            name: 'exam',
            component: () => import('@/views/exam/exam.vue')
        },
        //考试注册
        {
            path: '/examregister',
            name: 'Examregister',
            component: () => import('@/views/examregister/examregister.vue')
        },
        //注册
        { path: '/examlogin', name: 'examLogin', component: () => import('@/views/examlogin') },
        //考试试题列表
        { path: '/examquestion', name: 'examQuestion', component: () => import('@/views/examquestion') },
        // 考试阅卷
        { path: '/exampages', name: 'examPages', component: () => import('@/views/exampages')}
        ]
    },

    ]
})