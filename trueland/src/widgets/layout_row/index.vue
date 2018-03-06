<template>
  <div class="layout_row layrow" :id="'u' + widgetId" :style="{
    backgroundColor:infor.r_background,
    height:infor.module_height + 'px',
    padding:infor.r_fill + 'px',
    borderTopStyle:infor.r_border_top_style,
    borderTopWidth:infor.r_border_top_width + 'px',
    borderTopColor:infor.r_border_top_color,
    borderBottomStyle:infor.r_border_bottom_style,
    borderBottomWidth:infor.r_border_bottom_width + 'px',
    borderBottomColor:infor.r_border_bottom_color,
    opacity:infor.r_opacity,
    backgroundImage:infor.r_bg_src ? 'url('+infor.r_bg_src+')' : '',
    backgroundRepeat:infor.r_tile_style,
    backgroundPosition:infor.r_bg_position
  }"
       :rowType="rowType" name="layout_row"
       @dblclick.stop="select_parts('row')"
       :class="[
       $store.state.parts == 'row' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.hover_parts == 'row' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.parts == 'defaultstyle' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
       $store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? 'moduleTop' : '' : ''
       ]">
    <!--排序门板-->
    <div class="Sortable_Door">
      <i class="el-icon-caret-bottom" @click.stop="row_down"></i>
      <i class="el-icon-caret-top" @click.stop="row_up"></i>
    </div>

    <div class="handle_sortable">
      <i class="el-icon-tickets"></i>
    </div>

    <!--编辑状态渲染-->
    <div class="row_Mongolia" v-if="$store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? true : false : false" @click.stop="close"></div>

    <!--编辑状态不渲染-->
    <div class="row_edit" v-if="$store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? false : true : true">
      <ul>
        <li class="el-icon-edit" @click.stop="select_parts('')"></li>
        <li class="el-icon-plus" @click.stop="addRow"></li>
        <li class="el-icon-delete" @click.stop="dele_row"></li>
      </ul>
    </div>

    <div class="laybox" :style="{
      width:infor.module_width + 'px',
      height:infor.module_height + 'px',
      backgroundColor:infor.w_background,
      padding:infor.w_fill + 'px',
      opacity:infor.w_opacity,
      borderTopStyle:infor.w_border_top_style,
      borderTopWidth:infor.w_border_top_width + 'px',
      borderTopColor:infor.w_border_top_color,
      borderBottomStyle:infor.w_border_bottom_style,
      borderBottomWidth:infor.w_border_bottom_width + 'px',
      borderBottomColor:infor.w_border_bottom_color,
      borderLeftStyle:infor.w_border_left_style,
      borderLeftWidth:infor.w_border_left_width + 'px',
      borderLeftColor:infor.w_border_left_color,
      borderRightStyle:infor.w_border_right_style,
      borderRightWidth:infor.w_border_right_width + 'px',
      borderRightColor:infor.w_border_right_color,
      backgroundImage:infor.w_bg_src ? 'url('+infor.w_bg_src+')' : '',
      backgroundRepeat:infor.w_tile_style,
      backgroundPosition:infor.w_bg_position
    }"
         @dblclick.stop="select_parts('laybox')"
         :class="[
       $store.state.parts == 'laybox' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.hover_parts == 'laybox' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       ]">

      <basic-module
        v-for="(val,i) in children"
        :id="val.widgets_id"
        :name="val.name"
        :css="val.data.css"
        :key="i"
        :pid="val.pid"
        :rowType="val.rowType"
        :animateObj="val.data.animateObj"
      >
        <component :is="val.name" 
          slot="content"
          :infor="val.data.infor"
          :listArr="val.data.listArr"
          :id="val.widgets_id"
          :pid="val.pid"
          :rowType="val.rowType" ></component>

      </basic-module>

    </div>
  </div>
</template>

<script>
  import Row from '../../base/one_row';
  import BasicModule from '../basic_module/index';

  import basic_banner from '../basic_banner/index';
  import basic_picture from '../basic_picture/index';
  import basic_date from '../basic_date/index';
  import basic_goback from '../basic_goback/index';
  import basic_text_editor from '../basic_text_editor/index';
  import basic_location from '../basic_location/index';
  import basic_locationtitle from '../basic_locationtitle/index';
  import basic_video from '../basic_video/index';
  import basic_searchs from '../basic_searchs/index';
  import basic_language from '../basic_language/index';
  import basic_customedit from '../basic_customedit/index';
  import basic_gratext from '../basic_gratext/index';
  import basic_links from '../basic_links/index';


  export default {
    name: 'layout_row',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      widgetId:{
        type:String,
        default:''
      },
      pid:{
        type:String,
        default:''
      },
      children:{
        type:Array,
        default:[]
      },
      rowType:{
        type:String,
        default:''
      },
    },
    data () {
      return {

      }
    },
    methods:{
      //行排序向下
      row_down(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        const arrLength = this.$store.state[this.rowType].length;
        if(index == arrLength - 1){
          this.$message.error('已经是最后一个了，无法向下了！');
          return;
        }
        const handle_row = this.$store.state[this.rowType].splice(index,1)[0];
        this.$store.state[this.rowType].splice(index+1,0,handle_row);

        //console.log(arrLength);

      },
      //行排序向上
      row_up(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        if(index == 0){
          this.$message.error('已经是第一个了，无法向上了！');
          return;
        }
        const handle_row = this.$store.state[this.rowType].splice(index,1)[0];
        this.$store.state[this.rowType].splice(index-1,0,handle_row);
      },

      //删除行
      dele_row(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        this.$store.state[this.rowType].splice(index,1);
      },
      //增加行
      addRow(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        this.$store.state.widgets_id ++;
        let oneRow = new Row({
          widgets_id:this.$store.state.widgets_id.toString()
        });

        this.$store.state[this.rowType].splice(index+1,0,oneRow);
      },
      select_parts(parts){

        const id = this.widgetId;
        const type = this.$store.state.editing_block;
        const index = this.templet.p_find_rowIndex({id,type});

        let editObj = JSON.parse(JSON.stringify(this.$store.state[type][index]));
        delete editObj.children;
        this.$store.state.module_Data = editObj;
        this.$store.state.module_name = 'layout_row';
        this.$store.state.parts = parts;

        //选中的row滚动到顶部
        const row = $('#u' + this.widgetId);
        const rowParent = $('#u' + this.widgetId).parent();
        const rowOffsetTop = row[0].offsetTop + rowParent[0].offsetTop;
        $('#main-subject').animate({scrollTop:rowOffsetTop + 'px'},200);

      },
      close(){
        this.$store.state.module_name = '';
        this.$store.state.parts = '';
        this.$store.state.module_Data = null;
        this.$store.state.hover_parts = '';
      },

      //module放置在row里,module跨row放置
      moduleToLaybox(){
        const that = this;
        $('#u'+this.widgetId).droppable({
          accept:'.Module_one',
          over:function (event, ui) {
            //放上来的是module
            const rowId = $(this).attr('id');
            const module_pid = `u${ui.draggable.attr('pid')}`;

            //跨到另外一个row
            if(module_pid != rowId){
              if($(this).parent('.layout_parent').hasClass('editing_block')){
                $(this).addClass('moduleChangeRow');
              }
            }
          },
          out:function (event, ui) {
            if($(this).hasClass('moduleChangeRow')){
              $(this).removeClass('moduleChangeRow');
            }
          },
          drop:function (event, ui) {

            //放上来的是module
            const rowId = $(this).attr('id');
            const module_pid = `u${ui.draggable.attr('pid')}`;
            const module_id = ui.draggable.attr('id');
            const rowType = $(this).attr('rowType');
            const layBox = $(this).children('.laybox');

            //如果放置的row不是编辑的范围
            if(rowType != that.$store.state.editing_block){
              that.$message.error('当前容器不可放置！');
              return;
            }

            //module放置到别的row
            if(module_pid != rowId){

              //放置在可以编辑的row上
              if($(this).parent('.layout_parent').hasClass('editing_block')){
                //放置的rowindex
                const row_widgetId = rowId.replace('u','');
                const target_index = that.templet.p_find_rowIndex({
                  id:row_widgetId,
                  type:rowType
                });

                //当前module和当前的row index
                const IndexObj = that.templet.p_find_moduleIndex({
                  pid:module_pid.replace('u',''),
                  type:rowType,
                  id:module_id.replace('u','')
                });

                //删除被拖拽的module
                const move_module = JSON.parse(JSON.stringify(that.$store.state[rowType][IndexObj.row].children.splice(IndexObj.module,1)[0]));

                //计算拖拽后的位置
                const layboxLeft = layBox.offset().left;
                const layboxtop = layBox.offset().top;
                const module_offset_left = ui.draggable.offset().left;
                const module_offset_top = ui.draggable.offset().top;
                const module_left = event.clientX - layboxLeft - (event.clientX - module_offset_left);
                const module_top = event.clientY - layboxtop - (event.clientY - module_offset_top);

                that.$nextTick(function () {
                   move_module.pid = row_widgetId;//修改pid
                   move_module.data.css.module_left = module_left;
                   move_module.data.css.module_top = module_top;
                  that.$store.state[rowType][target_index].children.push(move_module);

                  //重新渲染,删除module的那个row里的所有dom
                  that.templet.p_rowChild_Renderer({
                    id:module_pid.replace('u',''),
                    type:rowType
                  });
                  that.$message.success('组件转移容器成功！');

                });

                //去除悬浮颜色
                if($(this).hasClass('moduleChangeRow')){
                  $(this).removeClass('moduleChangeRow');
                }
              }
            }
          }
        });
      },

      //laybox放置挂件，新增module
      add_module(){
        const that = this;
        $('#u'+this.widgetId).children('.laybox').droppable({
          accept:'.Pendant_one',
          //放上来
          over:function (event, ui) {
            if($(this).parents('.layout_parent').hasClass('editing_block')){
              $(this).addClass('select_laybox');
            }
            else{
              $(this).addClass('no_laybox');
            }

          },
          //拿走
          out:function (event, ui) {
            if($(this).parents('.layout_parent').hasClass('editing_block')){
              $(this).removeClass('select_laybox');
            }
            else{
              $(this).removeClass('no_laybox');
            }

          },
          //放下
          drop:function (event, ui) {
            if(!$(this).parents('.layout_parent').hasClass('editing_block')){
              $(this).removeClass('no_laybox');
              return false;
            }
            var name = ui.helper.attr('data-name');
            $('.left_sidebar_dialog').css('opacity',1);
            $(this).removeClass('select_laybox');
            const layboxLeft = $(this).offset().left;//距离文档左边的偏移
            const layboxTop = $(this).offset().top;//距离文档顶部的偏移
            const pid = $(this).parent().attr('id').replace('u','');
            const left = parseInt(event.pageX - layboxLeft);
            const top = parseInt(event.pageY - layboxTop) ;

            that.templet.p_add_module({
              name,
              pid,
              left,
              top
            });

          }
        })
      },

    },
    components:{
      BasicModule,
      basic_banner,
      basic_picture,
      basic_date,
      basic_goback,
      basic_text_editor,
      basic_location,
      basic_locationtitle,
      basic_video,
      basic_searchs,
      basic_language,
      basic_customedit,
      basic_gratext,
      basic_links,
    },

    mounted(){
      //module放置在row里,module跨row放置
      this.moduleToLaybox();

      //laybox放置挂件，新增module
      this.add_module();

    }
  }
</script>
