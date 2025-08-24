import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";

const router = Router();

router.get("/", asyncHandler(getTodos));
router.get("/:id", asyncHandler(getTodoById));
router.post("/", asyncHandler(createTodo));
router.put("/:id", asyncHandler(updateTodo));
router.delete("/:id", asyncHandler(deleteTodo));

export default router;
