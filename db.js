
var pg = require('pg');
var conString = "tcp://postgres:l9yus5nn@localhost:5432/hacker_db"

exports.query=function(){
    var client = new pg.Client(conString);
    var args = arguments
    client.connect(function(err) {
        if(args.length==2){
            client.query(args[0],function(err,r){
                args[1](err,r)
            })
        }else if(args.length==3){
            client.query(args[0],args[1],function(err,r){
                args[2](err,r)
            })
        }
    });
}