var express = require('express');
var router = express.Router();
var spider = require('../spider/index');

router.get('/music_more/:type', function(req, res, next) {
  const { type } = req.params;
  const { query: options } = req.query;
  spider.getInfo(type, options, (result) => {
    res.send(result);
  });
});

module.exports = router;
