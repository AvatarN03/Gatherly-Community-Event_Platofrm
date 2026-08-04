import rateLimit from "express-rate-limit";


export const CommunityMembershipRequestLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.user!.id,
});

export const eventRegistrationLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.user!.id,
});

export const eventMemberManagementLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    keyGenerator: (req) => req.user!.id,
});

export const CreateOrDeleteCommunityLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.user!.id,
});

export const UpdateCommunityLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  keyGenerator: (req) => req.user!.id,
});
