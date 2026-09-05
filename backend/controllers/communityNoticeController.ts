import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.ts";

// Get all notices for a community
export const getCommunityNotices = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id: communityId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is a member of the community
    const membership = await prisma.membership.findUnique({
      where: {
        userId_communityId: { userId, communityId },
      },
    });

    if (!membership) {
      return res.status(403).json({ error: "Not a member of this community" });
    }

    const notices = await prisma.communityNotice.findMany({
      where: {
        communityId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        { pinned: "desc" },
        { createdAt: "desc" },
      ],
    });

    return res.json(notices);
  } catch (error) {
    console.error("GET COMMUNITY NOTICES ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch community notices",
    });
  }
};

// Get a single notice
export const getCommunityNotice = async (
  req: Request<{ id: string; noticeId: string }>,
  res: Response,
) => {
  try {
    const { id: communityId, noticeId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is a member of the community
    const membership = await prisma.membership.findUnique({
      where: {
        userId_communityId: { userId, communityId },
      },
    });

    if (!membership) {
      return res.status(403).json({ error: "Not a member of this community" });
    }

    const notice = await prisma.communityNotice.findUnique({
      where: {
        id: noticeId,
        communityId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        community: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    return res.json(notice);
  } catch (error) {
    console.error("GET COMMUNITY NOTICE ERROR:", error);
    return res.status(500).json({
      error: "Failed to fetch community notice",
    });
  }
};

// Create a new notice (only for ADMIN and OWNER)
export const createCommunityNotice = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id: communityId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, content, pinned = false } = req.body;

    // Check if user is a member of the community and has admin/owner role
    const membership = await prisma.membership.findUnique({
      where: {
        userId_communityId: { userId, communityId },
      },
    });

    if (
      !membership ||
      (membership.role !== "OWNER" && membership.role !== "ADMIN")
    ) {
      return res.status(403).json({ error: "Not authorized to create notices" });
    }

    const notice = await prisma.communityNotice.create({
      data: {
        title,
        content,
        pinned: Boolean(pinned),
        communityId,
        authorId: userId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return res.status(201).json(notice);
  } catch (error) {
    console.error("CREATE COMMUNITY NOTICE ERROR:", error);
    return res.status(500).json({
      error: "Failed to create community notice",
    });
  }
};

// Update a notice (only for ADMIN, OWNER, or author)
export const updateCommunityNotice = async (
  req: Request<{ id: string; noticeId: string }>,
  res: Response,
) => {
  try {
    const { id: communityId, noticeId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { title, content, pinned } = req.body;

    // Get the notice and check permissions
    const notice = await prisma.communityNotice.findUnique({
      where: { id: noticeId },
      select: {
        communityId: true,
        authorId: true,
        community: {
          select: {
            members: {
              where: { userId },
              select: { role: true },
            },
          },
        },
      },
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    if (notice.communityId !== communityId) {
      return res.status(400).json({ error: "Notice does not belong to this community" });
    }

    // Check if user is admin/owner or the author of the notice
    const userMembership = notice.community.members[0];
    const isAuthor = notice.authorId === userId;
    const isAdminOrOwner =
      userMembership?.role === "OWNER" || userMembership?.role === "ADMIN";

    if (!isAuthor && !isAdminOrOwner) {
      return res.status(403).json({ error: "Not authorized to update this notice" });
    }

    const updatedNotice = await prisma.communityNotice.update({
      where: { id: noticeId },
      data: {
        title,
        content,
        pinned: pinned !== undefined ? Boolean(pinned) : undefined,
      },
      select: {
        id: true,
        title: true,
        content: true,
        pinned: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return res.json(updatedNotice);
  } catch (error) {
    console.error("UPDATE COMMUNITY NOTICE ERROR:", error);
    return res.status(500).json({
      error: "Failed to update community notice",
    });
  }
};

// Delete a notice (only for ADMIN, OWNER, or author)
export const deleteCommunityNotice = async (
  req: Request<{ id: string; noticeId: string }>,
  res: Response,
) => {
  try {
    const { id: communityId, noticeId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get the notice and check permissions
    const notice = await prisma.communityNotice.findUnique({
      where: { id: noticeId },
      select: {
        communityId: true,
        authorId: true,
        community: {
          select: {
            members: {
              where: { userId },
              select: { role: true },
            },
          },
        },
      },
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    if (notice.communityId !== communityId) {
      return res.status(400).json({ error: "Notice does not belong to this community" });
    }

    // Check if user is admin/owner or the author of the notice
    const userMembership = notice.community.members[0];
    const isAuthor = notice.authorId === userId;
    const isAdminOrOwner =
      userMembership?.role === "OWNER" || userMembership?.role === "ADMIN";

    if (!isAuthor && !isAdminOrOwner) {
      return res.status(403).json({ error: "Not authorized to delete this notice" });
    }

    await prisma.communityNotice.delete({
      where: { id: noticeId },
    });

    return res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("DELETE COMMUNITY NOTICE ERROR:", error);
    return res.status(500).json({
      error: "Failed to delete community notice",
    });
  }
};

// Pin/Unpin a notice (only for ADMIN and OWNER)
export const togglePinCommunityNotice = async (
  req: Request<{ id: string; noticeId: string }>,
  res: Response,
) => {
  try {
    const { id: communityId, noticeId } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if user is a member of the community and has admin/owner role
    const membership = await prisma.membership.findUnique({
      where: {
        userId_communityId: { userId, communityId },
      },
    });

    if (
      !membership ||
      (membership.role !== "OWNER" && membership.role !== "ADMIN")
    ) {
      return res.status(403).json({ error: "Not authorized to pin notices" });
    }

    // Get current notice
    const notice = await prisma.communityNotice.findUnique({
      where: { id: noticeId },
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }

    if (notice.communityId !== communityId) {
      return res.status(400).json({ error: "Notice does not belong to this community" });
    }

    const updatedNotice = await prisma.communityNotice.update({
      where: { id: noticeId },
      data: { pinned: !notice.pinned },
      select: {
        id: true,
        title: true,
        pinned: true,
      },
    });

    return res.json(updatedNotice);
  } catch (error) {
    console.error("TOGGLE PIN COMMUNITY NOTICE ERROR:", error);
    return res.status(500).json({
      error: "Failed to toggle pin on community notice",
    });
  }
};
