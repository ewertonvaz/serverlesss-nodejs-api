//tsx src/cli/putSecrets.js <stage> <dbUrl>
const secrets = require('../lib/secrets');
require('dotenv').config();

const args = process.argv.slice(2);

if ( args.length !== 2){
    console.log('Usage : tsx src/cli/putSecrets.js <stage> <dbUrl>');
    process.exit(1);
}

if (require.main === module ) {
    const [stage, dbUrl] = args;
    secrets.putDatabaseUrl(stage, dbUrl)
    .then((res) => {
        console.log('Secret setted');
        console.log(res);
        process.exit(0);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
}