var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WZY\'s Chatroom project!',hint:'Your URL should like localhost/users or localhost/groups or localhost/gprecords' });
  //res.send('You may input localhost/users \n');
});


module.exports = router;
