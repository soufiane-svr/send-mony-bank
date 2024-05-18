const crypto = require('crypto')

module.exports.test = ((req,res)=>{
    const testNumberFor =  crypto.randomBytes(2)
    const randernumber = testNumberFor.toString('hex')
    res.json(randernumber)
})