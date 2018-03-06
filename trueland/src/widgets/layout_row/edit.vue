<template>
  <div class="rowEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span
          @click="templet.p_select_parts('row')"
          @mouseover="templet.p_index_hover_parts('row')"
          @mouseout="templet.p_index_out_parts()"
        >行容器</span>
        <span
          @click="templet.p_select_parts('laybox')"
          @mouseover="templet.p_index_hover_parts('laybox')"
          @mouseout="templet.p_index_out_parts()"
        >居中容器</span>
    </div>

    <!--row设置-->
    <div class="row_setting" v-show="$store.state.parts == 'row'">
      <div class="setOne">
        <my-border
          type="top"
          :my_width.sync="infor.r_border_top_width"
          :my_color.sync="infor.r_border_top_color"
          :my_style.sync="infor.r_border_top_style"
        ></my-border>

        <my-border
          type="bottom"
          :my_width.sync="infor.r_border_bottom_width"
          :my_color.sync="infor.r_border_bottom_color"
          :my_style.sync="infor.r_border_bottom_style"
        ></my-border>
        <my-number v-model="infor.module_height" title="行高度"></my-number>
        <my-number v-model="infor.w_opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>

      </div>
      <div class="setOne">
        <my-number v-model="infor.module_index" title="层级"></my-number>
        <my-number v-model="infor.r_fill" title="内边距"></my-number>
        <my-color v-model="infor.r_background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-img v-model="infor.r_bg_src"></my-img>

        <my-select v-model="infor.r_tile_style" title="背景重复" :option="$store.state.options.backgroundRepeat"></my-select>
        <my-select v-model="infor.r_bg_position" title="背景重复" :option="$store.state.options.backgroundPosition"></my-select>

      </div>

    </div>

    <!--laybox-->
    <div class="laybox_setting" v-show="$store.state.parts == 'laybox'">
      <div class="setOne">
        <my-border
          type="top"
          :my_width.sync="infor.w_border_top_width"
          :my_color.sync="infor.w_border_top_color"
          :my_style.sync="infor.w_border_top_style"
        ></my-border>

        <my-border
          type="bottom"
          :my_width.sync="infor.w_border_bottom_width"
          :my_color.sync="infor.w_border_bottom_color"
          :my_style.sync="infor.w_border_bottom_style"
        ></my-border>

        <my-border
          type="left"
          :my_width.sync="infor.w_border_left_width"
          :my_color.sync="infor.w_border_left_color"
          :my_style.sync="infor.w_border_left_style"
        ></my-border>

        <my-border
          type="right"
          :my_width.sync="infor.w_border_right_width"
          :my_color.sync="infor.w_border_right_color"
          :my_style.sync="infor.w_border_right_style"
        ></my-border>
      </div>

      <div class="setOne">
        <my-number v-model="infor.module_width" title="宽度"></my-number>
        <my-number v-model="infor.w_opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>
        <my-number v-model="infor.w_fill" title="内边距"></my-number>
        <my-color v-model="infor.w_background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-img v-model="infor.w_bg_src"></my-img>

        <my-select v-model="infor.w_tile_style" title="背景平铺" :option="$store.state.options.backgroundRepeat"></my-select>
        <my-select v-model="infor.w_bg_position" title="背景位置" :option="$store.state.options.backgroundPosition"></my-select>

      </div>




    </div>

  </div>
</template>

<script>
  import style from './style';


  export default {
    name: 'layout_row_edit',
    props:{},
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        test:''
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          console.log(val);
          const id = this.$store.state.module_Data.widgets_id;
          const type = this.$store.state.module_Data.rowType;
          const index = this.templet.p_find_rowIndex({id,type});
          const changeVal = JSON.parse(JSON.stringify(val));
          this.$store.state[type][index].data.infor = changeVal;
        },
        deep: true
      },
    },
    methods:{

    },

    created(){

    },
    components:{
    },

    mounted(){


    }
  }
</script>
