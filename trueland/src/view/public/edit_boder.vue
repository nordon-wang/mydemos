<template id="border">
  <div class="myBorder clearfix" :style="{
    width: type == 'all' ? '50%' : '25%'
  }">
    <strong v-if="type == 'all'" style="float: left;width: 100px;height: 40px;line-height: 40px;">
      {{$props.title}}
    </strong>

    <div class="title" v-if="type == 'all'" :style="{
      borderColor: type == 'all' ? '#333' : '#ccc',
    }">
      <img src="/static/image/border.jpg">
    </div>

    <div class="title" v-if="type != 'all'" :style="{
      borderTopColor: type == 'top' ? '#333' : '#ccc',
      borderRightColor: type == 'right' ? '#333' : '#ccc',
      borderLeftColor: type == 'left' ? '#333' : '#ccc',
      borderBottomColor: type == 'bottom' ? '#333' : '#ccc'
    }">
      <img src="/static/image/border.jpg">
    </div>

    <div class="sele" :style="{
      width: type == 'all' ? '155px' : '30%'
    }">
      <el-select v-model="myStyle" placeholder="请选择" style="width:100%;">
        <el-option
          v-for="item in $store.state.options.borderStyle"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="color">
      <el-color-picker v-model="myColor"></el-color-picker>
    </div>

    <div class="int" :style="{
      width: type == 'all' ? '155px' : '30%'
    }">
      <el-input-number
        v-model="myWidth"
        style="width:100%;"
        controls-position="right"></el-input-number>
    </div>


  </div>
</template>

<script>

  /*
   <my-border
   type="top"
   :my_width.sync="borderWidth"
   :my_color.sync="borderColor"
   :my_style.sync="borderStyle"
   ></my-border>

   * */
  export default {
    name: 'public_border',
    props:{
      type:{
        type:String,
        default:'',
      },
      my_width:{
        type:Number,
        default:0,
      },
      my_color:{
        type:String,
        default:'',
      },
      my_style:{
        type:String,
        default:'',
      },
      title:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        myColor:this.my_color,
        myStyle:this.my_style,
        myWidth:this.my_width,
      }
    },
    watch:{
      myWidth:function (val) {
        this.$emit('update:my_width', val)
      },
      myStyle:function (val) {
        this.$emit('update:my_style', val)
      },
      myColor:function (val) {
        this.$emit('update:my_color', val)
      }

    },
    methods:{


    },
    components:{

    },

    mounted(){


    }
  }
</script>
