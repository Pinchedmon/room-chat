const Router = require('express');
const router = new Router();
const controller = require('./Controllers/messageController')

router.get('/getMessages', controller.getMessages);

module.exports = router;