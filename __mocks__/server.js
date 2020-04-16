const express = require("express");
const jsonServer = require("json-server");
const app = jsonServer.create();
const middleware = jsonServer.defaults();

app.use(middleware);
app.use(express.json());
app.get("/orchestration/request", function (req, res) {
  res.set("Content-Type", "audio/wav");
  res.header({ link: `/shapes?shapes_id=shapes_xxxxxxxxxxxx` });
  res.sendFile(__dirname + "/public/process.wav");
});

app.get("/orchestration/shapes", function (req, res) {
  const shapesId = req.query.shapes_id;
  res.set("Content-Type", "application/json");
  res.sendFile(__dirname + "/public/shapes.json");
});
app.listen(8000, () => {
  console.log("JSON Server is running");
});
