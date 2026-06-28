import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title should be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Title should not exceed 100 characters"),
];