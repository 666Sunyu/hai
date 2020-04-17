import axios from "axios";
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    name: "Login",
    data() {
        return {
            formItemLayout: {
                labelCol: {
                    span: 5
                },
                wrapperCol: {
                    span: 19
                }
            },
            loading: false,
        };
    },
    components: {},
    computed: {
        ...mapState(['userInfo'])
    },
    beforeCreate() {
        this.form = this.$form.createForm(this);
    },
    mounted() {},
    watch: {},
    methods: {
        ...mapMutations(['changeUserInfo']),

        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.loading = true;
                    console.log("Received values of form: ", values);
                    const {
                        userName,
                        password
                    } = values;
                    axios
                        .post("/stweather/proxy/172.22.68.119:8667/api/login", {
                            logName: userName,
                            pwd: password
                        })
                        .then(res => {
                            if (res.data.status == 0) {
                                const result = res.data.data;
                                const {
                                    company,
                                    name,
                                    number,
                                    id
                                } = result;
                                const params = {
                                    company, //考生单位
                                    name, //姓名
                                    number, //准考证号
                                    userId: id
                                };
                                this.changeUserInfo(params)
                                sessionStorage.setItem("userInfo", params);
                                this.$router.push({
                                    name: "ExamCase",
                                });
                                history.pushState(null, null, document.URL);
                                window.addEventListener('popstate', function () {
                                    history.pushState(null, null, document.URL);
                                });
                            } else {
                                this.$message.error('用户名或密码错误');
                            }
                            this.loading = false;
                        })
                        .catch(err => {
                            this.$message.warning('当前暂无法登陆,请您稍后再试');
                            this.loading = false;
                        })
                }
            });
            //   this.$router.push({
            //     name: "ExamSle"
            //   });
        }
    }
};