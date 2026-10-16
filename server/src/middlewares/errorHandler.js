import { success, ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
import mongoose from "mongoose";
import { env } from "../config/env.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, error: err.errors });
  }

  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ success: false, message: "Validation failed", error: err.errors });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: "Inavlid ID" });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ success: false, message: "Invalid JSON body" });
  }
  console.error(err);

  res.status(500).json({
    success: false,
    message: env.NODE_ENV === "production" ? "Something went wrong" : err.message,
  });
};
