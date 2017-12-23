var express = require('express');
var router = express.Router();
var room = require('../viewjs/room')

/* GET users listing. */
router.get('/room001', room.basic);

module.exports = router;
