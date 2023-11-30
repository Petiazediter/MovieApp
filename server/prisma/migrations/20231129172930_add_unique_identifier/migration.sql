/*
  Warnings:

  - A unique constraint covering the columns `[keyword,page]` on the table `SearchedKeyword` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `page` to the `SearchedKeyword` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SearchedKeyword_keyword_key";

-- AlterTable
ALTER TABLE "SearchedKeyword" ADD COLUMN     "page" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SearchedKeyword_keyword_page_key" ON "SearchedKeyword"("keyword", "page");
