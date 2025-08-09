-- DropForeignKey
ALTER TABLE `TurnModule` DROP FOREIGN KEY `TurnModule_moduleId_fkey`;

-- DropIndex
DROP INDEX `TurnModule_moduleId_fkey` ON `TurnModule`;

-- AddForeignKey
ALTER TABLE `TurnModule` ADD CONSTRAINT `TurnModule_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
