const formLogin = document.getElementById("ABMusuario");

formLogin.addEventListener('submit', function(e) {

    e.preventDefault();
    var Formdatos = new FormData(formLogin);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosUsuario = {
        Nnombre: Formdatos.get('Nombre'),
        Apellido: Formdatos.get('Apellido'),
        DNI: DatosUsuario.get('DNI'),
        Email: DatosUsuario.get('Email'),
        Telefono: DatosUsuario.get('Telefono'),
        Domicilio: DatosUsuario.get('Domicilio'),
        Localidad: DatosUsuario.get('Localidad'),
        Fecha: DatosUsuario.get('Fecha'),
        Cuit: DatosUsuario.get('Cuit'),
        CTACTE: DatosUsuario.get('CTACTE')
    };

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosUsuario)
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

                let timerInterval;

                Swal.fire({
                    title: 'POR FAVOR, ESPERE:',
                    html: 'ESTAMOS PROCESANDO SU SOLCITUD... <b></b>',
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {

                        Swal.fire({
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2300
                        });
                        // location.href = "./view/principal.html";
                    }
                })


            }

        }).catch(err => console.log(err.err));

});