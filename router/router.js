const { RegisterUser, getAllUsers, LoginUser, getUserById } = require('../controller/auth')
const { sendMony, getSendMony, notificationDelete, getUserByIdTest2 } = require('../controller/send')
const { test } = require('../controller/test')

const router = require('express').Router()


router.post('/Register',RegisterUser)
router.post('/login',LoginUser)
router.get('/users',getAllUsers)
router.get('/user/:id',getUserById)
router.post('/userTest2/',getUserByIdTest2)


router.post('/send',sendMony)
router.delete('/notification/:id',notificationDelete)


router.get('/send',getSendMony)
// test crypto 152a for number
router.post('/test',test)

module.exports = router