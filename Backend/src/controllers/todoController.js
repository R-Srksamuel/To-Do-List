import { Todo } from "../models/Todo.js";

/** GET /api/todos */
export const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json({ success: true, data: todos });
};

/** GET /api/todos/:id */
export const getTodoById = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ success: false, error: "Todo not found" });
  res.json({ success: true, data: todo });
};

/** POST /api/todos */
export const createTodo = async (req, res) => {
  const { title, description = "" } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ success: false, error: "Title is required" });
  }
  const todo = await Todo.create({
    title: title.trim(),
    description: (description || "").trim(),
    completed: false
  });
  res.status(201).json({ success: true, data: todo });
};

/** PUT /api/todos/:id */
export const updateTodo = async (req, res) => {
  const updates = {};
  if (typeof req.body.title !== "undefined") updates.title = req.body.title;
  if (typeof req.body.description !== "undefined") updates.description = req.body.description;
  if (typeof req.body.completed !== "undefined") updates.completed = req.body.completed;

  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true }
  );

  if (!todo) return res.status(404).json({ success: false, error: "Todo not found" });
  res.json({ success: true, data: todo });
};

/** DELETE /api/todos/:id */
export const deleteTodo = async (req, res) => {
  const deleted = await Todo.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ success: false, error: "Todo not found" });
  res.json({ success: true, message: "Todo deleted successfully" });
};
