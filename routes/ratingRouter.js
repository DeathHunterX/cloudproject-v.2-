const router = require('express').Router()
const ratingCtrl = require('../controllers/ratingController')
const auth = require('../middleware/auth')

router.put('/ratings/user', auth, ratingCtrl.addUpdateCandidateRating)

router.put('/ratings/post', auth, ratingCtrl.addUpdatePostRating)


router.get('/getRating/user', auth, ratingCtrl.getUserRating)

router.get('/getRating/post', auth, ratingCtrl.getPostRating)

router.get('/getAllRating/user/:id', auth, ratingCtrl.getAllUserRating)
module.exports = router