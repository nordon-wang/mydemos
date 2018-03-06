<template>
    <div id="edit_public" v-show="isShow">
        <div class="edit_public_title">
            <i class="el-icon-menu"></i>
            <span>{{editTitle}}</span>
            <i class="el-icon-circle-close-outline close" @click="closeModel"></i>
        </div>
        <!-- 自定义内容编辑 -->
        <div class="custom_edit_con"  v-if="editType == 'basic_customedit_model'">
            <editor id="editor_id" height="450px" width="700px" :content="contents"
        pluginsPath="/static/kindeditor/plugins/"
        :loadStyleMode="false"
        @on-content-change="onContentChange"  :items= "editCofig"></editor>
        </div>

        <!-- 链接编辑 -->
        <!-- <div v-if="editType == 'basic_links_model'">
          <h1>链接编辑</h1>
        </div> -->

        <!-- <slot name="linkedit" v-if="editType == 'basic_links_model'">111</slot> -->
        <div  v-if="editType == 'basic_links_model'" class="custom_edit_con">
          <basic-links-edit>
          </basic-links-edit>
        </div>

        <div class="edit_public_title edit_public_btn">
            <el-button type="primary" size="mini" @click="closeModel">确定</el-button>
            <el-button type="warning" size="mini" @click="cancelModel">取消</el-button>
        </div>
    </div>
</template>

<script>
import basicLinksEdit from '../../widgets/basic_links/editmoudle';


export default {
  name: "edit_public",
  data() {
    return {
      editType:'',
      editTitle:'title',
      initCon: "",
      isShow: false,
      contents: "123",
      editCofig: [
        "source",
        "|",
        "undo",
        "redo",
        "|",
        "preview",
        "print",
        "template",
        "cut",
        "copy",
        "paste",
        "plainpaste",
        "wordpaste",
        "|",
        "justifyleft",
        "justifycenter",
        "justifyright",
        "justifyfull",
        "insertorderedlist",
        "insertunorderedlist",
        "indent",
        "outdent",
        "subscript",
        "superscript",
        "clearhtml",
        "quickformat",
        "selectall",
        "|",
        "fullscreen",
        "/",
        "fontname",
        "fontsize",
        "|",
        "forecolor",
        "hilitecolor",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "lineheight",
        "removeformat",
        "|",
        "image",
        "multiimage",
        "flash",
        "media",
        "table",
        "hr",
        "baidumap",
        "code",
        "pagebreak",
        "link",
        "unlink"
      ],
    };
  },
  watch: {
    //监听当前选中的挂件,从而决定不同的编辑渲染
    "$store.state.module_name": function(val) {
      let shows = this.$store.state.module_name;
      if (shows == "basic_customedit_model") {
        this.isShow = true;
        this.contents = this.$store.state.module_Data.data.infor.contents;
        this.initCon = this.$store.state.module_Data.data.infor.contents;
        this.onContentChange(this.contents);
        this.editType = 'basic_customedit_model';
        this.editTitle = '自定义内容编辑';
      }
      else if(shows == "basic_links_model"){
        this.isShow = true;
        this.editType = 'basic_links_model';
        this.editTitle = '链接编辑';
        console.log('链接',this.$store.state.module_Data.data.infor)
      }
      else {
        this.isShow = false;
      }
    }
  },
  methods: {
    onContentChange(val) {
      try {
        let _mydata = this.$store.state.module_Data;

        let _pid = _mydata.pid;
        let _rowtype = _mydata.rowType;
        let _id = _mydata.widgets_id;

        let IndexObj = this.templet.p_find_moduleIndex({
          pid: _pid,
          type: _rowtype,
          id: _id
        });

        let rowIndex = IndexObj.row;
        let moduleIndex = IndexObj.module;
        let rowtype = _mydata.rowType;

        this.$store.state[rowtype][rowIndex].children[
          moduleIndex
        ].data.infor.contents = val;
      } catch (e) {
        console.log("取消时");
      }

      this.contents = val;
    },
    closeModel() {
      this.templet.p_bottomBar_close();
    },
    cancelModel() {
      this.onContentChange(this.initCon);
      this.templet.p_bottomBar_close();
    }
  },
  components:{
    basicLinksEdit
  },
  mounted() {
    $("#edit_public").draggable({ handle: "div.edit_public_title" });
    // this.contents = this.$store.state.module_Data && this.$store.state.module_Data.data.infor.contents;
  }
};
</script>

<style scoped>
#edit_public {
  width: 700px;
  min-height: 400px;
  position: fixed;
  background-color: #fff;
  left: 40%;
  top: 10%;
  z-index: 1999;
}

div.edit_public_title {
  width: 100%;
  height: 42px;
  background-color: #5874d8;
  cursor: move;
  padding-left: 12px;
}
div.edit_public_title i {
  font-size: 20px;
  line-height: 42px;
  color: #fff;
  float: left;
}
div.edit_public_title span {
  font-size: 16px;
  color: #fff;
  float: left;
  height: 42px;
  line-height: 42px;
  margin-left: 12px;
}
div.edit_public_title i.close {
  float: right;
  margin-right: 12px;
  cursor: pointer;
}

div.edit_public_btn {
  background-color: #e5e5e5;
  display: flex;
  justify-content: flex-end;
  padding: 4px;
  padding-right: 12px;
  position: absolute;
  bottom: 0;
}

div.custom_edit_con {
  height: 430px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 40px;
}
</style>
