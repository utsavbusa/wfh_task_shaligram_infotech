"use strict";

exports.__esModule = true;
var _module = require("./module.service");
Object.keys(_module).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _module[key]) return;
  exports[key] = _module[key];
});
var _role = require("./role.service");
Object.keys(_role).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _role[key]) return;
  exports[key] = _role[key];
});
var _user = require("./user.service");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _user[key]) return;
  exports[key] = _user[key];
});
var _permission = require("./permission.service");
Object.keys(_permission).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _permission[key]) return;
  exports[key] = _permission[key];
});
var _IUserService = require("./IUserService");
Object.keys(_IUserService).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _IUserService[key]) return;
  exports[key] = _IUserService[key];
});