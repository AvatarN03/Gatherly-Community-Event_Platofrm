import type { NextFunction, Request, Response } from "express";

import { getAuth } from "@clerk/express";

import { findOrCreateUser } from "../services/userSync.ts";

export const requiredAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        error: "Middleware: Unauthorized",
      });
    }
    console.log("requiredAuth :", userId);

    req.userId = userId;

    next();
  } catch (error) {
    next(error);
  }
};


export const optionalAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { userId } = getAuth(req);

    if (userId) {
        req.userId = userId;
    }

  console.log(
    "optionalAuth",
      userId,
      req.userId,
    )

    next();
};


export const requiredUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }
    console.log("requiredUser", userId);

    req.user = await findOrCreateUser(userId);

    next();
  } catch (error) {
    next(error);
  }
};
