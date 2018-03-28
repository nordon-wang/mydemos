/**
 * MVVM --> 架构方式、开发思想
 * M --> Model 数据模型
 * V --> View视图界面
 * VM --> ViewModel 视图数据模型
 * 
 *  原则 -- 模块职责单一
 */

function EventEmit() {
    this.callbacks = {

    };
}

EventEmit.prototype.on = function (name, cb) {

    if (!this.callbacks[name]) {
        this.callbacks[name] = [];
    }

    this.callbacks[name].push(cb);

}

EventEmit.prototype.emit = function (name) {

    if (!this.callbacks[name]) {
        return;
    }
    this.callbacks[name].forEach((cb) => {
        cb();
    }, this);

}

// let ev = new EventEmit();

// ev.on('a',()=>{
//     console.log('11111111');
// })
// ev.on('a',()=>{
//     console.log('22222222');
// })
// ev.emit('a');

// function Cat(){
//     EventEmit.call(this);
// }

// Cat.prototype = new EventEmit();
// Cat.prototype.constructor = Cat;

// let cat = new Cat();
// cat.on('m',() => {
//     console.log('11111111');
// });
// cat.on('m',()=>{
//     console.log('object2222222');
// })
// cat.emit('m')


let ev = new EventEmit();

function Vue(options) {
    let { el, data } = options;
    let rootEl = document.querySelector(el);

    /**
     * 测试
     * ev.on('msg',()=>{
        document.querySelector('h1').innerHTML = data['msg'];
    })
    ev.on('msg',()=>{
        document.querySelector('h2').innerHTML = data['msg'];
    })
    ev.on('msg',()=>{
        document.querySelector('p').innerHTML = data['msg'];
    })*/

    /**
     * 遍历DOM树 进行绑定
     */
    let childNodes = rootEl.childNodes;
    function myevent(childNodes) {

        for (let i = 0; i < childNodes.length; i++) {
            switch (childNodes[i].nodeType) {
                case 1:
                    if(childNodes[i].nodeName == 'INPUT'){
                        let mykey = childNodes[i].attributes['v-model'].value.trim();
                        childNodes[i].oninput = () => {
                           if(mykey){
                               data[mykey] = childNodes[i].value;
                               ev.emit(mykey)
                           }

                        }
                    }
                    myevent(childNodes[i].childNodes)
                    break;
                case 3:
                    let matches = /{{(.+)}}/.exec(childNodes[i].textContent);
                    if (matches) {
                        var eventName = matches[1].trim();
                        ev.on(eventName, () => {
                            childNodes[i].textContent = data[eventName];
                        })
                    }
                    break;
            }
        }
    }
    myevent(childNodes)
    // debugger;


    for (let key in data) {
        Object.defineProperty(this, key, {
            get() {
                return data[key];
            },
            set(val) {
                // 改变数据
                data[key] = val;
                // 发布事件
                ev.emit(key);
            }
        })
    }



}

