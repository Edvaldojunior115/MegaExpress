const formLogin = document.getElementById("SesionLoginForm");
const formRegistro = document.getElementById("registrarLogin");


//LOGIN DEL USUARIO
formLogin.addEventListener('submit', function(e) {

    e.preventDefault();
    var Formdatos = new FormData(formLogin);

    // console.log(Formdatos.get('legajo'));
    // console.log(Formdatos.get('contrasena'));
    // console.log(JSON.stringify(Formdatos));

    var login = {
        Legajo: Formdatos.get('legajo'),
        contrasena: Formdatos.get('contrasena')
    };

    fetch('http://localhost:8080/api/login', {
        method: 'GET',
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


//REGISTRAR UN USUARIO
formRegistro.addEventListener('submit', function(e) {

    e.preventDefault();
    var FormRegistroDatos = new FormData(formRegistro);

    // console.log(Formdatos.get('legajo'));
    // console.log(Formdatos.get('contrasena'));
    // console.log(JSON.stringify(Formdatos));

    var DatosRegistrar = {
        Legajo: formRegistro.get('Legajo'),
        Contrasena: formRegistro.get('Contrasena'),
        Email: formRegistro.get('Email'),
        Rol: formRegistro.get('Rol')
    };

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosRegistrar)
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