/*
  Warnings:

  - Added the required column `date` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Delivery` ADD COLUMN `date` DATETIME(3) NOT NULL;
