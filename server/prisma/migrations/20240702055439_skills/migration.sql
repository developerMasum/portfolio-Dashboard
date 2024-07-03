/*
  Warnings:

  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Skills";

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);
