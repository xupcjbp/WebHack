'use strict';
var express = require('express');
var router = express.Router();

/* GET Ryan page. */
router.get('/', function (req, res) {
    res.sendFile(__dirname + '/ryan.html');;
});

module.exports = router;