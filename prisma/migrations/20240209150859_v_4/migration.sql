/*
  Warnings:

  - Added the required column `cardId` to the `Dish` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Dish` ADD COLUMN `cardId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Dish` ADD CONSTRAINT `Dish_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
