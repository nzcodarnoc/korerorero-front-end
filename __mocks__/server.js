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
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
app.get("/orchestration/audio", async function (req, res) {
  res.set("Content-Type", "audio/wav");
  await timeout(1500);
  res.sendFile(__dirname + "/public/process.wav");
});
app.listen(8000, () => {
  console.log("JSON Server is running");
});
