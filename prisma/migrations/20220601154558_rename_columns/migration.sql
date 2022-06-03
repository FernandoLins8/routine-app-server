/*
  Warnings:

  - You are about to drop the column `day_id` on the `label` table. All the data in the column will be lost.
  - You are about to drop the column `day_id` on the `unit` table. All the data in the column will be lost.
  - You are about to drop the `day` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `routine_id` to the `label` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routine_id` to the `unit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "day" DROP CONSTRAINT "day_user_id_fkey";

-- DropForeignKey
ALTER TABLE "label" DROP CONSTRAINT "label_day_id_fkey";

-- DropForeignKey
ALTER TABLE "unit" DROP CONSTRAINT "unit_day_id_fkey";

-- AlterTable
ALTER TABLE "label" DROP COLUMN "day_id",
ADD COLUMN     "routine_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "unit" DROP COLUMN "day_id",
ADD COLUMN     "routine_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "day";

-- CreateTable
CREATE TABLE "routine" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "routine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "routine" ADD CONSTRAINT "routine_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "label" ADD CONSTRAINT "label_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_routine_id_fkey" FOREIGN KEY ("routine_id") REFERENCES "routine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
