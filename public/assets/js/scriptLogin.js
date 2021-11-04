const formLogin = document.getElementById("SesionLoginForm");

formLogin.addEventListener('submit', function(e) {

    e.preventDefault();
    var Formdatos = new FormData(formLogin);

    console.log(Formdatos.get('legajo'));
    console.log(Formdatos.get('contrasena'));

    fetch('http://localhost:8080/api/login', {

        method: 'POST',
        body: Formdatos

    }).then(datosBakcend => {

        if (!datosBakcend.ok) {
            Swal.fire({
                title: 'Error!',
                text: 'Contraseña o legajo son incorrectos.',
                icon: 'error'
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
                    location.href = "/"
                }
            })

        }


    })

});