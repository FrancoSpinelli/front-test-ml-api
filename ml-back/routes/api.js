var express = require('express');
var router = express.Router();
const { list, detail } = require('../controllers/apiController');

router.get('/items', list)
router.get('/items/:id', detail)

module.exports = router;
