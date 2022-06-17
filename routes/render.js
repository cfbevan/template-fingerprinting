const express = require("express");
const router = express.Router();

const liquid = require("liquidjs");
const ejs = require("ejs");
const mustache = require("mustache");
const pug = require("pug");
const handlebars = require("handlebars");

const data = {
  data: {
    a: "a",
    b: 1,
    c: [1, 2],
    d: true,
    e: false,
  },
};

const renderFns = {
  liquidjs: (template) => {
    const engine = new liquid.Liquid();
    return engine.parseAndRenderSync(template, data);
  },
  ejs: (template) => {
    return ejs.render(template, data);
  },
  mustache: (template) => {
    return mustache.render(template, data);
  },
  pug: (template) => {
    return pug.render(template, data);
  },
  handlebars: (template) => {
    return handlebars.compile(template)(data);
  },
};

router.post("/", function (req, res) {
  const { engine, template } = req.body;
  if (
    !["liquidjs", "ejs", "mustache", "pug", "handlebars"].includes(engine) ||
    template === null ||
    template === undefined
  ) {
    res.status(400).end("Incorrect arguments sent.");
  }
  const render = renderFns[engine](template);
  console.log({ engine, template, render });
  res.status(200).send(render);
});

module.exports = router;
