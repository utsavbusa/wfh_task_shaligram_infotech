import { Pool } from 'pg';

const dbConfig:any = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    database: process.env.DATABASE,
    port: process.env.PORT,

    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: 30000, // i.e. "connect_timeout" // (30 seconds X 1000 milliseconds)

    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: 10000,

    // maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 10,

    // max milliseconds any query using this connection will execute for before timing out in error.
    // false=unlimited
    statement_timeout: 30000, // (30 seconds X 1000 milliseconds)

    // max milliseconds to wait for query to complete (client side)
    query_timeout: 30000, // (30 seconds X 1000 milliseconds)


}
const pool = new Pool(dbConfig)

export{
    pool
}