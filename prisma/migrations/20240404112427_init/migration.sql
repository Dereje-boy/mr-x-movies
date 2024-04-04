-- CreateTable
CREATE TABLE `Movies` (
    `movie_id` VARCHAR(191) NOT NULL,
    `movie_name` VARCHAR(191) NOT NULL,
    `released_year` INTEGER NULL,
    `thumbnail_path` VARCHAR(191) NULL,
    `single_or_series` ENUM('SINGLE', 'SERIES', 'SINGLE_BUT_PARTS') NULL,

    PRIMARY KEY (`movie_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
