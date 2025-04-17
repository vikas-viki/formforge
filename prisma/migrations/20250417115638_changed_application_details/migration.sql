/*
  Warnings:

  - The values [MID_DAY_MEAL,CONVEYANCE] on the enum `ApplicationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `DateOfBirth` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `fathersName` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `leaveDate` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `returnDate` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `staffId` on the `ApplicationDetails` table. All the data in the column will be lost.
  - You are about to drop the column `semister` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationType_new" AS ENUM ('STUDY_CERTIFICATE', 'TRANSFER_CERTIFICATE');
ALTER TABLE "Application" ALTER COLUMN "type" TYPE "ApplicationType_new" USING ("type"::text::"ApplicationType_new");
ALTER TYPE "ApplicationType" RENAME TO "ApplicationType_old";
ALTER TYPE "ApplicationType_new" RENAME TO "ApplicationType";
DROP TYPE "ApplicationType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ApplicationDetails" DROP COLUMN "DateOfBirth",
DROP COLUMN "description",
DROP COLUMN "fathersName",
DROP COLUMN "leaveDate",
DROP COLUMN "returnDate",
DROP COLUMN "staffId",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "languageChoosen" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "passingYear" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "semister",
ADD COLUMN     "fatherName" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "reason" TEXT,
ADD COLUMN     "section" TEXT,
ADD COLUMN     "semester" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "name" DROP DEFAULT,
ALTER COLUMN "rollNo" DROP NOT NULL,
ALTER COLUMN "rollNo" DROP DEFAULT,
ALTER COLUMN "course" DROP NOT NULL,
ALTER COLUMN "course" DROP DEFAULT,
ALTER COLUMN "passingYear" DROP NOT NULL,
ALTER COLUMN "passingYear" DROP DEFAULT,
ALTER COLUMN "passingYear" SET DATA TYPE TEXT,
ALTER COLUMN "email" DROP NOT NULL;
