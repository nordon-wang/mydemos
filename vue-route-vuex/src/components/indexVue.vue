<template>
    <div>
        <!-- <p><button @click="add">add</button><button @click="reduce">reduce</button></p> -->
        <i class='icon iconfont icon-guanbi'></i>
        <i class='icon iconfont icon-set'></i>
        <p><button @click="add(11)">add</button><button @click="reduce(10)">reduce</button></p>
        <p><button @click="addActions">addActions</button><button @click="reduceActions">reduceActions</button></p>
        <h1>{{$store.state.count}} -- {{count}} -- {{allCount}}</h1>
        <h3 @click='gotoh'>多页面操作 调换router-view位置</h3> 
    </div>
</template>

<script>
    import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'

    export default{
        name:'index-vue',
        data(){
            return{
    
            };
        },
        // computed:mapState(['count','allCount']),
        computed:{
            ...mapState(['count','allCount']),
            ...mapGetters(['count'])
            // count(){
            //     return this.$store.getters.getCount;
            // }
        },    
        // methods:mapMutations(['add','reduce']),
        methods:{
            ...mapMutations(['add','reduce']),
            ...mapActions(['addActions','reduceActions']),
            gotoh(){
                this.$router.push('/m')
            },

        },
        // methods:{
        //     gotoh(){
        //         this.$router.push('/m')
        //     },
        //     add(){
        //         // this.$store.state.count++;
        //         this.$store.commit('add',3);
        //     },
        //     reduce(){
        //         // this.$store.state.count--;
        //         this.$store.commit('reduce',2);
        //     }
        // },
        mounted(){
            console.log('index vue mounted', this.$store.state);
        }
    }

    // 简化state
    // {{$store.state.count}} 写法精简 三种方法 都是直接写成 {{count}}
    // 1.使用计算属性 -- count(){return this.$store.state.count;}

    // 2. 使用mapState 目前是在那个组件中使用 在那个组件中使用
    //      2.1 import {mapState} from 'vuex' 先引入
    //      2.2  computed:mapState({count:state=>state.count})

    // 3. 和第二种只有一种区别 将mapState中的对象改为数组 直接将需要的使用的值放进去即可
    //   computed:mapState(['count']),

    // 简化 mutations
    // 1. methods:mapMutations(['add','reduce']) 但是这个样会导致自己组件中的方法不能使用

    // 2. methods:{
    //     ...mapMutations(['add','reduce']),
    //     gotoh(){
    //         this.$router.push('/m')
    //     },
    // },
    // 自己组件内的方法一样定义使用

    // 两种方法传参 都是在调用mutations时 直接传入
    //  @click="add(11)" 等价 $store.commit('add',3)


    // getters
    // 1. vuex中的getters的名字 就是调用时的名字 但是不能加括号
    //     vuex中定义 
    // const getters = {
    //  getCount(state){
    //      return state.count += 100;
    //  }
    // }
    //   组件中调用
    //      this.$store.getters.getCount
</script>

<style>
    h1{
        cursor: pointer;
    }


</style>