const router = require('express').Router()
const auth = require('../middleware/auth')
const commentCtrl = require('../controllers/commentController')

router.post('/comment', auth, commentCtrl.createComment)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)