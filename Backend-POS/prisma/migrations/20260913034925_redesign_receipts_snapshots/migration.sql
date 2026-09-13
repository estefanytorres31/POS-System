/*
  Warnings:

  - You are about to drop the column `documento` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `clienteDocumento` on the `venta` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `articulo` DROP FOREIGN KEY `articulo_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `categoria` DROP FOREIGN KEY `categoria_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `ciudad` DROP FOREIGN KEY `ciudad_id_provincia_fkey`;

-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `cliente_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `descuento` DROP FOREIGN KEY `descuento_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `detallereembolso` DROP FOREIGN KEY `detalleReembolso_id_reembolso_fkey`;

-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `detalleVenta_id_puntoDeVenta_fkey`;

-- DropForeignKey
ALTER TABLE `detalleventa` DROP FOREIGN KEY `detalleVenta_ventaId_fkey`;

-- DropForeignKey
ALTER TABLE `impuesto` DROP FOREIGN KEY `impuesto_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `inventario` DROP FOREIGN KEY `inventario_id_articulo_fkey`;

-- DropForeignKey
ALTER TABLE `inventario` DROP FOREIGN KEY `inventario_id_puntoDeVenta_fkey`;

-- DropForeignKey
ALTER TABLE `provincia` DROP FOREIGN KEY `provincia_id_pais_fkey`;

-- DropForeignKey
ALTER TABLE `puntodeventa` DROP FOREIGN KEY `puntoDeVenta_id_negocio_fkey`;

-- DropForeignKey
ALTER TABLE `recibo` DROP FOREIGN KEY `recibo_id_puntoDeVenta_fkey`;

-- DropForeignKey
ALTER TABLE `recibo` DROP FOREIGN KEY `recibo_id_venta_fkey`;

-- DropForeignKey
ALTER TABLE `reembolso` DROP FOREIGN KEY `reembolso_id_puntoDeVenta_fkey`;

-- DropForeignKey
ALTER TABLE `reembolso` DROP FOREIGN KEY `reembolso_id_recibo_fkey`;

-- DropForeignKey
ALTER TABLE `reset_tokens` DROP FOREIGN KEY `reset_tokens_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `sesion` DROP FOREIGN KEY `sesion_id_puntoDeVenta_fkey`;

-- DropForeignKey
ALTER TABLE `sesion` DROP FOREIGN KEY `sesion_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `usuario_id_negocio_fkey`;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `documento`,
    ADD COLUMN `id_tipo_documento` INTEGER NULL,
    ADD COLUMN `numero_documento` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `recibo` ADD COLUMN `valorDescuentoTotal` DECIMAL(10, 2) NULL,
    ADD COLUMN `valorImpuestoTotal` DECIMAL(10, 2) NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `id_tipo_documento` INTEGER NULL,
    ADD COLUMN `numero_documento` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `venta` DROP COLUMN `clienteDocumento`,
    ADD COLUMN `clienteDocumentoNumero` VARCHAR(50) NULL,
    ADD COLUMN `clienteDocumentoTipo` VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `tipo_documento_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provincia` ADD CONSTRAINT `provincia_id_pais_fkey` FOREIGN KEY (`id_pais`) REFERENCES `pais`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ciudad` ADD CONSTRAINT `ciudad_id_provincia_fkey` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `puntoDeVenta` ADD CONSTRAINT `puntoDeVenta_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `categoria_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `descuento` ADD CONSTRAINT `descuento_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `impuesto` ADD CONSTRAINT `impuesto_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_tipo_documento_fkey` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_id_articulo_fkey` FOREIGN KEY (`id_articulo`) REFERENCES `articulo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_tokens` ADD CONSTRAINT `reset_tokens_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_tipo_documento_fkey` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recibo` ADD CONSTRAINT `recibo_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `venta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recibo` ADD CONSTRAINT `recibo_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reembolso` ADD CONSTRAINT `reembolso_id_recibo_fkey` FOREIGN KEY (`id_recibo`) REFERENCES `recibo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reembolso` ADD CONSTRAINT `reembolso_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleReembolso` ADD CONSTRAINT `detalleReembolso_id_reembolso_fkey` FOREIGN KEY (`id_reembolso`) REFERENCES `reembolso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
