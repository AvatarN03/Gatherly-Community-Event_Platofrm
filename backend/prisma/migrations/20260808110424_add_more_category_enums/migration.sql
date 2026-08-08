/*
  Warnings:

  - The values [OTHER] on the enum `CommunityCategory` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CommunityCategory_new" AS ENUM ('GENERAL', 'TECHNOLOGY', 'EDUCATION', 'HEALTH', 'SPORTS', 'ARTS', 'BUSINESS', 'ENVIRONMENT', 'FOOD', 'GAMING', 'MUSIC', 'TRAVEL', 'OTHERS');
ALTER TABLE "Community" ALTER COLUMN "category" TYPE "CommunityCategory_new" USING ("category"::text::"CommunityCategory_new");
ALTER TYPE "CommunityCategory" RENAME TO "CommunityCategory_old";
ALTER TYPE "CommunityCategory_new" RENAME TO "CommunityCategory";
DROP TYPE "public"."CommunityCategory_old";
COMMIT;
