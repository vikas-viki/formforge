/*
  Warnings:

  - The `semester` column on the `ApplicationDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `passingYear` column on the `ApplicationDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phoneNumber` column on the `ApplicationDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `passingYear` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `phoneNumber` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `semester` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApplicationDetails" DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER,
DROP COLUMN "passingYear",
ADD COLUMN     "passingYear" INTEGER,
DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "passingYear",
ADD COLUMN     "passingYear" INTEGER,
DROP COLUMN "phoneNumber",
ADD COLUMN     "phoneNumber" INTEGER,
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER;
