const FormRubro = document.getElementById("FormRubro");

const AltaRubro = documento.getElementById("btRegistrar");
const ActualizarRubro = documento.getElementById("btActualizar");
const EliminarRubro = documento.getElementById("btEliminar");


AltaRubro.onclick = function(event) {

    event.preventDefault();
    var FormDatosRubro = new FormData(FormRubro);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosRubro = {
        NombreRubro: FormDatosRubro.get('NombreRubro'),
        Descripcion: FormDatosRubro.get('Descripcion')
    }

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/rubro', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosRubro)
    })

    .then(response => response.json())
        .then(data => {

            if (data.acceso == 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });


            } else {

                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });
            }

        }).catch(err => console.log(err.err));
}

//FALTARÍA VER CÓMO CONSEGUIR EL CÓDIGO DEL RUBRO A ACTUALIZAR
ActualizarRubro.onclick = function(event) {

    event.preventDefault();

    var FormDatosRubro = new FormData(FormRubro);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosRubro = {
        IdRubro: FormDatosRubro.get(''),
        NombreRubro: FormDatosRubro.get('NombreRubro'),
        Descripcion: FormDatosRubro.get('Descripcion')
    }

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/rubro', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosRubro)
    })

    .then(response => response.json())
        .then(data => {

            if (data.acceso == 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });


            } else {

                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });
            }

        }).catch(err => console.log(err.err));

}

//FALTARÍA VER CÓMO CONSEGUIR EL CÓDIGO DEL RUBRO A ELIMINAR
EliminarRubro.onclick = function(event) {

    event.preventDefault();

    var FormDatosRubro = new FormData(FormRubro);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosRubro = {
        IdRubro: FormDatosRubro.getElementById('')
    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/rubro', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosRubro)
    })

    .then(response => response.json())
        .then(data => {

            if (data.acceso == 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'ERROR',
                    text: data.message
                });


            } else {

                Swal.fire({
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2300
                });
            }

        }).catch(err => console.log(err.err));

}