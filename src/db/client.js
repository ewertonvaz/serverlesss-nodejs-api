const { neon, neonConfig } = require('@neondatabase/serverless');
const secret = require("../lib/secrets");
const { drizzle } = require("drizzle-orm/neon-http");

async function getDbClient() {
    const dbUrl = await secret.getDatabaseUrl();
    neonConfig.fetchConnectionCache = true;
    const sql = neon(dbUrl);
    return sql;    
}

async function getDrizzleDbClient(){
    const sql = await getDbClient();
    return drizzle(sql);
}

module.exports.getDbClient = getDbClient
module.exports.getDrizzleDbClient = getDrizzleDbClient
