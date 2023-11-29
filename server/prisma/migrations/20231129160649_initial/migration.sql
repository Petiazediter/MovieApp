-- CreateTable
CREATE TABLE "SearchedKeyword" (
    "id" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SearchedKeyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "backgroundImagePath" TEXT NOT NULL,
    "posterImagePath" TEXT NOT NULL,
    "isAdult" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MovieToSearchedKeyword" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchedKeyword_keyword_key" ON "SearchedKeyword"("keyword");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_id_key" ON "Movie"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToSearchedKeyword_AB_unique" ON "_MovieToSearchedKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToSearchedKeyword_B_index" ON "_MovieToSearchedKeyword"("B");

-- AddForeignKey
ALTER TABLE "_MovieToSearchedKeyword" ADD CONSTRAINT "_MovieToSearchedKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToSearchedKeyword" ADD CONSTRAINT "_MovieToSearchedKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchedKeyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
