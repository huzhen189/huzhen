/*
*1.创建服务器等待服务进程 执行端口监听
*2.执行url路由，具体就是把客户端的访问url转到特定的处理函数上面
*3.srv为那些url处理函数生成实际参数requst(req)和response(res)
*4.request里面封装的是从客户端（浏览器）过来的
*     参数（url,cookia,method[get,post]等等）,数据（get,post）
*5.response主要是封装了回应客户端的数据和方法，主要用到的方法有：
*       write和end。end要最后执行一次（仅仅一次）
*
*
* */
var url = require('url')//分拆url
/*1.http://domain/
* 2.http://domain/path/a(.html)(.php)
* 3.http://domain/path/a.php?nama=jack&gender=male
* domain
* path
* parameters
* */
var routes = require("./routes")
    exhandle = require("./exception").handle
//dispatch真正实现了路由
var dispatch = function (req, res) {
    //routes.handles[req.path](req,res)
    var ob = url.parse(req.url)//对url进行解析，获取内容放到ob里面
    var func = routes.handles[ob.pathname]//定义一个函数载体，根据url传过来的
    if(typeof func == "undefined"){
        exhandle(req,res)
    }else{
        func(req,res)
    }
}
var http = require("http")
port = 3345
srv = http.createServer(dispatch)//当有人访问localhost:3000 端口时候，执行函数dispath
console.log("sever listins on: " + port)
srv.listen(port)
