const Router = require('express');
const router = new Router();
const controller = require('./Controllers/roomsController')

router.get('/getRooms', controller.getRooms);

module.exports = router;