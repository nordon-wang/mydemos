// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import myajax from './js/ajax';

// 引入 编辑框
// import KindEditor from './js/kindeditor-min';
// import KindEditor_zh from './js/zh_CN';

//jquery-ui中引入了jq，然后这里直接引入jq-ui就行
import $ from './js/jquery-ui';
import ElementUI from 'element-ui';
import store from './vuex/store';
import TempletPerson from './base/row';
import Templet from './base/row_extend';
import 'element-ui/lib/theme-chalk/index.css';
//import 'font-awesome/css/font-awesome.min.css'
import '../static/css/font-awesome.min.css'
import './css/base.css';
import './css/jquery_ui.css';
import './css/style_y.css';
import './css/style_wy.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import animate from 'animate.css';

// 富文本框引入
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'

Vue.config.productionTip = false
// 注册 vue-kikindeditor plugin
Vue.use(VueKindEditor)

//自己封装的组件，注册为全局组件
import  myNumber from './view/public/edit_number';
import  editAnimated from './view/public/edit_animated';
import  editEffects from './view/public/edit_effects';
import  mySelect from './view/public/edit_select';
import  myColor from './view/public/edit_color';
import  picSelect from './view/public/pic_select';
import  myDefaultstyle from './view/public/edit_defaultStyle';
import  myBorder from './view/public/edit_boder';
import  myInput from './view/public/edit_input';
import  myImg from './view/public/edit_img';
import  myIcon from './view/public/edit_icon';
import  imgEffect from './view/public/index_effect_img';
import  iconSearch from './view/public/icon_search';
import  myTooltip from './view/public/edit_tooltip';
import  myDistance from './view/public/edit_distance';
import { log } from 'util';

Vue.use(animate);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper, /* { default global options } */);
Vue.use(VueQuillEditor, /* { default global options } */);



Vue.component('my-number', myNumber);
Vue.component('my-animated', editAnimated);
Vue.component('my-effects', editEffects);
Vue.component('my-select', mySelect);
Vue.component('my-color', myColor);
Vue.component('my-input', myInput);
Vue.component('my-tooltip', myTooltip);
Vue.component('my-distance', myDistance);
Vue.component('picSelect', picSelect);
Vue.component('my-defaultstyle', myDefaultstyle);
Vue.component('my-border', myBorder);
Vue.component('my-img', myImg);
Vue.component('my-icon', myIcon);
Vue.component('img-effect', imgEffect);
Vue.component('icon-search', iconSearch);

//公共方法定义到Vue原型中，全局调用在this.templet
Vue.prototype.templet = new Templet(Vue);



var myVm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});


