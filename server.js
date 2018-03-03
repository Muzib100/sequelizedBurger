var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
var db = require('./models');
//var router = require('./controllers/burgers_controller.js');

var app = express();
var PORT = process.env.PORT || 8080;
 
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//app.use(router);

require( "./controllers/burgers_controller.js")(app);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});