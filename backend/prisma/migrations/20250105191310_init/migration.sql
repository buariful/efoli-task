-- AlterTable
ALTER TABLE `ticket` MODIFY `status` ENUM('OPEN', 'ASSIGNED', 'CLOSED') NOT NULL DEFAULT 'OPEN';
