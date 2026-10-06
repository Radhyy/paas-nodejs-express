import { httpServerHandler } from "cloudflare:node";
import express from "express";  

import { dashboardHTML } from "./dashboard";

const app = express();

// Challenge: Middleware Logger
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} request to ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send(dashboardHTML);
});

app.get("/api/status", (req, res) => {
  res.json({
    status: "ok",
    subject: "PaaS",
    week: 5,
    platform: "Cloudflare Workers"
  });
});

app.get("/api/info", (req, res) => {
  res.json({
    framework: "Express",
    runtime: "Cloudflare Workers",
    course: "Platform as a Service"
  });
});

app.get("/api/log-test", (req, res) => {
  console.log("Endpoint /api/log-test dipanggil");

  res.json({
    logged: true
  });
});

// Challenge: Endpoint /api/time
app.get("/api/time", (req, res) => {
  const date = new Date();
  res.json({
    time_iso: date.toISOString(),
    time_unix: date.getTime(),
    time_wib: date.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }) + " WIB"
  });
});

// Challenge: Route parameter /hello/:name
app.get("/hello/:name", (req, res) => {
  const userName = req.params.name;
  res.send(`<h1>Hello, ${userName}! Welcome to Cloudflare Edge Serverless.</h1>`);
});

app.listen(3000);

export default httpServerHandler({ port: 3000 });
