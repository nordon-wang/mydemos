function EventEmit(){
    this.callbacks = {};
}

EventEmit.prototype.on = function(eventName,fn){

    if(!this.callbacks[eventName]){
        this.callbacks[eventName] = [];
    };

    this.callbacks[eventName].push(fn);

}

EventEmit.prototype.emit = function(eventName){
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
