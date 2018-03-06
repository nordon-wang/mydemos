<template id="DefaultStyleComponent">
  <div class="DefaultStyleComponent">
    <div class="body">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(val,i) in style" :key="i">
          <div class="child"
               @click="selectStyle(val,i)"
               :class="{'childSel' : $store.state.module_Data.data.infor.styleId == val.id}">
            <p>
              <i class="el-icon-view"
                 style="background: #0abf1a"
                 @click="look($event,val.img)"
              ></i>
              <i class="el-icon-delete"
                 style="background: #f00"
                 @click="deleStyle($event,val.id,i)"
              ></i>
            </p>

            <div class="imgFrame">
              <img :src="$store.state.domain + '/' + val.img">
            </div>

            <span>{{val.name}}</span>

          </div>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <el-dialog
      title="样式预览"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="60%">
      <div class="lookImg">
        <img :src="$store.state.domain + '/' + src">
      </div>

    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: 'DefaultStyle',
    props:{
      infor:{
        type:Object,
        default:null,
      },
    },
    data () {
      return {
        src:'',
        addStyleVisible:true,
        dialogVisible:false,
        selectId:null,
        style:[],
        styleSaveModal:false,
        styleSaveObj:{
          name:'',
          widget_name:this.$store.state.module_Data.name,
          style:'',
          img:'',
          public:'false'
        },
        deleStyleSureModal:true,
        swiperOption: {
          slidesPerView: 5,
          spaceBetween:5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }

      }
    },
    watch:{


    },
    methods:{

      //图片选择
      selePic(){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (src) {
          that.styleSaveObj.img = src;
        }
      },
      //默认样式选择
      selectStyle:function (val,i) {
        let styleinfor = JSON.parse(val.style);
        styleinfor.styleId = val.id;//改变数据源
        this.templet.p_editModule({
          key:'infor',
          val:styleinfor
        });
      },
      deleStyle:function (e,id,i) {
        const that = this;
        this.$confirm('删除默认样式?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
              that.templet.p_ajax({
                type:'post',
                url:'/index.php?app=site&m=desktop_theme_widgetstyle&a=del',
                data:{id}
              }).then(function (data) {
                if(data){
                  if(data != 'null' && data == 'true'){
                    that.style.splice(i,1);
                  }
                  else{
                    that.$message.error('网络异常，请稍后尝试！');
                  }
                }
                else{
                  that.$message.error('网络异常，请稍后尝试！');
                }
              }).catch(function (e) {
                that.$message.error('网络异常，请稍后尝试！');
              });
          }).catch(function () {
            return false;
          });

        //阻止时间冒泡
        e.stopPropagation()

      },

      look:function (e, src) {
        e.stopPropagation();
        this.dialogVisible = true;
        this.src = src;
      }

    },
    components:{

    },

    mounted(){
      const that = this;
      this.templet.p_ajax({
        type:'post',
        url:'/index.php?app=site&m=desktop_theme_widgetstyle&a=getlist',
        data:{
          widget_name:this.$store.state.module_Data.name,
        }
      }).then(function (data) {
        if(data){
          if(data != 'null'){
            var list = JSON.parse(data);
            for(var i = 0;i<list.length;i++){
              that.style.unshift(list[i]);
            }
          }
          else{
            that.$message.error('网络异常，请稍后尝试！');
          }
        }
        else{
          that.$message.error('网络异常，请稍后尝试！');
        }
      }).catch(function (e) {
        that.$message.error('网络异常，请稍后尝试！');
      })




    }
  }
</script>
