const serverless = require("serverless-http");
const express = require("express");
const { getDbClient } = require("./db/client");
const { newLead, listLeads, getLead} = require("./db/crud");
const validators = require("./db/validators");;
const STAGE = process.env.STAGE || "prod"
const app = express();
app.use(express.json());

app.get("/", async (req, res, next) => {
  const db = await getDbClient();
  const now = Date.now();
  const [ dbNowResult ] = await db`select now();`;
  const delta = (dbNowResult.now.getTime() - now) / 1000;
  return res.status(200).json({
    message: "Hello from root!",
    delta: delta,
    stage: STAGE
  });
});

app.get("/leads/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await getLead(id);
  return res.status(200).json({
    result: result,
  });
});


app.get("/leads", async (req, res, next) => {
  const results = await listLeads();
  return res.status(200).json({
    results: results,
    total: results.length
  });
});

app.post("/leads", async (req, res, next) => {
  const postData = await req.body;
  const { data, hasError, message } = await validators.validateLead(postData);
  if (hasError === true){
    return res.status(400).json({
      message: message ? message : "Invalid request. Please try again!"
    });
  } else if (hasError === undefined){
    return res.status(500).json({
      message: "Internal server error!"
    });
  }

  const result = await newLead(data);
  return res.status(201).json({
    message: "Hello from path!",
    results: result
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
