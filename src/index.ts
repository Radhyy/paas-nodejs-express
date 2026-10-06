import { httpServerHandler } from "cloudflare:node";
import express from "express";  

import { dashboardHTML } from "./dashboard";

const app = express();

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

app.listen(3000);

export default httpServerHandler({ port: 3000 });
