<template>
<div class="customeditIndex mouseClass "  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_customedit_model')">整体编辑</li>
        <my-tooltip content="样式设置">
          <li class="edit_module el-icon-edit" @click.stop="select_parts('','basic_customedit')"></li>
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
    <div  id="customedit" 
      @dblclick.stop="select_parts('con_set','basic_customedit_model')" 
      :class="[
        $store.state.parts == 'con_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'con_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]" :style="divStyle" >
      <div v-html="infor.contents" class="customeditCon" ></div>
    </div>
</div>
</template>

<script>
export default {
  name: "basic_customedit",
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
      datas: {
      }
    };
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
    divStyle(){
      return {
        width:`${this.infor.width}px`,
        height:`${this.infor.height}px`,
      }
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
    initPos(){
      if(this.infor.custom_pos_style == 2){
        $(this.$parent.$el).css({
          'position':'fixed',
          'left':this.infor.fixedLeft + 'px',
          'top':this.infor.fixedTop + 60 + 'px'
        });
      }else{
        $(this.$parent.$el).css({
          'position':'absolute',
          'left':this.$parent.css.module_left + 'px',
          'top':this.$parent.css.module_top + 'px'
        });
      }
    }
  },
  watch:{
    infor:{
      handler: function (val, oldVal) {
        if(val.custom_pos_style == 2){
          $(this.$parent.$el).css({
            'position':'fixed',
            'left':val.fixedLeft + 'px',
            'top':val.fixedTop + 60 + 'px'
          });
        }else{
          $(this.$parent.$el).css({
            'position':'absolute',
            'left':this.$parent.css.module_left + 'px',
            'top':this.$parent.css.module_top + 'px'
          });
        }
      },
      deep: true
    }
  },
  mounted() {
    
    // 兼容老版本
    if(!this.infor.width){
      this.$set(this.infor,'width',120);
      this.$set(this.infor,'height',44);
    }

    // 初始化位置 
    this.initPos();

  }
};
</script>

<style  lang="scss" scoped="" type="text/css" >
.dateIndex {
  border: 1px solid transparent;
}

</style>
