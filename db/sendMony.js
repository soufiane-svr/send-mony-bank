///   User.js ///__________________________________________________________________user.js
const mongoose = require('mongoose')

const newUser = new mongoose.Schema({
    ment:{
        type:Number,
        trim:true,
        required:true
    },
    users:Array,
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"test43-bank",
        trim:true,
        required:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"test43-bank",
        trim:true,
        required:true
    }
},{
    timestamps :true
})

const Mony = mongoose.model('test43-send_mony',newUser)
module.exports = Mony