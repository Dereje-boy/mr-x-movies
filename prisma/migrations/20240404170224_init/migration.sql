-- CreateTable
CREATE TABLE `actor` (
    `actor_id` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NULL,
    `profile_picture_path` VARCHAR(191) NULL,

    PRIMARY KEY (`actor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MoviesToactor` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_MoviesToactor_AB_unique`(`A`, `B`),
    INDEX `_MoviesToactor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_MoviesToactor` ADD CONSTRAINT `_MoviesToactor_A_fkey` FOREIGN KEY (`A`) REFERENCES `Movies`(`movie_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_MoviesToactor` ADD CONSTRAINT `_MoviesToactor_B_fkey` FOREIGN KEY (`B`) REFERENCES `actor`(`actor_id`) ON DELETE CASCADE ON UPDATE CASCADE;
