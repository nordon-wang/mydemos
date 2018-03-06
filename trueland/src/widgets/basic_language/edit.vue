<template>
  <div class="languageEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span
          @click="templet.p_select_parts('icon_set')"
          @mouseover="templet.p_index_hover_parts('icon_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1"
        >间距设置</span>
        <span @click="templet.p_select_parts('fun_set')"
          @mouseover="templet.p_index_hover_parts('fun_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1" >基础设置</span>
        <span
          @click="templet.p_select_parts('button_set')"
          @mouseover="templet.p_index_hover_parts('button_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1"
        >链接设置</span>
        <span
          @click="templet.p_select_parts('border_set')"
          @mouseover="templet.p_index_hover_parts('border_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1"
        >边框设置</span>
        <span
          @click="templet.p_select_parts('pic_set')"
          @mouseover="templet.p_index_hover_parts('pic_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1"
        >图片设置</span>
        <span
          @click="templet.p_select_parts('pic_manage')"
          @mouseover="templet.p_index_hover_parts('pic_manage')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 1"
        >图片、文字</span>
        <span
          @click="templet.p_select_parts('select_set')"
          @mouseover="templet.p_index_hover_parts('select_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 2"
        >基础设置</span>
        <span
          @click="templet.p_select_parts('language_set')"
          @mouseover="templet.p_index_hover_parts('language_set')"
          @mouseout="templet.p_index_out_parts()"
          v-show="infor.w_languageStyle == 2"
        >语言管理</span>
    </div>

    <!-- 基础设置 样式2 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'select_set'">

      <div class="setOne">
        <my-number v-model="infor.w_languageWidth" :min="0" :max="1000" title="宽"></my-number>
        <my-number v-model="infor.w_languageHeight" :min="0" :max="1000" title="高"></my-number>
        <my-number v-model="infor.w_minbeds" :min="10" :max="100" title="字体大小"></my-number>
        <my-number v-model="infor.w_style2_border_radius" :min="0" :max="100" title="圆角半径"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.w_fontColor" title="字体颜色"></my-color>
        <my-color v-model="infor.w_inputColor" title="背景颜色"></my-color>
        <my-number v-model="infor.w_style2_padding_left" :min="0" :max="200" title="左内间距"></my-number>
      </div>

    </div>

    <!-- 语言管理 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'language_set'" >
      <div class="setOne" ref="sss" >
        <div  v-for="(items,index) in listArr.img_items" :key="index" class="" style="margin-bottom:6px;">
            <my-input v-model="listArr.txt_arr[index]" :title="items.lang"></my-input>
        </div>
      </div>
    </div>
    
    <!-- 间距设置 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'icon_set'">
      <div class="setOne">
        <my-distance 
          title="外间距"
          :top.sync="infor.w_style1_margin_top"
          :right.sync="infor.w_style1_margin_right"
          :bottom.sync="infor.w_style1_margin_bottom" 
          :left.sync="infor.w_style1_margin_left"></my-distance>
      </div>

      <div class="setOne">
        <my-distance 
          title="内间距"
          :top.sync="infor.w_style1_padding_top"
          :right.sync="infor.w_style1_padding_right"
          :bottom.sync="infor.w_style1_padding_bottom" 
          :left.sync="infor.w_style1_padding_left"></my-distance>
      </div>
    </div>

    <!-- 基础设置 样式1 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'fun_set'">

      <div class="setOne">
        <my-number v-model="infor.w_languageWidth" :min="0" :max="1000" title="总宽"></my-number>
        <my-number v-model="infor.w_style1_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-number v-model="infor.w_style1_languageWidth" :min="0" :max="1000" title="宽"></my-number>
        <my-number v-model="infor.w_style1_languageHeight" :min="0" :max="1000" title="高"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_style1_float" title="排序方向" :option="$store.state.options.myDirective"></my-select>
        <my-select v-model="infor.w_style1_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-color v-model="infor.w_inputColor" title="背景颜色"></my-color>
        <my-color v-model="infor.w_a_hover_bc_color" title="悬浮背景"></my-color>
      </div>

      <div class="setOne">
        <my-border
          type="all"
          :my_width.sync="infor.language_a_border_all_width"
          :my_color.sync="infor.language_a_border_all_color"
          :my_style.sync="infor.language_a_border_all_styles"
          title="默认边框"
        ></my-border>
      </div>

    </div>

    <!-- 链接设置 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'button_set'">
      <div class="setOne">
        <my-color v-model="infor.w_fontColor" title="字体颜色"></my-color>
        <my-color v-model="infor.w_a_hover_font_color" title="悬浮字体"></my-color>
        <my-number v-model="infor.w_style1_a_width" :min="0" :max="1000" title="链接宽"></my-number>
        <my-number v-model="infor.w_style1_a_height" :min="0" :max="1000" title="链接高"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_language_txt_show" title="文字" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.w_minbeds" :min="0" :max="1000" title="字体大小"></my-number>
      </div>

    </div>

    <!-- 边框设置 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'border_set'">
        <div class="setOne">
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_first_left_width"
            :my_color.sync="infor.language_a_border_first_left_color"
            :my_style.sync="infor.language_a_border_first_left_styles"
            title="首链接左"
            ></my-border>
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_first_right_width"
            :my_color.sync="infor.language_a_border_first_right_color"
            :my_style.sync="infor.language_a_border_first_right_styles"
            title="首链接右"
            ></my-border>
        </div>

        <div class="setOne">
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_last_left_width"
            :my_color.sync="infor.language_a_border_last_left_color"
            :my_style.sync="infor.language_a_border_last_left_styles"
            title="尾链接左"
            ></my-border>
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_last_right_width"
            :my_color.sync="infor.language_a_border_last_right_color"
            :my_style.sync="infor.language_a_border_last_right_styles"
            title="尾链接右"
            ></my-border>
        </div>

        <div class="setOne">
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_other_left_width"
            :my_color.sync="infor.language_a_border_other_left_color"
            :my_style.sync="infor.language_a_border_other_left_styles"
            title="剩余链接左"
            ></my-border>
            <my-border
            type="all"
            :my_width.sync="infor.language_a_border_other_right_width"
            :my_color.sync="infor.language_a_border_other_right_color"
            :my_style.sync="infor.language_a_border_other_right_styles"
            title="剩余链接右"
            ></my-border>
        </div>

    </div>

    <!-- 图片设置 twoBtn -->
    <div class="Routine_setting" v-show="$store.state.parts == 'pic_set'" >

      <div class="setOne">
        <my-number v-model="infor.w_language_img_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.w_language_img_show" title="图片" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.w_language_img_width" :min="0" :max="1000" title="宽"></my-number>
        <my-number v-model="infor.w_language_img_height" :min="0" :max="1000" title="高"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_language_img_left" :min="0" :max="1000" title="左间距"></my-number>
        <my-number v-model="infor.w_language_img_top" :min="0" :max="1000" title="上间距"></my-number>
      </div>
    </div>

    <!-- 图片、文字管理 -->
    <div class="Routine_setting" v-show="$store.state.parts == 'pic_manage'" >

      <div class="setOne" >
        <div v-for="(items,index) in listArr.img_items" :key="index" class="" style="margin-bottom:6px;">
            <my-input v-model="listArr.txt_arr[index]" :title="items.lang"></my-input>
            <my-img v-model="infor.img_obj[index]"></my-img>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import style from "./style";

export default {
  name: "basic_language_edit",
  props: {},
  data() {
    return {
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      )
    };
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "infor",
          val: JSON.parse(JSON.stringify(val))
        });
      },
      deep: true
    },
    listArr: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "listArr",
          val: JSON.parse(JSON.stringify(val))
        });
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "animateObj",
          val: JSON.parse(JSON.stringify(val))
        });
      },
      deep: true
    }
  },
  mounted() {
    //   order flex-grow flex-shrink flex-basis flex
    // console.log($(this.$refs.sss));
  }
};
</script>

<style>

</style>
