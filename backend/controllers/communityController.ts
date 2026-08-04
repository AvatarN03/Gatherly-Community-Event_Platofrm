import { Request, Response } from "express";

import {
  ActivityAction,
  CommunityCategory,
  CommunityRole,
} from "../generated/prisma/enums.ts";

import { CommunityInput } from "../prisma/schemas-validate.ts";

import { prisma } from "../lib/prisma.ts";

import { slugify } from "../utils/slugify.ts";

import { PLAN_LIMITS } from "../constant.ts";
import { SortOption } from "../type.ts";

export const createCommunity = async (
  req: Request<{}, {}, CommunityInput>,
  res: Response,
) => {
  try {
    const { name, description, location, category } = req.body;

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
  } catch (error) {
    console.error("CREATE COMMUNITY ERROR:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};


export const getCommunities = async (req: Request, res: Response) => {
  try {
    const search = (req.query.search as string) || "";
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
          description: true,
          imageUrl: true,
          category: true,
          location: true,
          createdAt: true,
          createdBy: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
          _count: {
            select: {
              members: true,
              events: true,
            }
          },
        },
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
