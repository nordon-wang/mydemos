import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions'
import * as getters from './getters';

import options from '../base/select_options_config';
Vue.use(Vuex);



// 应用初始状态
const state = {
 domain:'http://nordon3.com',
  // domain:'http://yyf.com',
  module_name: '', //当前选中的挂件名称basic_banner
  parts: '', //当前选中的部件名
  hover_parts: '', //当前悬浮选中的部件名
  widgets_id: 1000000, //前端模拟挂件id
  PendantList: [], //挂件列表
  header: [], //头部（数据源）
  body: [], //身体（数据源）
  footer: [], //底部（数据源）
  module_Data: null, //当前编辑的中转 对象,只做中转用，储存的挂件id，名字是对的，但是挂件的data不同步，要获取当前挂件数据，请在数据源里取
  options: options, //全局下拉框内容配置
  showPicCon:false, //图片选择容器
  imgUrls:null, //图片选择的图片url(回调函数的中转),
  styleSave_IsOpen:false,//样式保存
  editing_block:'body',//正在编辑的模块，body、header、footer
  icon_IsOpen:false,//图标选择的开关
  icon_Callback:null,//选择图标的回调函数中转
  icon_select_now:'fa-adjust',//当前选中的图标
  now_page:'index',//当前选中的页面
  theme_id:'800013',//当前模板id
};
//获取url的参数---------
var hrefStr = window.location.href;
var hrefArr = hrefStr.split('?');
var theme_id = '';
if(hrefArr.length > 1){
  var searchArr = hrefArr[1].split('&');
  for(let i = 0;i<searchArr.length;i++){
    if(searchArr[i].indexOf('theme_id=') > -1){
      theme_id = searchArr[i].replace('theme_id=','');
      break;
    }
  }
}
if(theme_id){
  state.theme_id = theme_id;
}

//theme_id


const PendantList = [{
  name: 'basic_banner',
  title: '轮播图',
  icon: '/static/image/model_ico6.png'
}, {
  name: 'basic_picture',
  title: '图片',
  icon: '/static/image/model_ico13_1.png'
}, {
  name:'basic_text_editor',
  title:'快速文本',
  icon:'/static/image/model_ico6.png'
}, {
  name:'basic_date',
  title:'日期',
  icon:'/static/image/model_ico2.png'
}, {
  name:'basic_goback',
  title:'返回',
  icon:'/static/image/model_ico3.png'
}, {
  name:'basic_location',
  title:'当前位置',
  icon:'/static/image/model_ico8.png'
}, {
  name:'basic_locationtitle',
  title:'当前标题',
  icon:'/static/image/model_ico8.png'
}, {
  name:'basic_video',
  title:'视频',
  icon:'/static/image/model_ico2.png'
},{
  name:'basic_searchs',
  title:'搜索',
  icon:'/static/image/model_ico3.png'
},{
  name:'basic_language',
  title:'多语言',
  icon:'/static/image/model_ico3.png'
},{
  name:'basic_customedit',
  title:'自定义内容',
  icon:'/static/image/model_ico3.png'
},{
  name:'basic_links',
  title:'链接',
  icon:'/static/image/model_ico3.png'
}];

state.PendantList = PendantList;


//-----------------------------------


// 定义所需的 mutations
//这里mutations的所有方法，我会加到vue原型链里面去，为了不和row.js里面的方重名，这里需要遵循命名规则，所有方法名加上前缀m_
const mutations = {

  m_change_module_Data(state,val){
    state.module_Data=val
  },

  test(state,{rowType,target_index,move_module}){
    //debugger;
    state[rowType][target_index].children.push(move_module);
  }



};

// 创建 store 实例
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
