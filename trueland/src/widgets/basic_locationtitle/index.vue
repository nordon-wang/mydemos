<template>
    <div class=" mouseClass locationClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_locationtitle')">整体编辑</li>
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
        @dblclick.stop="select_parts('fun_set','basic_locationtitle')" 
        :class="[
        $store.state.parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'fun_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]"
        >
            <h2 :style="h2" v-if="infor.location_title_data_source === 'self'" >{{infor.location_title_self_data}}</h2>
            <h2 :style="h2" v-else>默认数据</h2>
            <!-- <iframe allowtransparency="true" frameborder="0" width="317" height="28" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=1&t=1&v=0&d=1&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=0&a=1&c=54511&w=317&h=28&align=center"></iframe> -->
        </div>
    </div>
</template>

<script>
export default {
  name: "basic_locationtitle",
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
    h2:function(){
        return {
            background: this.infor.location_title_bc_color ,
            color: this.infor.location_title_fs_color ,
            textAlign: this.infor.location_title_text_align ,
            fontSize: this.infor.location_title_fs + 'px',
            borderRadius: this.infor.location_title_border_radius + 'px',
            paddingTop: this.infor.location_title_padding_top + 'px',
            paddingBottom: this.infor.location_title_padding_bottom + 'px',
            borderStyle:this.infor.location_title_border_style,
            borderWidth:this.infor.location_title_border_width + 'px',
            borderColor:this.infor.location_title_border_color,
            fontWeight:this.infor.location_title_fs_weight,
            marginTop: this.infor.location_title_margin_top + 'px',
            marginBottom: this.infor.location_title_margin_bottom + 'px',
            width:this.infor.width + 'px',
            height:this.infor.height + 'px',
            lineHeight:this.infor.height + 'px',
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
