<template id="icon_search">
  <div class="icon_search">

    <div class="icon_search_content">
      <el-dialog
        title="图标选择"
        :modal-append-to-body="false"
        :before-close="handleClose"
        :visible="$store.state.icon_IsOpen">

        <div class="icon_search_body">
          <p class="SearchLine">
            <strong>搜索内容：</strong>
            <el-input
              v-model="SearchContent"
              style="width: 300px;"
              placeholder="请输入内容"></el-input>
          </p>
          <ul class="iconList">
            <li v-for="val in iconListView" :class="[val.name, { 'sLi': val.name == selectIcon}]" @click="iconComponentSelect(val)"></li>
          </ul>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button  @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="iconSeleSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>


  </div>
</template>

<script>

  export default {
    name: 'icon_search',
    props:{},
    data () {
      return {
        SearchContent:'',//icon搜索内容
        iconListView:[],//icon列表
        iconSearchSave:[],//多存储一份，用于做搜索
      }
    },
    computed:{
      selectIcon(){
        return this.$store.state.icon_select_now;
      }
    },
    watch:{
      SearchContent:function(){
        this.SearchStart();
      }
    },


    methods:{
      //图标搜索
      SearchStart:function(){
        var val = this.SearchContent;
        if(val){
          var list = [];
          for(var i = 0;i<this.iconSearchSave.length;i++){
            for(var j = 0;j<this.iconSearchSave[i].value.length;j++){
              if(this.iconSearchSave[i].value[j].indexOf(val) > -1){
                list.push(this.iconSearchSave[i]);
                break;
              }
            }
          }
          this.iconListView = list;
        }
        else{
          this.iconListView = this.iconSearchSave;
        }

      },
      iconSeleSure(){
        this.$store.state.icon_Callback(this.selectIcon);
        this.SearchContent = '';
        this.$store.state.icon_IsOpen = false;
      },
      handleClose(){
        this.SearchContent = '';
        this.$store.state.icon_IsOpen = false;
      },
      iconComponentSelect(val){
        this.$store.state.icon_select_now = val.name;
      }



    },
    components:{

    },

    mounted(){
      const that = this;
      //图标列表请求(本地请求)
      this.templet.p_ajax({
        type:'get',
        url:'/?app=desktop&m=desktop_theme&a=geticon',
      }).then(function (e) {
        var obj = JSON.parse(e);
        var list = [];
        for(var i in obj){
          var icon = {
            name:i,
            value:obj[i]
          };
          list.push(icon)
        }
        that.iconListView = list;
        that.iconSearchSave = list;
      }).catch(function (e) {
        that.$message.error('网络异常，请稍后尝试！');
      })
    }
  }
</script>
