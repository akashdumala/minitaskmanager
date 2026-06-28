import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Task from "../models/Task";

// GET ALL TASKS
export const getTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// CREATE TASK
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });

    return;
  }

  try {
    const task = await Task.create({
      title: req.body.title,
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// UPDATE TASK
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({
        message: "Task Not Found",
      });

      return;
    }

    task.completed = !task.completed;

    await task.save();

    res.json(task);
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// DELETE TASK
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({
        message: "Task Not Found",
      });

      return;
    }

    await task.deleteOne();

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch {
    res.status(500).json({
      message: "Server Error",
    });
  }
};