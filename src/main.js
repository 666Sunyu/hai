import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import {
    Button,
    Icon,
    Tree,
    Input,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Table,
    TableColumn,
    Form,
    FormItem,
    RadioGroup,
    Radio,
    Select,
    Option,
    Pagination

} from "element-ui";
import 'ant-design-vue/dist/antd.css';
import "element-ui/lib/theme-chalk/index.css";
import Popconfirm from "element-ui/packages/popconfirm/src/main.vue";
Vue.component(Popconfirm.name, Popconfirm);
// Vue.component(Button.name, Button);
// Vue.component(Tree.name, Tree);
// Vue.component(Tree.name, Tree);
import {
    FormModel
} from 'ant-design-vue';
Vue.use(FormModel);

Vue.use(Antd);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Pagination);
Vue.use(Icon);
Vue.use(Tree);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Select);
Vue.use(Option);



Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//     if (to.meta.needLogin) {
//         if (store._vm._data.$$state.userInfo) {
//             next()
//         } else {
//             next('/login')
//         }
//     } else {
//         next()
//     }

// })

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')