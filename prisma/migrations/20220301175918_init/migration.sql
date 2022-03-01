-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT,
    "user_image" TEXT,
    "user_description" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "playlist_id" TEXT NOT NULL,
    "playlist_name" TEXT NOT NULL,
    "playlist_image" TEXT,
    "playlist_visibility" BOOLEAN NOT NULL,
    "ownerId" TEXT,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("playlist_id")
);

-- CreateTable
CREATE TABLE "Song" (
    "song_id" SERIAL NOT NULL,
    "spotify_id" INTEGER NOT NULL,
    "youtube_id" INTEGER NOT NULL,
    "song_name" TEXT NOT NULL,
    "song_year" INTEGER,
    "song_artistId" TEXT NOT NULL,
    "song_albumId" TEXT NOT NULL,
    "song_playlistId" TEXT,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("song_id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "artist_id" TEXT NOT NULL,
    "artist_name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "genre_id" TEXT NOT NULL,
    "genre_name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("genre_id")
);

-- CreateTable
CREATE TABLE "Album" (
    "album_id" TEXT NOT NULL,
    "album_name" TEXT NOT NULL,
    "album_year" INTEGER NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToSong" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToSong_AB_unique" ON "_GenreToSong"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToSong_B_index" ON "_GenreToSong"("B");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_song_playlistId_fkey" FOREIGN KEY ("song_playlistId") REFERENCES "Playlist"("playlist_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_song_artistId_fkey" FOREIGN KEY ("song_artistId") REFERENCES "Artist"("artist_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_song_albumId_fkey" FOREIGN KEY ("song_albumId") REFERENCES "Album"("album_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD FOREIGN KEY ("A") REFERENCES "Genre"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToSong" ADD FOREIGN KEY ("B") REFERENCES "Song"("song_id") ON DELETE CASCADE ON UPDATE CASCADE;
