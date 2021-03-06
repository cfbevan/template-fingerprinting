var express = require("express");
var path = require("path");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var renderRouter = require("./routes/render");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/render", renderRouter);

module.exports = app;
