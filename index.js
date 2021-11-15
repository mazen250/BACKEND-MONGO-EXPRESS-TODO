import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoModel from "./models/Todos.js";
const app = express();

app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://Mazen:Mazen123@cluster0.sbnha.mongodb.net/Todo-List?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database works fine");
  });
mongoose.connection.on("connected", () => {
  console.log("database connected");
});

app.get("/todos", async (req, res) => {
  const readTodos = await todoModel.find({});
  res.send(readTodos);
});

app.get("/todosAsendingOrder", async (req, res) => {
  const readTodos = await todoModel.find().sort({ created_at: 1 });
  res.send(readTodos);
});

app.get("/todosDesendingOrder", async (req, res) => {
  const readTodos = await todoModel.find().sort({ created_at: -1 });
  res.send(readTodos);
});

app.post("/addTodo", async (req, res) => {
  const desc = req.body.desc;
  const todo = new todoModel({
    desc: desc,
  });
  await todo.save();

  res.send("new todo added");
});

app.delete("/deleteTodo/:id", async (req, res) => {
  const id = req.params.id;
  await todoModel.findByIdAndDelete(id).exec();
  res.send("todo is deleted");
});

app.put("/updateTodo/:id", async (req, res) => {
  const newText = req.body.newText;
  const id = req.params.id;
  await todoModel
    .findByIdAndUpdate(id, {
      desc: newText,
    })
    .exec();
});
app.get("/", (req, res) => {
  res.send("app is running test");
  //   const todo = new todoModel({ desc: "testing for database" });
  //   todo.save();
});

app.listen(5001, (req, res) => {
  console.log("app running on port 5001");
});
