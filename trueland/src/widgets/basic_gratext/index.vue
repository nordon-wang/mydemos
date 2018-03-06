<template>
<div class="dateIndex mouseClass " @dblclick.stop="stopProp($event)"  >
    <!--编辑框-->
    <div class="public_edit">
      <!-- <ul>
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
      </ul> -->
    </div>
    <div  id="date" :style="moduleClass">
      <div v-show="infor.picStyle == 0 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 1 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position">
        <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 2 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position">
        <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 3 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"></div>
        <div :style="imgstyle2" class="graphic_position">
          <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 4 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position" style="float: left;">
          <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 5 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"  style="float: left;"></div>
        <div :style="imgstyle2" class="graphic_position" style="float: right;">
          <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 6 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position" style="float: left;">
          <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 7 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position" style="float: right;">
          <a :href="infor.gra_url" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
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
      datas: {}
    };
  },
  computed: {
    moduleClass(){
      return {
        width:this.infor.width + 'px',
        height:this.infor.height + 'px'
      };
    },
    imgstyle: function() {
      return {
        width: this.infor.graWidth + "px",
        height: this.infor.graHeight + "px",
        opacity: this.infor.gra_style_opacity / 100,
        borderRadius: this.infor.border_radius_s + "px",
        borderWidth: this.infor.border_gra_w + "px",
        borderStyle: this.infor.border_gra_s,
        borderColor: this.infor.border_gra_c
      };
    },
    imgstyle2: function() {
      return {
        width: this.infor.graWidth + "px",
        height: this.infor.graHeight + "px",
        marginTop: this.infor.gra_margin_top + "px",
        marginRight: this.infor.gra_margin_right + "px",
        marginBottom: this.infor.gra_margin_bottom + "px",
        marginLeft: this.infor.gra_margin_left + "px"
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
    stopProp(e){
      // 防止双击
    },
    initData(){
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
			let _pid = this.pid;
			let _rowtype = this.rowType;
			let _id = this.id;

			let IndexObj = this.templet.p_find_moduleIndex({
				pid: _pid,
				type: _rowtype,
				id: _id
			});

			let rowIndex = IndexObj.row;
			let moduleIndex = IndexObj.module;
      let rowtype = this.rowType;
      
      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css;
      
      this.$set(this.infor,'width',moduleObj.module_width || 300);
      this.$set(this.infor,'height',moduleObj.module_height || 200);

    }
  },
  mounted() {
    
    // 兼容老版本
    if(!this.infor.width){
      // this.$set(this.infor,'width',120);
      // this.$set(this.infor,'height',44);
      this.initData();
    }



}
};
</script>

<style  lang="scss" scoped="" type="text/css" >
.dateIndex {
  border: 1px solid transparent;
}
</style>
