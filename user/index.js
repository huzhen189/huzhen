var actions = require("./actions")
exports.handles = {
    "/user/create":actions.create,
    "/user/modify":actions.modify,
    "/user/select":actions.select,
    "/user/login":actions.login,
    "/user/delet":actions.delete
}