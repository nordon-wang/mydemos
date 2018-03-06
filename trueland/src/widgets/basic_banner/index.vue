<template>
  <div class="indexBanner mouseClass"
       @dblclick.stop="select_parts('banner_routine','basic_banner')"
       :class="[
       $store.state.parts == 'banner_routine' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
       $store.state.hover_parts == 'banner_routine' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
       $store.state.parts == 'defaultstyle' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
       ]"
  >


    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_banner')">组件编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="特效选择" >
          <li class="edit_module" @click.stop="select_parts('','public_effects')">
            <span class="el-icon-news"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('','public_defaultStyle')"></li>
        </my-tooltip>
        <my-tooltip content="样式保存" >
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置" >
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>


      </ul>
    </div>

    <swiper :options="swiperOption" :style="{
            width:infor.bannerSet.width + 'px',
            height:infor.bannerSet.height + 'px'}">
      <swiper-slide v-for="(val,i) in listArr.picList" :key="i">
        <a>
          <!--<img :src="val.src" :alt="val.alt" :title='val.alt' class="banner_img">-->
          <img-effect
            :src="val.src"
            :effectsObj="infor.effectsObj"
            classname="banner_img"
            :styleObj="{
              width:infor.bannerSet.width + 'px',
              height:infor.bannerSet.height + 'px',
            }"
          ></img-effect>
        </a>
      </swiper-slide>

      <!--点状分页器-->
      <div
        class="swiper-pagination swiper-pagination-bullets mouseClass"
        v-show="infor.pageStyle.type =='point' && infor.bannerSet.pagination == 'block'"
        slot="pagination"
        @dblclick.stop="select_parts('banner_page','basic_banner')"
        :class="[
           $store.state.parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
           $store.state.hover_parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
           ]"
      ></div>

      <div class="swiper-button-prev mouseClass"
           @dblclick.stop="select_parts('banner_btn','basic_banner')"
           :style="{
                     top:(infor.bannerSet.height-infor.btnStyle.height)/2 + 'px',
                     display:infor.bannerSet.btn,
                     background:infor.btnStyle.background,
                     fontSize:infor.btnStyle.fontSize + 'px',
                     color:infor.btnStyle.color,
                     width:infor.btnStyle.width + 'px',
                     height:infor.btnStyle.height + 'px',
                     textAlign:'center',
                     lineHeight:infor.btnStyle.height + 'px',
                     marginTop:infor.btnStyle.marginTop + 'px',
                     marginLeft:infor.btnStyle.marginLR + 'px',
                     backgroundImage:'none',
                     fontFamily:'FontAwesome'
                     }"
           :class="[
           infor.btnStyle.leftIcon,
           $store.state.parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
           $store.state.hover_parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
           ]"  slot="button-prev"></div>

      <div class="swiper-button-next mouseClass"
           @dblclick.stop="select_parts('banner_btn','basic_banner')"
           :style="{
                     display:infor.bannerSet.btn,
                     top:(infor.bannerSet.height-infor.btnStyle.height)/2 + 'px',
                     background:infor.btnStyle.background,
                     fontSize:infor.btnStyle.fontSize + 'px',
                     color:infor.btnStyle.color,
                     width:infor.btnStyle.width + 'px',
                     height:infor.btnStyle.height + 'px',
                     textAlign:'center',
                     lineHeight:infor.btnStyle.height + 'px',
                     marginTop:infor.btnStyle.marginTop + 'px',
                     marginRight:infor.btnStyle.marginLR + 'px',
                     backgroundImage:'none',
                     fontFamily:'FontAwesome'
                  }"
           :class="[
           infor.btnStyle.rightIcon,
           $store.state.parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
           $store.state.hover_parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
           ]" slot="button-next"></div>

    </swiper>
    <!--缩略图分页器-->
    <div class="thumbnail-page mouseClass"
         v-show="infor.pageStyle.type =='thumbnail' && infor.bannerSet.pagination == 'block'"
         @dblclick.stop="select_parts('banner_page','basic_banner')"
         :style="{
        left:infor.pageStyle.left + 'px'
      }"
         :class="[
           $store.state.parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
           $store.state.hover_parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
           ]"
    >
      <img v-for="(val,i) in listArr.picList"
           :src="val.src"
           :style="{
                width:infor.pageStyle.width + 'px',
                height:infor.pageStyle.height + 'px',
                margin:infor.pageStyle.margin + 'px',
                borderWidth:infor.pageStyle.borderWidth + 'px',
                borderColor:infor.pageStyle.borderColor,
            }"
      ><!--:class="{'thumbnail-page-select' : index == i}"-->
    </div>

  </div>
</template>

<script>
  export default {
    name: 'basic_banner',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      listArr:{
        type:Object,
        default:null,
      },
      id:{
        type:String,
        default:'',
      },
      pid:{
        type:String,
        default:'',
      },
      rowType:{
        type:String,
        default:'',
      },


    },
    data () {
      return {
        index:1,

        swiperOption: {
          simulateTouch:false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination'
          }
        }
      }
    },
    components:{

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

    },

    mounted(){

    }
  }
</script>
