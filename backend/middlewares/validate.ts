import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export const validate =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return res.status(400).json({
        error: "Validation failed",
        fieldErrors,
      });
    }

    req.body = result.data;
    next();
  };
