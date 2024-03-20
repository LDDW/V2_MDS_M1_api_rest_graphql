-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_dishId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_menuId_fkey`;

-- AlterTable
ALTER TABLE `Order` MODIFY `menuId` INTEGER NULL,
    MODIFY `dishId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_dishId_fkey` FOREIGN KEY (`dishId`) REFERENCES `Dish`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
