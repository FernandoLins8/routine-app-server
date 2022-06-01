/*
  Warnings:

  - You are about to drop the `section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "section" DROP CONSTRAINT "section_day_id_fkey";

-- DropTable
DROP TABLE "section";

-- CreateTable
CREATE TABLE "label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,

    CONSTRAINT "label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TEXT NOT NULL,
    "end_time" TEXT NOT NULL,
    "day_id" TEXT NOT NULL,
    "label_id" TEXT,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "label" ADD CONSTRAINT "label_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_day_id_fkey" FOREIGN KEY ("day_id") REFERENCES "day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit" ADD CONSTRAINT "unit_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "label"("id") ON DELETE SET NULL ON UPDATE CASCADE;
