const serverless = require("serverless-http");
const express = require("express");
const { neon, neonConfig } = require('@neondatabase/serverless');
const AWS = require('aws-sdk');

const app = express();
const AWS_REGION = 'us-east-2';
const STAGE = process.env.STAGE || 'prod';

const DATABASE_URL_SSM_PARAM=`/serverless-nodejs/${STAGE}/database-url`;

const ssm = new AWS.SSM({ region: AWS_REGION });

async function dbClient(){
  const paramStoreData = await ssm.getParameter({
    Name: DATABASE_URL_SSM_PARAM,
    WithDecryption: true
  }).promise();
  neonConfig.fetchConnectionCache = true;
  const sql = neon(paramStoreData.Parameter.Value);
  return sql;
}

app.get("/", async (req, res, next) => {
  const db = await dbClient();
  const [ results ] = await db`select now();`;
  return res.status(200).json({
    message: "Hello from root!",
    results: results.now,
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
