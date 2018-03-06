<template>
  <div class="picture mouseClass">
    <!--编辑框-->
    <div class="public_edit" >
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_video')">整体编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('video_set','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>

    <div  :style="conStyle" 
      class="mouseClass wDefaultBorder"
      @dblclick.stop="select_parts('video_set','basic_video')" 
      :class="[
        $store.state.parts == 'video_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'video_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]" >
      <video id="videoStyle2" v-if="videoTypes == 'mp4' ? true : false " controls="" autoplay="" :style="panduan2">
          <source class="videoSource" :src="infor.videoUrl" type="video/mp4">
      </video>

      <embed v-if="videoTypes == 'youkuiframe' ? true : false "
       id="633" :style="panduan2" allowscriptaccess="never"
        style="visibility: visible;z-index:-2" pluginspage="http://get.adobe.com/cn/flashplayer/"
         flashvars="playMovie=true&amp;auto=1" allowfullscreen="true"
          quality="hight" :src='infor.realUrl' type="application/x-shockwave-flash" wmode="opaque">

      <iframe  v-if="videoTypes == 'qqiframe' ? true : false "
       frameborder="0" style="visibility: visible;z-index:-2" :style="panduan2" 
        :src='infor.realUrl' allowfullscreen></iframe>
      
      <div  v-if="videoTypes == 'qqiframe' ? true : false " :style="{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
      }">
      </div>

      <embed :style="panduan2" v-if="videoTypes == 'qqembed' ? true : false " :src="infor.realUrl" allowFullScreen="true" quality="high"  align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
    </div>
  </div>
</template>

<script>
export default {
  name: "basic_video",
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
      showToolBar: false
    };
  },
  watch:{
    infor:{
      handler: function (val, oldVal) {
        if(val.videoPosition == 'fixed'){
          $(this.$parent.$el).css({
            'position':val.videoPosition,
            'left':val.posLeft + 'px',
            'top':val.posTop + 60 + 'px'
          });
        }else{
          $(this.$parent.$el).css({
            'position':val.videoPosition,
            'left':this.$parent.css.module_left + 'px',
            'top':this.$parent.css.module_top + 'px'
          });
        }
      },
      deep: true
    }
  },
  computed: {
    videoTypes: function() {
      //根据传入的地址 来判断已何种方式显示

      var videoUrl = $.trim(this.infor.videoUrl);
      
      if(!videoUrl){
        return '';
      }
      var dotIndex = videoUrl.lastIndexOf(".");

      var isMp4 = videoUrl.substr(dotIndex + 1);

      //mp4
      if (isMp4 == "mp4") {
        return "mp4";
      }
      // debugger;

      var _isFrame = $(this.infor.videoUrl).length && $(this.infor.videoUrl)[0].nodeName == "IFRAME";
      var _isEmbed = $(this.infor.videoUrl).length && $(this.infor.videoUrl)[0].nodeName == "EMBED";

      //优酷
      if (_isFrame && this.infor.videoUrl.indexOf("youku.com") >= 0) {
        this.infor.videoSourceTyoe = "youkuiframe";

        var str = $(this.infor.videoUrl).attr("src");
        var arr = str.split("/");
        var len = arr.length;
        var lastArr = arr[len - 1];

        this.infor.realUrl = "http://player.youku.com/player.php/sid/" + lastArr + "/v.swf";

        this.infor.picStyles = 4;

        return "youkuiframe";
      }

      //腾讯
      if (_isFrame && this.infor.videoUrl.indexOf("qq.com") >= 0) {
        this.infor.videoSourceTyoe = "qqiframe";
        this.infor.realUrl = $(this.infor.videoUrl).attr("src");

        this.infor.picStyles = 5;
        return "qqiframe";
      }

      if (_isEmbed && this.infor.videoUrl.indexOf("qq.com") >= 0) {
        this.infor.videoSourceTyoe = "qqembed";
        this.infor.realUrl = $(this.infor.videoUrl).attr("src");

        this.infor.picStyles = 6;
        return "qqembed";
      }

      return "mp4";
    },
    conStyle(){
      return {
        width:this.infor.videoWidth + 'px',
        height:this.infor.videoHeight + 'px',
      };
    },
    panduan3:function(){
      return {
        display:this.infor.picStyles == 3 ? 'block' : 'none',
        height:this.infor.videoHeight + 'px'
      };
    },
    panduan2:function(){
      return {
        display:this.infor.picStyles != 3 ? 'block' : 'none',
        width:this.infor.videoWidth + 'px',
        height:this.infor.videoHeight + 'px',
      };
    },
    panduan5:function(){
      return {
        display:this.infor.picStyles == 5 ? 'block' : 'none',
        height:this.infor.videoHeight + 'px',
        width:this.infor.videoWidth + 'px'
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
    changeModule(){
      if(this.infor.videoPosition == 'fixed'){
          $(this.$parent.$el).css({
            'position':this.infor.videoPosition,
            'left':this.infor.posLeft + 'px',
            'top':this.infor.posTop + 60 + 'px'
          });
      }

    }
  },
  mounted() {
    this.changeModule();
  }
};
</script>
<style>
.picture {
  position: relative;
  border: 1px solid transparent;
}
</style>
