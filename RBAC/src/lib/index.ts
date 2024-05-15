import winston from "winston";
const { format, transports } = winston;
import { varible } from "@config";
const { combine, timestamp, printf, colorize, uncolorize } = format;
const { loggerOptions } = varible;

const config = {
    customLevels: {
        levels: {
            block: -1,
            error: 0,
            warn: 1,
            info: 2,
            http: 3,
            verbose: 4,
            debug: 5,
            silly: 6,
        },
        colors: {
            error: 'red',
            warn: 'yellow',
            info: 'green',
            http: 'blue',
            verbose: 'cyan',
            debug: 'magenta',
            silly: 'white',
        },
    },
};

// Add custom levels and colors
winston.addColors(config.customLevels.colors);

// Time Stamp formate for logs
const TS = timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });

// Log formate for console (different for dev and prod)
const consoleFormate: { [key: string]: any } = {
    dev: printf((info: any) => `[${info.timestamp}] ${info.level} : ${info.message} ${info.stack ? `\n ${info.stack}` : ''}`),
    prod: printf((info: any) => `[${info.timestamp}]  {"level": "${info.level}", "service":"${info.service}", "message":"${info.stack ? info.stack : info.message.trim()}"}`),
};


// Log options for console
const consoleLogOptions = {
    level: varible.loggerOptions.consoleLogLevel,
    handleExceptions: true,
    format: combine(TS, varible.loggerOptions.env === 'dev' ? colorize() : uncolorize(), consoleFormate[varible.loggerOptions.env]),
};

// Log options for file
const fileLogOptions = {
    level: loggerOptions.fileLogLevel,
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '1m',
    format: combine(TS, consoleFormate.prod),
};

const logger = winston.createLogger({
    levels: config.customLevels.levels,
    defaultMeta: { service: 'wfh' },
    transports: [
        new transports.Console(consoleLogOptions),
        new transports.File(fileLogOptions),
    ],
});

export default logger
