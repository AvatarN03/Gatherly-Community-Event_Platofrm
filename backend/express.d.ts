import { User } from "./generated/prisma/client.ts";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: User;
      imageUrl?: string;
      imageFileId?: string;
    }
  }
}

export {};
