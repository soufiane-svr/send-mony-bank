const express= require('express')
const db = require('./db/db')
const app = express()
const cors =require('cors')
const socket = require('socket.io')

app.use(express.json())
db()
app.use(cors())

app.use('/api/v1',require('./router/router'))

const server = app.listen(8000,()=>{
    console.log('listen port 8000');
})

const io = socket(server,{
    cors : {
        origin : 'http://localhost:3000',
        credentials : true,
    }
})

let onlineUsers = new Map

io.on('connection',(socket)=>{

    global.chatSocket = socket;
    socket.on('add-user',(userId)=>{
        onlineUsers.set(userId,socket.id)
        console.log(onlineUsers);
    });


    socket.on('send-mony',(data)=>{

        const userClient  = onlineUsers.get(data.to)
        socket.to(userClient).emit('mony-reicive',(data.ment - 1))
    })

   console.log('tst');
    socket.on('disconnect', () => {
        for (const [key, value] of onlineUsers) {
            if (value === socket.id) {
                onlineUsers.delete(key);
                break;
            }
        }
        io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });
})