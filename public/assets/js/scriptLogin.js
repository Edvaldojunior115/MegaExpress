//SELECCIONAMOS EL FORMULARIO PARA LUEGO TOMAR UNA ACCIÓN SOBRE ÉSTE.
//EN ESTE CASO, LO SELECCIONAMOS A TRAVÉS DE UN ID PARA CAPTURAR LOS DATOS INGRESADOS EN ÉL.
const formLogin = document.getElementById("SesionLoginForm");
const formRegistro = document.getElementById("registrarLogin");


////CAPTURAMOS EL EVENTO CLICK CUANDO EL USAURIO CLIQUEA EN EL BOTON DEL FORMULARIO.
const Login = document.getElementById("btnLogin");
const AltaLogin = document.getElementById("btnRegistra");



//ACTIVAMOS LA FUNCIÓN AL REALIZAR EL CLICK Y DECIDIMOS QUE SE HACE UNA VEZ QUE HAYA CLIQUEADO.
Login.onclick = function(event) {

    event.preventDefault();
    var Formdatos = new FormData(formLogin);

    // console.log(Formdatos.get('legajo'));
    // console.log(Formdatos.get('contrasena'));
    // console.log(JSON.stringify(Formdatos));

    var login = {
        Legajo: Formdatos.get('legajo'),
        Contrasena: Formdatos.get('contrasena')
    };

    fetch('http://localhost:8080/api/loginUSER', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
    })

    .then(response => response.json())
        .then(data => {

            if (data.acceso == 0) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
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

                    if (result.dismiss === Swal.DismissReason.timer) {

                        Swal.fire({
                            title: data.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2300
                        });
                        location.href = "./view/principal.html";
                    }
                })


            }

        }).catch(err => console.log(err));

}

//FALTA TERMINA EL DE REGISTRO DEL USUARIO Y LUEGO PROBAR.
//REGISTRAR UN USUARIO
AltaLogin.onclick = function(event) {

    event.preventDefault();
    var FormRegistroDatos = new FormData(formRegistro);

    var DatosLoginRegistrar = {
        Legajo: FormRegistroDatos.get('Legajo'),
        Contrasena: FormRegistroDatos.get('Contrasena'),
        Email: FormRegistroDatos.get('Email'),
        Rol: FormRegistroDatos.get('Rol')
    };

    fetch('http://localhost:8080/api/loginUSER/CrearLogin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DatosLoginRegistrar)
        })
        .then(response => response.json())
        .then(data => {

            if (data.acceso == false) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
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

                    if (result.dismiss === Swal.DismissReason.timer) {

                        Swal.fire({
                            title: data.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2300
                        });
                    }
                })

            }
        }).catch(err => console.log(err));

}