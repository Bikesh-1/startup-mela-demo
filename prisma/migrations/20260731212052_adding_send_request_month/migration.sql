/*
  Warnings:

  - Added the required column `month` to the `Sentrequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sentrequest" ADD COLUMN     "month" TEXT NOT NULL;
