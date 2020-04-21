const express = require("express");
const jsonServer = require("json-server");
const app = jsonServer.create();
const middleware = jsonServer.defaults();

app.use(middleware);
app.use(express.json());
app.post("/orchestration/request", function (req, res) {
  res.set("Content-Type", "application/json");
  res.sendFile(__dirname + "/public/shapes.json");
});

app.get("/orchestration/audio", function (req, res) {
  res.set("Content-Type", "audio/wav");
  res.sendFile(__dirname + "/public/process.wav");
});
app.listen(8000, () => {
  console.log("JSON Server is running");
});
