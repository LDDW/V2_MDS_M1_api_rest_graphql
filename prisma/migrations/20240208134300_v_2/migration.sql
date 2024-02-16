/*
  Warnings:

  - Added the required column `cardId` to the `Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Menu` ADD COLUMN `cardId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Menu` ADD CONSTRAINT `Menu_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
