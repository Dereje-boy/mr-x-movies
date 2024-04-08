-- CreateTable
CREATE TABLE "Movies" (
    "movie_id" TEXT NOT NULL PRIMARY KEY,
    "movie_name" TEXT NOT NULL,
    "released_year" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "single_or_series" TEXT,
    "country" TEXT,
    "thumbnail_name" TEXT,
    "storage_path" TEXT
);

-- CreateTable
CREATE TABLE "actor" (
    "actor_id" TEXT NOT NULL PRIMARY KEY,
    "fullname" TEXT,
    "profile_picture_path" TEXT
);

-- CreateTable
CREATE TABLE "_MoviesToactor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MoviesToactor_A_fkey" FOREIGN KEY ("A") REFERENCES "Movies" ("movie_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MoviesToactor_B_fkey" FOREIGN KEY ("B") REFERENCES "actor" ("actor_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Movies_movie_name_released_year_createdAt_single_or_series_country_storage_path_idx" ON "Movies"("movie_name", "released_year", "createdAt", "single_or_series", "country", "storage_path");

-- CreateIndex
CREATE INDEX "actor_fullname_idx" ON "actor"("fullname");

-- CreateIndex
CREATE UNIQUE INDEX "_MoviesToactor_AB_unique" ON "_MoviesToactor"("A", "B");

-- CreateIndex
CREATE INDEX "_MoviesToactor_B_index" ON "_MoviesToactor"("B");
