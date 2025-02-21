-- CreateEnum
CREATE TYPE "AgeGroup" AS ENUM ('CHILDREN', 'TEENAGER', 'YOUTH', 'ADULT');

-- CreateEnum
CREATE TYPE "BornAgain" AS ENUM ('yes', 'no');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataForm" (
    "id" SERIAL NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "whatsapp_no" INTEGER NOT NULL,
    "house_address" TEXT NOT NULL,
    "age_group" "AgeGroup" NOT NULL,
    "birthday" TEXT NOT NULL,
    "born_again" "BornAgain" NOT NULL,
    "current_church" TEXT NOT NULL,
    "born_again_date" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DataForm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "DataForm" ADD CONSTRAINT "DataForm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
