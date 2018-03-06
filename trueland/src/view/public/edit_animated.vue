<template>
  <div class="pub-animated">
    <div class="animated-img clearfix">
        <dl v-for="(item,index) in aniArr" :key="index"
        :class="{ischeck:myAni.animatedType == item.animated,'img-items':index > 0}" @click="checkAni(item.animated,index)" >
          <dt v-if="index == 0 ? true : false">无</dt>
          <dt v-if="index != 0 ? true : false"></dt>
          <span class="ani-img-check"></span>
          <dd>{{item.name}}</dd>
        </dl>
        <div style="float: left; margin-top: 30px;margin-left: 12px;">
          <el-button type="primary" size="small" @click="playAnimated">播放动画<i class="el-icon-caret-right el-icon--right"></i></el-button>
        </div>
    </div>

    <div class="animated-nums">
      <div class="num-items">
        <strong>速度</strong>
        <el-input-number size="mini" :min="0.1" :max="10" :step="0.1" v-model="myAni.animatedDuration"></el-input-number>
      </div>
      <div class="num-items">
        <strong>延迟</strong>
        <el-input-number size="mini" :min="0" :max="10" :step="0.1"  v-model="myAni.animatedDelay"></el-input-number>
      </div>

      <div class="num-items">
        <strong>触发</strong>
        <el-radio-group v-model="myAni.animatedIterationCount" @change="countChange">
          <el-radio :label="false">单次触发</el-radio>
          <el-radio :label="true">多次触发</el-radio>
        </el-radio-group>
      </div>

      <div class="num-items" v-if="showSecondAni">
        <strong>方向</strong>
        <el-radio-group v-model="myAni.animatedState" @change="animatedChange">
          <el-radio v-for="(item,index) in feiRuArr" :key="index"  :label="item.animated">{{item.name}}</el-radio>
        </el-radio-group>
      </div>
    </div>

  </div>
</template>

<script>
// animatedState
export default {
    name:"edit_animated",
    props:{
      ani:{
        type:Object
      }
    },
    data(){
        return {
          firstAni:'',
          isShowDirection:false,
          defaultDir:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)).animatedState,
          myAni:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
          aniArr:[
            {
              name:'无效果',
              animated:''
            },
            {
              name:'淡入',
              animated:'fadeIn'
            },
            {
              name:'放大',
              animated:'zoomIn'
            },
            {
              name:'跳入',
              animated:'bounceIn'
            },
            {
              name:'闪现',
              animated:'flash'
            },
            {
              name:'滚入',
              animated:'rollIn'
            },
            {
              name:'翻转',
              animated:'flip'
            },
            {
              name:'左右抖动',
              animated:'shake'
            },
            {
              name:'上下扭动',
              animated:'jello'
            }
          ],
          feiRuArr:[]
        }
    },
    watch:{
      myAni:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
    },
    computed:{
      // 是否显示二级
      showSecondAni(){
        let val = this.myAni.animatedType;
        if(val == 'fadeIn' || val == 'zoomIn' || val == 'bounceIn'  || val == 'flip'){
          this.changeArr(val);
          return true;
        }
        return false;
      }
    },
    methods:{
      // 播放动画
      playAnimated(){
        let $class = this.myAni.animatedType + this.myAni.animatedState;
        let $dom = $('#u' + this.$store.state.module_Data.widgets_id);
        $dom.removeClass($class);
        
        let timer;
        timer = setTimeout(() => {
          this.$nextTick(()=>{
            $dom.addClass($class);
          });
          clearTimeout(timer);
        },40);
      },
      changeAniType(){

      },
      checkAni(val,idx){
        // 原始的动画类型  当第二次点击时 且存在方向时 用
        let temType = this.myAni.animatedType;
        this.myAni.animatedType = '';

        // 点击一级时 保存，当点击二级时使用
        this.firstAni = val;

        let _this = this;

        this.$nextTick(function(){
          /**
           *  判断是否显示方向
           *    显示方向 则调用animatedChange
           *    否则直接执行动画赋值
           */
          if(val == 'fadeIn' || val == 'zoomIn' || val == 'bounceIn'  || val == 'flip'){
            _this.changeArr(val);
            _this.animatedChange(val,true,temType);
            _this.myAni.animatedState = '';
          }else{
            _this.myAni.animatedType = val;
            _this.myAni.animatedState = '';
          }

        })
      },
      // 方向数组的改变
      changeArr(val){
        if(val == 'fadeIn' || val == 'zoomIn' || val == 'bounceIn'){
          this.feiRuArr = [
            {
              name:'默认',
              animated:''
            },
            {
              name:'向左',
              animated:'Right'
            },
            {
              name:'向右',
              animated:'Left'
            },
            {
              name:'向上',
              animated:'Up'
            },
            {
              name:'向下',
              animated:'Down'
            }];
        }else if(val == 'flip'){
          this.feiRuArr = [
            {
              name:'默认',
              animated:''
            },{
              name:'X轴',
              animated:'InX'
            },
            {
              name:'Y轴',
              animated:'InY'
            }];
        }
      },
      countChange(val){
        this.myAni.animatedIterationCount = val;
      },
      /**
       *  val 传递动画类型
       *  isClick 判断是通过什么点击执行animatedChange方法
       *    ture时 为点击图片
       *    false时 为点击方向单选框
       */
      animatedChange(val,isClick,temType){
        // 点击一级的
        if(isClick){
          this.myAni.animatedType = val;
        }else{
          // 二级
          this.myAni.animatedState = val;
        }
      },
      // 判断动画类型是够存在
      isExistObj(arr,items){
        for(let i in arr){
          if(arr[i].animated == items){
            return true;
          }
        }
        return false;
      }
    },
    mounted(){
      if(this.myAni.animatedIterationCount == 'false'){
        this.myAni.animatedIterationCount = false;
      }else{
        this.myAni.animatedIterationCount  = true;
      }
    }
}
</script>

<style>
  .clearfix:after {
      content: "";
      display: block;
      clear: both;
      visibility: hidden;
      height: 0;
  }

  .clearfix {
      zoom: 1;
  }
  .animated-nums{
    margin-top: 10px;
  }
  .num-items{
    display: inline-block;
    margin-left: 12px;
  }

  .num-items strong{
    width: 50px;
    text-align: center;
    display: inline-block;
  }

  .animated-img {
    width: 900px;
    padding-top: 12px;
    text-align: center;
    position: relative;
    margin: 0 auto;
  }

  .animated-img dl{
    display: inline-block;
    width: 70px;
    height: 90px;
    margin: 0 8px;
    text-align: center;
    color: #000;
    cursor: pointer;
    position: relative;
    float: left;
  }

  .animated-img dl dt{
    width: 100%;
    height: 64px;
    line-height: 64px;
    margin-bottom: 6px;
    border: 1px solid #e5e5e5;
  }

  .animated-img dl dt:hover{
    border-color: #557ce1;
  }
  span.ani-img-check{
    display: none;
  }

  .animated-img dl.ischeck dt{
    border-color: #557ce1;
  }

  .ischeck span.ani-img-check{
    position: absolute;
    width: 24px;
    height: 18px;
    right: 0;
    top: 45px;
    background-image: url('/static/image/mbg01.png');
    background-repeat: no-repeat;
    background-position: -139px -1458px;
    display: block;
  }

  .animated-img dl.img-items dt{
    background-image: url('/static/image/mbg01.png');
    background-repeat: no-repeat;
  }

  /* .animated-img dl.img-items:nth-of-type(2) dt{
    background-position: -2081px  -336px;
  } */
  .animated-img dl.img-items:nth-of-type(2) dt{
    background-position: -2385px -336px;
  }
  .animated-img dl.img-items:nth-of-type(3) dt{
    background-position: -2464px  -336px;
  }
  .animated-img dl.img-items:nth-of-type(4) dt{
    background-position: -2542px  -336px;
  }
  .animated-img dl.img-items:nth-of-type(5) dt{
    background-position: -2618px  -336px;
  }
  .animated-img dl.img-items:nth-of-type(6) dt{
    background-position:-2385px -407px;
  }
  .animated-img dl.img-items:nth-of-type(7) dt{
    background-position: -2465px -407px;
  }
  .animated-img dl.img-items:nth-of-type(8) dt{
    background-position: -2540px -407px;
  }
  .animated-img dl.img-items:nth-of-type(9) dt{
    background-position: -2619px -407px;
  }
</style>
