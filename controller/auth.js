const User = require("../db/user")


module.exports.RegisterUser = (async(req,res)=>{

    const user = await User.findOne({
        username:req.body.username
    })
    if(user){
        return res.json({message : 'user deja creacted'})
    }

    const {username} = req.body
    const newUser = new User({
        username : username,
    })
    await newUser.save()
    res.json({message : 'your acount is created',user : newUser})
})

module.exports.LoginUser = async(req,res)=>{


    const user = await User.findOne({
        username:req.body.username
    })
    if(!user){
        return res.json({message:'user not found'})
    }

    const token = user.generatAuthToken()

    res.json({
        username:user.username,
        _id:user._id,
        Notification:user.Notification,
        token,
    })

}

module.exports.getAllUsers = (async(req,res)=>{

    const users = await User.find().populate('widrawsClients',['ment','from','-to']).populate('notifications',['ment','notification','idSendMony']).populate('widrawsSenders',['ment','to','-from'])
    res.json(users)

})


module.exports.getUserById =async(req,res)=>{
    const user = await User.findById(req.params.id).populate('widrawsClients',['ment','from','-to']).populate('notifications',['ment','notification','idSendMony']).populate('widrawsSenders',['ment','to','-from'])
    res.json(user)
}