<template>
  <div class="left_sidebar">

    <div class="left_sidebar_btn" @click="dialogShow" v-show="!isShow">
      <div class="frame">
        <i class="el-icon-menu"></i>
        <span>组件</span>
      </div>
    </div>

    <div class="left_sidebar_dialog " v-show="isShow">
      <div class="frame">
        <i class="el-icon-circle-close-outline close" @click="close"></i>
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="" name="icon" disabled>
            <span slot="label"><i class="el-icon-menu"></i></span>
          </el-tab-pane>

          <el-tab-pane label="组件" name="module">
            <ul class="PendantList" id="PendantList">
              <li v-for="(val,i) in $store.state.PendantList" :data-name="val.name" :key="i" class="Pendant_one">
                <img :src="val.icon">
                <span>{{val.title}}</span>
              </li>
            </ul>

          </el-tab-pane>

          <el-tab-pane label="页面" name="web">
              <h1>页面列表</h1>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>


  </div>
</template>

<script>


  export default {
    name: 'left_sidebar',
    data () {
      return {
        activeName:'module',
        isShow:false
      }
    },
    methods:{
      dialogShow(){
        this.isShow = true;
      },
      close(){
        this.isShow = false;
      }
    },
    components:{

    },

    mounted(){
      const that = this;

      //组件绑定拖拽
      $('#PendantList').children('li').draggable({
        helper: "clone",
        opacity: 0.6,
        drag:function (event, ui) {
          //console.log(ui.position);
        },
        start:function (event, ui) {
          //that.isShow = false;
          //let name = $(this).attr('data-name');
          //$('.left_sidebar_dialog').css('display','none');
          //ui.helper.css('display','block');

        },
        stop:function (event, ui) {
          //$('.left_sidebar_dialog').css('opacity',1);
        }

      });


    }
  }
</script>
