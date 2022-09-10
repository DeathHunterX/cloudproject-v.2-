const router = require('express').Router()
const userCtrl = require('../controllers/userController')

const auth = require('../middleware/auth')

router.get('/search', auth, userCtrl.searchUser)

router.get('/user/:id', auth, userCtrl.getUser)

router.get('/users', userCtrl.getAllUsers)

router.patch('/update', auth, userCtrl.updateUser)

router.delete('/delete/:id', auth, userCtrl.deleteUser)



module.exports = router