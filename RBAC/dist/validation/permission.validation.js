"use strict";

exports.__esModule = true;
exports.permissionSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var permissionSchema = exports.permissionSchema = {
  update: {
    body: _joi["default"].object({
      roleId: _joi["default"].string().required(),
      data: _joi["default"].array().items(_joi["default"].object({
        moduleId: _joi["default"].string().required(),
        permission: _joi["default"].object({
          read: _joi["default"]["boolean"](),
          write: _joi["default"]["boolean"](),
          update: _joi["default"]["boolean"](),
          "delete": _joi["default"]["boolean"]()
        }).required()
      }).options({
        allowUnknown: false
      }))
    })
  },
  get: {
    query: _joi["default"].object({
      roleId: _joi["default"].string(),
      name: _joi["default"].string(),
      page: _joi["default"].number().integer().min(-1).required(),
      limit: _joi["default"].number()
    }).options({
      allowUnknown: false
    })
  }
};