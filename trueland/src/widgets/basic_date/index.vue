<template>
<div class="dateIndex mouseClass " :style="moduleClass"  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_date')">整体编辑</li>
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
    <div  id="date" 
      @dblclick.stop="select_parts('','basic_date')" >
      <div :style="dataStyle" 
      class="mouseClass wDefaultBorder "
      @dblclick.stop="select_parts('date_set','basic_date')" 
      :class="[
        $store.state.parts == 'date_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'date_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]" >
        {{datas.year}}{{infor.year}}{{datas.months}}{{infor.month}}{{datas.day}}{{infor.day}}
      </div>
      <div :style="timeStyle" 
      class="mouseClass wDefaultBorder"
      @dblclick.stop="select_parts('time_set','basic_date')" 
      :class="[
        $store.state.parts == 'time_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'time_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]" >
        {{datas.hours}}{{infor.hours}}{{datas.minutes}}{{infor.minutes}}{{datas.seconds}}{{infor.seconds}}
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "basic_date",
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
      datas:{
        year:'',
        months:"",
        day:"",
        hours:"",
        minutes:"",
        seconds:"",
      }
    };
  },
  computed:{
    moduleClass(){
      return {
        width:this.infor.width + 'px',
        height:this.infor.height + 'px',
        lineHeight:this.infor.height + 'px',
        textAlign: 'center'
      };
    },
    dataStyle(){
      return {
        display:this.infor.date_is_show === 'block' ? 'inline-block' : 'none',
        fontSize:this.infor.date_fs + 'px',
        color:this.infor.date_color,
        marginRight:this.infor.date_mr + 'px',
        height:this.infor.height - 2 + 'px'
      };
    },
    timeStyle(){
      return {
        display:this.infor.time_is_show  === 'block' ? 'inline-block' : 'none',
        fontSize:this.infor.time_fs + 'px',
        color:this.infor.time_color,
        height:this.infor.height - 2 + 'px'
      };
    }
  },
  methods:{
      select_parts(partsName,moduleName){
        this.templet.p_index_select_parts({
          partsName,
          moduleName,
          id:this.id,
          pid:this.pid,
          type:this.rowType
        })
      },
      setDate(){
        var date = new Date();
        this.$data.datas.year = date.getFullYear();
        this.$data.datas.months = date.getMonth() + 1;
        this.$data.datas.day = date.getDate();
      },
      setTime(){
        let timer;
        timer = setInterval(() => {
          var date = new Date();
          this.$data.datas.hours = date.getHours();
          this.$data.datas.minutes = date.getMinutes();
          this.$data.datas.seconds = date.getSeconds();
        },500);
      }
  },
  updated(){
    var date = new Date();
    this.$data.datas.hours = date.getHours();
    this.$data.datas.minutes = date.getMinutes();
    this.$data.datas.seconds = date.getSeconds();
  },
  mounted(){
    this.setDate();
    this.setTime();

    // 兼容老版本
    if(!this.infor.width){
      this.$set(this.infor,'width',250);
      this.$set(this.infor,'height',44);
    }
  }
};
</script>

<style  lang="scss" scoped="" type="text/css" >
.dateIndex{
  border: 1px solid transparent;
}

</style>
