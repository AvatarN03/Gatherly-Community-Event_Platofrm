import { z } from "zod";
import {
  CommunityCategory,
  EventMemberRole,
} from "../generated/prisma/enums.ts";
import { EVENT_SUBCATEGORIES } from "../constant.ts";

// Zod enums from Prisma enums
const categoryEnum = z.enum(
  Object.values(CommunityCategory) as [CommunityCategory, ...CommunityCategory[]],
);

const eventMemberRoleEnum = z.enum(
  Object.values(EventMemberRole) as [EventMemberRole, ...EventMemberRole[]],
);

export const communitySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(60, "Name must be under 60 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be under 1000 characters"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(100, "Location must be under 100 characters"),

  category: categoryEnum,
});

export type CommunityInput = z.infer<typeof communitySchema>;

export const updateCommunitySchema = communitySchema.partial();

const memberSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  role: eventMemberRoleEnum,
});

export const eventSchema = z
  .object({
    communityId: z.string().trim().min(1, "Please select a community"),

    title: z
      .string()
      .trim()
      .min(1, "Event title is required")
      .max(80, "Title must be under 80 characters"),

    date: z
      .string()
      .trim()
      .min(1, "Date is required")
      .refine((val) => {
        const selectedDate = new Date(val);
        selectedDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDate >= today;
      }, {
        message: "Event date cannot be in the past",
      }),

    time: z.string().trim().min(1, "Time is required"),

    location: z.string().trim().min(1, "Location is required"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters"),

    category: categoryEnum,

    subCategory: z
      .string()
      .trim()
      .min(1, "Sub-category is required"),

    members: z.preprocess((val) => {
      if (Array.isArray(val)) return val;

      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }

      return [];
    }, z.array(memberSchema).default([])),
  })
  .refine(
    (data) =>
      EVENT_SUBCATEGORIES[data.category].includes(data.subCategory),
    {
      path: ["subCategory"],
      message: "Invalid sub-category for the selected category",
    },
  );
