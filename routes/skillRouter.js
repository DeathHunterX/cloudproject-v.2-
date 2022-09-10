const router = require('express').Router()
const skillCtrl = require('../controllers/skillController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/skill')
    .get(skillCtrl.getSkills)
    .post(auth, authAdmin, skillCtrl.createSkills)

router.route('/skill/:id')
    .delete(auth, authAdmin, skillCtrl.deleteSkills)
    .put(auth, authAdmin, skillCtrl.updateSkills)


module.exports = router