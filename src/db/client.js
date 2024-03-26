const { neon, neonConfig } = require('@neondatabase/serverless');
const secret = require("../lib/secrets");

async function getDbClient() {
    const dbUrl = await secret.getDatabaseUrl();
    neonConfig.fetchConnectionCache = true;
    const sql = neon(dbUrl);
    return sql;    
}

module.exports.getDbClient = getDbClient