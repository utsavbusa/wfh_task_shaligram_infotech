"use strict";

exports.__esModule = true;
exports.moduleSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var moduleSchema = exports.moduleSchema = {
  create: {
    body: _joi["default"].object({
      name: _joi["default"].string().required()
    }).options({
      allowUnknown: false
    })
  },
  update: {
    params: _joi["default"].object({
      id: _joi["default"].string().required()
    }),
    body: _joi["default"].object({
      name: _joi["default"].string().required()
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
  }
};