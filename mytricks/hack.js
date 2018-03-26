/**
 * ~~ 可以将一个小数转为整数，
 * 	   也可以将一个数字字符串转为数字
 * ~~213.23 ==> 213
 * ~~'123.123' ==>　123
 * ~~'w123e' ==> 0
 */

/**
 * # 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
 * npm install --registry=https://registry.npm.taobao.org
 */

/**
 * 如果使用数组的forEach、find、map等数组自带的方法
 * 如果里面使用的是普通的匿名函数的，则其中的this始终指向window
 * 无论在哪里调用
 */
[].forEach(function(){
    //  这里的this  无论在哪里调用 始终指向window
});
/**
 * 若是想改变其this的指向 可以使用 bind
 *  不可以使用call apply 因为这两个会调用函数
 *  使用bind 不会调用函数 只是传递进入而已 返回一个绑定的this的函数
 */
[].forEach(function(){
    //  这里的this 指向 {foo:'foo'}
}.bind({foo:'foo'}));
/**
 * 还可以使用箭头函数
 */