const mongoose = require('mongoose')
const DB  = (()=>{
    mongoose.connect('mongodb+srv://soufiane:Sousou12@cluster0.5ij9nvy.mongodb.net/myDatabase')
    .then(()=>{
        console.log('Connected DB')
    }).catch(()=>{
        console.log('error connected')
    })
})
module.exports = DB