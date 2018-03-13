/**
 * 系统模块
 *      http fs url requestring crypto(加密) events  net(网络操作)
 *      os(操作系统信息) path(处理文件路径) stream(流操作) timer(定时器)
 *      zlib(压缩)
 *  稳定性
 *      stability:3 -locked 固定版本 不会更改了
 *      stability:2 -stable 稳定版本 基本不会更改
 * 
 * 
 *  自定义模块
 *      上传自己的
 *      1.注册账号 
 *          在npm中登陆 npm login
 *          登陆之后 可以 npm whoami 查看下
 *      2. 在目录中 npm init 初始化
 *          name 就是模块的名字
 *      3.npm publish 发布
 *          若是再发布 需要在package.json中将版本号version进行升级 不然会报错
 *      4.npm --force unpublish  移除发布
 *          删除是一个一个版本删除 所以需要更改version 一次一次的删除
 *          若是发布超过24小时 不能通过命令删除  需要给官方发邮件进行删除
 * 
 */

/**
 * node是单线程
 *  什么是进程
 *      正在运行的程序就是进行(进行中的程序)
 *  什么是线程
 *      1.用来执行应用程序中的代码
 *      2.在一个进程内部，可以有很多的线程
 *      3.在一个线程内部，同时只可以干一件事情
 *  多线程的问题
 *      1. 多线程都是假的，因为只有一个cpu(单核的情况下)
 *      2. 线程之间共享某些数据、同步某个状态很麻烦
 *      3. 创建线程耗费
 *      4. 线程的数量有限-- cpu的大小是有限的
 *      5.cpu在不同的线程之间转换，会有个上下文的转换，这个转换非常耗时
 */

/**
 * 事件驱动 非阻塞I/O
 *  1.node中将所有的阻塞操作交给了内部实现的线程池
 *  2.node本身主线程主要就是不断的 '往返调度'
 * 
 * 非阻塞优势
 *  1.提高代码的响应效率
 *  2.充分利用单核cpu的优势
 *  3.改善I/O的不可预测带来的问题
 */

/**
 * __dirname -- 当前脚本所在路径
 * 
 * __filename -- 文件路径
 */

/**
 *  -- 描述的越详细 优先级越高 没有就会找缺省的
 * require(dir.js) 
 * require(dir.json) 
 * require(dir.node)
 *  如果省略扩展名 就会默认从模板里去找 依次为 js json node文件
 *  若是js json node文件都不存在 
 *  则会继续找 package.json文件(配置文件)  
 *      package.json中
 *          {
 *              main:'default.js'
 *          }
 *      则会加载这个default.js
 *  则会去dir目录下去找 默认找dir目录下的index.js文件进行加载
 * 
 * 
 *  加载系统模块 若是模块名称重复 系统模块的优先级最高
 * 
 */

/**
 * require(moduls)
 *  这种加载方式 不是加载系统模块 那么会默认去node_moduls目录下去找
 *  不管这个node_moduls在什么位置 会一直向上找
 *  都是可以找到的 (就近原则)
 * 
 * require(./dir)
 *      当前目录找
 * require(../dir)
 *      当前目录的上一级目录找
 *  require(/dir)
 *      以系统的根目录开始找模块 -- 就是以绝对路径的方式找
 */

/**
 * 模块缓存
 *  1.第一次加载某个模块是，node会缓存该模块，以后再加载该模块，
 *  直接从缓存中取出该模块的module.exports属性(不会再次执行该模块)
 *  2.如果需要多次执行模块中的代码，一般可以让模块暴露行为(行为)
 *  3.模块的缓存可以通过require.cache拿到 也可以删除
 */

/**
 * fs-extra -- fs的扩展
 */

/**
 * path(路径操作模块)
 * 在文件操作的过程中，'最好'使用物理路径(绝对路径)
 *  path.join(dir1,dir2...) -- 连接多个路径
 *  path.basename(p,ext) -- 获取文件名
 *  path.dirname(p) -- 文件夹路径
 *  path.extname(p) -- 获取文件扩展名
 *  path.format(obj) && path.parse(p)
 *  path.relative(from,to) -- 获取from到to的相对路径
 */

/**
 * readline 一行一行的读
 */

/**
 * 缓冲区
 *  缓冲区就是内存中操作数据的容器
 *  只是数据容器而已
 *  通过缓冲区可以很方便的操作二进制数据
 *  大文件操作时必须有缓冲区
 */