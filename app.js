const Koa = require('koa');
const bodyParser = require('koa-bodyparser') //解析request Body
const controller = require('./controller') //读取文件。创建router
const app = new Koa()

app.use(bodyParser())
app.use(controller());

app.listen(3000);
console.log('app starting at port 3000 ……')