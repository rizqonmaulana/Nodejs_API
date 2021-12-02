const router = require('express').Router();

const event = require('../controllers/eventController')

const { isLogin, isHR, isVendor } = require('../middlewares/auth')

router.get('/', event.getEvent)
router.post('/create', isLogin, isHR, event.createEvent)
router.put('/update/:id', isLogin, isHR, event.updateEvent)
router.put('/update_status/:id',isLogin, isVendor, event.updateStatus)
router.delete('/delete/:id', isLogin, isHR, event.deleteEvent)

module.exports = router;