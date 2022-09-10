const router = require('express').Router()
const postCtrl = require('../controllers/postController')
const auth = require('../middleware/auth')

router.route('/posts')
    .post(auth, postCtrl.createPost)
    .get(auth, postCtrl.getPosts)
    

router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)
    .get(auth, postCtrl.getPost)
    .delete(auth, postCtrl.deletePost)

router.get('/allposts', postCtrl.getAllPosts)

router.get('/posts/search', auth, postCtrl.searchPost)

router.get('/suggestionPosts', auth, postCtrl.suggestionPosts)



module.exports = router