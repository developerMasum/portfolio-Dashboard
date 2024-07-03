/*
  Warnings:

  - You are about to drop the `Donor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DonorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DonorProfile" DROP CONSTRAINT "DonorProfile_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_donorId_fkey";

-- DropForeignKey
ALTER TABLE "Requests" DROP CONSTRAINT "Requests_requesterId_fkey";

-- DropTable
DROP TABLE "Donor";

-- DropTable
DROP TABLE "DonorProfile";

-- DropTable
DROP TABLE "Requests";
