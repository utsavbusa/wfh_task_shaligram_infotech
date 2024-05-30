"use strict";

exports.__esModule = true;
exports.PermissionModel = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var PermissionSchema = new _mongoose.Schema({
  read: {
    type: Boolean,
    "default": false
  },
  write: {
    type: Boolean,
    "default": false
  },
  update: {
    type: Boolean,
    "default": false
  },
  "delete": {
    type: Boolean,
    "default": false
  },
  roleId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true
  },
  moduleId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  }
});
var PermissionModel = exports.PermissionModel = _mongoose["default"].model("Permission", PermissionSchema);