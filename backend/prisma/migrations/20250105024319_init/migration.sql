-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `Reply_replied_by_fkey`;

-- DropForeignKey
ALTER TABLE `reply` DROP FOREIGN KEY `Reply_ticket_id_fkey`;

-- DropForeignKey
ALTER TABLE `ticket` DROP FOREIGN KEY `Ticket_customer_id_fkey`;

-- DropIndex
DROP INDEX `Reply_replied_by_fkey` ON `reply`;

-- DropIndex
DROP INDEX `Ticket_customer_id_fkey` ON `ticket`;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reply` ADD CONSTRAINT `Reply_replied_by_fkey` FOREIGN KEY (`replied_by`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
