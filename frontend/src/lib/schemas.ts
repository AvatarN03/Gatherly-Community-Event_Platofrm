import {z} from "zod";
import {COMMUNITY_CATEGORIES} from "../constant";

const categoryValues = COMMUNITY_CATEGORIES.map((c) => c.value) as [string, ...string[]];

export const communitySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Community name is required")
        .min(3, "Name must be at least 3 characters")
        .max(60, "Name must be under 60 characters"),

    description: z
        .string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be under 500 characters"),

    location: z
        .string()
        .trim()
        .min(4, "Location is required")
        .max(100, "Location must be under 100 characters"),

    latitude: z
        .number()
        .min(-90, "Invalid latitude")
        .max(90, "Invalid latitude"),

    longitude: z
        .number()
        .min(-180, "Invalid longitude")
        .max(180, "Invalid longitude"),

    category: z.enum(categoryValues, {
        message: "Please select a valid category",
    }),

    isPrivate: z.boolean().default(false),

    requireApproval: z.boolean().default(true),
});


// const CATEGORY_VALUES = COMMUNITY_CATEGORIES.map((c) => c.value) as [
//     CommunityCategory,
//     ...CommunityCategory[],
// ];

// export const eventSchema = z
//     .object({
//         communityId: z.string().trim().min(1, "Please select a community"),
//
//         title: z
//             .string()
//             .trim()
//             .min(1, "Event title is required")
//             .max(80, "Title must be under 80 characters"),
//
//         date: z
//             .string()
//             .trim()
//             .min(1, "Date is required")
//             .refine(
//                 (val) => {
//                     const selectedDate = new Date(val);
//                     selectedDate.setHours(0, 0, 0, 0);
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);
//                     return selectedDate >= today;
//                 },
//                 {message: "Event date cannot be in the past"}
//             ),
//
//         time: z.string().trim().min(1, "Time is required"),
//
//         location: z.string().trim().min(1, "Location is required"),
//
//         description: z
//             .string()
//             .trim()
//             .min(1, "Description is required")
//             .min(10, "Description must be at least 10 characters"),
//
//         category: z.enum(CATEGORY_VALUES, {
//             message: "Please select a valid category",
//         }),
//
//         subCategory: z.string().trim().min(1, "Sub-category is required"),
//     })
//     .superRefine((data, ctx) => {
//         const validSubCategories =
//             EVENT_SUBCATEGORIES[data.category as CommunityCategory]?.map((s) => s.value) ?? [];
//
//         if (!validSubCategories.includes(data.subCategory)) {
//             ctx.addIssue({
//                 code: z.ZodIssueCode.custom,
//                 path: ["subCategory"],
//                 message: `Invalid sub-category for ${data.category}`,
//             });
//         }
//     });