function EventEmit(){
    this.callbacks = {};
}
/**
 * 发布、订阅模式
 */
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

let el = new EventEmit();

el.on('a',() => {
    console.log('1111');
});

el.on('a',() => {
    console.log('22222');
});

el.emit('a');
