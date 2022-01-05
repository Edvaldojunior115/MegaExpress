const formProducto = document.getElementById("FormProducto");

//Capturamos el evento de los botonos
const agregarProducto = document.getElementById("AltaProducto");
const EliminarProducto = document.getElementById("EliminarProducto");
const ModificarProducto = document.getElementById("ActualizarProducto");


//Se establece un método para cada botón de acordé a lo que se hace.
agregarProducto.onclick = function(event) {

    event.preventDefault();
    var FormABMproducto = new FormData(formProducto);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosProcuto = {

        NombreProducto: FormABMproducto.get('Nombre'),
        DescripcionProducto: FormABMproducto.get('Descripcion'),
        CantidadProducto: FormABMproducto.get('Cantidad'),
        PrecioUnitProducto: FormABMproducto.get('PrecioUnitario'),
        PorcentajeGananciaProducto: FormABMproducto.get('PorcentajeGanancia')

    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/producto', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DatosProcuto)
        })
        .then(response => response.json())
        .then(data => {

            if (data.ok == false) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });

            } else {

                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });
            }


        }).catch(err => console.log(err));
}

ModificarProducto.onclick = function(event) {

    event.preventDefault();
    var FormABMproducto = new FormData(formProducto);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosProcuto = {

        NombreProducto: FormABMproducto.get('Nombre'),
        DescripcionProducto: FormABMproducto.get('PrecioUnitario'),
        cantidadMinimaStockProducto: FormABMproducto.get('PorcentajeGanancia'),
        PrecioUnitProducto: FormABMproducto.get('Descripcion'),
        PorcentajeGananciaProducto: FormABMproducto.get('Cantidad')

    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/producto', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosProcuto)
    })

    .then(response => response.json())
        .then(data => {

            if (data.ok = false) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });


            } else {

                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });
            }

        }).catch(err => console.log(err.err));
}

EliminarProducto.onclick = function(event) {

    event.preventDefault();
    var FormABMproducto = new FormData(formProducto);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosProcuto = {

        NombreProducto: FormABMproducto.get('Nombre'),
        DescripcionProducto: FormABMproducto.get('PrecioUnitario'),
        cantidadMinimaStockProducto: FormABMproducto.get('PorcentajeGanancia'),
        PrecioUnitProducto: FormABMproducto.get('Descripcion'),
        PorcentajeGananciaProducto: FormABMproducto.get('Cantidad')

    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/producto', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosProcuto)
    })

    .then(response => response.json())
        .then(data => {

            if (data.ok == fasle) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });


            } else {

                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });

            }

        }).catch(err => console.log(err.err));
}