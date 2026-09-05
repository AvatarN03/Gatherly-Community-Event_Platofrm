import { Router } from "express";

import { requiredUser } from "../middlewares/auth.ts";
import {
  createCommunityNotice,
  deleteCommunityNotice,
  getCommunityNotice,
  getCommunityNotices,
  togglePinCommunityNotice,
  updateCommunityNotice,
} from "../controllers/communityNoticeController.ts";

const communityNoticeRoute = Router();

// Get all notices for a community
communityNoticeRoute.get("/:id/notices", requiredUser, getCommunityNotices);

// Get a single notice
communityNoticeRoute.get("/:id/notices/:noticeId", requiredUser, getCommunityNotice);

// Create a new notice (only ADMIN and OWNER)
communityNoticeRoute.post("/:id/notices", requiredUser, createCommunityNotice);

// Update a notice (only ADMIN, OWNER, or author)
communityNoticeRoute.patch("/:id/notices/:noticeId", requiredUser, updateCommunityNotice);

// Delete a notice (only ADMIN, OWNER, or author)
communityNoticeRoute.delete("/:id/notices/:noticeId", requiredUser, deleteCommunityNotice);

// Toggle pin on a notice (only ADMIN and OWNER)
communityNoticeRoute.patch("/:id/notices/:noticeId/pin", requiredUser, togglePinCommunityNotice);

export default communityNoticeRoute;
