import { Request, Response } from "express";

import { prisma } from "../lib/prisma.ts";

export const getMe = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("getMe:", error);

    return res.status(500).json({
      error: "Failed to fetch user",
    });
  }
};
