/*
  Warnings:

  - The `passingYear` column on the `ApplicationDetails` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApplicationDetails" DROP COLUMN "passingYear",
ADD COLUMN     "passingYear" INTEGER;
