import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import indexVue from '@/components/indexVue'
import hi1 from '@/components/hi1'
import hi2 from '@/components/hi2'
import left from '@/components/main1'
import right from '@/components/main2'
import urlParams from '@/components/urlParams'
import reRirect from '@/components/redirect'
import error from '@/components/error'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/h',
      //name:'hi',//若是通过name传递参数 这个name值 无效果 需要在子理由里面配置
      component: HelloWorld, //这个组件初始化 必须要 , 否则显示不出页面
      children:[{
        path:'/',
        name:'hi',
        //component:HelloWorld //这个可以不用显示 会重复将需要渲染的页面渲染两次
      },{
        path:'hi1',
        name:'hi1',
        component:hi1
      },{
        path:'hi2',
        name:'hi2',
        component:hi2
      }]
    },{
      path:'/',
      name:'indexVue',
      components:{ // 若是多页面的 需要使用components
        default:indexVue,
        left:left,
        right:right
      },
      alias:'/aliasindex' //alias别名使用 
    },{
      path:'/m', //和'/'对应 只是调换下位置
      name:'indexVue',
      components:{ // 若是多页面的 需要使用components
        default:indexVue,
        left:right,
        right:left
      }
    },{
      path:'/urlparams/:userId(\\d+)/:userName', //根据url参数 传递参数 -- (\\d+) 是一个正则 用来确保ID为数字
      component:urlParams,
      // beforeEnter:(to,from,next) => {
      //   console.log(to);
      //   console.log(from);
      //   // 是否允许跳转 没有next 就不跳转
      //   // next(); 

      //   //  或者在next() 传递一个参数是否跳转 true跳转 false不跳转
      //   // next(true);

      //   // 或者在next() 传递一个对象 让其跳转到哪里去
      //   next({path:'/'}); //跳转至根目录
      // }
    },
    {
      path:'/redirect',
      redirect:'/'
    },{
      path:'/goParams/:userId(\\d+)/:userName',
      redirect:'/urlparams/:userId(\\d+)/:userName'
    },{
      path:'*',
      component:error
    }
  ]
})

/**
 * 配置子路由注意
 *  1. path:'hi1' 路径前面不需要带 /
 *  2. 在h页面中 需要增加 route-voew标签  用以显示子路由
 *  3.子路由中 path:'/' 代表渲染当前路由
 */

/**
 * 参数传递
 *  1.通过name传递参数 -- 不常用  不适用
 *  2.通过模板进行传递
 *    2.1 在route-link中 绑定to
 *      <router-link :to="{name:'hi1',params:{username:'nordon',id:12}}">link to h1</router-link>
 *      主要name的值和路由中的name值保持一致
 *    2.2 直接在需要显示的组件中使用
 *      {{$route.params.username}} -- {{$route.params.id}}
 *  3.通过url传递参数
 *    3.1 在router-link中 增加参数
 *         <router-link to="/urlparams/12/nordon">url传递参数</router-link>
 *    3.2 在路由path中配置 -- 可以增加正则来限定参数
 *      path:'/urlparams/:userId(\\d+)/:userName'
 *    3.3 在对应的组件中直接可以使用传递的参数
 *      $route.params.xxx
 *    
 */

/**
 * 单页面多路由区域操作 -- 一个页面有多个router-view 
 *  1. 给每个router-view命名  只有一个可以省略命名 省略的为default
 *  2. 更改对应组件的 components 需要加s
 *  components:{ // 若是多页面的 需要使用components
*       default:indexVue, //没有命名的 默认显示的区域
 *      left:right,  //将组件right显示在命名为name=left的router-view中
 *      right:left //将组件left显示在命名为name=right的router-view中
 *    }
 *  
 */

/**
 * 重定向-- redirect
 *  1.不需要传递参数
 *    在路由配置中 配置redirect 需要重定向的路由
 *  2.传递参数
 *    2.1path中将需要传递的参数带上
 *      path:'/goParams/:userId(\\d+)/:userName',
 *    2.2 redirect重定向的地址和带参数的地址保持一致
 *      redirect:'/urlparams/:userId(\\d+)/:userName'
 */

/**
 * alias别名使用 -- 类似与 重定向 redirect 区别是 url地址
 *  path:'/xxx',
 *  alias:'/xxxxx' //alias别名使用 
 *  /xxxxx路径 其实还是跳转到xxx页面
 */

/**
 * 404页面处理 path路径设置为* component引入对应的组件显示404
 *  path:'*' 
 * 
 */

/**
 * 路由的钩子函数
 *  1.在配置中写-- 只能写一个 beforeEnter
 * 
 *  2. 在模板中写 -- beforeRouteEnter beforeRouteLeave ...
 *    
 */