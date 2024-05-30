"use strict";

exports.__esModule = true;
var _response = require("./response.middleware");
Object.keys(_response).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _response[key]) return;
  exports[key] = _response[key];
});
var _authMiddleware = require("./authMiddleware");
Object.keys(_authMiddleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _authMiddleware[key]) return;
  exports[key] = _authMiddleware[key];
});
var _RoleMiddleware = require("./RoleMiddleware");
Object.keys(_RoleMiddleware).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _RoleMiddleware[key]) return;
  exports[key] = _RoleMiddleware[key];
});