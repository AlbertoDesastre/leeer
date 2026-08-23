import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(public readonly code: string, message: string, public readonly status = 400) { super(message); }
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) { res.status(error.status).json({ error: { code: error.code, message: error.message } }); return; }
  if (error instanceof ZodError) { res.status(400).json({ error: { code: "validation_error", message: "Invalid request" } }); return; }
  console.error(error);
  res.status(500).json({ error: { code: "internal_error", message: "Unexpected server error" } });
};
