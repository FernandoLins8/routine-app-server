/*
  Warnings:

  - You are about to drop the column `name` on the `unit` table. All the data in the column will be lost.
  - Added the required column `count` to the `unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "unit" DROP COLUMN "name",
ADD COLUMN     "count" INTEGER NOT NULL;
