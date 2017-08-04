var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3003;
var favicon = require("serve-favicon");
var path = require("path");

app.use(express.static("app/public"));
app.use(favicon(path.join(__dirname + "/app/public/assets/sword.jpeg")));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));




require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT);

console.log("listening on port: " + PORT);
