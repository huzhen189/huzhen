var user=require("../user")

var handles = {}
for(var k in user.handles){
    handles[k] = user.handles[k]
}


exports.handles = handles
