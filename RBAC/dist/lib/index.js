"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _winston = _interopRequireDefault(require("winston"));
var _index = require("../config/index.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var format = _winston["default"].format,
  transports = _winston["default"].transports;
var combine = format.combine,
  timestamp = format.timestamp,
  printf = format.printf,
  colorize = format.colorize,
  uncolorize = format.uncolorize;
var loggerOptions = _index.varible.loggerOptions;
var config = {
  customLevels: {
    levels: {
      block: -1,
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6
    },
    colors: {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'blue',
      verbose: 'cyan',
      debug: 'magenta',
      silly: 'white'
    }
  }
};

// Add custom levels and colors
_winston["default"].addColors(config.customLevels.colors);

// Time Stamp formate for logs
var TS = timestamp({
  format: 'YYYY-MM-DD HH:mm:ss'
});

// Log formate for console (different for dev and prod)
var consoleFormate = {
  dev: printf(function (info) {
    return "[" + info.timestamp + "] " + info.level + " : " + info.message + " " + (info.stack ? "\n " + info.stack : '');
  }),
  prod: printf(function (info) {
    return "[" + info.timestamp + "]  {\"level\": \"" + info.level + "\", \"service\":\"" + info.service + "\", \"message\":\"" + (info.stack ? info.stack : info.message.trim()) + "\"}";
  })
};

// Log options for console
var consoleLogOptions = {
  level: _index.varible.loggerOptions.consoleLogLevel,
  handleExceptions: true,
  format: combine(TS, _index.varible.loggerOptions.env === 'dev' ? colorize() : uncolorize(), consoleFormate[_index.varible.loggerOptions.env])
};

// Log options for file
var fileLogOptions = {
  level: loggerOptions.fileLogLevel,
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxSize: '1m',
  format: combine(TS, consoleFormate.prod)
};
var logger = _winston["default"].createLogger({
  levels: config.customLevels.levels,
  defaultMeta: {
    service: 'wfh'
  },
  transports: [new transports.Console(consoleLogOptions), new transports.File(fileLogOptions)]
});
var _default = exports["default"] = logger;