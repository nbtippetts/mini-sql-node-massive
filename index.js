  var express = require('express');
  var app = module.exports = express();
  var bodyParser = require('body-parser');
  var cors = require('cors');
  var massive = require('massive');
  var controller = require('./controller');

  var connectionString = 'postgres://postgres:otb4life@localhost:6969/sandbox-1';

  app.use(bodyParser.json());
  app.use(cors());

  var massiveInstance = massive.connectSync({connectionString : connectionString});

  // This db is a key in an object. Not related to the var db below.
  app.set('db', massiveInstance);

  var db = app.get('db');

  controller.getPlanes();

  db.new_plane(function(err, res){
       console.log(err, "plane added")
   });

   app.get('/airplanes', function(req, res){
      db.get_planes([200], function(err, planes){
        res.send(planes)
          console.log(err, planes)
      })
    })

  app.listen('3000', function(){
    console.log("Successfully listening on : 3000")
  })
