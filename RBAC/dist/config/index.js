"use strict";

exports.__esModule = true;
var _database = require("./database");
Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _database[key]) return;
  exports[key] = _database[key];
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _types[key]) return;
  exports[key] = _types[key];
});
var _var = require("./var");
Object.keys(_var).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _var[key]) return;
  exports[key] = _var[key];
});
var _global = require("./global");
Object.keys(_global).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _global[key]) return;
  exports[key] = _global[key];
});
var _enum = require("./enum");
Object.keys(_enum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _enum[key]) return;
  exports[key] = _enum[key];
});
var _inversify = require("./inversify.config");
Object.keys(_inversify).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _inversify[key]) return;
  exports[key] = _inversify[key];
});