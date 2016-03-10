// Setup
var express = require('express');
var app = express();

// Configuration
app.listen(3000);
app.use(express.static(__dirname + '/'));

// Test routes
app.get('/', function(req, res){
  res.redirect('/index.html');
});
