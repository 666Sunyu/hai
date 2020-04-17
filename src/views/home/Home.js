import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN.js';
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    name: "Home",
    data() {
        return {
            locale: zhCN,
            menus: [{
                    name: '个例',
                    path: '/caseSearch',
                    id: 'synthesis'
                },
                {
                    name: '随机生成考题',
                    path: '/exam',
                    query: '',
                    id: 'examination'
                },
                // {
                //     name: '自动站信息',
                //     path: '/autoStation',
                //     id: 'autoStation'
                // },
                {
                    name: '统计查询',
                    path: '/statistical',
                    query: '',
                    id: 'statistical'
                },

            ],
            isLogin: false,
            isAdmin: false,
        }
    },
    components: {},
    computed: {
        ...mapState(['userInfo', 'adminInfo'])
    },
    created() {},
    mounted() {},
    watch: {
        userInfo: {
            handler(info, old) {
                this.isLogin = info ? true : false
            },
            immediate: true
        },
        adminInfo: {
            handler(info, old) {
                this.isAdmin = info ? true : false
            },
            immediate: true
        },

    },
    methods: {
        ...mapMutations(['changeAdminModal', 'changeAdminInfo', 'changeUserInfo']),
        // 考试用户退出
        onExit() {
            let that = this
            this.$confirm({
                title: '确定退出登录么?',
                cancelText: '取消',
                okText: '退出',
                onOk() {
                    sessionStorage.removeItem('userInfo')
                    that.changeUserInfo(null)
                    that.$router.replace('/login')
                },
                onCancel() {},
            });

        },
        //管理员退出
        signOut() {
            let that = this
            this.$confirm({
                title: '确定退出登录么?',
                cancelText: '取消',
                okText: '退出',
                onOk() {
                    sessionStorage.removeItem('adminInfo')
                    that.changeAdminInfo(null)
                },
                onCancel() {},
            });
        },
    },
};