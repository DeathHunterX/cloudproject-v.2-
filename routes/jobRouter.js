const router = require('express').Router()
const jobCtrl = require('../controllers/jobController')
const auth = require('../middleware/auth')

router.route('/post/:id/job')
    .post(auth, jobCtrl.applyJob)
    .get(auth, jobCtrl.getJob)

router.get('/jobs',auth, jobCtrl.getJobs)

router.put('/jobs/:id', auth, jobCtrl.updateJobs)

router.get('/candidates/:id', auth, jobCtrl.getCandidate)
module.exports = router