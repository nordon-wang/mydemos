<template>
  <div class="locationtitleEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span
          @click="templet.p_select_parts('fun_set')"
          @mouseover="templet.p_index_hover_parts('fun_set')"
          @mouseout="templet.p_index_out_parts()"
        >内容设置</span>
    </div>

    <!-- 功能设置 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'fun_set'">
      
      <div class="setOne">
        <my-select v-model="infor.location_title_data_source" title="数据" :option="$store.state.options.locationFun"></my-select>
        <my-input v-if="infor.location_title_data_source === 'self'" v-model="infor.location_title_self_data" placeholder="自定义当前标题内容" title="自定义"></my-input>
        <my-number v-model="infor.location_title_fs" :min="12" :max="100" title="字体大小"></my-number>
        <my-select v-model="infor.location_title_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-border
          type="all"
          :my_width.sync="infor.location_title_border_width"
          :my_color.sync="infor.location_title_border_color"
          :my_style.sync="infor.location_title_border_style"
          title="默认边框"
        ></my-border>
        <my-color v-model="infor.location_title_fs_color" title="文字颜色"></my-color>
        <my-color v-model="infor.location_title_bc_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.location_title_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-number v-model="infor.location_title_padding_top"  title="上内间距"></my-number>
        <my-number v-model="infor.location_title_padding_bottom"  title="下内间距"></my-number>
        <my-number v-model="infor.location_title_margin_top"  title="上外间距"></my-number>
      </div>

    </div>

  </div>
</template>

<script>
import style from './style';


export default {
    name:'basic_locationtitle_edit',
    props:{
    },
    data(){
        return {
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
        };
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      }
    }
}
</script>

<style>

</style>
