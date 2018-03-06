<template>
    <div class=" mouseClass locationClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_location')">整体编辑</li>
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
        <div @dblclick.stop="select_parts('','basic_location')" 
            :class="[
              $store.state.parts == 'basic_location' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.hover_parts == 'basic_location' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]" >
            <div class="clearfix" id="con" :style="divs"  v-if="infor.location_data_source === 'self'"
                @dblclick.stop="select_parts('fun_set','basic_location')" 
            :class="[
              $store.state.parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.hover_parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]"     
            >
                <i :style="iconStyle" 
                @dblclick.stop="select_parts('icon_set','basic_location')" 
                :class="[
                    infor.icon_class,
                    $store.state.parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                    $store.state.hover_parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
                ></i>
                <span :style="titlestyle"  >{{infor.location_title}}</span>
                <a :style="titlestyle" href="javascript:;">首页</a>
                <span :style="titlestyle">&nbsp;&gt;&nbsp;</span>
                <span :style="lasta1"> {{infor.location_self_data}}</span>
            </div>
            <div class="clearfix" id="con" :style="divs" v-else 
                @dblclick.stop="select_parts('fun_set','basic_location')" 
                :class="[
                $store.state.parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                $store.state.hover_parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
            >
                <i  :style="iconStyle" 
                @dblclick.stop="select_parts('icon_set','basic_location')" 
                :class="[
                    infor.icon_class,
                    $store.state.parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                    $store.state.hover_parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
                ></i>
                <span :style="titlestyle">{{infor.location_title}}</span>
                <span  :style="titlestyle" v-for="(item,index) in listArr" track-by="index" :key='index'>{{item}}</span>
                <span :style="lasta1">首页</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "basic_location",
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
    return {};
  },
  computed: {
    divs: function() {
      return {
        textAlign: this.infor.location_text_align_all,
        lineHeight: this.infor.line_height + "px",
        height: this.infor.height + "px",
        minWidth: this.infor.width + "px"
      };
    },
    lasta1: function() {
      return {
        color: this.infor.last_font_color,
        fontSize: this.infor.font_sizes + "px"
      };
    },
    iconStyle: function() {
      return {
        color: this.infor.location_icon_color,
        fontSize: this.infor.icon_sizes + "px",
        marginLeft: this.infor.location_icon_left + "px",
        marginRight: this.infor.location_icon_top + "px",
        fontFamily: "FontAwesome"
      };
    },
    titlestyle: function() {
      return {
        color: this.infor.font_color,
        fontSize: this.infor.font_sizes + "px"
      };
    },
    huoqude: function() {
      return {
        color: this.infor.font_color,
        fontSize: this.infor.font_sizes + "px",
        float: "left"
      };
    }
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
  mounted(){
    
    // 兼容老版本
    if(!this.infor.width){
      this.$set(this.infor,'width',250);
      this.$set(this.infor,'height',44);
    }
  }
};
</script>

<style>
    .locationClass{
        border: 1px solid transparent;
    }
</style>
