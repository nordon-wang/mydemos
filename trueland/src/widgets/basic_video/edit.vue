<template>
  <div class="bannerEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span @click="templet.p_select_parts('video_set')"
          @mouseover="templet.p_index_hover_parts('video_set')"
          @mouseout="templet.p_index_out_parts()">视频管理</span>
    </div>

    <!--视频管理-->
    <div class="Routine_setting" v-show="$store.state.parts == 'video_set'">
      <div class="setOne">
        <my-select v-model="infor.videoSouceStyle" title="视频格式" :option="$store.state.options.videoStyle"></my-select>
        <my-input v-show="infor.videoSouceStyle == 'flash' ? true : false" v-model="infor.videoUrlFlash" title="url地址" placeholder="请输入视频地址"></my-input>
        <my-input @change.native="myblur"  v-show="infor.videoSouceStyle == 'mp' ? true : false"
         v-model="infor.videoUrl" title="url地址" placeholder="请输入视频地址"></my-input>
        
        <my-number v-model="infor.videoHeight" title="大小设置"></my-number>
        <my-select v-model="infor.videoPosition" title="视频定位" :option="$store.state.options.videoPosition"></my-select>
      </div>

      <div class="setOne" v-show="infor.videoPosition == 'fixed' ? true : false" >
        <my-number v-model="infor.posLeft" title="定位-左"></my-number>
        <my-number v-model="infor.posTop" title="定位-上"></my-number>
      </div>
    </div>

  </div>
</template>

<script>
  import style from './style';
  export default {
    name: 'basic_picture_edit',
    props:{},
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {

          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      }

    },
    created(){

    },
    methods:{
      myblur(value){
      }
    },
    components:{
    },

    mounted(){
    }
  }
</script>
<style >

</style>

