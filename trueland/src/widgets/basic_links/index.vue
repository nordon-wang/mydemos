<template>
<div class="dateIndex mouseClass " :style="moduleClass"  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <!-- {{infor.links_styles}} -->
        <li class="edit_module" @click.stop="select_parts('','basic_links_model')">数据编辑</li>
        <my-tooltip content="样式设置">
          <li class="edit_module el-icon-edit" @click.stop="select_parts('','basic_links')"></li>
        </my-tooltip>
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
    <div  id="date" >
      <!--  -->
      <div id="">
        <div :style="spanCon" v-show="infor.links_styles == '1' ? true : false">{{infor.w_flinks_con}}<i class="ivu-icon ivu-icon-chevron-down" :style="spanConi"></i></div>
        
        <!-- 可以设置一级链接 -->
        <ul class="clearfix" v-show="infor.links_styles == '0' && infor.w_link_open_first_set === '1' ? true : false">
          <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
            <a v-if=" index === 0 ? true : false" href="javascript:;" :target="item.target" :style="astylesFir"><i :class="item.iconCLass" :style="istyles" ></i>{{item.title}}</a>
            <a v-if=" index === 0 ? false : true " href="javascript:;" :target="item.target" :style="astyles"><i :class="item.iconCLass" :style="istyles" ></i>{{item.title}}</a>
            <img  v-if="vif(index)" :src="infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs">
            <img  v-if="item.isShowPics == 'true' && item.imgUrls && infor.links_styles == '0' ? true : false" :src="item.imgUrls"  :style="vifs">
          </li>
        </ul>

        <!-- 不可以设置一级链接 -->
        <ul class="clearfix" v-show="infor.links_styles == '0' && infor.w_link_open_first_set === '0'  ? true : false">
          <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
            <a href="javascript:;" :target="item.target" :style="astyles"><i :class="item.iconCLass" :style="istyles" ></i>{{item.title}}</a>
            <img  v-if="vif(index)" :src="infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs">
            <img  v-if="item.isShowPics == 'true'" :src="item.imgUrls"  :style="vifs">
          </li>
        </ul>

        <!-- 第二、第三种样式 -->
        <ul v-show="infor.links_styles == '0' ? false : true">
          <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
            <a href="javascript:;" :target="item.target" :style="astyles"><i :class="item.iconCLass" :style="istyles" ></i>{{item.title}}</a>
            <img  v-if="vif(index)" :src="infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs">
            <img  v-if="item.isShowPics == 'true' && item.imgUrls && infor.links_styles == '0' ? true : false" :src="item.imgUrls"  :style="vifs">
          </li>
        </ul>
        <!--  -->
        <div :style="spanCon" v-show="infor.links_styles == '2' ? true : false">{{infor.w_flinks_con}}<i class="ivu-icon ivu-icon-chevron-down" :style="spanConi"></i></div>
      </div>
      <!--  -->
    </div>
</div>
</template>

<script>
export default {
  name: "basic_links",
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
    moduleClass() {
      return {
        width: this.infor.width + "px",
        height: this.infor.height + "px",
        lineHeight: this.infor.height + "px",
        textAlign: "center"
      };
    },
    vifs: function() {
      return {
        width: this.infor.w_flinks_pic_width + "px",
        height: this.infor.w_flinks_pic_height + "px",
        left: this.infor.w_flinks_pic_left + "px",
        top: this.infor.w_flinks_pic_top + "px",
        position: "absolute",
        zIndex: 99
      };
    },
    spanConi: function() {
      return {
        left: this.infor.w_flinks_icon_left + "px",
        top: this.infor.w_flinks_icon_top + "px",
        position: "absolute",
        fontFamily: "Ionicons"
      };
    },
    spanCon: function() {
      return {
        width: this.infor.w_flinks_width + "px",
        height: this.infor.w_flinks_height + "px",
        lineHeight: this.infor.w_flinks_height + "px",
        textAlign: this.infor.w_flink_text_align,
        background: this.infor.w_flinks_bc_color,
        color: this.infor.w_flinks_font_color,
        fontSize: this.infor.w_flinks_font_size + "px",
        borderRadius: this.infor.w_flinks_border_radius + "px",
        position: "relative"
      };
    },
    listyles: function() {
      return {
        float: this.infor.w_link_dir,
        position: "relative"
      };
    },
    astylesFir: function() {
      return {
        color: this.infor.w_link_color_first,
        fontSize: this.infor.w_link_fs_first + "px",
        backgroundColor: this.infor.w_link_bg_color_first,
        fontWeight: this.infor.w_link_bold_first,
        position: "relative",
        width: this.infor.w_color_width_first + "px",
        height: this.infor.w_color_height_first + "px",
        lineHeight: this.infor.w_color_height_first + "px",
        textAlign: this.infor.w_link_text_align_first,
        display: "block",
        textDecoration: this.infor.w_link_decoration_link,
        marginTop: this.infor.w_link_first_mt + "px",
        marginRight: this.infor.w_link_first_mr + "px",
        marginBottom: this.infor.w_link_first_mb + "px",
        marginLeft: this.infor.w_link_first_ml + "px",
        paddingLeft: this.infor.w_link_first_pl + "px",
        paddingRight: this.infor.w_link_first_pr + "px",
        paddingTop: this.infor.w_link_first_pt + "px",
        paddingBottom: this.infor.w_link_first_pb + "px",
        borderTopStyle: this.infor.w_link_border_top_border_style,
        borderTopColor: this.infor.w_link_border_top_border_color,
        borderTopWidth: this.infor.w_link_border_top_border_width + "px",
        borderRightStyle: this.infor.w_link_border_right_border_style,
        borderRightColor: this.infor.w_link_border_right_border_color,
        borderRightWidth: this.infor.w_link_border_right_border_width + "px",
        borderBottomStyle: this.infor.w_link_border_bottom_border_style,
        borderBottomColor: this.infor.w_link_border_bottom_border_color,
        borderBottomWidth: this.infor.w_link_border_bottom_border_width + "px",
        borderLeftStyle: this.infor.w_link_border_left_border_style,
        borderLeftColor: this.infor.w_link_border_left_border_color,
        borderLeftWidth: this.infor.w_link_border_left_border_width + "px"
      };
    },
    astyles: function() {
      return {
        color: this.infor.w_link_color,
        fontSize: this.infor.w_link_fs + "px",
        backgroundColor: this.infor.w_link_bg_color,
        fontWeight: this.infor.w_link_bold,
        position: "relative",
        paddingTop: this.infor.w_link_filltop + "px",
        paddingRight: this.infor.w_link_fillr + "px",
        paddingBottom: this.infor.w_link_fillbtm + "px",
        paddingLeft: this.infor.w_link_fillleft + "px",
        width: this.infor.w_color_width + "px",
        height: this.infor.w_color_height + "px",
        lineHeight: this.infor.w_color_height + "px",
        textAlign: this.infor.w_link_text_align,
        display: "block",
        textDecoration: this.infor.w_link_decoration_link,
        borderTopStyle: this.infor.w_link_border_top_border_style,
        borderTopColor: this.infor.w_link_border_top_border_color,
        borderTopWidth: this.infor.w_link_border_top_border_width + "px",
        borderRightStyle: this.infor.w_link_border_right_border_style,
        borderRightColor: this.infor.w_link_border_right_border_color,
        borderRightWidth: this.infor.w_link_border_right_border_width + "px",
        borderBottomStyle: this.infor.w_link_border_bottom_border_style,
        borderBottomColor: this.infor.w_link_border_bottom_border_color,
        borderBottomWidth: this.infor.w_link_border_bottom_border_width + "px",
        borderLeftStyle: this.infor.w_link_border_left_border_style,
        borderLeftColor: this.infor.w_link_border_left_border_color,
        borderLeftWidth: this.infor.w_link_border_left_border_width + "px",
        marginLeft: this.infor.w_link_margin_left + "px",
        marginRight: this.infor.w_link_margin_right + "px",
        marginTop: this.infor.w_link_margin_top + "px",
        marginBottom: this.infor.w_link_margin_bottom + "px"
      };
    },
    istyles: function() {
      return {
        color: this.infor.w_icon_color,
        fontSize: this.infor.w_color_fs + "px",
        paddingTop: this.infor.w_icon_filltop + "px",
        paddingRight: this.infor.w_icon_fillr + "px",
        paddingBottom: this.infor.w_icon_fillbtm + "px",
        paddingLeft: this.infor.w_icon_fillleft + "px",
        position: "absolute",
        left: this.infor.icon_pos_left,
        top: this.infor.icon_pos_top,
        fontFamily: "FontAwesome"
      };
    }
  },
  components: {},
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    },
    vif: function(v) {
      // return this.indexStore.switchArr[v] =='true' ? true : false;
    }
  },
  mounted() {
    // 兼容老版本
    // if(!this.infor.width){
    //   this.$set(this.infor,'width',250);
    //   this.$set(this.infor,'height',44);
    // }
  }
};
</script>

<style  lang="scss" scoped type="text/css" >
.dateIndex {
  border: 1px solid transparent;
}
</style>
