-- CreateEnum
CREATE TYPE "public"."RoleScope" AS ENUM ('SYSTEM', 'PROJECT');

-- AlterTable
ALTER TABLE "public"."Role" ADD COLUMN     "scope" "public"."RoleScope" NOT NULL DEFAULT 'SYSTEM';
