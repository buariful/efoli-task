/*
  Warnings:

  - You are about to drop the column `replied_by` on the `reply` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Reply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `Reply_replied_by_fkey`;

-- DropIndex
DROP INDEX `Reply_replied_by_fkey` ON `reply`;

-- AlterTable
ALTER TABLE `reply` DROP COLUMN `replied_by`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
