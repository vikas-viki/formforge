/*
  Warnings:

  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passingYear` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "passingYear" INTEGER NOT NULL;
