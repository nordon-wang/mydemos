<template>
    <div class=" mouseClass locationClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_searchs')">整体编辑</li>
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
        <div :style="{
            width:infor.width + 'px',
            height:infor.height + 'px'
        }" 
            @dblclick.stop="select_parts('','basic_searchs')" 
        >
          <!-- start -->
          <!-- <h1>{{ this.infor.search_oppen_style | myfilter(1,2)}}</h1> -->
        <div  id="iconBtn"  v-if="isshowbtnicon" :style="search2Div">
          <i  :style="search2I" 
            @dblclick.stop="select_parts('icon_btn_set','basic_searchs')" 
            :class="[
            $store.state.parts == 'icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.hover_parts == 'icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            infor.icon_class
            ]" ></i>
        </div>
        <div v-if="infor.search_oppen_style == 0 || infor.search_oppen_style == 1 ? true : false" :style="search1Div">
          <i  :style="search1I" v-if="isshowicon"  
            @dblclick.stop="select_parts('iconstyle_set','basic_searchs')" 
            :class="[
            $store.state.parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.hover_parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            infor.icon_class
            ]" 
          ></i>
          <span :style="search1Span" v-if="isshowtxt" 
          @dblclick.stop="select_parts('txt_btn_set','basic_searchs')" 
            :class="[
            $store.state.parts == 'txt_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.hover_parts == 'txt_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" >{{ infor.search_btn_text }}</span>
          <input type="text" readonly  unselectable="on"  :placeholder="infor.search_placeholder"  :style="search1Input" 
            @dblclick.stop="select_parts('input_set','basic_searchs')" 
            :class="[
            $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]"
            >
          <b :style="{
            position:'absolute',
            right:this.infor.search_x_right + 'px',
            top:this.infor.search_x_top + 'px',
            fontSize:this.infor.search_x_fs + 'px',
            color:this.infor.search_x_color,
            display:this.infor.search_x_show
          }" 
          @dblclick.stop="select_parts('x_btn_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'x_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'x_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">x</b>
        </div>
        <div  v-if="infor.search_oppen_style == 2 ? true : false" :style="{
          width:infor.search_width + 'px'
        }"  @dblclick.stop="select_parts('style3_input_set','basic_searchs')" 
            :class="[
            $store.state.parts == 'style3_input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.hover_parts == 'style3_input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]"  >
          <el-input v-model="urlValue" v-on:keyup.enter="keyEnter" id="searchCon" 
           >
            <el-select v-model="cnashu" slot="prepend" style="width: 80px">
              <el-option label="产品" value="pro"></el-option>
              <el-option label="文章" value="art"></el-option>
              <el-option label="案例" value="case"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" ></el-button>
          </el-input>
        </div>

        <!-- 样式3 -->
        <div v-if="infor.search_oppen_style == 3 ? true : false" :style="{position: 'relative',
          width:infor.search_btn_icon_div_width + infor.search_btn_icon_margin_left + 'px',
          height:infor.search_btn_icon_div_height + infor.search_btn_icon_margin_top + 'px'
        }">
          <div :style="{
            position: 'absolute',
            width:infor.search_btn_icon_div_width + 'px',
            height:infor.search_btn_icon_div_height + 'px',
            lineHeight:infor.search_btn_icon_div_height + 'px',
            textAlign:'center',
            left:infor.search_btn_icon_margin_left + 'px',
            top:infor.search_btn_icon_margin_top + 'px',
            backgroundColor:infor.search4_bc,
            zIndex:'2'
          }" 
          @dblclick.stop="select_parts('iconstyle_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]" >
            <i :class="infor.icon_class" :style="{
              fontSize: infor.search_btn_icon_fs + 'px',
              transform: 'rotate('+ infor.search_icon_rotate +'deg)',
              color:infor.search_btn_icon_color,
              display: 'inline-block'
            }"></i>
          </div>
          <input type="" name=""  readonly  unselectable="on" :style="{
            position: 'absolute',
            width:infor.search_width + 'px',
            height:infor.search_height + 'px',
            borderTopStyle:infor.searchs_border_top_style ,
            borderTopColor:infor.searchs_border_top_color ,
            borderTopWidth:infor.searchs_border_top_width  + 'px',
            borderRightStyle:infor.searchs_border_right_style ,
            borderRightColor:infor.searchs_border_right_color ,
            borderRightWidth:infor.searchs_border_right_width  + 'px',
            borderBottomStyle:infor.searchs_border_bottom_style ,
            borderBottomColor:infor.searchs_border_bottom_color ,
            borderBottomWidth:infor.searchs_border_bottom_width  + 'px',
            borderLeftStyle:infor.searchs_border_left_style ,
            borderLeftColor:infor.searchs_border_left_color ,
            borderLeftWidth:infor.searchs_border_left_width  + 'px',
            borderRadius:infor.search_radius + 'px',
            fontSize:infor.search_input_fs + 'px',
            color:infor.search_input_color,
            backgroundColor:infor.search_input_bg_color,
            left:infor.search_margin_left + 'px',
            top:infor.search_margin_top + 'px',
            paddingLeft:infor.search_padding_left + 'px'
          }" 
          placeholder="请输入查询信息"
          @dblclick.stop="select_parts('input_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]" >
        </div>

        <!-- 样式4 -->
        <div  v-if="infor.search_oppen_style == 4 ? true : false" class="searchs clearfix">
          <div class="search-left left" :style="{
            cursor:'pointer',
            textAlign: 'center',
            backgroundColor: this.infor.search5_select_bc,
            textAlign:'center',
            width:this.infor.search5_select_width + 'px',
            height:this.infor.search5_select_height + 'px',
            lineHeight: this.infor.search5_select_height + 'px',
            fontSize:this.infor.search5_select_fs + 'px',
            color:this.infor.search5_select_color,
          }" 
          @dblclick.stop="select_parts('select_btn_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'select_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'select_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]" >
            <div class="search-left-top">
              <span :style="{
                fontSize:this.infor.search5_select_fs + 'px'
              }">内容</span>
              <b style="font-family: FontAwesome;" class="fa-chevron-down"></b>
            </div>

            <div class="search-left-btm" style="display: none;">
              <ul>
                <li data-type="pro">产品1</li>
                <li data-type="case">产品2</li>
                <li data-type="artcle">产品3</li>
              </ul>
            </div>

          </div>

          <input type="text"  readonly  unselectable="on" class="search-center left" name="" :placeholder="infor.search_placeholder"  :style="search1Input" 
          @dblclick.stop="select_parts('input_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]" >

          <div class="search-right left" :style="{
            backgroundColor: this.infor.search5_icon_bc,
            textAlign:'center',
            width:this.infor.search5_icon_width + 'px',
            height:this.infor.search5_icon_height + 'px',
            lineHeight: this.infor.search5_icon_height + 'px'
          }" 
          @dblclick.stop="select_parts('style5_icon_btn_set','basic_searchs')" 
          :class="[
          $store.state.parts == 'style5_icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.hover_parts == 'style5_icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]" >
            <i :class="infor.icon_class" :style="{
              fontSize:this.infor.search_icon_width + 'px',
              color:this.infor.search_icon_color,
            }" ></i>
          </div>
        </div>

          <!-- end -->
        </div>
    </div>
</template>

<script>
import Vue from "vue";

Vue.directive("myfocus", {
  inserted(el) {
    console.log("inserted");
  },
  update() {
    console.log('update')
  },
  bind(){
    console.log('bind');
  },
  componentUpdated(){
    console.log('component');
  }
});

Vue.filter('myfilter',function(value,item1,item2){
  console.log(value)
  return +value + 10 + item1 + item2;
})

export default {
  name: "basic_searchs",
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
      indexShow: false,
      cnashu: "pro",
      urlValue: ""
    };
  },
  computed: {
    isshowicons: function() {
      return this.infor.search_oppen_style == 2 ? false : true;
    },
    isshowbtnicon: function() {
      var isClick = this.infor.isShowStyle3Icon || "open";
      return this.infor.search_oppen_style == 1 ||
        (this.infor.search_oppen_style == 2 && isClick == "open")
        ? true
        : false;
    },
    isshowicon: function() {
      return this.infor.search_is_show_icon == "block" ? true : false;
    },
    isshowtxt: function() {
      return this.infor.search_is_show_txt == "block" ? true : false;
    },
    search1Div: function() {
      // width: this.infor.search_div_width + "px",
      // height: this.infor.search_div_height + "px",
      return {
        position: "relative",
        backgroundColor: this.infor.search_div_height_bc
      };
    },
    search1Input: function() {
      return {
        width: this.infor.search_width + "px",
        height: this.infor.search_height + "px",
        border: "0px",
        marginLeft: this.infor.search_margin_left + "px",
        marginTop: this.infor.search_margin_top + "px",
        paddingLeft: this.infor.search_padding_left + "px",
        paddingRight: this.infor.search_padding_right + "px",
        borderRadius: this.infor.search_radius + "px",
        color: this.infor.search_input_color,
        fontSize: this.infor.search_input_fs + "px",
        borderTopStyle: this.infor.searchs_border_top_style,
        borderTopColor: this.infor.searchs_border_top_color,
        borderTopWidth: this.infor.searchs_border_top_width + "px",
        borderRightStyle: this.infor.searchs_border_right_style,
        borderRightColor: this.infor.searchs_border_right_color,
        borderRightWidth: this.infor.searchs_border_right_width + "px",
        borderBottomStyle: this.infor.searchs_border_bottom_style,
        borderBottomColor: this.infor.searchs_border_bottom_color,
        borderBottomWidth: this.infor.searchs_border_bottom_width + "px",
        borderLeftStyle: this.infor.searchs_border_left_style,
        borderLeftColor: this.infor.searchs_border_left_color,
        borderLeftWidth: this.infor.searchs_border_left_width + "px",
        backgroundColor: this.infor.search_input_bg_color
      };
    },
    search1I: function() {
      return {
        fontSize: this.infor.search_icon_width + "px",
        color: this.infor.search_icon_color,
        display: "inline-block",
        position: "absolute",
        left: this.infor.search_absolute_left + "px",
        top: this.infor.search_absolute_top + "px",
        zIndex: 99,
        transform: "rotate(" + this.infor.search_icon_rotate + "deg)"
      };
    },
    search1Span: function() {
      return {
        cursor: "pointer",
        position: "absolute",
        display: this.infor.search_is_show_txt,
        width: this.infor.search_text_width + "px",
        height: this.infor.search_text_height + "px",
        lineHeight: this.infor.search_text_height + "px",
        color: this.infor.search_text_font_color,
        background: this.infor.search_text_color,
        fontSize: this.infor.search_text_fs + "px",
        textAlign: this.infor.search_text_text_align,
        borderRadius: this.infor.search_text_border_radius + "px",
        left: this.infor.search_text_pos_left + "px",
        top: this.infor.search_text_pos_right + "px",
        zIndex: "9"
      };
    },
    search2Div: function() {
      return {
        width: this.infor.search_btn_icon_div_width + "px",
        height: this.infor.search_btn_icon_div_height + "px",
        marginTop: this.infor.search_btn_icon_margin_top + "px",
        marginRight: this.infor.search_btn_icon_margin_right + "px",
        marginBottom: this.infor.search_btn_icon_margin_bottom + "px",
        marginLeft: this.infor.search_btn_icon_margin_left + "px",
        paddingTop: this.infor.search_btn_icon_padding_top + "px",
        paddingRight: this.infor.search_btn_icon_padding_right + "px",
        paddingBottom: this.infor.search_btn_icon_padding_bottom + "px",
        paddingLeft: this.infor.search_btn_icon_padding_left + "px"
      };
    },
    search2I: function() {
      return {
        fontSize: this.infor.search_btn_icon_fs + "px",
        width: this.infor.search_btn_icon_fs + "px",
        height: this.infor.search_btn_icon_fs + "px",
        color: this.infor.search_btn_icon_color,
        display: "block",
        transform: "rotate(" + this.infor.search_iconbtn_rotate + "deg)"
      };
    },
    style5i: function() {
      return {
        display: "inline-block",
        width: 0,
        height: 0,
        border: "5px solid transparent",
        borderTopColor: "#000"
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
    },
    deleteSpace: function(str) {
      var arr1 = str.split("");
      var str2 = "";
      arr1.forEach(function(val) {
        if (val === " ") {
        } else {
          str2 += val;
        }
      });

      return str2;
    },
    keyEnter: function() {
      this.url = location.host + "/search.html?keywords=" + this.urlValue;

      this.urlValue == "";
      this.urlValue = this.deleteSpace($("#{$_id_} .searchCon").val());

      if (this.urlValue == "") {
        alert("输入查询内容");
        return;
      }
      document.location =
        "/search.html?keywords=" + this.urlValue + "&keywordstype=all";
    },
    keyEnter4: function() {
      this.url = location.host + "/search.html?keywords=" + this.urlValue;

      this.urlValue == "";
      this.urlValue = this.deleteSpace($("#{$_id_} .search4-input").val());

      if (this.urlValue == "") {
        alert("输入查询内容");
        return;
      }
      document.location =
        "/search.html?keywords=" + this.urlValue + "&keywordstype=all";
    },
    keyEnters: function() {
      this.url = location.host + "/search.html?keywords=" + this.urlValue;
      this.urlValue == "";
      this.urlValue = this.deleteSpace(
        $("#{$_id_}  .search3 .ivu-input").val()
      );

      if (this.urlValue === "") {
        alert("输入查询内容");
        return;
      }
      document.location =
        "/search.html?keywords=" +
        this.urlValue +
        "&keywordstype=" +
        this.cnashu;
    },
    keyEnters5: function() {
      this.url = location.host + "/search.html?keywords=" + this.urlValue;
      this.urlValue == "";
      this.urlValue = this.deleteSpace(
        $("#{$_id_}  input.search-center").val()
      );

      if (this.urlValue === "") {
        alert("输入查询内容");
        return;
      }
      document.location =
        "/search.html?keywords=" +
        this.urlValue +
        "&keywordstype=" +
        this.cnashu;
    },
    txtchange: function() {},
    changeBorder() {
      $(`#u${this.id} input#searchCon`).css({
        borderTopStyle: this.infor.searchs_border_top_style,
        borderTopColor: this.infor.searchs_border_top_color,
        borderTopWidth: this.infor.searchs_border_top_width,
        borderRightStyle: this.infor.searchs_border_right_style,
        borderRightColor: this.infor.searchs_border_right_color,
        borderRightWidth: this.infor.searchs_border_right_width,
        borderBottomStyle: this.infor.searchs_border_bottom_style,
        borderBottomColor: this.infor.searchs_border_bottom_color,
        borderBottomWidth: this.infor.searchs_border_bottom_width,
        borderLeftStyle: this.infor.searchs_border_left_style,
        borderLeftColor: this.infor.searchs_border_left_color,
        borderLeftWidth: this.infor.searchs_border_left_width
      });
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.changeBorder();
      },
      deep: true
    }
  },
  mounted() {
    this.changeBorder();
  }
};

</script>

<style>
@import "../../../static/icon/search/demo.css";
@import "../../../static/icon/search/iconfont.css";
.locationClass {
  border: 1px solid transparent;
}

.left {
  float: left;
}

.right {
  float: right;
}

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
</style>
