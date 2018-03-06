<template>
  <div class="bannerEdit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
        <span @click="templet.p_select_parts('banner_pic')"
              @mouseover="templet.p_index_hover_parts('banner_pic')"
              @mouseout="templet.p_index_out_parts()"
        >图片管理</span>
        <span
          @click="templet.p_select_parts('banner_routine')"
          @mouseover="templet.p_index_hover_parts('banner_routine')"
          @mouseout="templet.p_index_out_parts()"
        >常规设置</span>
        <span
          @click="templet.p_select_parts('banner_btn')"
          @mouseover="templet.p_index_hover_parts('banner_btn')"
          @mouseout="templet.p_index_out_parts()"
        >按钮设置</span>
        <span
          @click="templet.p_select_parts('banner_page')"
          @mouseover="templet.p_index_hover_parts('banner_page')"
          @mouseout="templet.p_index_out_parts()"
        >分页器设置</span>
    </div>

    <!--常规设置-->
    <div class="Routine_setting" v-show="$store.state.parts == 'banner_routine'">

      <div class="setOne">
        <my-select v-model="infor.bannerSet.btn" title="左右按钮" :option="$store.state.options.twoBtn"></my-select>
        <my-select v-model="infor.bannerSet.pagination" title="分页器显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.bannerSet.width" title="图片宽度"></my-number>
        <my-number v-model="infor.bannerSet.height" title="图片高度"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.bannerSet.time" title="切换时间(毫秒)"></my-number>
        <my-number v-model="infor.bannerSet.speed" title="动画速度(毫秒)"></my-number>
        <my-select v-model="infor.bannerSet.animation" title="动画效果" :option="$store.state.options.animation"></my-select>
        <my-select v-model="infor.bannerSet.pattern" title="动画模式" :option="$store.state.options.pattern"></my-select>
      </div>


    </div>

    <!--左右按钮-->
    <div class="btn_setting" v-show="$store.state.parts == 'banner_btn'">

      <div class="setOne">
        <my-number v-model="infor.btnStyle.width" title="按钮宽度"></my-number>
        <my-number v-model="infor.btnStyle.height" title="按钮高度"></my-number>
        <my-number v-model="infor.btnStyle.marginTop" title="上边距"></my-number>
        <my-number v-model="infor.btnStyle.marginLR" title="左右边距"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.btnStyle.color" title="图标颜色"></my-color>
        <my-color v-model="infor.btnStyle.background" title="图标背景色"></my-color>
        <my-number v-model="infor.btnStyle.fontSize" title="图标大小"></my-number>
      </div>
    </div>

    <!--分页器-->
    <div class="page_setting" v-show="$store.state.parts == 'banner_page'">
      <div class="setOne">
        <my-select v-model="infor.pageStyle.type" title="分页器类型" :option="$store.state.options.pageType"></my-select>
        <my-number v-model="infor.pageStyle.margin" title="左右间距："></my-number>
        <my-number v-model="infor.pageStyle.width" title="分页器宽度"></my-number>
        <my-number v-model="infor.pageStyle.height" title="分页器高度"></my-number>
      </div>

      <div class="setOne" v-if="infor.pageStyle.type == 'thumbnail'">
        <my-number v-model="infor.pageStyle.left" title="靠左距离"></my-number>
        <my-number v-model="infor.pageStyle.bottom" title="靠下距离"></my-number>
        <my-number v-model="infor.pageStyle.borderWidth" title="边框宽度"></my-number>
      </div>

      <div class="setOne" v-if="infor.pageStyle.type == 'point'">
        <my-color v-model="infor.pageStyle.background" title="默认颜色"></my-color>
        <my-color v-model="infor.pageStyle.selectbackground" title="选中颜色"></my-color>
        <my-number v-model="infor.pageStyle.borderRadius" title="圆角半径"></my-number>
        <my-select v-model="infor.pageStyle.textAlign" :option="$store.state.options.textAlign" title="分页器位置"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.pageStyle.borderColor" title="边框颜色"></my-color>
      </div>

    </div>

    <!--图片管理-->
    <div class="pic_admin" v-show="$store.state.parts == 'banner_pic'">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(val,i) in listArr.picList" :key="i">
          <div class="child">
            <div class="imgFrame">
              <img :src="val.src">
            </div>
            <p class="edit">
              <i class="el-icon-edit" @click="edit_pic(val,i)"></i>
              <i class="el-icon-delete" @click="del_pic(i)"></i>
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="addPic" @click="addPic()">
            <i class="el-icon-plus"></i>
          </div>
        </swiper-slide>


        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <!--样式选择-->
    <div class="defaultstyle" v-if="$store.state.parts == 'defaultstyle'">
      <my-defaultstyle :infor.sync="infor"></my-defaultstyle>
    </div>

    <div class="banner_pic_edit" v-if="visible">
      <el-dialog
        title="图片编辑"
        :modal-append-to-body="false"
        :before-close="handleClose"
        :visible="true">
        <div class="pic_edi_frame">
          <div class="addStyle_imgFrame">
            <p @click="selePic">点击选择图片</p>
            <img :src="temporaryPicInfor.src">
          </div>
          <div class="setOne">
            <my-select v-model="temporaryPicInfor.openMode" title="打开方式" :option="$store.state.options.open"></my-select>
          </div>
          <div class="setOne">
            <my-input v-model="temporaryPicInfor.link" title="跳转链接"></my-input>
          </div>
          <div class="setOne">
            <my-input v-model="temporaryPicInfor.alt" title="图片说明"></my-input>
          </div>


        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="editSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>



  </div>
</template>

<script>
  import style from './style';


  export default {
    name: 'basic_banner_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        borderWidth:2,
        borderColor:'#ccc',
        borderStyle:'solid',
        swiperOption: {
          slidesPerView: 5,
          spaceBetween:5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        visible:false,
        editIndex:0,
        temporaryPicInfor:{
          src:'',
          link:'',
          alt:'',
          openMode:'_blank',
        }

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
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
        },
        deep: true
      },
    },
    created(){

    },
    components:{
    },
    methods:{
      del_pic(i){
        this.listArr.picList.splice(i,1);
      },
      handleClose(){
        this.temporaryPicInfor.src = '';
        this.temporaryPicInfor.link = '';
        this.temporaryPicInfor.alt = '';
        this.temporaryPicInfor.openMode = '_blank';
        this.visible = false;
      },
      //图片选择
      selePic(){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (src) {
          that.temporaryPicInfor.src = src;
        }
      },
      addPic:function () {
        var obj = {
          src:'static/image/pic.png',
          link:'',
          alt:'',
          openMode:'_blank',
        };
        this.listArr.picList.unshift(obj);
      },
      editSure(){
        const index = this.editIndex;//编辑的index
        const edit_one = JSON.parse(JSON.stringify(this.temporaryPicInfor));//编辑的那个
        let list = JSON.parse(JSON.stringify(this.listArr.picList));
        list[index] = edit_one;
        this.listArr.picList = list;
        this.visible = false;
      },
      edit_pic(val,i){
        this.visible = true;
        this.editIndex = i;
        this.temporaryPicInfor = JSON.parse(JSON.stringify(val));
      }
    },

    mounted(){}
  }
</script>
