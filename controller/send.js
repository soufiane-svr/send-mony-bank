const Notif = require("../db/notification")
const Mony = require("../db/sendMony")
const User = require("../db/user")


module.exports.sendMony = (async(req,res)=>{

    const {from,to,ment} = req.body

    if(ment > 500) {
       return res.json({ message :'ment is fast please get < 500 $'})
    }

    //get user sender
    const userSender = await User.findById(from)
    if(!userSender){
        return res.json({message : "userSender not found"})
    }
    if(userSender.mony  < 0){
        return res.json({message :'The wallet is empty'})
    }
    if( userSender.mony < ment){
        return res.json({message :'المبلغ غير متوفر'})
    }
    // $ للتأكيد على أن البحث ينتهي بنهاية السلسلة
    if(ment < 2){
        return res.json({message : 'please gat amount > 1 $'})
    }
    
    //get user Client
    const userClient = await User.findById(to)
    if(!userClient){
        return res.json({message : "userClient not found"})
    }


    const sendMony = new Mony({
        users:[from,to],
        from:from,
        to:to,
        ment: ment
    })
    await sendMony.save()

    //get user Client and update compte
    const userClientUpdate = await User.findByIdAndUpdate(to,{
        $set:{
            mony: userClient.mony + ment - 1
        }
    },{
        new:true
    })


    //get user send and update compte
    const userSenderUpdate = await User.findByIdAndUpdate(from,{
        $set:{
            mony: userSender.mony - ment
        }
    },{
        new:true
    })
    //notification to user Client
    const notification = new Notif({
        userId : userClient._id,
        notification:'لقد توصلت بطلبة جديدة',
        ment:ment - 1,
        idSendMony: sendMony.from
    })
   
  
    //___admin
    //getadmin
    const adminUser = await User.findById('6623cd2e035f20e0fd3a63e6')
    if(!adminUser){
        return res.json({message  : 'admin nout found'})
    }
    const admin = await User.findByIdAndUpdate('6623cd2e035f20e0fd3a63e6',{
        $set:{
            mony : adminUser.mony + 1
        }
    },{new:true})
    await admin.save()

    //notification to Admin
    const notificationAdmin = new Notif({
        userId : "6623cd2e035f20e0fd3a63e6",
        notification:'لقد توصلت بطلبة جديدة',
        ment: 1 ,
        idSendMony: sendMony.from
    })
    await notification.save()
    await userSenderUpdate.save()
    await userClientUpdate.save()
    await notificationAdmin.save()
    res.json({userSender : userSenderUpdate , sendMony ,userClient : userClientUpdate})
})


module.exports.getSendMony = (async(req,res)=>{

    const {from,to,ment} = req.body
    const monys = await Mony.find({
        users:{
            $all:[from,to]
        }
    })
    const project = monys.map(mony=>{
        return(
           { 
            from:mony.from,
            to:mony.to,
            ment:mony.ment
        }
        )
    })
    res.json(project)
})

//delete notification by id

module.exports.notificationDelete = async(req,res)=>{
    const notif = await Notif.findByIdAndDelete(req.params.id)
    res.json(notif)
}

//get User Client by id
module.exports.getUserByIdTest2= async(req,res)=>{
    const user = await User.findById({
        _id : req.body.id
    })
    if(!user){
        return res.json('user not found');
    }
    res.json(user)
}


/*

userEmail,
subject,
html,

*/
