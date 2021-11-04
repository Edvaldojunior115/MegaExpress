const { response, request } = require('express');

const pool = require('./data');




const crearTablasPost = (req, res = response) => {


    //Tabla del CLIENTE
    //VER LA SIGUIENTE PÁGINA PARA ESTABLECER LAS RELACIONES ENTRE LAS TABLAS
    //https://parzibyte.me/blog/2020/09/28/crear-tabla-relaciones-mysql/
    //foreign key (id_tabla_principal) references tabla(id) on delete cascade on update cascade
    const CrearTableCliente = `CREATE TABLE Cliente (
        IdCliente BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        NombreCli VARCHAR(50) not null,
        ApellidoCli VARCHAR(50) not null,
        DNICli INT(8) not null,
        DomicilioCli VARCHAR(50) not null,
        LocalidadCli VARCHAR(30) not null,
        EmailCli VARCHAR(60) not null,
        FechaCli DATE not null,
        TelefonoCli INT(13) not null,
        CuitCli INT(12)not null,
        StatusCli tinyint(1) not null,
        CTACTECli tinyint(1) not null,
       
        )`;

    pool.query(CrearTableCliente, (err, result) => {

        if (err.errno) {

            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DEL CLIENTE EN BASE DE DATOS PORQUE YA EXISTE.',
            });

        }
    });

    //Tabla del VENDEDOR
    //foreign key (IdCliente) references Cliente(IdCliente) on delete cascade on update cascade
    const CrearTableVendedor = `CREATE TABLE Vendedor (
            
            idVendedor INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            NombreV VARCHAR(50),
            ApellidoV VARCHAR(50),
            DNIV INT(8),
            DomicilioV VARCHAR(50),
            LocalidadV VARCHAR(30),
            EmailV VARCHAR(60),
            FechaV DATE,
            TelefonoV INT(13),
            CuitV INT(12),
            StatusV tinyint(1),
            
            )`;

    pool.query(CrearTableVendedor, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DEL VENDEDOR EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });

    //Tabla de PROVEEDOR - TERMINANDO DE ESPECIFICAR LOS ATRIBUTOS.
    const CrearTableProveedor = `CREATE TABLE Proveedor (
            IdProveedor BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            nombreProveedor  VARCHAR(30),
            VendedorProveedor VARCHAR(30),
            ResponsableInscripto tinyint(1),
            EmailProveedor VARCHAR(50),
            LocalidadProveedor VARCHAR(30)
            DireccionProveedor VARCHAR(30)

    )`;

    pool.query(CrearTableProveedor, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE VENTAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });




    //Tabla de FACTURA DE VENTAS
    const CrearTableFacturaVenta = `CREATE TABLE FacturaVenta (
            IdFacturaVenta BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            VendedorF VARCHAR(50),
            FechaF DATE,
            NumeroF INT(15),
            TipoF VARCHAR(1),
            CondiciónF VARCHAR(50),
            RemitoF INT(10)

        )`;

    pool.query(CrearTableFacturaVenta, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE VENTAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });



    //Tabla de FACTURA DE COMPRAS
    const CrearTableFacturaCompra = `CREATE TABLE FacturaCompra (
            IdFacturaCompra BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            FechaF DATE,
            NumeroF INT(15),
            TipoF VARCHAR(1),
            CondiciónF VARCHAR(50),
            RemitoF INT(10)
        )`;

    pool.query(CrearTableFacturaCompra, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE COMPRAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });


    //Tabla de PRODUCTOS
    const CrearTableProducto = `CREATE TABLE Producto (
            IdProducto BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            NombreProdu VARCHAR(30),
            DescripcionProdu VARCHAR(200),
            CantidadMinimaStockProdu INT(2),
            PrecioUnitProdut INT(10),
            PorcentajeGananciaProdu INT(2)
        )`;

    pool.query(CrearTableProducto, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE COMPRAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });


    //Tabla de RUBRO
    const CrearTablerubro = `CREATE TABLE Rubro (
            IdRubro BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            NombreRubro VARCHAR(30),
            DescricionRubro VARCHAR(200)
    )`;

    pool.query(CrearTablerubro, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE COMPRAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });


    //Tabla de FORMA DE PAGO- quedé aqui
    const CrearTableFormaPago = `CREATE TABLE FormaPago (
            IdFormaPago BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            NombreFormaP VARCHAR(30),
            FechaFormaP DATE,
            DescricionFormaP VARCHAR(200))`;

    pool.query(CrearTableFormaPago, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE COMPRAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });


    //Tabla de TIPO DE TARJETAS
    const CrearTableTipoTarjeta = ` CREATE TABLE TipoTarjeta (
            IProducto BIGINT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            nombreTipoTarjeta VARCHAR(10),
            Banco VARCHAR(10)
    )`;

    pool.query(CrearTableTipoTarjeta, (err, result) => {

        if (err.errno) {
            return res.json({
                message: 'NO SE PUDO CREAR LA TABLA DE FACTURA DE COMPRAS EN BASE DE DATOS PORQUE YA EXISTE.',
                err
            });
        }
    });

    //Al crear todas las tablas sin ningún error, se muestra el siguiente mensaje.
    return res.json({
        message: 'TABLAS DE BASE DE DATOS CREADA CON ÉXITO.'
    });

}

module.exports = crearTablasPost;