//所有下拉菜单配置
//value和label属性类型是string
export default {
  pageType:[
    {
      value: 'point',
      label: '点状'
    },
    {
      value: 'thumbnail',
      label: '缩略图'
    }
  ],
  open:[
    {
      value: '_blank',
      label: '新窗口打开'
    }, {
      value: '_self',
      label: '当前窗口打开'
    }
  ],
  twoBtn:[
    {
      value: 'block',
      label: '开启'
    },{
      value: 'none',
      label: '关闭'
    }
  ],
  pagination:[
    {
      value: 'false',
      label: '关闭'
    },{
      value: 'fraction',
      label: '数字型'
    },{
      value: 'progress',
      label: '进度条'
    },{
      value: 'bullets',
      label: '按钮型'
    }
  ],
  speed:[
    {value: 300,label: '0.3秒'},
    {value: 500,label: '0.5秒'},
    {value: 700,label: '0.7秒'},
    {value: 1000,label: '1秒'},
    {value: 1200,label: '1.2秒'},
    {value: 1500,label: '1.5秒'},
    {value: 2000,label: '2秒'},
    {value: 2500,label: '2.5秒'},
    {value: 3000,label: '3秒'},
  ],
  animation:[
    {value: 'fade',label: '淡入淡出'},
    {value: 'slide',label: '滑动'},
    {value: 'flip',label: '翻牌'},
    {value: 'cube',label: '3d方块'},
    {value: 'coverflow',label: '相册'},
  ],
  pattern:[
    {value: 'horizontal',label: '横向'},
    {value: 'vertical',label: '纵向'},
  ],
  textOpen:[
    {
      value: 'block',
      label: '开启'
    }, {
      value: 'none',
      label: '关闭'
    }
  ],
  textAlign:[
    {
      value: 'left',
      label: '居左'
    },
    {
      value: 'center',
      label: '居中'
    },
    {
      value: 'right',
      label: '居右'
    },
  ],
  borderStyle: [
    {value: 'dotted', label: '点虚线'},
    {value: 'dashed', label: '虚线'},
    {value: 'solid', label: '实线'}
  ],
  backgroundRepeat: [
    {value: 'repeat', label: '平铺'},
    {value: 'no-repeat', label: '不平铺'},
    {value: 'repeat-x', label: '横向平铺'},
    {value: 'repeat-y', label: '纵向平铺'},
  ],
  backgroundPosition:[
    {value: 'top left', label: '上-左'},
    {value: 'top center', label: '上-中'},
    {value: 'top right', label: '上-右'},
    {value: 'center left', label: '中-左'},
    {value: 'center center', label: '中-中'},
    {value: 'center right', label: '中-右'},
    {value: 'bottom left', label: '下-左'},
    {value: 'bottom center', label: '下-中'},
    {value: 'bottom right', label: '下-右'},
  ],
  gobackFun:[
    {value: 'top', label: '返回顶部'},
    {value: 'back', label: '返回上一级'}
  ],
  locationFun:[
    {value: 'default', label: '默认数据'},
    {value: 'self', label: '自定义数据'}
  ],
  videoStyle:[
    {value: 'mp', label: 'mp4'},
    {value: 'flash', label: 'flash'}
  ],
  videoPosition:[
    {value: 'absolute', label: '常规定位'},
    {value: 'fixed', label: '绝对定位'}
  ],
  myDirective:[
    {value: 'left', label: '横向'},
    {value: 'none', label: '纵向'}
  ],
  customOption:[
    {value: '0', label: '滚动定位'},
    {value: '1', label: '正常定位'},
    {value: '2', label: '绝对定位'}
  ],
  customOptionTwo:[
    {value: '0', label: '关闭'},
    {value: '1', label: '开启'}
  ],
  myFontWeight:[
    {value: 'normal', label: 'normal'},
    {value: 'bold', label: 'bold'},
    {value: 'bolder', label: 'bolder'},
    {value: 'lighter', label: 'lighter'},
    {value: '100', label: '100'},
    {value: '200', label: '200'},
    {value: '300', label: '300'},
    {value: '400', label: '400'},
    {value: '500', label: '500'},
    {value: '600', label: '600'},
    {value: '700', label: '700'},
    {value: '800', label: '800'},
    {value: '900', label: '900'}
  ],
  linkStatus:[
    {value: 'underline', label: '存在'},
    {value: 'none', label: '无'}
  ],
  twoBtns:[
    {
      value: 'true',
      label: '显示'
    },{
      value: 'flase',
      label: '隐藏'
    }
  ],
}
