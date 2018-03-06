<template>
  <div class="module animated DragDom" :id="'u'+id" :name="name"
      :pid="pid"
      :rowType="rowType"
      :class="[moduleTop,animatClass]"
      :style="moduleClass"
    >
    <slot name='content'></slot>
  </div>
</template>

<script>

  export default {
    name: 'basic_module',
    props:{
      name:{
        type:String,
        default:''
      },
      id:{
        type:String,
        default:''
      },
      css:{
        type:Object,
        default:null
      },
      pid:{
        type:String,
        default:''
      },
      rowType:{
        type:String,
        default:''
      },
      animateObj:{
        type:Object,
        default:null,
      },
    },
    data () {
      return {
        targetDom:[],//在同屏幕的dom数组
        Error_amount:1.5,//对齐的误差量
        Error_lock:6,//锁定的误差
        lock:{
          transverse_lock:false,//横向锁定值
          vertical_lock:false,//竖向锁定值
        },

      }
    },
    components:{

    },
    watch:{
    },
    computed: {
      moduleTop(){


        if(this.$store.state.module_Data){
          //快速文本不应该有高亮
          if(this.$store.state.module_Data.name == 'basic_text_editor'){
            return '';
          }
          if(this.$store.state.module_Data.widgets_id == this.id){
            return 'moduleTop';
          }
        }
      },
      moduleClass(){
        return {
          top:this.css.module_top + 'px',
          left:this.css.module_left + 'px',
          backgroundColor:this.css.backgroundColor,
          animationDelay: this.animateObj.animatedDelay + 's',
          animationDuration: this.animateObj.animatedDuration + 's',
          borderTopWidth:this.css.w_border_top_width + 'px',
          borderTopStyle:this.css.w_border_top_style,
          borderTopColor:this.css.module_pulick_border_top_color,
          borderBottomWidth:this.css.w_border_bottom_width + 'px',
          borderBottomStyle:this.css.w_border_bottom_style,
          borderBottomColor:this.css.module_pulick_border_bottom_color,
          borderLeftWidth:this.css.w_border_left_width + 'px',
          borderLeftStyle:this.css.w_border_left_style,
          borderLeftColor:this.css.module_pulick_border_left_color,
          borderRightWidth:this.css.w_border_right_width + 'px',
          borderRightStyle:this.css.w_border_right_style,
          borderRightColor:this.css.module_pulick_border_right_color,
          backgroundImage:this.css.w_bg_src ? `url(${this.css.w_bg_src})` : '',
          backgroundRepeat:this.css.w_tile_style,
          backgroundPosition:this.css.w_bg_position,
          opacity:this.css.w_opacity,
          borderRadius:this.css.w_border_raduis_num + 'px',
          padding:this.css.w_fill + 'px',
          backgroundColor:this.css.w_background,
          backgroundSize: `100% 100%`,
          width:this.css.module_width + 'px',
          height:this.css.module_height + 'px',
        };
      },
      animatClass(){
        if (this.animateObj.animatedType) {
          // 拥有动画的module 都会拥有一个特殊类hasAnimated
          return this.animateObj.animatedType + this.animateObj.animatedState + ' hasAnimated';
        } else {
          return this.animateObj.animatedType + this.animateObj.animatedState;
        }
      },
    },
    methods:{
      /*
       * 竖向一根对齐线
       * target_top:目标元素的top
       * target_height:目标元素的height
       * dragTop:拖拽元素的top
       * dragHeight:拖拽元素的height
       * dragLeft:拖拽元素的left
       * dragLeft:拖拽元素的left
       * lineLeft：竖向对齐线的left值
       * */
      left_right_line(target_top,target_height,dragTop,dragHeight,lineLeft){
        //如果目标方块在拖拽方块上面
        if( target_top < dragTop){
          this.p_create_line({
            type:'vertical',
            size:dragTop + dragHeight - target_top + 20,
            top:target_top -10,
            left:lineLeft
          });
        }
        else{
          this.p_create_line({
            type:'vertical',
            size:target_top + target_height - dragTop + 20,
            top:dragTop -10,
            left:lineLeft
          });
        }


      },

      /*
       * 横向向一根对齐线
       * */
      top_bottm_line(dragLeft,dragWidth,target_left,target_width,lineLeft) {
        //如果目标方块在拖拽方块左面
        if( target_left < dragLeft){
          //debugger;
          this.p_create_line({
            type:'transverse',
            size:dragLeft + dragWidth - target_left + 20,
            top:lineLeft,
            left:target_left - 10
          });
        }
        else{
          this.p_create_line({
            type:'transverse',
            size:target_left + target_width - dragLeft + 20,
            top:lineLeft,
            left:dragLeft - 10
          });
        }
      },

      p_create_line(param) {
        let type = param.type;
        let size = param.size;
        let top = param.top;
        let left = param.left;
        var line = $('<div class="align_line"></div>');
        //var line = $('.align_line')
        //type代表是横线还是竖线
        if(type == 'transverse'){
          line.css({
            width:size + 'px',
            height:'1px',
            top:top,
            left:left
          });
        }
        else{
          line.css({
            width:'1px',
            height:size + 'px',
            top:top,
            left:left
          });
        }
        line.appendTo('body');
      },

      //删除线
      p_remove_line(){
        if($('.align_line').length > 0){

          $('.align_line').remove();

        }
      },

      //删除锁定元素
      p_remove_lock(){
        if($('.lock_Top_style').length > 0){
          $('.lock_Top_style').remove();
        }

        if($('.lock_Left_style').length > 0){
          $('.lock_Left_style').remove();
        }
      },

      p_lock(moveLeft,moveTop,self){
        //console.log(dragTop);
        //竖向锁定了
        if(this.lock.vertical_lock){
          console.log(123);

          let module_Top = parseFloat(self.css('top'));//拖拽元素当前的位置
          let module_offset_Top = self.offset().top;//拖拽元素距离文档顶部的距离
          //插入锁定标签
          if($('.lock_Top_style').length == 0){
            var lock_Top_style =$(`<style class="lock_Top_style">#u${this.id} {top:${module_Top}px !important;}</style>`);
            lock_Top_style.appendTo('head');
          }
//debugger;//
          if( moveTop < module_offset_Top - this.Error_lock || moveTop > module_offset_Top + this.Error_lock){
            this.lock.vertical_lock = false;
            this.p_remove_line();
            this.p_remove_lock();
          }
        }

        //横向锁定了
        if(this.lock.transverse_lock){

          let module_Left = parseFloat(self.css('left'));//拖拽元素当前的位置
          let module_offset_Left = self.offset().left;//拖拽元素距离文档顶部的距离
          //插入锁定标签
          if($('.lock_Left_style').length == 0){
            var lock_Left_style =$(`<style class="lock_Left_style">#u${this.id} {left:${module_Left}px !important;}</style>`);
            lock_Left_style.appendTo('head');
          }
//debugger;
          if( moveLeft < module_offset_Left - this.Error_lock || moveLeft > module_offset_Left + this.Error_lock){
            this.lock.transverse_lock = false;
            this.p_remove_line();
            this.p_remove_lock();
          }
        }
      }
    },

    mounted(){
      if(this.name == 'basic_gratext'){
      }

      const that = this;
      // $('#u' + this.id + '  div.my_searchs_drag').draggable();
      // 判断视频是否是固定 若是固定 不绑定拖拽和缩放
      if($('#u' + this.id).css('position') != 'fixed'){
        $('#u' + this.id).draggable({
          containment:'.editing_block',

          grid: [ 1, 1 ],
          start:function (event, ui) {

            //视频的定位类型 为fixed时  禁止拖拽
            if(that.$children[0].infor.videoPosition == 'fixed'){
              $(this).draggable( "destroy");
              return ;
            }

            $(this).addClass('Module_one');


            // debugger;

            //一开始拖拽的时候，就把同屏幕的dom找出来
            var thisId = $(this).attr('id');
            var srcollTop = $(window).scrollTop();//窗口卷去高度
            var moduleArr = $('.module');
            that.targetDom = [];

            //在刚开始拖拽的时候，找出屏幕范围内，所有的方块，把它们的信息插入到一个数组中，在拖拽时，就遍历这个数组，而不是遍历所有的dom,在100个左右的dom情况下，性能会更好
            for(var i = 0;i<moduleArr.length;i++){
              var moduleHeight = moduleArr.eq(i).height();//每个方块的高度
              var moduleTop = moduleArr.eq(i).offset().top;//每个方块距离文档顶部的距离
              var screenTop = moduleTop - srcollTop;//每个方块距离屏幕顶部的距离
              var module_id = moduleArr.eq(i).attr('id');
              //在当前屏幕范围内的方块，去除拖拽的那个
              if(screenTop + moduleHeight > 0 && screenTop < that.templet.screenHeight && module_id != thisId){
                //记录每个方块的信息，用于遍历计算
                var module_data = {
                  id:module_id,
                  width:moduleArr.eq(i).width(),
                  height:moduleHeight,
                  top:moduleTop,
                  left:moduleArr.eq(i).offset().left,
                };
                that.targetDom.push(module_data);
              }
            }

          },
          drag:function (event, ui) {

            var dragLeft = $(this).offset().left;
            var dragTop = $(this).offset().top;

            var moveLeft = ui.offset.left;
            var moveTop = ui.offset.top;

            var dragWidth = $(this).width();
            var dragHeight = $(this).height();
            //var s = new Date().getTime();//用于测试性能的

            //移动开始前，先清除线
            that.p_remove_line();

            for(var i = 0;i<that.targetDom.length;i++){
              var target_left = that.targetDom[i].left;
              var target_top = that.targetDom[i].top;
              var target_width = that.targetDom[i].width;
              var target_height = that.targetDom[i].height;

              //10种可能的对齐线
              //拖拽元素的左边，与目标元素的左边一致,就只有一根线
              if(dragLeft  > target_left - that.Error_amount  && dragLeft < target_left + that.Error_amount ){
                that.lock.transverse_lock = true;//横向锁定
                that.left_right_line(target_top,target_height,dragTop,dragHeight,dragLeft);
              }
              //拖拽元素的左边，与目标元素的右边一致,就只有一根线
              if(dragLeft  > target_left + target_width - that.Error_amount  && dragLeft < target_left + target_width + that.Error_amount ){
                that.lock.transverse_lock = true;//横向锁定
                that.left_right_line(target_top,target_height,dragTop,dragHeight,dragLeft);
              }
              //中间的竖向对齐线
              if(dragLeft + (dragWidth/2) > target_left + (target_width/2) - that.Error_amount  && dragLeft+ (dragWidth/2) < target_left + (target_width/2) + that.Error_amount ){
                that.lock.transverse_lock = true;//横向锁定
                that.left_right_line(target_top,target_height,dragTop,dragHeight,dragLeft + (dragWidth/2));
              }
              //拖拽元素的右边，与目标元素的右边一致,就只有一根线
              if(dragLeft + dragWidth  > target_left + target_width - that.Error_amount  && dragLeft + dragWidth < target_left + target_width + that.Error_amount ){
                that.lock.transverse_lock = true;//横向锁定
                that.left_right_line(target_top,target_height,dragTop,dragHeight,dragLeft + dragWidth);
              }
              //拖拽元素的右边，与目标元素的左边一致,就只有一根线
              if(dragLeft + dragWidth > target_left - that.Error_amount  && dragLeft + dragWidth< target_left + that.Error_amount ){
                that.lock.transverse_lock = true;//横向锁定
                that.left_right_line(target_top,target_height,dragTop,dragHeight,dragLeft + dragWidth);
              }


              //拖拽元素的上边，与目标元素的上边一致,就只有一根线
              if(dragTop  > target_top - that.Error_amount  && dragTop < target_top + that.Error_amount ){
                that.lock.vertical_lock = true;//竖向锁定
                that.top_bottm_line(dragLeft,dragWidth,target_left,target_width,dragTop);
              }
              //拖拽元素的上边，与目标元素的下边一致,就只有一根线
              if(dragTop  > target_top + target_height - that.Error_amount  && dragTop < target_top + target_height + that.Error_amount ){
                that.lock.vertical_lock = true;//竖向锁定
                that.top_bottm_line(dragLeft,dragWidth,target_left,target_width,dragTop);
              }
              //中间的竖向对齐线
              if(dragTop + (dragHeight/2) > target_top + (target_height/2) - that.Error_amount  && dragTop+ (dragHeight/2) < target_top + (target_height/2) + that.Error_amount ){
                that.lock.vertical_lock = true;//竖向锁定
                that.top_bottm_line(dragLeft,dragWidth,target_left,target_width,dragTop + (dragHeight/2));
              }

              //拖拽元素的下边，与目标元素的下边一致,就只有一根线
              if(dragTop + dragHeight  > target_top + target_height - that.Error_amount  && dragTop + dragHeight < target_top + target_height + that.Error_amount ){
                that.lock.vertical_lock = true;//竖向锁定
                that.top_bottm_line(dragLeft,dragWidth,target_left,target_width,dragTop + dragHeight);
              }

              //拖拽元素的下边，与目标元素的上边一致,就只有一根线
              if(dragTop + dragHeight > target_top - that.Error_amount  && dragTop + dragHeight< target_top + that.Error_amount ){
                that.lock.vertical_lock = true;//竖向锁定
                that.top_bottm_line(dragLeft,dragWidth,target_left,target_width,dragTop + dragHeight);
              }
            }

            that.p_lock(moveLeft,moveTop,$(this));
          },
          stop:function (event, ui) {
            const left = parseFloat($(this).css('left'));
            const top = parseFloat($(this).css('top'));
            const module_pid = that.pid;
            const module_id = that.id;
            const rowType = that.rowType;
          if(that.lock.transverse_lock){
            $(this).css('left',left);
          }
          if(that.lock.vertical_lock){
            $(this).css('top',top);
          }

            const IndexObj = that.templet.p_find_moduleIndex({
              pid:module_pid,
              type:rowType,
              id:module_id
            });
            //当前拖拽的dom的数据
            const that_module = that.$store.state[rowType][IndexObj.row].children[IndexObj.module];
            if(that_module){
              //dom的id 要和 数据源对得上
              if(that_module.widgets_id ==  module_id){
                that.$store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_left = left;
                that.$store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_top = top;
              }
            }

            that.p_remove_line();
            that.p_remove_lock();
            that.targetDom = [];//清除数组，减少内存消耗
          }
        });

        $('#u' + this.id).resizable({
          autoHide: true,
          handles: "n, e, s, w, ne, se, sw, nw",
          minHeight:30,
          resize:function (event, ui ) {
            const id = $(this).attr('id').replace('u','');
            const type = $(this).attr('rowType');
            const name = $(this).attr('name');
            const pid = $(this).attr('pid');
            const IndexObj = that.templet.p_find_moduleIndex({pid,type,id});
            const rowIndex = IndexObj.row;
            const moduleIndex = IndexObj.module;
            const width = ui.size.width - 4;
            const height = ui.size.height - 4;

            // module的宽和高
            that.css.module_width = width;
            that.css.module_height = height;

            that.templet.p_change_size({id,name,type,rowIndex,moduleIndex,width,height});
            that.templet.t_change_size({id,name,type,rowIndex,moduleIndex,width,height});
          }
        });

      }else{
        $('#u' + this.id).find('.ui-resizable-handle').removeClass('resizable-handle-none');
      }

    }
  }
</script>
