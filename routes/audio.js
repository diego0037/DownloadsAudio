var express = require('express');
var router = express.Router();
var models = require('../models');
var redis = require('redis');

// create a new redis client and connect to our local redis instance
var client = redis.createClient();

// if an error occurs, print it to the console
client.on('error', function (err) {
    console.log("Error " + err);
});

client.on("ready",function () {
    console.log("Redis is ready");
});

router.get('/', function(req, res, next) {
  res.format({
    json: function () {
      models.audios.all().then(audios => {
        res.json({audios: audios});
        client.get(2, function(err, reply) {
          console.log(reply);
        });
      });
    },
    html: function () {
      models.audios.all().then(audios => {
        res.render('/index', { audios: audios });
      });
    }
  });
});

router.post('/', function(req, res, next) {
  var audios = models.audios.create(req.body);
  res.format({
    json: function () {
      // var query = 'INSERT INTO audios(estado) VALUES("en espera") RETURNING id;';
      audios.then(audios => {res.json(audios)});
      //guardar en redis
      // console.log(query);
      client.set(2, 'testing');
    },
    html: function () {
      audios.then(audios => {res.redirect('/')});
    }
  })
});


router.put('/:id', function(req, res, next) {
  res.format({
    json: function() {
      models.audios.update(req.body,{ where: {id: req.params.id} }).then(audios => {
        res.json({audios:audios});
      });
    },
    html: function () {
      models.audios.update(req.body,{ where: {id: req.params.id} }).then(audios => {
        res.redirect('/', {audios:audios});
      });
    }
  });
});

module.exports = router;
