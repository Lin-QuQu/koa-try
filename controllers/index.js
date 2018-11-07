// 一个get请求，返回一个表单提交页面
var fn_index = async (ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
}
// 一个post请求
var fn_signin= async (ctx,next)=>{
    var name = ctx.request.body.name || ''
    var password = ctx.request.body.password || ''
    console.log(`signin with name: ${name} ,password:${password}`);
    if(name === 'admin' && password === '123'){
        ctx.response.body = `<h1>welcome~</h1>`
    }
    else{
        ctx.response.body = `<h1>Failed~</h1>
        <p><a href="/">Try again</a>`
    }
}

module.exports = {
    'GET /':fn_index,
    'POST /signin':fn_signin
}