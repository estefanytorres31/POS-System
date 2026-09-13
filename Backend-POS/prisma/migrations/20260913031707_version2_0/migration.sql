-- CreateTable
CREATE TABLE `pais` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `codigo` VARCHAR(10) NULL,

    UNIQUE INDEX `pais_nombre_key`(`nombre`),
    UNIQUE INDEX `pais_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `id_pais` INTEGER NOT NULL,

    UNIQUE INDEX `provincia_nombre_id_pais_key`(`nombre`, `id_pais`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ciudad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `id_provincia` INTEGER NOT NULL,

    UNIQUE INDEX `ciudad_nombre_id_provincia_key`(`nombre`, `id_provincia`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `negocio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `estado_suscripcion` ENUM('Prueba', 'Activa', 'Vencida', 'Cancelada', 'PagoPendiente') NOT NULL DEFAULT 'Prueba',
    `fecha_vencimiento` DATETIME(3) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,
    `direccion` VARCHAR(255) NULL,
    `codigo_postal` VARCHAR(50) NULL,
    `id_ciudad` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `puntoDeVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NULL,
    `codigo_postal` VARCHAR(50) NULL,
    `id_ciudad` INTEGER NULL,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `descuento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tipo_descuento` ENUM('PORCENTAJE', 'MONTO') NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `valor_calculado` DECIMAL(10, 2) NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `impuesto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tasa` DECIMAL(10, 2) NOT NULL,
    `tipo_impuesto` ENUM('Incluido_en_el_precio', 'Anadido_al_precio') NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `cargo` VARCHAR(255) NULL,
    `telefono` VARCHAR(255) NULL,
    `password` VARCHAR(255) NOT NULL,
    `nombreNegocio` VARCHAR(255) NULL,
    `direccion` VARCHAR(255) NULL,
    `codigo_postal` VARCHAR(50) NULL,
    `id_ciudad` INTEGER NULL,
    `rol` ENUM('SuperAdmin', 'Propietario', 'Admin', 'Empleado') NOT NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,
    `id_negocio` INTEGER NULL,
    `id_puntoDeVenta` INTEGER NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `tipo_venta` ENUM('Peso', 'Unidad') NOT NULL,
    `precio_venta` DECIMAL(10, 2) NOT NULL,
    `precio_costo` DECIMAL(10, 2) NOT NULL,
    `ref` VARCHAR(255) NOT NULL,
    `representacion` ENUM('Color', 'Imagen') NOT NULL DEFAULT 'Color',
    `color` VARCHAR(50) NULL,
    `imagen` VARCHAR(255) NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_categoria` INTEGER NULL,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    UNIQUE INDEX `articulo_id_negocio_ref_key`(`id_negocio`, `ref`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_articulo` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NOT NULL,
    `stock_actual` INTEGER NOT NULL DEFAULT 0,
    `stock_minimo` INTEGER NOT NULL DEFAULT 5,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,

    UNIQUE INDEX `inventario_id_articulo_id_puntoDeVenta_key`(`id_articulo`, `id_puntoDeVenta`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reset_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `expiracion` DATETIME(3) NOT NULL,
    `usado` BOOLEAN NOT NULL DEFAULT false,
    `usuario_id` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_id` INTEGER NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `expiracion` DATETIME(3) NOT NULL,
    `activa` BOOLEAN NOT NULL DEFAULT true,
    `id_puntoDeVenta` INTEGER NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) NULL,
    `codigo_postal` VARCHAR(50) NULL,
    `id_ciudad` INTEGER NULL,
    `estado` BOOLEAN NOT NULL DEFAULT true,
    `id_negocio` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_modificacion` DATETIME(3) NULL,
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    UNIQUE INDEX `cliente_id_negocio_email_key`(`id_negocio`, `email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recibo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ref` VARCHAR(100) NOT NULL,
    `monto_reembolsado` DECIMAL(10, 2) NULL,
    `id_venta` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NOT NULL,
    `valorDescuentoTotal` DECIMAL(10, 2) NULL,
    `valorImpuestoTotal` DECIMAL(10, 2) NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cantidad` INTEGER NOT NULL,
    `precio_unitario` DECIMAL(10, 2) NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `cantidadReembolsadaTotal` INTEGER NOT NULL DEFAULT 0,
    `nombre_articulo` VARCHAR(255) NOT NULL,
    `articuloId` INTEGER NOT NULL,
    `ventaId` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `venta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `vDescuento` DECIMAL(10, 2) NULL,
    `VImpuesto` DECIMAL(10, 2) NULL,
    `tipoPago` ENUM('Efectivo', 'Tarjeta') NOT NULL,
    `dineroRecibido` DECIMAL(10, 2) NULL,
    `cambio` DECIMAL(10, 2) NULL,
    `impuestoId` INTEGER NULL,
    `descuentoId` INTEGER NULL,
    `clienteId` INTEGER NULL,
    `usuarioId` INTEGER NOT NULL,
    `id_puntoDeVenta` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eliminado_temporal_fecha` DATETIME(3) NULL,

    INDEX `venta_id_puntoDeVenta_fecha_creacion_idx`(`id_puntoDeVenta`, `fecha_creacion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalleReembolso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articuloId` INTEGER NOT NULL,
    `reciboId` INTEGER NOT NULL,
    `cantidadDevuelta` INTEGER NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `provincia` ADD CONSTRAINT `provincia_id_pais_fkey` FOREIGN KEY (`id_pais`) REFERENCES `pais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ciudad` ADD CONSTRAINT `ciudad_id_provincia_fkey` FOREIGN KEY (`id_provincia`) REFERENCES `provincia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negocio` ADD CONSTRAINT `negocio_id_ciudad_fkey` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `puntoDeVenta` ADD CONSTRAINT `puntoDeVenta_id_ciudad_fkey` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `puntoDeVenta` ADD CONSTRAINT `puntoDeVenta_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categoria` ADD CONSTRAINT `categoria_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `descuento` ADD CONSTRAINT `descuento_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `impuesto` ADD CONSTRAINT `impuesto_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_ciudad_fkey` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articulo` ADD CONSTRAINT `articulo_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_id_articulo_fkey` FOREIGN KEY (`id_articulo`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inventario` ADD CONSTRAINT `inventario_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reset_tokens` ADD CONSTRAINT `reset_tokens_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesion` ADD CONSTRAINT `sesion_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_ciudad_fkey` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudad`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_negocio_fkey` FOREIGN KEY (`id_negocio`) REFERENCES `negocio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recibo` ADD CONSTRAINT `recibo_id_venta_fkey` FOREIGN KEY (`id_venta`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recibo` ADD CONSTRAINT `recibo_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleVenta` ADD CONSTRAINT `detalleVenta_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_impuestoId_fkey` FOREIGN KEY (`impuestoId`) REFERENCES `impuesto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_descuentoId_fkey` FOREIGN KEY (`descuentoId`) REFERENCES `descuento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_id_puntoDeVenta_fkey` FOREIGN KEY (`id_puntoDeVenta`) REFERENCES `puntoDeVenta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleReembolso` ADD CONSTRAINT `detalleReembolso_articuloId_fkey` FOREIGN KEY (`articuloId`) REFERENCES `articulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleReembolso` ADD CONSTRAINT `detalleReembolso_reciboId_fkey` FOREIGN KEY (`reciboId`) REFERENCES `recibo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
