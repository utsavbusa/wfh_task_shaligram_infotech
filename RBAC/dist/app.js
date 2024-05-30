"use strict";

require("reflect-metadata");
var _express = _interopRequireDefault(require("express"));
var _inversifyExpressUtils = require("inversify-express-utils");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _index = require("./config/index.js");
var _process$env$PORT;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
var server = new _inversifyExpressUtils.InversifyExpressServer(_index.container);
server.setConfig(function (app) {
  app.use(_express["default"].json());
  app.use((0, _cookieParser["default"])());
});
var appInstance = server.build();
app.use(function (req, res, next) {
  _index.container.get(_index.Types.ResponseMiddleware).handle(req, res, next);
});
app.use("/api/v1", appInstance);

// app.use(handleError)
var port = (_process$env$PORT = process.env.PORT) != null ? _process$env$PORT : 4000;
app.listen(port, function () {
  console.log("server is running url http://localhost:" + port + "/api/v1");
});

// mongodb connection
(0, _index.databaseConnect)().then(function () {
  console.log("Database connection successfully!");
})["catch"](function (error) {
  console.log("Faild to connect to the database ", error);
});