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
 *  包管理器
 */