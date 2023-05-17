const express = require("express");
const { engine } = require("express-handlebars");
const bodyParser = require("body-parser");
let taskList = require("./data/tasks.json");
const fs = require("fs");
const path = require("path");

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home", {
    taskList,
  });
});

app.post("/submit", (req, res) => {
  const inputTask = req.body.taskInput;
  if (inputTask.trim() !== "") {
    taskList.push(inputTask);
    fs.writeFileSync(
      path.resolve(__dirname, "./data/tasks.json"),
      JSON.stringify(taskList)
    );
    res.redirect("/");
  }
});

app.delete("/tasks", (req, res) => {
  console.log(req.body);
  taskList = taskList.filter((task) => task !== req.body.task);
  fs.writeFileSync(
    path.resolve(__dirname, "./data/tasks.json"),
    JSON.stringify(taskList)
  );
  res.sendStatus(200);
});

app.listen(3000, () => console.log("server started"));
