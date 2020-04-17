import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            formItemLayout: {
                labelCol: {
                    span: 8
                },
                wrapperCol: {
                    span: 8
                }
            },
            loading_reg: false,
            form: {
                userName: '',
                password: '',
                checkPass: '',
                trueName: '',
                local: '',
                phone: '',
                code: '',
                email: '',
            },
            rules: {
                userName: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                },
                    // {
                    //     min: 3,
                    //     max: 5,
                    //     message: 'Length should be 3 to 5',
                    //     trigger: 'blur'
                    // },
                ],
                password: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请输入密码'));
                        } else {
                            //检查checkPass
                            if (this.form.checkPass !== '') {
                                this.$refs.ruleForm.validateField('checkPass');
                            }
                            callback();
                        }
                    },
                    trigger: 'change',

                }],
                checkPass: [{
                    required: true,
                    validator: (rule, value, callback) => {
                        if (value === '') {
                            callback(new Error('请再次输入密码'));
                        } else if (value !== this.form.password) {
                            callback(new Error("两次密码输入结果不同"));
                        } else {
                            callback();
                        }
                    },
                    trigger: 'change'
                }],
                trueName: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur',
                }, {
                    min: 2,
                    pattern: new RegExp(/[\u4e00-\u9fa5]/),
                    message: '请输入正确的姓名',
                }],
                local: [{
                    required: true,
                    trigger: 'change',
                    message: '请选择所在市(县)气象局',
                },],
                phone: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    required: false,
                    pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/),
                    message: '请保证输入正确格式手机号'
                }],
                code: [{
                    required: true,
                    message: '请填写短信验证码',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱账号',
                    trigger: 'blur'
                }],
                userclass: [{
                    required: true,
                    message: '请选择类别',
                    trigger: 'blur'
                }]

            },
            codeLoading: false,
            codeTime: 0
        };
    },
    components: {},


    mounted() {},
    watch: {},
    methods: {
        //发送短信验证
        sendCode() {
            this.codeLoading = true
            this.codeTime = 60
            this.$message.success('请注意查收验证码')
            let interval = setInterval(() => {
                this.codeTime--
                if (this.codeTime <= 0) {
                    this.codeLoading = false
                    clearInterval(interval)
                }
            }, 1000)

        },
        //注册
        handleRegister() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    console.log(valid, this.form)
                    // 测试
                    setTimeout(() => {
                        this.loading_reg = false;
                        this.$message.success('注册成功')
                        this.isShowLogin = true
                    }, 600)
                } else {
                    return false;
                }
            });

        }
    }
};