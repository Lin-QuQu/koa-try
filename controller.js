const fs = require('fs');

// 读取文件
function addControllers(router,dir){
    // 首先读取文件。之后过滤出文件中的js文件
    // __dirname 就是返回当前的路径
    var files = fs.readdirSync(__dirname+dir);
    // 返回一个不包括 '.' 和 '..' 的文件名的数组
    var js_files = files.filter((f)=>{
        return f.endsWith('.js');
    })
    for(var f of js_files){
        console.log(`process controller:${f}...`)
    
        // 引入URL处理js文件
        let mapping = require(__dirname+`/controllers/`+f);
        addMapping(mapping,router)
    }
}
// 创建router
function addMapping(mapping,router){
    console.log('new~~~~')
   //module.export 出来的是一个对象 for in 来遍历对象或者数组
    for(var url in mapping){
        // url输出的是属性名，mapping[url]输出的是属性值
        if(url.startsWith('GET')){
            var path = url.substr(4)
            router.get(path,mapping[url])
            console.log(`register URL mapping : GET ${path}`)
        }
        else if(url.startsWith('POST')){
            var path = url.substr(5)
            router.post(path,mapping[url])
            console.log(`register URL mapping : POST ${path}`)
        }
        else{
            console.log(`invalid URL:${url}`)
        }
    }
}
module.exports=function(dir){
    let controllers_dir = dir || '/controllers',
        router = require('koa-router')();
    addControllers(router,controllers_dir);
    return router.routes();
}