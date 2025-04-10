/*
  Warnings:

  - You are about to drop the column `department` on the `ApplicationDetails` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationDetails" DROP COLUMN "department";

-- DropEnum
DROP TYPE "Department";
