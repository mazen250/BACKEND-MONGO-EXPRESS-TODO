import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  desc: {
    type: String,
    required: true,
  },
});
const todoModel = mongoose.model("todos", TodoSchema);

export default todoModel;
