"use strict";

exports.__esModule = true;
exports.container = void 0;
var _inversify = require("inversify");
var _index = require("../controller/index.js");
var _index2 = require("../middleware/index.js");
var _index3 = require("../services/index.js");
var _types = require("./types");
var container = exports.container = new _inversify.Container();
container.bind(_types.Types.ResponseMiddleware).to(_index2.ResponseMiddleware);
container.bind(_types.Types.ModuleController).to(_index.ModuleController);
container.bind(_types.Types.ModuleService).to(_index3.ModuleService);
container.bind(_types.Types.PermissionController).to(_index.PermissionController);
container.bind(_types.Types.PermissionService).to(_index3.PermissionService);
container.bind(_types.Types.RoleController).to(_index.RoleController);
container.bind(_types.Types.RoleService).to(_index3.RoleService);
container.bind(_types.Types.UserController).to(_index.UserController);
container.bind(_types.Types.UserService).toDynamicValue(function () {
  return new _index3.UserService();
});
container.bind(_types.Types.RoleMiddleware).to(_index2.RoleMiddleware);
container.bind(_types.Types.AuthMiddleware).to(_index2.AuthMiddleware);
container.bind(_types.Types.HealthController).to(_index.HealthController);