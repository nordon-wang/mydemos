<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span @click="templet.p_select_parts('firlink_set')"
          @mouseover="templet.p_index_hover_parts('firlink_set')"
          @mouseout="templet.p_index_out_parts()">一级链接</span>
        <span @click="templet.p_select_parts('firlink_distance_set')"
          @mouseover="templet.p_index_hover_parts('firlink_distance_set')"
          @mouseout="templet.p_index_out_parts()">一级间距</span>
        <span
          @click="templet.p_select_parts('seclink_set')"
          @mouseover="templet.p_index_hover_parts('seclink_set')"
          @mouseout="templet.p_index_out_parts()"
        >二级链接</span>
        <span
          @click="templet.p_select_parts('seclink_distance_set')"
          @mouseover="templet.p_index_hover_parts('seclink_distance_set')"
          @mouseout="templet.p_index_out_parts()"
        >二级间距</span>
        <span
          @click="templet.p_select_parts('link_status_set')"
          @mouseover="templet.p_index_hover_parts('link_status_set')"
          @mouseout="templet.p_index_out_parts()"
        >链接状态</span>
        <span
          @click="templet.p_select_parts('hover_pic_set')"
          @mouseover="templet.p_index_hover_parts('hover_pic_set')"
          @mouseout="templet.p_index_out_parts()"
        >悬浮图片</span>
        <span
          @click="templet.p_select_parts('icon_set')"
          @mouseover="templet.p_index_hover_parts('icon_set')"
          @mouseout="templet.p_index_out_parts()"
        >图标设置</span>
        <span
          @click="templet.p_select_parts('icon_select')"
          @mouseover="templet.p_index_hover_parts('icon_select')"
          @mouseout="templet.p_index_out_parts()"
        >图标选择</span>
    </div>


    <!--一级链接 myDirective -->
    <div class="Routine_setting" v-show="$store.state.parts == 'firlink_set'">
      <div class="setOne">
        <my-select v-model="infor.w_link_dir" title="排列方向" :option="$store.state.options.myDirective"></my-select>
        <my-select v-model="infor.w_link_open_first_set" title="一级链接设置" :option="$store.state.options.customOptionTwo"></my-select>
        <my-select v-model="infor.w_link_bold_first" title="加粗" :option="$store.state.options.myFontWeight"></my-select>
        <my-select v-model="infor.w_link_text_align_first" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.w_link_color_first" title="字体颜色"></my-color>
        <my-color v-model="infor.w_link_hover_color_first" title="悬浮字体"></my-color>
        <my-color v-model="infor.w_link_bg_color_first" title="背景颜色"></my-color>
        <my-color v-model="infor.w_link_bg_hover_color_first" title="悬浮背景"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_color_width_first" title="链接宽"></my-number>
        <my-number v-model="infor.w_color_height_first" title="链接高"></my-number>
        <my-number v-model="infor.w_link_fs_first" :min="12" :max="100" title="字体大小"></my-number>
      </div>
      
    </div>

    <!-- 一级链接 间距设置 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'firlink_distance_set'">

      <div class="setOne">
        <my-distance 
          title="外间距"
          :top.sync="infor.w_link_first_mt"
          :right.sync="infor.w_link_first_mr"
          :bottom.sync="infor.w_link_first_mb" 
          :left.sync="infor.w_link_first_ml"></my-distance>
      </div>

      <div class="setOne">
        <my-distance 
          title="内间距"
          :top.sync="infor.w_link_first_pt"
          :right.sync="infor.w_link_first_pr"
          :bottom.sync="infor.w_link_first_pb" 
          :left.sync="infor.w_link_first_pl"></my-distance>
      </div>
      
    </div>

    <!-- 二级链接 -->
    <div class="btn_setting" v-show="$store.state.parts == 'seclink_set'">
      <div class="setOne">
        <my-select v-model="infor.w_link_bold" title="加粗" :option="$store.state.options.myFontWeight"></my-select>
        <my-select v-model="infor.w_link_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-number v-model="infor.w_color_width" title="链接宽"></my-number>
        <my-number v-model="infor.w_color_height" title="链接高"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.w_link_color" title="字体颜色"></my-color>
        <my-color v-model="infor.w_link_hover_color" title="悬浮字体"></my-color>
        <my-color v-model="infor.w_link_bg_color" title="背景颜色"></my-color>
        <my-color v-model="infor.w_link_bg_hover_color" title="悬浮背景"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_link_fs" :min="12" :max="100" title="字体大小"></my-number>
      </div>
    </div>

    <!--二级链接 间距设置 -->
    <div class="btn_setting" v-show="$store.state.parts == 'seclink_distance_set'">
      <div class="setOne">
        <my-distance 
          title="外间距"
          :top.sync="infor.w_link_margin_top"
          :right.sync="infor.w_link_margin_right"
          :bottom.sync="infor.w_link_margin_bottom" 
          :left.sync="infor.w_link_margin_left"></my-distance>
      </div>

      <div class="setOne">
        <my-distance 
          title="内间距"
          :top.sync="infor.w_link_filltop"
          :right.sync="infor.w_link_fillr"
          :bottom.sync="infor.w_link_fillbtm" 
          :left.sync="infor.w_link_fillleft"></my-distance>
      </div>
    </div>

    <!-- 链接状态 linkStatus-->
    <div class="btn_setting" v-show="$store.state.parts == 'link_status_set'">
      <div class="setOne">
        <el-alert
          title="设置链接的未被访问、已被访问、鼠标悬浮和点击时下划线状态,即下划线是否存在"
          type="success">
        </el-alert>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_link_decoration_link" title="未被访问" :option="$store.state.options.linkStatus"></my-select>
        <my-select v-model="infor.w_link_decoration_hover" title="鼠标悬浮" :option="$store.state.options.linkStatus"></my-select>
        <my-select v-model="infor.w_link_decoration_active" title="点击时" :option="$store.state.options.linkStatus"></my-select>
      </div>

    </div>

    <!-- 链接状态 linkStatus-->
    <div class="btn_setting" v-show="$store.state.parts == 'hover_pic_set'">
      <div class="setOne">
        <my-number v-model="infor.w_flinks_pic_width" title="图片宽"></my-number>
        <my-number v-model="infor.w_flinks_pic_height" title="图片高"></my-number>
        <my-number v-model="infor.w_flinks_pic_left" title="左间距"></my-number>
        <my-number v-model="infor.w_flinks_pic_top" title="上间距"></my-number>
      </div>
    </div>
    
    <!-- 图标状态 -->
    <div class="btn_setting" v-show="$store.state.parts == 'icon_set'">
      <div class="setOne">
        <my-color v-model="infor.w_icon_color" title="图标颜色"></my-color>
        <my-number v-model="infor.w_color_fs" title="图标大小"></my-number>
        <my-number v-model="infor.w_icon_filltop" title="图标上填充"></my-number>
        <my-number v-model="infor.w_icon_fillleft" title="图标左填充"></my-number>
      </div>
    </div>

    <!-- 图标选择 icon_select -->
    <div class="btn_setting" v-show="$store.state.parts == 'icon_select'">
      <!-- this.infor.cityLists[this.infor.clickName].iconCLass  -->
      <div class="setOne">
        <ul style="width:100%;">
          <li v-for="(item,index) in infor.cityLists"
            :key="index">
            <my-icon v-model="infor.cityLists[index].iconCLass" :title="item.title"></my-icon>
          </li>
        </ul>
        
      </div>
    </div>

  </div>
</template>

<script>
import style from './style';

export default {
    name:'basic_links_edit',
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
    },
    mounted(){

    }
}

</script>

<style >

</style>
