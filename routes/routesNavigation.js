const router = require('express').Router();

const user = require('./userRoute')
const event = require('./eventRoute')

router.use('/user', user)
router.use('/event', event)

module.exports = router