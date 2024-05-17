interface Env {
    env: string;
    port: number;
    serviceName: string;
    jwtSecret?: string;
    database: {
        host: string;
        port: number;
        user: string;
        password?: string;
        database?: string;
    };
    consoleLogLevel: string;
    fileLogLevel: string;
}
const env: Env = {
    env: process.env.NODE_ENV ?? 'dev',
    port: parseInt(process.env.SERVER_PORT ?? '3007', 10),
    serviceName: process.env.SERVICE_NAME ?? 'WFH',
    jwtSecret: process.env.JWT_SECRET,
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseInt(process.env.DB_PORT ?? '5432', 10),
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    consoleLogLevel: process.env.CONSOLE_LOG_LEVEL ?? 'info',
    fileLogLevel: process.env.FILE_LOG_LEVEL ?? 'block',
};
const varible: any = {
    env: env.env,
    port: env.port,
    jwtSecret: env.jwtSecret,

    database: {
        host: env.database.host,
        port: env.database.port,
        user: env.database.user,
        password: env.database.password,
        database: env.database.database,
    },

    loggerOptions: {
        env: env.env,
        consoleLogLevel: env.consoleLogLevel,
        fileLogLevel: env.fileLogLevel,
        appName: env.serviceName,
    },
}

export { varible }