-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ApplicationType" AS ENUM ('STUDY_CERTIFICATE', 'TRANSFER_CERTIFICATE');

-- CreateTable
CREATE TABLE "User" (
    "userId" UUID NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "type" "UserType" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL DEFAULT 'John',

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "name" TEXT,
    "rollNo" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "passingYear" INTEGER,
    "course" TEXT,
    "semester" INTEGER,
    "section" TEXT,
    "fatherName" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "applicationId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "type" "ApplicationType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "ApplicationDetails" (
    "applicationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rollNo" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "joiningYear" INTEGER,
    "passingYear" INTEGER,
    "course" TEXT,
    "reason" TEXT,
    "semester" INTEGER,
    "section" TEXT,
    "fatherName" TEXT,
    "languageChoosen" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "motherName" TEXT,
    "nationality" TEXT,
    "religion" TEXT,
    "dateOfAdmission" TEXT,
    "dateOfLeaving" TEXT,
    "scst" TEXT,
    "gender" TEXT,

    CONSTRAINT "ApplicationDetails_pkey" PRIMARY KEY ("applicationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationDetails" ADD CONSTRAINT "ApplicationDetails_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("applicationId") ON DELETE RESTRICT ON UPDATE CASCADE;
