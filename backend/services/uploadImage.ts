import type { Request, Response, NextFunction } from "express";

import multer from "multer";
import { toFile } from "@imagekit/nodejs";

import imagekit from "../lib/imageKit.ts";


export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

export const uploadToImageKit =
  (folder: string) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) return next();

      const existingFileId = req.body.imageFileId;

      if (existingFileId) {
        try {
          await imagekit.files.delete(existingFileId);
        } catch {
          // Old image cleanup is best-effort — don't block the upload
        }
      }

      const uploadResponse = await imagekit.files.upload({
        file: await toFile(req.file.buffer, req.file.originalname),
        fileName: req.file.originalname,
        folder,
      });

      req.imageUrl = uploadResponse.url;
      req.imageFileId = uploadResponse.fileId;
      next();
    } catch (error) {
      res.status(500).json({
        error:
          "Image upload failed: " +
          (error instanceof Error ? error.message : String(error)),
      });
    }
  };
