import Home from './home/Home.vue'
//个例
import CaseSave from './caseSave/CaseSave.vue'
import CaseSearch from './caseSearch/CaseSearch.vue'
import CaseView from './caseView/CaseView.vue'
import CaseAudit from './caseAudit/CaseAudit.vue'
import CaseCalc from './caseCalc/CaseCalc.vue'
import AutoStation from './autoStation/AutoStation.vue'
import Statistical from './statistical/Statistical.vue'


// 考试
import Adm from './examination/components/adm/Adm.vue'
import Examination from './examination/Examination.vue'
import ExamCase from './examination/components/examCase/ExamCase.vue'
import ExamSle from './examination/components/examSle/ExamSle.vue'
import ExamQuestion1 from './examination/components/examQuestion1/ExamQuestion1.vue'
import ExamQuestion2 from './examination/components/examQuestion2/ExamQuestion2.vue'
import ExamQuestion3 from './examination/components/examQuestion3/ExamQuestion3.vue'
import ExamQuestion4 from './examination/components/examQuestion4/ExamQuestion4.vue'
import ExamResult from './examination/components/examResult/ExamResult.vue'
//登录注册
import Login from './login/Login.vue'
import Register from './register/Register.vue'
//考试首页
import OrderList from './orderList/OrderList.vue'
// 考试用户中心
import Personal from './personal/Personal.vue'

export {
    Home,
    CaseSave,
    CaseSearch, //个例查询
    CaseView,
    CaseAudit, //个例审核
    CaseCalc, //个例计算
    Examination, //随机生成考题
    AutoStation, //自动站信息
    Statistical, //统计查询
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
}