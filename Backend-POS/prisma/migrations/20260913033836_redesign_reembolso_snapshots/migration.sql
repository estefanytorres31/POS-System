/*
  Warnings:

  - You are about to drop the column `articuloId` on the `detallereembolso` table. All the data in the column will be lost.
  - You are about to drop the column `reciboId` on the `detallereembolso` table. All the data in the column will be lost.
  - You are about to drop the column `monto_reembolsado` on the `recibo` table. All the data in the column will be lost.
  - You are about to drop the column `valorDescuentoTotal` on the `recibo` table. All the data in the column will be lost.
  - You are about to drop the column `valorImpuestoTotal` on the `recibo` table. All the data in the column will be lost.
  - Added the required column `id_detalle_venta` to the `detalleReembolso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_reembolso` to the `detalleReembolso` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `detallereembolso` DROP FOREIGN KEY `detalleReembolso_articuloId_fkey`;

-- DropForeignKey
ALTER TABLE `detallereembolso` DROP FOREIGN KEY `detalleReembolso_reciboId_fkey`;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `documento` VARCHAR(20) NULL;

-- AlterTable
ALTER TABLE `detallereembolso` DROP COLUMN `articuloId`,
    DROP COLUMN `reciboId`,
    ADD COLUMN `id_detalle_venta` INTEGER NOT NULL,
    ADD COLUMN `id_reembolso` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `detalleventa` ADD COLUMN `precio_costo_unitario` DECIMAL(10, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `recibo` DROP COLUMN `monto_reembolsado`,
    DROP COLUMN `valorDescuentoTotal`,
    DROP COLUMN `valorImpuestoTotal`;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `clienteDocumento` VARCHAR(20) NULL,
    ADD COLUMN `clienteNombreSnapshot` VARCHAR(255) NULL,
    ADD COLUMN `descuentoTipoAplicado` ENUM('PORCENTAJE', 'MONTO') NULL,
    ADD COLUMN `impuestoTasaAplicada` DECIMAL(10, 2) NULL,
    ADD COLUMN `impuestoTipoAplicado` ENUM('Incluido_en_el_precio', 'Anadido_al_precio') NULL;

-- CreateTable
CREATE TABLE `reembolso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(100) NOT NULL,
    `montoReembolsado` DECIMAL(10, 2) NOT NULL,
    `id_recibo` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reembolso` ADD CONSTRAINT `reembolso_id_recibo_fkey` FOREIGN KEY (`id_recibo`) REFERENCES `recibo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reembolso` ADD CONSTRAINT `reembolso_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleReembolso` ADD CONSTRAINT `detalleReembolso_id_detalle_venta_fkey` FOREIGN KEY (`id_detalle_venta`) REFERENCES `detalleVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleReembolso` ADD CONSTRAINT `detalleReembolso_id_reembolso_fkey` FOREIGN KEY (`id_reembolso`) REFERENCES `reembolso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
