-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('COMPUTER_SCIENCE', 'PHYSICS', 'CHEMISTRY', 'MATHEMATICS', 'BIOLOGY', 'KANNADA', 'COMMERCE', 'ENGLISH', 'HINDI', 'SOCIAL_SCIENCE', 'PHYSICAL_EDUCATION', 'LIBRARY', 'OFFICE');

-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('STUDY_CERTIFICATE', 'TRANSFER_CERTIFICATE', 'MID_DAY_MEAL', 'CONVEYANCE');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "semister" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "type" "ApplicationType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "ApplicationDetails" (
    "applicationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "course" TEXT,
    "rollNo" TEXT,
    "semester" TEXT,
    "department" "Department",
    "staffId" TEXT,
    "leaveDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "reason" TEXT,

    CONSTRAINT "ApplicationDetails_pkey" PRIMARY KEY ("applicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDetails" ADD CONSTRAINT "ApplicationDetails_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
