/*
  Warnings:

  - You are about to drop the column `ModuleId` on the `TurnModule` table. All the data in the column will be lost.
  - You are about to drop the column `TurnId` on the `TurnModule` table. All the data in the column will be lost.
  - Added the required column `moduleId` to the `TurnModule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnId` to the `TurnModule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TurnModule` DROP FOREIGN KEY `TurnModule_ModuleId_fkey`;

-- DropForeignKey
ALTER TABLE `TurnModule` DROP FOREIGN KEY `TurnModule_TurnId_fkey`;

-- DropIndex
DROP INDEX `TurnModule_ModuleId_fkey` ON `TurnModule`;

-- DropIndex
DROP INDEX `TurnModule_TurnId_fkey` ON `TurnModule`;

-- AlterTable
ALTER TABLE `TurnModule` DROP COLUMN `ModuleId`,
    DROP COLUMN `TurnId`,
    ADD COLUMN `moduleId` INTEGER NOT NULL,
    ADD COLUMN `turnId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TurnModule` ADD CONSTRAINT `TurnModule_turnId_fkey` FOREIGN KEY (`turnId`) REFERENCES `Turn`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TurnModule` ADD CONSTRAINT `TurnModule_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `Module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
