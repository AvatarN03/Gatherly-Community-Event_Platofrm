-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requireApproval" BOOLEAN NOT NULL DEFAULT true;
