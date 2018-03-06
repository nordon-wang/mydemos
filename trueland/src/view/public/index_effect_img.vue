<template>
  <div class="index_effect_img" :style="[styleObj,{lineHeight:styleObj ? styleObj.height : ''}]">

    <!--第一张图-->
    <div class="pic_parent" :class="effectsObj.type == 'changeSrc' ? 'pic_changeSrc' : ''">
      <img
        :src="src"
        :class="[classname,effectsObj ? effectsObj.type :'']"
        @mouseover="mouseover($event)"
        @mouseout="mouseout($event)"
      >
    </div>

    <!--第二张图，用于做图片切换，淡入淡出-->
    <div class="pic_child"  v-show="effectsObj.type == 'changeSrc'">
      <img :src="effectsObj.changeSrc">
    </div>

    <div class="effect_layer" v-if="effectsObj.type == 'icon'">
      <p>
        <span></span>
        <i :class="effectsObj.icon" :style="{
        fontSize:effectsObj.iconSize + 'px',
        color:effectsObj.iconColor,
      }"></i>
      </p>

    </div>
  </div>
</template>

<script>

  /*
  1.styleObj，至少要传一个height，不然就没有垂直居中
  2.type类型：
  icon
  changeSrc
  border
  scale
  translate
  rotate

  * */

  export default {
    name: 'index_effect_img',
    props:{
      src:{
        type:String,
        default:'',
      },
      classname:{
        type:String,
        default:'',
      },
      effectsObj:{
        type:Object,
        default:null
      },
      styleObj:{
        type:Object,
        default:null
      }
    },
    data () {
      return {

      }
    },
    components:{

    },
    methods:{
      mouseover(e){
        const ele = e.target;
        if(this.effectsObj.type == 'scale'){
          $(ele).css({'transform':`scale(${this.effectsObj.zoom})`});
        }
        else if(this.effectsObj.type == 'translate'){
          $(ele).css({'transform':`translate(${this.effectsObj.distance}px,0)`});
        }
        else if(this.effectsObj.type == 'rotate'){
          $(ele).css({'transform':`rotate(${this.effectsObj.deg}deg)`});
        }
        else if(this.effectsObj.type == 'border'){
          $(ele).css({
            'borderStyle':`${this.effectsObj.borderStyle}`,
            'borderWidth':`${this.effectsObj.borderWidth}px`,
            'borderColor':`${this.effectsObj.borderColor}`,
          });
        }
      },
      mouseout(e){
        const ele = e.target;
        if(this.effectsObj.type == 'scale'){
          $(ele).css({'transform':'scale(1)'});
        }
        else if(this.effectsObj.type == 'translate'){
          $(ele).css({'transform':'translate(0,0)'});
        }
        else if(this.effectsObj.type == 'rotate'){
          $(ele).css({'transform':'rotate(0deg)'});
        }
        else if(this.effectsObj.type == 'border'){
          $(ele).css({
            'borderStyle':'not specified',
            'borderWidth':0,
            'borderColor':'',
          });
        }
      }
    },
    mounted(){


    }
  }
</script>
