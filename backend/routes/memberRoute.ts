


import { Router } from "express";


import { upload, uploadToImageKit } from "../services/uploadImage.ts";

import {
  getCommunitiesRequests,
  getCommunityMembers,
  getCommunityRequests,
  getMyRequestForCommunity,
  handleRequest,
  joinCommunity,
  leaveCommunity,
  removeCommunityMember,
  updateMemberRole,
  withdrawRequest,
} from "../controllers/memberController.ts";
import { requiredAuth, requiredUser } from "../middlewares/auth.ts";
import { CommunityMembershipRequestLimiter } from "../middlewares/rateLimit.ts";

const memberRoute = Router();


// private routes

memberRoute.get("/requests", requiredUser, getCommunitiesRequests);

memberRoute.post(
  "/:id/join",
  requiredUser,
  CommunityMembershipRequestLimiter,
  upload.single("proofImage"),
  uploadToImageKit("join-proofs"),
  joinCommunity,
);

memberRoute.get("/:id/my-request", requiredUser, getMyRequestForCommunity);

memberRoute.delete(
  "/:id/withdraw", 
  requiredUser,
  CommunityMembershipRequestLimiter, 
  withdrawRequest
);

memberRoute.patch("/:id/requests/:requestId", requiredUser, handleRequest);

memberRoute.patch("/:id/members/:memberId", requiredUser, updateMemberRole);
memberRoute.delete("/:id/members/:memberId", requiredUser, removeCommunityMember);

memberRoute.get("/:id/members", requiredAuth, getCommunityMembers);

memberRoute.delete(
  "/:id/leave", 
  requiredUser, 
  CommunityMembershipRequestLimiter,
  leaveCommunity
);

// only owner/admin routes
memberRoute.get("/:id/requests", requiredUser, getCommunityRequests);



export default memberRoute;
