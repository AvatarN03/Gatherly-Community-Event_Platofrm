import { Router } from "express";

import { requiredAuth } from "../middlewares/auth.ts";
import { getMe } from "../controllers/userController.ts";

const userRoute = Router();

// Called after Clerk sign-in to sync/create the local user record
// and fetch plan + usage info (community counts, limits, etc.)
userRoute.get(
  "/me",
  requiredAuth,
  getMe,
);

export default userRoute;
