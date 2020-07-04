var express = require('express');
var router = express.Router();

/* GET Viaplay link form. */
router.get('/', function(req, res, next) {
    res.render('lookup', { title: 'Look-up' });
});

module.exports = router;