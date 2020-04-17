import Result1 from './components/result1/Result1.vue'
import Result2 from './components/result2/Result2.vue'
import Result3 from './components/result3/Result3.vue'
import Result4 from './components/result4/Result4.vue'
import {
    mapGetters
} from 'vuex'
export default {
    data() {
        return {
            currComponent: null,
        }
    },
    components: {
        Result1,
        Result2,
        Result3,
        Result4
    },
    created() {
        this.currComponent = 'Result' + this.$route.params.id
    },
    computed: {
        ...mapGetters(['isEnd'])
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        onNext() {
            this.$router.replace(`/examination/examQuestion3`)
        },
        onPrev() {
            this.$router.replace(`/examination/examQuestion2`)
        },

    },
};