import HeadTime from './components/headTime/HeadTime.vue'
import {
    mapState
} from 'vuex'
export default {
    name: "Examination",
    data() {
        return {

        }
    },
    components: {
        HeadTime,
    },
    mounted() {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', function () {
            history.pushState(null, null, document.URL);
        });
    },
    watch: {

    },
    computed: {},
    methods: {

    },
};