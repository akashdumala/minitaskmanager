import express from "express";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

import { createTaskValidator } from "../validators/taskValidator";

const router = express.Router();

router.get("/", getTasks);

router.post("/", createTaskValidator, createTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;