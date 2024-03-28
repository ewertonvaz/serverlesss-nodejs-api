const { 
    SSMClient,
    GetParameterCommand,
    PutParameterCommand
} = require("@aws-sdk/client-ssm");

const AWS_REGION = 'us-east-2';
const STAGE = process.env.STAGE || 'prod';

const DATABASE_URL_SSM_PARAM=`/serverless-nodejs/${STAGE}/database-url`;

async function getDatabaseUrl(){
    const client = new SSMClient({ region: AWS_REGION });
    const paramStoreData = {
        Name: DATABASE_URL_SSM_PARAM,
        WithDecryption: true
    };
    const command = new GetParameterCommand(paramStoreData);
    const result = await client.send(command);
    return result.Parameter.Value;
}

async function putDatabaseUrl(stage, dbUrlVal){
    const client = new SSMClient({ region: AWS_REGION });
    const paramStage = stage ? stage : 'prod';
    if ( paramStage === 'prod'){
        return;
    }
    if ( !dbUrlVal ) {
        return;
    }
    const DATABASE_URL_SSM_PARAM=`/serverless-nodejs/${paramStage}/database-url`;
    const paramStoreData = {
        Name: DATABASE_URL_SSM_PARAM,
        Value: dbUrlVal,
        Type: "SecureString",
        Overwrite: true,
    };
    const command = new PutParameterCommand(paramStoreData);
    const result = await client.send(command);
    return result;
}

module.exports.getDatabaseUrl = getDatabaseUrl
module.exports.putDatabaseUrl = putDatabaseUrl
