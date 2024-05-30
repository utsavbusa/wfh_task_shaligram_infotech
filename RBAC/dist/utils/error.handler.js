"use strict";

exports.__esModule = true;
exports.handleError = handleError;
var _Api = require("./Api.error");
var _expressValidation = require("express-validation");
var _index = _interopRequireDefault(require("../lib/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var convertValidationError = function convertValidationError(err) {
  var errors = [];
  Object.keys(err.details).forEach(function (location) {
    err.details[location].forEach(function (e) {
      errors.push({
        location: location,
        messages: [e.message],
        field: e.path[0]
      });
    });
  });
  return {
    httpStatusCode: err.statusCode,
    body: {
      code: 'validation_error',
      message: 'parameters are not valid',
      errors: errors
    }
  };
};
function handleError(error, req, res, next) {
  if (error instanceof _Api.ApiError) {
    _index["default"].error({
      message: 'api error',
      stack: JSON.stringify(error.message)
    });
    res.status(error.statusCode).json({
      success: error.success,
      message: error.message
    });
    return;
  }
  if (error instanceof _expressValidation.ValidationError) {
    var validateErorObj = convertValidationError(error);
    _index["default"].error({
      message: 'ValidationError',
      stack: JSON.stringify(validateErorObj.body.errors)
    });
    res.status(validateErorObj.httpStatusCode).json(validateErorObj.body);
    return;
  }
  res.status(500).json({
    success: false,
    message: error.message
  });
}