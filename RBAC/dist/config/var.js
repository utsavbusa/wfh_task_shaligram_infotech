"use strict";

exports.__esModule = true;
exports.varible = void 0;
var _process$env$NODE_ENV, _process$env$SERVER_P, _process$env$SERVICE_, _process$env$DB_HOST, _process$env$DB_PORT, _process$env$DB_USER, _process$env$CONSOLE_, _process$env$FILE_LOG;
var env = {
  env: (_process$env$NODE_ENV = process.env.NODE_ENV) != null ? _process$env$NODE_ENV : 'dev',
  port: parseInt((_process$env$SERVER_P = process.env.SERVER_PORT) != null ? _process$env$SERVER_P : '3007', 10),
  serviceName: (_process$env$SERVICE_ = process.env.SERVICE_NAME) != null ? _process$env$SERVICE_ : 'WFH',
  jwtSecret: process.env.JWT_SECRET,
  database: {
    host: (_process$env$DB_HOST = process.env.DB_HOST) != null ? _process$env$DB_HOST : 'localhost',
    port: parseInt((_process$env$DB_PORT = process.env.DB_PORT) != null ? _process$env$DB_PORT : '5432', 10),
    user: (_process$env$DB_USER = process.env.DB_USER) != null ? _process$env$DB_USER : 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  },
  consoleLogLevel: (_process$env$CONSOLE_ = process.env.CONSOLE_LOG_LEVEL) != null ? _process$env$CONSOLE_ : 'info',
  fileLogLevel: (_process$env$FILE_LOG = process.env.FILE_LOG_LEVEL) != null ? _process$env$FILE_LOG : 'block'
};
var varible = exports.varible = {
  env: env.env,
  port: env.port,
  jwtSecret: env.jwtSecret,
  database: {
    host: env.database.host,
    port: env.database.port,
    user: env.database.user,
    password: env.database.password,
    database: env.database.database
  },
  loggerOptions: {
    env: env.env,
    consoleLogLevel: env.consoleLogLevel,
    fileLogLevel: env.fileLogLevel,
    appName: env.serviceName
  }
};