const FormProveedor = document.getElementById("FormProducto");

//Capturamos el evento de los botonos
const agregarProveedor = document.getElementById("AltaProveedor");
const ModificarProveedor = document.getElementById("ActualizarProveedor");
const EliminarProveedor = document.getElementById("EliminarProveedor");


//Se establece un método para cada botón de acordé a lo que se hace.
agregarProveedor.onclick = function(event) {

    event.preventDefault();
    var FormABMproveedor = new FormData(FormProveedor);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosProveedor = {

        Nombre: FormABMproveedor.get('Nombre'),
        Vendedor: FormABMproveedor.get('Vendedor'),
        ResponsableInscripto: FormABMproveedor.get('ResponsableInscripto'),
        Email: FormABMproveedor.get('Email'),
        Localidad: FormABMproveedor.get('Localidad'),
        Direccion: FormABMproveedor.get('Direccion')
    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/proveedor', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DatosProveedor)
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

ModificarProveedor.onclick = function(event) {

    event.preventDefault();
    var FormABMproveedor = new FormData(FormProveedor);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    //FALTA DEFINIR CÓMO CONSEGUIR EL CÓDIGO DEL PROVEEDOR A SER ACTUALIZADO
    var DatosProveedor = {
        idProveedor = FormABMproveedor.get(''),
        Nombre: FormABMproveedor.get('Nombre'),
        Vendedor: FormABMproveedor.get('Vendedor'),
        ResponsableInscripto: FormABMproveedor.get('ResponsableInscripto'),
        Email: FormABMproveedor.get('Email'),
        Localidad: FormABMproveedor.get('Localidad'),
        Direccion: FormABMproveedor.get('Direccion')
    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    //FALTA DEFINIR CÓMO CONSEGUIR EL CÓDIGO DEL PROVEEDOR A SER ELIMINADO
    fetch('http://localhost:8080/api/producto', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosProveedor)
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

        }).catch(err => console.log(err));
}

EliminarProveedor.onclick = function(event) {

    event.preventDefault();
    var FormABMproveedor = new FormData(FormProveedor);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    //FALTA DEFINIR CÓMO CONSEGUIR EL CÓDIGO DEL PROVEEDOR A SER ELIMINADO
    var DatosProveedor = {
        idProveedor = FormABMproveedor.get(''),
    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/producto', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosProveedor)
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

        }).catch(err => console.log(err));
}