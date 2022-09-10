const router = require('express').Router()
const experienceCtrl = require('../../controllers/userFunction/experienceController')

const auth = require('../../middleware/auth')

router.post('/experience', auth, experienceCtrl.createExperience)

router.route('/experience/:id')
    .get(auth, experienceCtrl.getExperience)
    .patch( auth, experienceCtrl.updateExperience)
    .delete(auth, experienceCtrl.deleteExperience)

module.exports = router