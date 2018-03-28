/**
 * 发布、订阅模式
 */
function EventEmit(){
    this.callbacks = {};
}
EventEmit.prototype.on = function(eventName,fn){
    /**
     * 订阅事件
     *  若是 callbacks对象中不存在 为其增加一个空数组 
     */
    if(!this.callbacks[eventName]){
        this.callbacks[eventName] = [];
    };
    /**
     * 将回调函数 加入到对应的订阅事件中
     */
    this.callbacks[eventName].push(fn);

}

EventEmit.prototype.emit = function(eventName){
    /**
     * 发布事件
     *  若是事件名在callbacks中不存在 直接return
     *  存在就循环遍历对应的回调函数
     */
    if(!this.callbacks[eventName]){
        return ;
    }
    
    this.callbacks[eventName].forEach(fn => {
        fn()
    });
}
/**
 * vue双向数据绑定
 *  1. Object.defineProperty(obj,key,{})
 *  2. 事件订阅、发布模式
 */
;
(function () {

    function Vue(options) {
        let { el, data } = options;

        // 根节点
        let rootEl = document.querySelector(el);

        // 设置私有属性 进行映射
        let _data = {};
        // 专门用于 发布订阅的
        let _events = new EventEmit();

        /**
         * 数据观测
         *  当data数据中发生变化，发出事件通知，所有订阅了该事件的dom都会得到更新
         */
        for (let key in data) {
            // 映射复制一份
            _data[key] = data[key];
            /**
             *  当通过实例进行访问data中数据的时候，
             *  实际上访问的是_data中的数据
             *  把data中的成员 变为实例成员
             */
            Object.defineProperty(this, key, {
                get() {
                    return _data[key];
                },
                set(val) {
                    _data[key] = val;
                    // 发布事件 只要改变 就发布出去
                    _events.emit(key);
                }
            });
        }

        // 递归解析模板，注册数据绑定事件
        function compile(childNodes) {
            childNodes.forEach((node, index) => {

                switch (node.nodeType) {
                    case 1:
                        // 处理input类型的便签 进行v-model双向绑定的
                        if(node.nodeName === 'INPUT'){
                            const vModel = node.attributes['v-model'];
                            if(!vModel){
                                return ;
                            }

                            var dataKey = vModel.value.trim();
                            node.oninput = () => {
                                this[dataKey] = node.value;
                            }

                            // 如果是标签节点 继续递归调用
                            compile.call(this,node.childNodes);

                        }
                        break;
                    case 3:
                        console.log($(node).parent().text());
                        let matches = /{{(.+)}}/.exec($(node).parent().text());
                        if(matches){
                            var dataKey = matches[1].trim();
                            // node.textContent = _data[dataKey];
                            $(node).parent().text(_data[dataKey])
                            _events.on(dataKey,()=>{
                                node.textContent = _data[dataKey];
                                console.log('object');
                            });
                        }

                        break;

                }

            });
        }

        // 第一次调用递归 this指向实例
        compile.call(this,rootEl.childNodes);
    }

    window.Vue = Vue;

})();


/**
 * beforeCreate
 *      在实例初始化之后
 *      这里拿不到data、el数据
 * created
 *      在实例创建完成后被立即调用
 *          实例已经完成数据观测、属性和方法的运算、event/watch事件回调
 *          挂载阶段还没开始，$el还没有
 *      适用于发送请求，修改data数据
 * beforeMount
 *      在挂载开始之前被调用
 *      相关的render函数首次被调用
 *      还没有渲染DOM
 * mounted
 *      el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子
 *         vm.$nextTick()保证子组件一起被挂载
 * beforeUpdata
 * updated
 * activated
 * deactivated
 * beforeDestory
 * destoryed
 * errorCaptured
  * 
 */