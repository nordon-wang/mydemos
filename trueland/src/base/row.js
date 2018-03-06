import Store from '../vuex/store';
import Module from './one_module';
import Row from './one_row';
import RowStyle from '../widgets/layout_row/style';




import moduleStyle from './style_list_config';
//如果要使用到全局state，使用Store.state
//基础方法，会加入到vue原型中，全局this.templet+方法名调用
export default class Person_Templet{
  constructor(Vue){
    let that = this;
    this.p_$nextTick = Vue.prototype.$nextTick;
    this.p_$forceUpdate = Vue.prototype.$forceUpdate;

    //将Store里面的_mutations方法集，打入到本构造函数中，然后再打入到vue原型中，全局this.templet+方法名调用
    Object.keys(Store._mutations).map(function (val) {
      that[val] = Store._mutations[val][0];
    });


    //屏幕宽度
    this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;

    //屏幕高度
    this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

    //前端模拟的widgets_id
    this.widgets_id = 0;

  }

  //创建一个新的module对象
  /*
  * name:挂件的名称
  * x:放置的位置
  * y:放置的位置
  * type:放置在body、header或footer
  * pid:父级row 的id
  *
  * */
  p_add_module({name,left,top,type,pid}){
    const that = this;

    Store.state.widgets_id ++;

    let rowIndex = this.p_find_rowIndex({
      id:pid,
      type:Store.state.editing_block
    });

    var newModule = new Module({
      name:name,
      rowType:Store.state.editing_block,//插入的row的类型，必须知道
      widgets_id:Store.state.widgets_id.toString(),
      pid,
    });

    newModule.data.css.module_top = top;
    newModule.data.css.module_left = left;

    //插入判断
    //debugger;
    Store.state[Store.state.editing_block][rowIndex].children.push(newModule);

    //先给全局编辑对象赋值
    Store.state.module_Data = JSON.parse(JSON.stringify(newModule));

    //弹出编辑框，编辑框读取全局编辑对象的数据
    
    // 如果是自定义文本 特殊处理 basic_customedit
    if(name === 'basic_customedit'){
      Store.state.module_name = 'basic_customedit_model';
    }else{
      Store.state.module_name = name;
      Store.state.parts = '';
    }

    this.p_$nextTick(function () {
      that.p_disabled_draggable_resizable();
    })

  }

  //找到row的索引
  /*
   id:row的id
   type:放置在body、header或footer
   返回row 的索引
  * */
  p_find_rowIndex({id,type}){
    let index = 0;
    let list = [];
    let rowId = id;
    if(type == 'body'){
      list = Store.state.body;
    }
    else if(type == 'header'){
      list = Store.state.header;
    }
    else{
      list = Store.state.footer;
    }

    for(let i = 0;i<list.length;i++){
      if( rowId == list[i].widgets_id){
        index = i;
        break;
      }
    }
    return index;

  }

  //找到module的索引
  /*
   id：挂件的id,不带'u'
   pid:不带'u'
  * type:每个挂件里的rowType
  * 返回一个对象，row是row的index，module是module的index
  *
  * */
  p_find_moduleIndex({pid,type,id}){
    let index = 0;
    let list = [];
    let moduleId = id;
    const rowIndex = this.p_find_rowIndex({
      id:pid,
      type
    });

    if(type == 'body'){
      list = Store.state.body[rowIndex].children;
    }
    else if(type == 'header'){
      list = Store.state.header[rowIndex].children;
    }
    else{
      list = Store.state.footer[rowIndex].children;
    }

    for(let i = 0;i<list.length;i++){
      if( moduleId == list[i].widgets_id){
        index = i;
        break;
      }
    }
    return {
      row:rowIndex,
      module:index
    };
  }


  /*
  * 挂件名称翻译
  * */
  p_nameToChinese(value) {
  let str = value;
  if (value == 'basic_text') {
    str = '文本组件';
  } else if (value == 'basic_line') {
    str = '线组件';
  } else if (value == 'basic_pic') {
    str = '图片组件';
  } else if (value == 'basic_button') {
    str = '按钮组件';
  } else if (value == 'basic_banner') {
    str = '轮播图组件';
  } else if (value == 'basic_catelog') {
    str = '分类组件';
  } else if (value == 'basic_customer_service') {
    str = '客服会话组件';
  } else if (value == 'basic_detailarticle') {
    str = '内容详情组件';
  } else if (value == 'basic_doublerow') {
    str = '双栏组件';
  } else if (value == 'basic_detailarticle') {
    str = '内容详情组件';
  } else if (value == 'basic_freerow') {
    str = '自由面板组件';
  } else if (value == 'basic_line') {
    str = '线条组件';
  } else if (value == 'basic_map') {
    str = '地图组件';
  } else if (value == 'basic_mleavemessage') {
    str = '留言系统组件';
  } else if (value == 'basic_mlistandpage') {
    str = '列表与分页组件';
  } else if (value == 'basic_msearchs') {
    str = '搜索组件';
  } else if (value == 'basic_navbottom') {
    str = '底部导航组件';
  } else if (value == 'basic_pic') {
    str = '图文组件';
  } else if (value == 'basic_pic_list') {
    str = '图片列表组件';
  } else if (value == 'basic_picarticle') {
    str = '图文展示组件';
  } else if (value == 'basic_text') {
    str = '文本组件';
  } else if (value == 'basic_video') {
    str = '视频组件';
  } else if (value == 'basic_dynamic_class') {
    str = '动态分类组件';
  } else if (value == 'basic_navtmp') {
    str = '新导航组件';
  } else if (value == 'basic_header') {
    str = '顶部导航组件';
  }
  else if (value == 'layout_row') {
    str = '容器组件';
  }
  else if (value == 'public_animated') {
    str = '模块动画';
  }
  else if (value == 'public_effects') {
    str = '模块特效';
  }
  else if (value == 'public_defaultStyle') {
    str = '样式选择';
  }
  return str
}

  //全局module编辑方法
  /*
  * key:要编辑的key
  * val：编辑的值0
  * */
  p_editModule({key, val}){
    const widgets_id = Store.state.module_Data.widgets_id;
    const rowType = Store.state.module_Data.rowType;
    const rowId = Store.state.module_Data.pid;

    const IndexObj = this.p_find_moduleIndex({
      pid:rowId,
      type:rowType,
      id:widgets_id
    });

    const rowIndex = IndexObj.row;
    const moduleIndex = IndexObj.module;

    Store.state[rowType][rowIndex].children[moduleIndex].data[key] = val;
  }

  //选择部件
  p_select_parts(name){
    Store.state.parts = name;
  }

  //挂件index选择部件
  /*
  * name:部件名称
  * moduleName：挂件名称
  * */
  p_index_select_parts({partsName,moduleName,id,pid,type}){
    //if(Store.state.module_Data == null || id != Store.state.module_Data.widgets_id){
      //先给全局编辑对象赋值
      const IndexObj = this.p_find_moduleIndex({pid,type,id});
      const rowIndex = IndexObj.row;
      const moduleIndex = IndexObj.module;
      Store.state.module_Data = JSON.parse(JSON.stringify(Store.state[type][rowIndex].children[moduleIndex]));

    //弹出编辑框，编辑框读取全局编辑对象的数据
      Store.state.module_name = moduleName;
    //}
    //选择的部件名赋值
    Store.state.parts = partsName;

    //如果关闭底部弹窗，则恢复拖拽和缩放
    if(moduleName == '' && Store.state.parts == ''){
      const moduleId = 'u' + id;
      $('#' + moduleId).draggable({ disabled: false });
      $('#' + moduleId).resizable({ disabled: false });
      $('#' + moduleId).find('.ui-resizable-handle').removeClass('resizable-handle-none');
    }

    this.p_disabled_draggable_resizable();

  }

  //编辑悬浮选中
  p_index_hover_parts(name){
    Store.state.hover_parts = name;
  }

  //编辑悬浮离开
  p_index_out_parts(){
    Store.state.hover_parts = '';
  }

  /*
   * 部件名称翻译
   * */
  p_partsToChinese(value) {
    let str = value;
    if (value == 'banner_routine') {
      str = '常规设置';
    }
    else if (value == 'banner_btn') {
      str = '左右按钮设置';
    }
    else if (value == 'banner_page') {
      str = '分页器设置';
    }
    else if (value == 'row') {
      str = '分页器设置';
    }
    else if (value == 'banner_pic') {
      str = '图片管理';
    }
    return str
  }

  /*
  * 挂件删除
  * id:挂件的id
  * pid：挂件的pid
  * type：放置在body、header或footer
  * */
  p_del_module({id,pid,type}){
    Store.state.module_name = '';
    Store.state.parts = '';
    Store.state.module_Data = null;
    Store.state.hover_parts = '';
    const IndexObj = this.p_find_moduleIndex({pid,type,id});
    const rowIndex = IndexObj.row;
    const moduleIndex = IndexObj.module;
    Store.state[type][rowIndex].children.splice(moduleIndex,1);
  }

  p_change_size({id,name,type,rowIndex,moduleIndex,width,height}){
    if( name == 'basic_banner'){
      Store.state[type][rowIndex].children[moduleIndex].data.infor.bannerSet.width = width;
      Store.state[type][rowIndex].children[moduleIndex].data.infor.bannerSet.height = height;
      return false;
    }
    else if(name == 'basic_text_editor'){
      Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
      return false;
    }

  }

  /*
  *
  * */
  p_ajax(params){
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: `${Store.state.domain}${params.url}`,
        type: params.type,
        data: params.data,
        success:e => { resolve(e); },
        error:e => { reject(e); }
      });
    });
  }

  /*
  * 取消底部弹框
  * */
  p_bottomBar_close(){
    const moduleId = 'u' + Store.state.module_Data.widgets_id;
    Store.state.module_name = '';
    Store.state.parts = '';
    Store.state.module_Data = null;
    Store.state.hover_parts = '';

    // 判断视频是否是固定
    if($('#' + moduleId).css('position') != 'fixed'){
      $('#' + moduleId).draggable({ disabled: false });
      $('#' + moduleId).resizable({ disabled: false });
      $('#' + moduleId).find('.ui-resizable-handle').removeClass('resizable-handle-none');
    }

  }

  /*
  *
  * 编辑的module去除拖拽和缩放
  * */
  p_disabled_draggable_resizable(){
    //debugger;
    const name = Store.state.module_name;
    if(name != '' && name != 'basic_text_editor'){
      const moduleId = 'u' + Store.state.module_Data.widgets_id;
      $('#' + moduleId).draggable({ disabled: true });
      $('#' + moduleId).resizable({ disabled: true });
      $('#' + moduleId).find('.ui-resizable-handle').addClass('resizable-handle-none');//鼠标悬浮不出现缩放的小点
    }
  }


  /*
  * 选择当前编辑模块
  * */
  select_editing_block(type){
    Store.state.editing_block = type;
  }


  p_module_draggable(obj){
    const that = this;
    obj.draggable({
      start:function (event, ui) {
        $(this).addClass('Module_one')
      },
      stop:function (event, ui) {
        const left = ui.position.left;
        const top = ui.position.top;
        const module_pid = $(this).attr('pid');
        const module_id = $(this).attr('id').replace('u','');
        const rowType = $(this).attr('rowType');

        //当前module和当前的row index
        const IndexObj = that.p_find_moduleIndex({
          pid:module_pid,
          type:rowType,
          id:module_id
        });
        Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_left = left;
        Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_top = top;
      }
    });
  }

  /*
  * row 中的module重新渲染，个别地方需要用到
  * */
  p_rowChild_Renderer({id,type}){
    const prev_row_index = this.p_find_rowIndex({id,type});
    const list = JSON.parse(JSON.stringify(Store.state[type][prev_row_index].children));
    Store.state[type][prev_row_index].children = [];
    this.p_$nextTick(function () {
      Store.state[type][prev_row_index].children =list;
    });
  }

  /*
  * 初始化请求，获取数据
  * */
  p_init(){

    const that = this;
    const page = Store.state.now_page;
    const theme_id = Store.state.theme_id;
    this.p_ajax({
      type:'get',
      url:`/index.php?app=site&m=desktop_ntheme_theme&a=getInfo&page=${page}&theme_id=${theme_id}`,
    }).then(function (e) {

      if(e == '' && e == 'null'){
        that.$message.error('网络异常，请稍后尝试！');
        return ;
      }

      const data =  JSON.parse(e);

      if(!data.isSuccess){
        that.$message.error('网络异常，请稍后尝试！');
        return ;
      }

      let body = data.data.body;
      let header = data.data.header;
      let footer = data.data.footer;

      body.map(function (val,i) {
        that.p_rowType_map(val,'body');
      });

      header.map(function (val) {
        that.p_rowType_map(val,'header');
      });

      footer.map(function (val) {
        that.p_rowType_map(val,'footer');
      });

      Store.state.body = body;
      Store.state.header = header;
      Store.state.footer = footer;

      console.log('初始化header',header);
      console.log('初始化body',body);
      console.log('初始化footer',footer);

    }).catch(function (e) {
      console.log(e);
    })


  }

  /*
  * 页面初始化数据过滤
  * */
  p_rowType_map(val,type){
    let children = val.children;

    val.rowType = type;
    val.pid = 0;//row的pid都是0
    //如果发来的数据里，有children属性，则循环
    if(children){
      children.map(function (childVal) {
        childVal.rowType = type;
        childVal.pid = val.widgets_id;//挂件的pid是父级的id

        //兼容挂件样式数据
        if(childVal.data.StorageVal){
          childVal.data.infor = JSON.parse(childVal.data.StorageVal);

          //特效模块兼容
          if(!childVal.data.infor.effectsObj){
            childVal.data.infor.effectsObj = {
              type:'',//特效类型
              icon:'fa-adjust',//icon图标
              iconSize:50,//icon大小
              iconColor:'#fff',//icon颜色
              changeSrc:'/static/image/2.jpg',//替换图片
              borderStyle:'solid',//边框类型
              borderWidth:1,//边框尺寸
              borderColor:'#ccc',//边框颜色
              deg:90,//旋转角度
              zoom:1.5,//放大的倍率
              distance:20,//位移距离
            }
          }
        }

        //兼容挂件列表数据
        if(childVal.data.listArr){
          childVal.data.listArr = JSON.parse(childVal.data.listArr);
        }

        if(!childVal.data.listArr){
          childVal.data.listArr = {};
        }



        //兼容挂件动画
        if(!childVal.data.animateObj){
          childVal.data.animateObj = {
            animatedType:'',
            animatedDuration:0.5,
            animatedDelay:0,
            animatedIterationCount:false,
            animatedState:'',
          }
        }


      })
    }
    else{
      //没有则定义一个
      val.children = [];
    }

    //兼容row数据
    //第一种状态，初始化模板，没数据的，row的数据要兼容
    if(!val.data.css.w_transtion){
      val.data.infor = JSON.parse(JSON.stringify(RowStyle.infor));

    }
    else{
      val.data.infor = JSON.parse(JSON.stringify(val.data.css));
      val.data.infor.module_height = val.data.infor.module_height ? parseInt(val.data.infor.module_height) : 0;
      val.data.infor.module_width = val.data.infor.module_width ? parseInt(val.data.infor.module_width) : 0;
      val.data.infor.module_index = val.data.infor.module_index ? parseInt(val.data.infor.module_index) : 0;
      val.data.infor.r_border_bottom_width = val.data.infor.r_border_bottom_width ? parseInt(val.data.infor.r_border_bottom_width) : 0;
      val.data.infor.r_border_top_width = val.data.infor.r_border_top_width ? parseInt(val.data.infor.r_border_top_width) : 0;
      val.data.infor.r_fill = val.data.infor.r_fill ? parseInt(val.data.infor.r_fill) : 0;
      val.data.infor.w_border_bottom_width = val.data.infor.w_border_bottom_width ? parseInt(val.data.infor.w_border_bottom_width) : 0;
      val.data.infor.w_border_left_width = val.data.infor.w_border_left_width ? parseInt(val.data.infor.w_border_left_width) : 0;
      val.data.infor.w_border_raduis_num = val.data.infor.w_border_raduis_num ? parseInt(val.data.infor.w_border_raduis_num) : 0;
      val.data.infor.w_border_right_width = val.data.infor.w_border_right_width ? parseInt(val.data.infor.w_border_right_width) : 0;
      val.data.infor.w_border_top_width = val.data.infor.w_border_top_width ? parseInt(val.data.infor.w_border_top_width) : 0;
      val.data.infor.w_fill = val.data.infor.w_fill ? parseInt(val.data.infor.w_fill) : 0;
      val.data.infor.w_opacity = val.data.infor.w_opacity ? parseInt(val.data.infor.w_opacity) : 1;
      val.data.infor.w_transtion = val.data.infor.w_transtion ? parseInt(val.data.infor.w_transtion) : 0;
    }



  }

  p_test(){
    //这里是测试代码--------------------------------------
    for (let i = 0; i < 6; i++) {
      Store.state.widgets_id ++;
      let obj = new Row({
        id: Store.state.widgets_id,
        widgets_id: Store.state.widgets_id.toString(),
        rowType:'body',
        children: []
      });
      Store.state.body.push(obj);
    }


    for (let i = 0; i < 1; i++) {
      Store.state.widgets_id ++;
      let Hobj = new Row({
        id: Store.state.widgets_id,
        widgets_id: Store.state.widgets_id.toString(),
        rowType:'header',
        children: []
      });
      Store.state.header.push(Hobj);
    }


    const that = this;
    setTimeout(function () {
      Store.state.widgets_id ++;
      let Fobj = new Row({
        id: Store.state.widgets_id,
        widgets_id: Store.state.widgets_id.toString(),
        rowType:'footer',
        children: []
      });
      Store.state.footer.push(Fobj);
    },200);

    //这里是测试代码--------------------------------------
  }

  //不是当前编辑模块，出现蒙城
  p_editing_block_Mongolia(e,type){
    const $this = e.target;
    const Mongolia = $($this).children('.editing_block_Mongolia');
    if(Mongolia.length == 0){
      return
    }
    const $this_offset_top = $($this).offset().top;
    const $this_offset_height = $($this).height();
    Mongolia.css({
      'opacity':0.6,
      'top':$this_offset_top + 'px',
      'height':$this_offset_height + 'px'
    });
  }

  p_Mongolia_close(e,type){
    const $this = e.target;
    const Mongolia = $($this).children('.editing_block_Mongolia');
    if(Mongolia.length == 0){
      return
    }
    const $this_offset_top = $($this).offset().top;
    const $this_offset_height = $($this).height();
    Mongolia.css({
      'opacity':0,
      'top':$this_offset_top + 'px',
      'height':$this_offset_height + 'px'
    });
  }

  //row排序
  p_row_sortable(ele,type){
    const that = this;
    let next_id = '';
    let module_index = 0;
    $('.' + ele).sortable({
      handle:'.handle_sortable',
      placeholder:'mySortableModule',
      axis: "y",
      start:function ( event, ui ) {
        ui.item.addClass('Sortableitem');
        /*module_index = ui.item.index();//初始记录被排序的index
        next_id = ui.item.parent().children('.layout_row').eq(module_index+1).attr('id');*/
      },
      stop:function ( event, ui ) {
        /*const end_module_index = ui.item.index();
        const id = ui.item.attr('id').replace('u','');
        const type = ui.item.attr('rowType');
        const row_index = that.p_find_rowIndex({id,type});
        const handle_row = Store.state[type].splice(row_index,1)[0];
        ui.item.removeClass('Sortableitem');
        if(next_id){
          const dom = ui.item.remove();
          $('#'+next_id).before(dom);
        }
        that.p_$nextTick(function () {
          Store.state[type].splice(end_module_index,0,handle_row);
        });*/

        //以下是重新渲染做法
        var nowModules = $(this).children();
        var idArr = []; //准备一个数组，存放id
        var endArr = [];//最终排序好的结果
        var dataArr = [];//数据源的id排序
        var modulesArr = JSON.parse(JSON.stringify(Store.state[type]));

        //dom的id顺序
        for (let i = 0; i < nowModules.length; i++) {
          idArr.push($(nowModules[i]).attr('id').replace('u', ''));
        }

        //数据源的id顺序
        for (let i = 0; i < Store.state[type].length; i++) {
          dataArr.push(Store.state[type][i].widgets_id);
        }

        //如果顺序没有发生变化，则不重新排序
        if(idArr.join() == dataArr.join()){
          ui.item.removeClass('Sortableitem');
          return;
        }

        ui.item.css('display','none');
        for (let i = 0; i < idArr.length; i++) {
          var isContinue = false;
          for (let j = 0; j < modulesArr.length; j++) {
            if (idArr[i] == modulesArr[j].widgets_id) {
              endArr.push(modulesArr[j]);
              isContinue = true;
              break;
            }
          }
          if (isContinue) {
            continue;
          }
        }
        //var s = new Date().getTime();
        Store.state[type] = [];
        that.p_$nextTick(function () {
          Store.state[type] = endArr;
        });
      }
    });
  }

  /*
  * 大保存
  * */
  p_save($message){
    const that = this;

    //保存前数据过滤下
    let body = JSON.parse(JSON.stringify(Store.state.body));
    let header = JSON.parse(JSON.stringify(Store.state.header));
    let footer = JSON.parse(JSON.stringify(Store.state.footer));

    body.map(function (val,i) {
      that.p_save_filter(val,'body');
    });

    header.map(function (val) {
      that.p_save_filter(val,'header');
    });

    footer.map(function (val) {
      that.p_save_filter(val,'footer');
    });

    var arr = {
      header,
      body,
      footer,
      page:'index',
      theme_id:Store.state.theme_id,
    };

    console.log('保存',arr);

    this.p_ajax({
      type:'post',
      url:'/index.php?app=site&m=desktop_ntheme_theme&a=save',
      data:arr
    }).then(function (data) {
      if(data){
        var isSuccess = JSON.parse(data);
        if(isSuccess.isSuccess){
          $message.success('保存成功！');
        }
      }
      else{
        $message.error('保存失败，请检查网络！');
      }

    }).catch(function (e) {
      console.log(e);
    })
  }


  /*大保存里的数据过滤
  * */
  p_save_filter(val,type){
    //val.data.StorageVal = JSON.stringify(val.data.infor);
    val.data.css = val.data.infor;
    let children = val.children;
    if(children){
      children.map(function (childVal, i) {
        if(childVal.data.infor){
          childVal.data.StorageVal = JSON.stringify(childVal.data.infor);
        }
        if(childVal.data.listArr){
          childVal.data.listArr = JSON.stringify(childVal.data.listArr);
        }
      })

    }
  }







}


