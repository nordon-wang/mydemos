<template>

  <div class="basic_text_editor" :class="isEdit ? '' : 'mouseClass'" :style="{
    width:infor.width + 'px'
  }" @mousedown="cancelDialog">
    <!--编辑框-->
    <div class="public_edit" v-if="!isEdit">
      <ul>
        <li class="edit_module" @click.stop="editNow()">编辑文本</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>

    <div class="quill-editor-example">
      <!--编辑时出现,全局蒙层，点击后任意处，恢复预览状态-->
      <div class="clicklayer" @click="editEnd" v-if="isEdit"></div>


      <div class="myinput" :class="!isEdit ? 'noedit': 'editNow'">

        <!--编辑框-->
        <quill-editor v-model="listArr.content"
                      :options="editorOption"
                      @ready="onEditorReady($event)">
        </quill-editor>

        <!--不编辑的时候出现，阻挡输入-->
        <div class="view" v-if="!isEdit" @dblclick.stop="editNow"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import VueQuillEditor, { Quill } from 'vue-quill-editor'
  export default {
    name: 'basic_text_editor',
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
        isEdit:false,
        editorOption:{
          modules:{
            toolbar:[
              [{ 'size': ['small', false, 'large','huge'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
          }
        }
      }
    },
    components:{

    },
    methods: {
      cancelDialog(){
        this.$store.state.module_Data = null;
        this.$store.state.module_name = '';
        this.$store.state.parts = '';
        this.$store.state.hover_parts = '';


      },
      select_parts(partsName,moduleName){
        this.templet.p_index_select_parts({
          partsName,
          moduleName,
          id:this.id,
          pid:this.pid,
          type:this.rowType
        })
      },
      //呼出编辑框
      editNow(){
        this.isEdit = true;
        $('#u' + this.id).draggable({ disabled: true });
        this.$nextTick(function () {
          $('#u' + this.id).find('.ql-editor').focus();
        });
      },
      editEnd(){
        this.isEdit = false;
        $('#u' + this.id).draggable({ disabled: false });
      },

      onEditorReady(editor) {
        if(this.isEdit){
          $('#u' + this.id).draggable({ disabled: true });
        }
      }
    },


    mounted(){}
  }
</script>
