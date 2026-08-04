import { Router } from "express";

import { requiredAuth } from "../middlewares/auth.ts";
import { CreateOrDeleteCommunityLimiter } from "../middlewares/rateLimit.ts";
import { validate } from "../middlewares/validate.ts";

import { upload, uploadToImageKit } from "../services/uploadImage.ts";

import { communitySchema } from "../prisma/schemas-validate.ts";

import { resizeImageIfNeeded } from "../utils/resizeImage.ts";

import { createCommunity } from "../controllers/communityController.ts";


const communityRoute = Router();

// Route: multer runs first → uploadToImageKit → your controller
communityRoute.post(
  "/",
  requiredAuth,
  CreateOrDeleteCommunityLimiter,
  upload.single("communityImage"),
  validate(communitySchema),
  resizeImageIfNeeded,
  uploadToImageKit("communities"),
  createCommunity,
);


export default communityRoute;
