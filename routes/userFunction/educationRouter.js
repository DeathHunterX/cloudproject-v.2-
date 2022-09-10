const router = require('express').Router()
const educationCtrl = require('../../controllers/userFunction/educationController')

const auth = require('../../middleware/auth')

router.post('/education', auth, educationCtrl.createEducation)

router.route('/education/:id')
    .get(auth, educationCtrl.getEducation)
    .patch( auth, educationCtrl.updateEducation)
    .delete(auth, educationCtrl.deleteEducation)

module.exports = router