/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `table2` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `table2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "table2" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "table2_email_key" ON "table2"("email");
