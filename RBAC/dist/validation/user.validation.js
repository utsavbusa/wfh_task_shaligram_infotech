"use strict";

exports.__esModule = true;
exports.userSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = exports.userSchema = {
  create: {
    body: _joi["default"].object({
      name: _joi["default"].string().required(),
      email: _joi["default"].string().required(),
      password: _joi["default"].string().required(),
      roleId: _joi["default"].string(),
      phone: _joi["default"].string()
    }).options({
      allowUnknown: false
    })
  },
  update: {
    params: _joi["default"].object({
      id: _joi["default"].string()
    }),
    body: _joi["default"].object({
      name: _joi["default"].string(),
      email: _joi["default"].string().email(),
      phone: _joi["default"].string()
    }).options({
      allowUnknown: false
    })
  },
  "delete": {
    params: _joi["default"].object({
      id: _joi["default"].string().required()
    }).options({
      allowUnknown: false
    })
  },
  search: {
    query: _joi["default"].object({
      name: _joi["default"].string(),
      page: _joi["default"].number().integer().min(-1).required(),
      limit: _joi["default"].number().integer()
    }).options({
      allowUnknown: false
    })
  },
  roleChagne: {
    body: _joi["default"].object({
      roleId: _joi["default"].string().required(),
      userId: _joi["default"].string().required()
    }).options({
      allowUnknown: false
    })
  }
};