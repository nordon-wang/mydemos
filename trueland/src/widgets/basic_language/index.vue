<template>
    <div class=" mouseClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_language')">整体编辑</li>
                <my-tooltip content="动画选择">
                  <li class="edit_module" @click.stop="select_parts('','public_animated')">
                    <span class="fa fa-flash"></span>
                  </li>
                </my-tooltip>
                <my-tooltip content="基础设置">
                  <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
                </my-tooltip>
                <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
            </ul>
        </div>
        <div>
          <!-- 样式1 -->
          <ul v-show="infor.w_languageStyle == '1' ? true : false" :style="style1" 
              @dblclick.stop="select_parts('fun_set','basic_language')" 
              :class="[
              $store.state.parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.hover_parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
            <li v-for="(item,index) in listArr.img_items" :style="style1li" :key="index" 
            @dblclick.stop="select_parts('fun_set','basic_language')" 
            :class="[
            ($store.state.parts == 'fun_set' || $store.state.parts == 'icon_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.hover_parts == 'fun_set' || $store.state.hover_parts == 'icon_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" >
              <a href="javascript:;"  :style="style1af" v-if="index === 0" 
              @dblclick.stop="select_parts('button_set','basic_language')" 
              :class="[
              ($store.state.parts == 'button_set' || $store.state.parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.hover_parts == 'button_set' || $store.state.hover_parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" > 
                {{listArr.txt_arr[index]}}
              </a>
              <a href="javascript:;"  :style="style1a" v-if="index > 0 && index < inforLentgh - 1 ? true : false" 
              @dblclick.stop="select_parts('button_set','basic_language')" 
              :class="[
              ($store.state.parts == 'button_set' || $store.state.parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.hover_parts == 'button_set' || $store.state.hover_parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
                {{listArr.txt_arr[index]}}
              </a>
              <a href="javascript:;"  :style="style1as" v-if="index === inforLentgh - 1 " 
              @dblclick.stop="select_parts('button_set','basic_language')" 
              :class="[
              ($store.state.parts == 'button_set' || $store.state.parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.hover_parts == 'button_set' || $store.state.hover_parts == 'border_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]"> 
                {{listArr.txt_arr[index]}}
              </a>
              <img :src="infor.img_obj[index]" :style="lanImg" 
              @dblclick.stop="select_parts('pic_set','basic_language')" 
              :class="[
              ($store.state.parts == 'pic_set' || $store.state.parts == 'pic_manage') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.hover_parts == 'pic_set' || $store.state.hover_parts == 'pic_manage') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" >
            </li>
          </ul>
          <!-- 样式2 -->
          <select v-show="infor.w_languageStyle == '2' ? true : false" :style="style2" 
          @dblclick.stop="select_parts('select_set','basic_language')" 
          :class="[
          $store.state.parts == 'select_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'select_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
            <option v-for="(item,index2) in listArr.img_items" :key="index2">
              {{listArr.txt_arr[index2]}}
            </option>
          </select>
        </div>
    </div>
</template>

<script>
import myajax from "../../js/ajax";

export default {
  name: "basic_language",
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    pid: {
      type: String,
      default: ""
    },
    rowType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      inforLentgh: 0
    };
  },
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    }
  },
  computed: {
    lanImg: function() {
      return {
        width: this.infor.w_language_img_width + "px",
        height: this.infor.w_language_img_height + "px",
        position: "absolute",
        left: this.infor.w_language_img_left + "px",
        top: this.infor.w_language_img_top + "px",
        display: this.infor.w_language_img_show,
        borderRadius: this.infor.w_language_img_border_radius + "px"
      };
    },
    style2: function() {
      return {
        width: this.infor.w_languageWidth + "px",
        height: this.infor.w_languageHeight + "px",
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        paddingLeft: this.infor.w_style2_padding_left + "px",
        background: this.infor.w_inputColor,
        borderRadius: this.infor.w_style2_border_radius + "px"
      };
    },
    style1: function() {
      return {
        width: this.infor.w_languageWidth + "px",
        height: this.infor.w_languageHeight + "px",
        marginLeft: "2px"
      };
    },
    style1li: function() {
      return {
        float: this.infor.w_style1_float,
        width: this.infor.w_style1_languageWidth + "px",
        height: this.infor.w_style1_languageHeight + "px",
        lineHeight: this.infor.w_style1_languageHeight + "px",
        background: this.infor.w_inputColor,
        borderRadius: this.infor.w_style1_border_radius + "px",
        textAlign: this.infor.w_style1_text_align,
        paddingTop: this.infor.w_style1_padding_top + "px",
        paddingRight: this.infor.w_style1_padding_right + "px",
        paddingBottom: this.infor.w_style1_padding_bottom + "px",
        paddingLeft: this.infor.w_style1_padding_left + "px",
        marginTop: this.infor.w_style1_margin_top + "px",
        marginRight: this.infor.w_style1_margin_right + "px",
        marginBottom: this.infor.w_style1_margin_bottom + "px",
        marginLeft: this.infor.w_style1_margin_left + "px",
        borderStyle: this.infor.language_a_border_all_styles,
        borderColor: this.infor.language_a_border_all_color,
        borderWidth: this.infor.language_a_border_all_width + "px",
        position: "relative"
      };
    },
    style1af: function() {
      return {
        display: this.infor.w_language_txt_show,
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        borderLeftStyle: this.infor.language_a_border_first_left_styles,
        borderLeftColor: this.infor.language_a_border_first_left_color,
        borderLeftWidth: this.infor.language_a_border_first_left_width + "px",
        borderRightStyle: this.infor.language_a_border_first_right_styles,
        borderRightColor: this.infor.language_a_border_first_right_color,
        borderRightWidth: this.infor.language_a_border_first_right_width + "px"
      };
    },
    style1a: function() {
      return {
        display: this.infor.w_language_txt_show,
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        borderLeftStyle: this.infor.language_a_border_other_left_styles,
        borderLeftColor: this.infor.language_a_border_other_left_color,
        borderLeftWidth: this.infor.language_a_border_other_left_width + "px",
        borderRightStyle: this.infor.language_a_border_other_right_styles,
        borderRightColor: this.infor.language_a_border_other_right_color,
        borderRightWidth: this.infor.language_a_border_other_right_width + "px"
      };
    },
    style1as: function() {
      return {
        display: this.infor.w_language_txt_show,
        fontSize: this.infor.w_minbeds + "px",
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        color: this.infor.w_fontColor,
        borderLeftStyle: this.infor.language_a_border_last_left_styles,
        borderLeftColor: this.infor.language_a_border_last_left_color,
        borderLeftWidth: this.infor.language_a_border_last_left_width + "px",
        borderRightStyle: this.infor.language_a_border_last_right_styles,
        borderRightColor: this.infor.language_a_border_last_right_color,
        borderRightWidth: this.infor.language_a_border_last_right_width + "px"
      };
    }
  },
  mounted() {
    this.$set(this, "inforLentgh", Object.keys(this.listArr.img_items).length);
    // events.EventEmitter()
  }
};
</script>

<style>
.bottomBar .content{
  overflow: auto;
}
</style>
