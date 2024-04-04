/*
  Warnings:

  - You are about to drop the column `thumbnail_path` on the `movies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movies` DROP COLUMN `thumbnail_path`,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `storage_path` VARCHAR(191) NULL,
    ADD COLUMN `thumbnail_name` VARCHAR(191) NULL;
