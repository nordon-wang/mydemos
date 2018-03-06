export default {
  infor:{
    bannerSet:{
      btn:'block',
      pagination:'block',
      time:1000,
      speed:300,
      animation:'fade',
      pattern:'horizontal',
      width:500,
      height:300
    },
    textEffect:{
      color:'#666',
      fontSize:20,
      in:'flash',
      out:'bounce',
      display:'none',
      left:0,
      top:0
    },
    btnStyle:{
      leftIcon:'fa-angle-double-left',
      rightIcon:'fa-angle-double-right',
      background:'#5874d8',
      fontSize:30,
      color:'#ccc',
      width:50,
      height:80,
      marginTop:1,
      marginLR:1,

    },
    pageStyle:{
      background:'#fff',
      selectbackground:'#f00',
      width:70,
      height:50,
      margin:5,
      borderColor:'#333',
      textAlign:'center',
      type:'point',
      left:100,
      bottom:10,
      borderWidth:5,
      borderRadius:0
    },

    effectsObj:{
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
  },
  listArr: {
    picList: [
      {
        src: '/static/image/1.jpg',
        link: '',
        alt: '这是提示',
        openMode: '_blank',
      },
      {
        src: '/static/image/2.jpg',
        link: '',
        alt: '',
        openMode: '_blank',
      },
      {
        src: '/static/image/3.jpg',
        link: '',
        alt: '',
        openMode: '_blank',
      },
      {
        src: '/static/image/imageEffetc_thumb_0.jpg',
        link: '',
        alt: '',
        openMode: '_blank',
      }
    ]
  },
  animateObj:{
    animatedType:'',
    animatedDuration:0.5,
    animatedDelay:0,
    animatedIterationCount:false,
    animatedState:'',
  },

};
