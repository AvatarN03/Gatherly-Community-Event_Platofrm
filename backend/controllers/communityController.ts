import type { Request, Response } from "express";

import {
  ActivityAction,
  CommunityCategory,
  CommunityRole,
} from "../generated/prisma/enums.ts";


import type { CommunityInput } from "../prisma/schemas-validate.ts";

import { prisma } from "../lib/prisma.ts";
import imagekit from "../lib/imageKit.ts";
import { slugify } from "../utils/slugify.ts";
import { PLAN_LIMITS } from "../constant.ts";
import type { SortOption } from "../type.ts";

export const createCommunity = async (
  req: Request<{}, {}, CommunityInput>,
  res: Response,
) => {
  try {
    const { name, description, location, latitude, longitude, category, tags } = req.body;

    const user = req.user!;

    // 👇 Check user's community limit here
    const communityCount = await prisma.community.count({
      where: {
        createdById: user.id,
      },
    });

    const limit = PLAN_LIMITS[user.plan].communities;

    if (communityCount >= limit) {
      return res.status(403).json({
        error: `Your ${user.plan} plan allows only ${limit} communities.`,
      });
    }
    const community = await prisma.$transaction(async (tx) => {
      const baseSlug = slugify(name);

      let slug = baseSlug;
      let suffix = 1;

      while (
        await tx.community.findUnique({
          where: { slug },
          select: { id: true },
        })
      ) {
        slug = `${baseSlug}-${suffix++}`;
      }

      const created = await tx.community.create({
        data: {
          name,
          slug,
          description,
          imageUrl: req.imageUrl,
          imageFileId: req.imageFileId,
          category,
          location,
          latitude,
          longitude,
          tags: tags ?? [],
          createdById: user.id,
          members: {
            create: {
              userId: user.id,
              role: CommunityRole.OWNER,
            },
          },
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      });

      await tx.activityLog.create({
        data: {
          actorId: user.id,
          action: ActivityAction.COMMUNITY_CREATED,
          communityId: created.id,
          metadata: {
            communityName: created.name,
            slug,
            category,
          },
        },
      });

      return created;
    });

    res.status(201).json({
      message: "Community created successfully",
      community,
    });
  } catch (error: unknown) {
    console.error("CREATE COMMUNITY ERROR:", error);
    // @ts-ignore
    res.status(500).json({ error: error?.message ?? "Something went wrong" });
  }
};


export const getCommunities = async (req: Request, res: Response) => {
  try {
    const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
    const category = req.query.category as CommunityCategory | undefined;
    const sortBy = (req.query.sortBy as SortOption) ?? "latest";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const where = {
      name: {
        contains: search,
        mode: "insensitive" as const,
      },
      ...(category ? { category } : {}),
    };

    const orderBy =
      sortBy === "popular"
        ? { members: { _count: "desc" as const } }
        : sortBy === "oldest"
          ? { createdAt: "asc" as const }
          : { createdAt: "desc" as const };

    const [communities, total] = await Promise.all([
      prisma.community.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true,
          category: true,
          location: true,
          tags:true,
        }
      }),
      prisma.community.count({ where }),
    ]);

    res.json({
      communities,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + communities.length < total,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch communities",
    });
  }
};


export const getCommunityBySlug = async (
    req: Request<{ slug: string }>,
    res: Response
  ) => {
    try {
      const { slug } = req.params;
      const userId = req.userId;

      const community = await prisma.community.findUnique({
        where: {
          slug,
        },
        select: {
          id: true,
          name: true,
          slug: true,
          imageUrl: true,
          category: true,
          location: true,
          createdAt: true,
          tags: true,
          description: true,

          _count: {
            select: {
              members: true,
            },
          },

          ...(userId && {
            members: {
              where: {
                userId,
              },
              select: {
                role: true,
              },
            },
          }),
        },
      });

      if (!community) {
        return res.status(404).json({
          message: "Community not found",
        });
      }

      const currentUserRole =
        userId && community.members.length > 0
            ? community.members[0].role
            : null;

      // Fetch pinned notice and recent notice for this community
      const [pinnedNotice, recentNotice] = await Promise.all([
        prisma.communityNotice.findFirst({
          where: {
            communityId: community.id,
            pinned: true,
          },
          select: {
            id: true,
            title: true,
            content: true,
            pinned: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
        prisma.communityNotice.findFirst({
          where: {
            communityId: community.id,
          },
          select: {
            id: true,
            title: true,
            content: true,
            pinned: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

      return res.status(200).json({
        community: {
          id: community.id,
          name: community.name,
          slug: community.slug,
          imageUrl: community.imageUrl,
          category: community.category,
          description: community.description,
          tags: community.tags,
          location: community.location,
          createdAt: community.createdAt,
          membersCount: community._count.members,
        },
        userMembership: currentUserRole,
        pinnedNotice,
        recentNotice,
      });
    } catch (error) {
      console.error("getCommunityBySlug:", error);

      return res.status(500).json({
        message: "Failed to fetch community",
      });
    }
  };


export const updateCommunity = async (req: Request, res: Response) => {
  const { slug } = req.params as { slug: string };

  try {
    const { name, description, location, latitude, longitude, category, tags } = req.body;

    const user = req.user!;

    const community = await prisma.community.findUnique({
      where: { slug },
      select: { id: true, imageUrl: true, imageFileId: true },
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const updated = await prisma.$transaction(async (tx) => {
      const updatedCommunity = await tx.community.update({
        where: { id: community.id },
        data: {
          name,
          description,
          location,
          category,
          latitude,
          longitude,
          tags: tags ?? [],
          ...(req.imageUrl && {
            imageUrl: req.imageUrl,
            imageFileId: req.imageFileId,
          }),
        },
      });

      await tx.activityLog.create({
        data: {
          actorId: user.id,
          action: ActivityAction.COMMUNITY_UPDATED,
          communityId: community.id,
          metadata: {
            changedFields: [
              "name",
              "description",
              "location",
              "latitude",
              "longitude",
              "category",
              "tags",
              ...(req.imageUrl ? ["imageUrl", "imageFileId"] : []),
            ],
          },
        },
      });

      return updatedCommunity;
    });

    return res.status(200).json({
      slug: updated.slug,
      message: "Community updated successfully",
    });
  } catch (error) {
    console.error("UPDATE COMMUNITY ERROR:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteCommunity = async (
  req: Request<{ slug: string }>,
  res: Response,
) => {
  const { slug } = req.params;
  const user = req.user!;

  try {
    const community = await prisma.community.findUnique({
      where: { slug },
      select: {
        name: true,
        createdById: true,
        imageFileId: true,
        id: true,
      },
    });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    if (community.createdById !== user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this community" });
    }

    if (community.imageFileId) {
      try {
        await imagekit.files.delete(community.imageFileId);
      } catch (error) {
        console.error("Community image deletion failed:", error);
      }
    }

    await prisma.activityLog.create({
      data: {
        actorId: user.id,
        action: ActivityAction.COMMUNITY_DELETED,
        communityId: community.id,
        metadata: { name: community.name },
      },
    });

    await prisma.community.delete({
      where: { id: community.id },
    });

    return res.json({ message: "Community deleted successfully" });
  } catch (error) {
    console.error("DELETE COMMUNITY ERROR:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
