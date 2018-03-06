<template>
  <div class="bottomBar" :class="isShow ? 'bottomBarShow' : ''">
    <h1 class="edit_title">
      <i class="el-icon-edit" v-if="$store.state.parts == ''"></i>
      <i class="el-icon-back" v-if="$store.state.parts != ''" @click="back"></i>
      <span>{{editName}}</span>
      <span v-show="$store.state.parts != ''">/ {{second}}</span>
      <i class="el-icon-circle-close-outline close" @click="templet.p_bottomBar_close()"></i>
    </h1>

    <div class="content">

      <component :is="getModuleName"></component>

      <public-animated
        v-if="$store.state.module_name == 'public_animated'"
      ></public-animated>

      <basic-module
        v-if="$store.state.module_name == 'basic_module'">
      </basic-module>

      <!-- <layout-row-edit
        v-if="$store.state.module_name == 'layout_row'"
      ></layout-row-edit> -->

    </div>
  </div>
</template>

<script>
  import publicAnimated from '../public/edit_animated';
  import basicModule from '../../widgets/basic_module/edit';

  import basicBannerEdit from '../../widgets/basic_banner/edit';
  import basicPictureEdit from '../../widgets/basic_picture/edit';
  import basicDateEdit from '../../widgets/basic_date/edit';
  import basicDate from '../../widgets/basic_date/edit';
  import publicEffects from '../public/edit_effects';
  import publicDefaultStyle from '../public/edit_defaultStyle';
  import layoutRowEdit from '../../widgets/layout_row/edit';
  import styleList from '../../base/style_list_config';
  import basicGobackEdit from '../../widgets/basic_goback/edit';
  import basicLocationEdit from '../../widgets/basic_location/edit';
  import basicLocationtitleEdit from '../../widgets/basic_locationtitle/edit';
  import basicVideoEdit from '../../widgets/basic_video/edit';
  import basicSearchsEdit from '../../widgets/basic_searchs/edit';
  import basicLanguageEdit from '../../widgets/basic_language/edit';
  import basicCustomeditEdit from '../../widgets/basic_customedit/edit';
  import basicGratextEdit from '../../widgets/basic_gratext/edit';
  import basicLinksEdit from '../../widgets/basic_links/edit';
// basicLinksEdit 组件名称 要规范 不然渲染不出来 

  export default {
    name: 'bottomBar',
    data () {
      return {
        isShow:false,
        editName:'',
        second:'',
        //所有能够触发底部编辑栏的挂件配置
        moduleList:[
          'layout_row',
          'basic_banner',
          'basic_picture',
          'basic_date',
          'public_animated',
          'public_defaultStyle',
          'public_effects',
          'basic_module',
          'basic_goback',
          'basic_location',
          'basic_locationtitle',
          'basic_video',
          'basic_searchs',
          'basic_language',
          'basic_customedit',
          'basic_gratext',
          'basic_links'
        ]

      }
    },
    watch:{
      //监听当前选中的挂件,从而决定不同的编辑渲染
      '$store.state.module_name':function (val) {
        let isHave = this.moduleList.indexOf(val);
        if( isHave >= 0){
          this.isShow = true;
        }
        else{
          this.isShow = false;
        }

        this.editName = this.templet.p_nameToChinese(val);
      },
      '$store.state.parts':function (val) {
        this.second = this.templet.p_partsToChinese(val);
      }
    },
    computed:{
      getModuleName(){
        let str = this.$store.state.module_name;
        // 初始化判断 为空字符串时  不显示底部弹出框
        if(str){
          let newStr = str.replace(/\_/ig,'-') + '-edit';
          // 自定义文本 链接 basic_module 动画 特殊处理的 不需要显示底部弹出框
          if(newStr != 'basic-customedit-model-edit' && newStr != 'basic-links-model-edit' && newStr != 'public-animated-edit' && newStr != 'basic-module-edit'){
            return newStr;
          }
        }
        
        return '';
      }
    },
    methods:{
      back(){
        this.$store.state.parts = '';
      },
      close(){
        this.$store.state.module_name = '';
        this.$store.state.parts = '';
        this.$store.state.module_Data = null;
        this.$store.state.hover_parts = '';

      }
    },
    components:{
      basicBannerEdit,
      basicPictureEdit,
      basicDateEdit,
      layoutRowEdit,
      publicAnimated,
      publicDefaultStyle,
      publicEffects,
      basicModule,
      basicGobackEdit,
      basicLocationEdit,
      basicLocationtitleEdit,
      basicVideoEdit,
      basicSearchsEdit,
      basicLanguageEdit,
      basicCustomeditEdit,
      basicGratextEdit,
      basicLinksEdit
    },
    created(){

    },
    mounted(){
      this.editName = this.templet.p_nameToChinese(this.$store.state.module_name);
    }
  }
</script>
