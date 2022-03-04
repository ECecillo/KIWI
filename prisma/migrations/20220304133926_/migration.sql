/*
  Warnings:

  - You are about to drop the `_GenreToSong` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `spotify_url` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube_url` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToSong" DROP CONSTRAINT "_GenreToSong_B_fkey";

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "song_genreId" TEXT,
ADD COLUMN     "spotify_url" TEXT NOT NULL,
ADD COLUMN     "youtube_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GenreToSong";

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_song_genreId_fkey" FOREIGN KEY ("song_genreId") REFERENCES "Genre"("genre_id") ON DELETE SET NULL ON UPDATE CASCADE;
