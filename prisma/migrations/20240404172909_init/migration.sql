/*
  Warnings:

  - A unique constraint covering the columns `[movie_name]` on the table `Movies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `movies` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE INDEX `actor_fullname_idx` ON `actor`(`fullname`);

-- CreateIndex
CREATE UNIQUE INDEX `Movies_movie_name_key` ON `Movies`(`movie_name`);

-- CreateIndex
CREATE INDEX `Movies_movie_name_released_year_createdAt_single_or_series_c_idx` ON `Movies`(`movie_name`, `released_year`, `createdAt`, `single_or_series`, `country`, `storage_path`);
