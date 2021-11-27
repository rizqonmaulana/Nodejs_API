const router = require('express').Router();

const event = require('../controllers/eventController')

router.get('/', event.getEvent)
router.post('/create', event.createEvent)
router.put('/update/:id', event.updateEvent)
router.put('/update_status/:id', event.updateStatus)
router.delete('/delete/:id', event.deleteEvent)

module.exports = router;