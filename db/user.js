///   User.js ///__________________________________________________________________user.js
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const newUser = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mony:{
        type:Object,
        default: 8000,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true,
    },
},{
    timestamps :true,
    toJSON : {virtuals:true},
    toObject : {virtuals:true},
})
newUser.methods.generatAuthToken = function(){
    return jwt.sign({id:this._id},'private key')
}


newUser.virtual('widrawsClients',{
    ref:"test43-send_mony",
    localField:'_id',
    foreignField:'to'
})
newUser.virtual('widrawsSenders',{
    ref:"test43-send_mony",
    localField:'_id',
    foreignField:'from'
})

newUser.virtual('notifications',{
    ref:"test43-send_Notification",
    localField:'_id',
    foreignField:'userId',
})


const User = mongoose.model('test46-bank',newUser)
module.exports = User