"use strict";

exports.__esModule = true;
exports.RoleMiddleware = void 0;
var RoleMiddleware = exports.RoleMiddleware = /*#__PURE__*/function () {
  function RoleMiddleware() {}
  RoleMiddleware.roleCheckMiddleware = function roleCheckMiddleware(allowedRole) {
    return function (req, res, next) {
      if (allowedRole.includes(req.user.role)) {
        next();
      } else {
        res.jsonResponse(null, "Unauthorizedone  User", 401);
      }
    };
  };
  return RoleMiddleware;
}();