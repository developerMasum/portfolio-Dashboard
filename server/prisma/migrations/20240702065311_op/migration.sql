/*
  Warnings:

  - Added the required column `category` to the `Blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blogs" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Projects" ALTER COLUMN "image" DROP NOT NULL;
