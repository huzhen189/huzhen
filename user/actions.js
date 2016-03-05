var db = require("../db")
var url = require("url")
exports.create = function(req,res){
    var query_obj=url.parse(req.url,true).query
    //console.log(query_obj["username"])
    //console.log(query_obj["password"])
    var sql="SELECT username,password FROM users where username= "
    var q_username=query_obj["username"]
    var q_password=query_obj["password1"]
    sql=sql+"'"+q_username+"'"
    db.query(sql, function (err,r) {
        if(err){
            res.end('{"res":2004,"msg":"pgsql error!!"}')
            return
        }
        else {
            if (r.rowCount==1){
                res.end('{"res":1,"msg":"this username is exists"}')
                return
            }
            else if(r.rowCount==0){
                console.log("该用户名未被使用，可以注册")
                var sql1 ="insert into users(username,password) values('"+q_username+"','"+q_password+"');"
                db.query(sql1, function (err,r) {
                    if(err){
                        res.end('{"res":2004,"msg":"pgsql error"}')
                        return
                    }
                    else {
                        res.end('{"res":0,"msg":"create users  success"}')
                         /*if(r.rowCount==0){}*/
                    }
                })
            }
        }
    })
}

exports.modify = function(req,res){
    db.query("updata user set name=? where email=?",
        ["testchanged","test@eachma.com"],
        function (err,r) {
            console.log(err)
            console.log(r)
            res.end("test ok : modify user")
        })
}
exports.select = function(req,res){
    db.query("SELECT * FROM user;",
        function (err,r) {
            //console.log(err)
            //console.log("\n now is r: \n"+ r.rows[0].name)
            var name=new Array,age=new Array
            for(var x in  r.rows){
                name[x]=r.rows[x].name
                age[x]=r.rows[x].age
            }
            console.log(name+age)
            res.end("test ok : select user:\n"+ name+ "\n"+age)
        })
}
exports.delete = function(req,res){
    db.query("SELECT * FROM huzhen;",
        function (err,r) {
            //console.log(err)
            //console.log("\n now is r: \n"+ r.rows[0].name)
            var name=new Array,age=new Array
            for(var x in  r.rows){
                name[x]=r.rows[x].name
                age[x]=r.rows[x].age
            }
            console.log(name+age)
            res.end("test ok : select user:\n"+ name+ "\n"+age)
        })
}

exports.login = function(req,res){
    var query_obj=url.parse(req.url,true).query
    //console.log(query_obj["username"])
    //console.log(query_obj["password"])
    var sql="SELECT username,password FROM users where username= "
    var q_username=query_obj["username"]
    var q_password=query_obj["password"]
    sql=sql+"'"+q_username+"'"
    sql=sql+"AND password='"+q_password+"'"
    db.query(sql, function (err,r) {
            if(err){
                res.end('{"res":2004,"msg":"pgsql error"}')
                return
            }
            else {
                if (r.rowCount==1){
                    res.end('{"res":0,"msg":"login OK!!"}')
                    return
                }
                else if(r.rowCount==0){
                    res.end('{"res":1,"msg":"username or pssword error!!"}')
                    return
                }
            }
            //console.log(r[0].name)
        })
}
