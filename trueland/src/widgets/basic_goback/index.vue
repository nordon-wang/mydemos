<template>
    <div class=" mouseClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_goback')">整体编辑</li>
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
        <div @mouseover="mouseEnter" @mouseout="mouseLeave" >
          <p :style="{
              position:'relative',
              width:infor.goback_a_width + 'px',
              height:infor.goback_a_height + 'px',
              lineHeight:infor.goback_a_height + 'px',
              paddingLeft:infor.goback_a_padding_left + 'px',
              paddingRight:infor.goback_a_padding_right + 'px',
              backgroundColor:isHover ?   infor.goback_a_bc_color_hover : infor.goback_a_bc_color,
              textAlign:infor.goback_a_text_align,
              borderRadius:infor.goback_a_border_radiu + 'px',
              borderStyle:isHover ?  infor.goback_a_border_style_hover : infor.goback_a_border_style ,
              borderColor:isHover ?  infor.goback_a_border_color_hover : infor.goback_a_border_color ,
              borderWidth:isHover ?  infor.goback_a_border_width_hover : infor.goback_a_border_width + 'px',
            }" 
            @dblclick.stop="select_parts('button_set','basic_goback')" 
            :class="[
              $store.state.parts == 'button_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.hover_parts == 'button_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]" 
            >
            <a :style="{
              display:'block',
              color:isHover ?  infor.goback_a_fs_color_hover : infor.goback_a_fs_color ,
              fontSize:infor.goback_a_fs + 'px'
            }" href="javascript:;">{{infor.goback_a_txt}}</a> 
            <i :style="{
              position:'absolute',
              color: isHover ?  infor.goback_icon_fs_color_hover : infor.goback_icon_fs_color ,
              fontSize:infor.goback_icon_fs + 'px',
              left:infor.goback_icon_left + 'px',
              top:infor.goback_icon_top + 'px',
              fontFamily: 'FontAwesome'
            }" 
            @dblclick.stop="select_parts('icon_set','basic_goback')" 
            :class="[
              infor.goback_icon_class,
              $store.state.parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.hover_parts == 'icon_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]" 
              ></i>
          </p>
        </div>
    </div>
</template>

<script>
import myajax from '../../js/ajax';

export default {
  name: "basic_goback",
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
      isHover:false
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
    },
    mouseEnter(){
      this.isHover = true;
    },
    mouseLeave(){
      this.isHover = false;
    }
  },
  mounted(){

    // myajax('get','http://nordon3.com',{
    //     m:'mine',
    //     a:'searchNav'
    // }).then(val => {
    //   console.log('封装ajax请求',val);
    // });
  }
};
</script>

<style>
</style>
