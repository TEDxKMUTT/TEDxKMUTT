// Setup
var express = require('express');
var mongoose = require('mongoose');
var dbase = require("./app/dbase.js");
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// Configuration
mongoose.connect(dbase.locals); // connect to local MongoDB

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.static(__dirname + '/public'));
require('./app/routes.js')(app);

// Test routes .
app.get('/', function(req, res){
  res.redirect('/index.html');
});
