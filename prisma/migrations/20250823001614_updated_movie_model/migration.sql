/*
  Warnings:

  - Added the required column `path` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Movie" ADD COLUMN     "path" TEXT NOT NULL;
