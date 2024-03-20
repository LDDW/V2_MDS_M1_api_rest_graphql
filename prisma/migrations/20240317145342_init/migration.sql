/*
  Warnings:

  - You are about to drop the column `description` on the `Dish` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Customer` MODIFY `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `DeliveryMan` MODIFY `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Dish` DROP COLUMN `description`;

-- AlterTable
ALTER TABLE `Restaurant` MODIFY `password` VARCHAR(191) NULL;
