"use strict";

exports.__esModule = true;
exports.UserController = void 0;
var _index = require("../config/index.js");
var _index2 = require("../middleware/index.js");
var _index3 = require("../utils/index.js");
var _express = require("express");
var _expressValidation = require("express-validation");
var _inversify = require("inversify");
var _inversifyExpressUtils = require("inversify-express-utils");
var _index4 = require("../validation/index.js");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(typeof e + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
var options = {
  httpOnly: true,
  secure: true
};
var UserController = exports.UserController = (_dec = (0, _inversifyExpressUtils.controller)('/user'), _dec2 = function _dec2(target, key) {
  return (0, _inversify.inject)(_index.Types.UserService)(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof IUserService === "undefined" ? Object : IUserService]), _dec5 = (0, _inversifyExpressUtils.httpPut)('/role', _index.Types.AuthMiddleware, _index2.RoleMiddleware.roleCheckMiddleware([_index.UserRole.Admin]), (0, _expressValidation.validate)(_index4.userSchema.roleChagne)), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec8 = (0, _inversifyExpressUtils.httpPost)("/register", (0, _expressValidation.validate)(_index4.userSchema.create)), _dec9 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec11 = (0, _inversifyExpressUtils.httpPost)('/login'), _dec12 = Reflect.metadata("design:type", Function), _dec13 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec14 = (0, _inversifyExpressUtils.httpPut)('/:id', _index.Types.AuthMiddleware, (0, _expressValidation.validate)(_index4.userSchema.update), _index2.RoleMiddleware.roleCheckMiddleware([_index.UserRole.Admin])), _dec15 = Reflect.metadata("design:type", Function), _dec16 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec17 = (0, _inversifyExpressUtils.httpPut)('/update', (0, _expressValidation.validate)(_index4.userSchema.update), _index.Types.AuthMiddleware), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec20 = (0, _inversifyExpressUtils.httpDelete)("/delete/:id", _index.Types.AuthMiddleware, _index2.RoleMiddleware.roleCheckMiddleware([_index.UserRole.Admin])), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec23 = (0, _inversifyExpressUtils.httpGet)("/", _index.Types.AuthMiddleware, _index2.RoleMiddleware.roleCheckMiddleware([_index.UserRole.Admin]), (0, _expressValidation.validate)(_index4.userSchema.search)), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", [typeof _express.Request === "undefined" ? Object : _express.Request, typeof _express.Response === "undefined" ? Object : _express.Response, typeof _express.NextFunction === "undefined" ? Object : _express.NextFunction]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function () {
  function UserController(userService) {
    this.userService = userService;
  }
  var _proto = UserController.prototype;
  _proto.roleChange = /*#__PURE__*/function () {
    var _roleChange = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
      var _req$body, roleId, userId;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, roleId = _req$body.roleId, userId = _req$body.userId;
            _context.next = 4;
            return this.userService.rolechange(userId, roleId);
          case 4:
            res.jsonResponse({}, "role change succsessfully");
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            (0, _index3.handleError)(_context.t0, req, res, next);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, this, [[0, 7]]);
    }));
    function roleChange(_x, _x2, _x3) {
      return _roleChange.apply(this, arguments);
    }
    return roleChange;
  }();
  _proto.registerUser = /*#__PURE__*/function () {
    var _registerUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
      var _req$body2, name, email, password, phone, user;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password, phone = _req$body2.phone;
            _context2.prev = 1;
            _context2.next = 4;
            return this.userService.create({
              name: name,
              email: email,
              password: password,
              phone: phone
            });
          case 4:
            user = _context2.sent;
            res.cookie("accessToken", user.accessToken, options).jsonResponse(user, "successfully created user", 201);
            _context2.next = 11;
            break;
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            (0, _index3.handleError)(_context2.t0, req, res, next);
          case 11:
          case "end":
            return _context2.stop();
        }
      }, _callee2, this, [[1, 8]]);
    }));
    function registerUser(_x4, _x5, _x6) {
      return _registerUser.apply(this, arguments);
    }
    return registerUser;
  }();
  _proto.loginUser = /*#__PURE__*/function () {
    var _loginUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
      var _req$body3, email, password, user;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
            _context3.next = 4;
            return this.userService.login(email, password);
          case 4:
            user = _context3.sent;
            res.cookie("accessToken", user.accessToken, options).jsonResponse(user, "successfully Login user", 201);
            _context3.next = 11;
            break;
          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            (0, _index3.handleError)(_context3.t0, req, res, next);
          case 11:
          case "end":
            return _context3.stop();
        }
      }, _callee3, this, [[0, 8]]);
    }));
    function loginUser(_x7, _x8, _x9) {
      return _loginUser.apply(this, arguments);
    }
    return loginUser;
  }();
  _proto.putRequest = /*#__PURE__*/function () {
    var _putRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
      var id, user;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return this.userService.update(_extends({
              id: id
            }, req.body));
          case 4:
            user = _context4.sent;
            res.jsonResponse(user, "success", 201);
            _context4.next = 11;
            break;
          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            (0, _index3.handleError)(_context4.t0, req, res, next);
          case 11:
          case "end":
            return _context4.stop();
        }
      }, _callee4, this, [[1, 8]]);
    }));
    function putRequest(_x10, _x11, _x12) {
      return _putRequest.apply(this, arguments);
    }
    return putRequest;
  }();
  _proto.userUpdate = /*#__PURE__*/function () {
    var _userUpdate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
      var id, user;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            id = req.user._id;
            _context5.prev = 1;
            _context5.next = 4;
            return this.userService.update(_extends({
              id: id
            }, req.body));
          case 4:
            user = _context5.sent;
            res.jsonResponse(user, "success", 201);
            _context5.next = 11;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            (0, _index3.handleError)(_context5.t0, req, res, next);
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5, this, [[1, 8]]);
    }));
    function userUpdate(_x13, _x14, _x15) {
      return _userUpdate.apply(this, arguments);
    }
    return userUpdate;
  }();
  _proto.deleteRequest = /*#__PURE__*/function () {
    var _deleteRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
      var id;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return this.userService["delete"](id);
          case 4:
            res.jsonResponse({}, "successfully deleted user", 200);
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](1);
            (0, _index3.handleError)(_context6.t0, req, res, next);
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, this, [[1, 7]]);
    }));
    function deleteRequest(_x16, _x17, _x18) {
      return _deleteRequest.apply(this, arguments);
    }
    return deleteRequest;
  }();
  _proto.getRequest = /*#__PURE__*/function () {
    var _getRequest = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res, next) {
      var _req$query, name, page, limit, pageNumber, limitNumber, userList;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _req$query = req.query, name = _req$query.name, page = _req$query.page, limit = _req$query.limit;
            pageNumber = typeof page === 'string' ? parseInt(page, 10) : 1;
            limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : 10;
            _context7.next = 6;
            return this.userService.getUser({
              name: name,
              page: pageNumber,
              limit: limitNumber
            });
          case 6:
            userList = _context7.sent;
            res.jsonResponse(userList, "success", 201);
            _context7.next = 13;
            break;
          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            (0, _index3.handleError)(_context7.t0, req, res, next);
          case 13:
          case "end":
            return _context7.stop();
        }
      }, _callee7, this, [[0, 10]]);
    }));
    function getRequest(_x19, _x20, _x21) {
      return _getRequest.apply(this, arguments);
    }
    return getRequest;
  }();
  return UserController;
}(), (_applyDecoratedDescriptor(_class2.prototype, "roleChange", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "roleChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "registerUser", [_dec8, _dec9, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "registerUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loginUser", [_dec11, _dec12, _dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "loginUser"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "putRequest", [_dec14, _dec15, _dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "putRequest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "userUpdate", [_dec17, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "userUpdate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteRequest", [_dec20, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteRequest"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getRequest", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "getRequest"), _class2.prototype)), _class2)) || _class) || _class) || _class) || _class);