import express from "express";
import assignments from "../models/assignment";
const routesPath = express.Router();

let labs: assignments[] = [
  { name: "lab1", score: 10, total: 10, completed: true },
  { name: "lab2", score: 9, total: 11, completed: true },
  { name: "lab3", score: 8, total: 8, completed: true },
  { name: "lab4", score: 7, total: 12, completed: true },
  { name: "lab5", score: 6, total: 5, completed: true },
];

routesPath.get("/home", function (req, res) {
  let average: number = 0;

  if (labs) {
    labs.forEach((item) => (average += item.score / labs.length));
  }

  res.render("home", { labs, average });
});

routesPath.get("/add", function (req, res) {
  res.render("add");
});

routesPath.get("/assignment-added", function (req, res) {
  res.render("assignment-added");
});

routesPath.post("/assignment-added", function (req, res) {
  let newAssignment: assignments = {
    name: req.body.name,
    score: req.body.score,
    total: req.body.total,
    completed: !!req.body.completed,
  };
  labs.push(newAssignment);
  res.render("assignment-added", { newAssignment });
});

routesPath.get("/api/assignments", function (req, res) {
  res.json(labs);
  res.status(200);
});

routesPath.get("/api/summary", function (req, res) {
  let average: number = 0;
  labs.forEach((item) => (average += item.score / labs.length));
  let overallAverage = { overallAverage: average };
  res.status(200);
  res.json(labs);
  res.json(overallAverage);
});

export default routesPath;
