/*
  Warnings:

  - Added the required column `message` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reply` ADD COLUMN `message` LONGTEXT NOT NULL;
