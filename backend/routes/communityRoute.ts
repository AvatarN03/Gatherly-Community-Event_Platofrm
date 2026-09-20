import { Router } from "express";

import {optionalAuth, requiredAuth, requiredUser} from "../middlewares/auth.ts";
import { CreateOrDeleteCommunityLimiter, UpdateCommunityLimiter } from "../middlewares/rateLimit.ts";
import { validate } from "../middlewares/validate.ts";

import { upload, uploadToImageKit } from "../services/uploadImage.ts";

import { communitySchema, updateCommunitySchema } from "../prisma/schemas-validate.ts";

import { resizeImageIfNeeded } from "../utils/resizeImage.ts";

import {createCommunity, deleteCommunity, getCommunities, getCommunityBySlug, updateCommunity} from "../controllers/communityController.ts";


const communityRoute = Router();

communityRoute.get("/", getCommunities);

communityRoute.get(
    "/:slug",
    optionalAuth,
    getCommunityBySlug
)

// Route: multer runs first → uploadToImageKit → your controller
communityRoute.post(
  "/",
  requiredUser,
  CreateOrDeleteCommunityLimiter,
  upload.single("communityImage"),
  validate(communitySchema),
  resizeImageIfNeeded,
  uploadToImageKit("communities"),
  createCommunity,
);

communityRoute.delete(
  "/:slug",
  requiredUser,
  CreateOrDeleteCommunityLimiter,
  deleteCommunity
);

communityRoute.put(
  "/:slug",
  requiredUser,
  UpdateCommunityLimiter,
  upload.single("updateCommunityImage"),
  validate(updateCommunitySchema),
  resizeImageIfNeeded,
  uploadToImageKit("communities"),
  updateCommunity,
);


export default communityRoute;
