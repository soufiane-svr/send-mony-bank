///   User.js ///__________________________________________________________________user.js
const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    notification:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"test43-bank",
        required:true
    },
    ment:{
        type:String,
        required:true
    },
    idSendMony:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'test43-send_mony',
        rqeuired:true
    }
},{
    timestamps :true
})

const Notif = mongoose.model('test43-send_Notification',newUser)
module.exports = Notif