"use strict";

exports.__esModule = true;
exports.ResponseMiddleware = void 0;
var _inversify = require("inversify");
var _dec, _class;
var ResponseMiddleware = exports.ResponseMiddleware = (_dec = (0, _inversify.injectable)(), _dec(_class = /*#__PURE__*/function () {
  function ResponseMiddleware() {}
  var _proto = ResponseMiddleware.prototype;
  _proto.handle = function handle(req, res, next) {
    res.jsonResponse = function (data, message, statusCode) {
      if (statusCode === void 0) {
        statusCode = 200;
      }
      if (data) res.status(statusCode).json({
        data: data,
        statusCode: statusCode,
        message: message,
        success: statusCode < 400
      });else res.status(statusCode).json({
        statusCode: statusCode,
        message: message,
        success: statusCode < 400
      });
    };
    next();
  };
  return ResponseMiddleware;
}()) || _class);