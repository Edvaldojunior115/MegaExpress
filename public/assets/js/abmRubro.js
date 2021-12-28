const FormRubro = document.getElementById("FormRubro");


FormRubro.addEventListener('submit', function(e) {

    e.preventDefault();
    var FormDatosRubro = new FormData(FormRubro);

    //CAPTURAMOS TODOS LOS DATOS DEL USUARIO INGRESADOS EN EL FORMULARIO
    var DatosRubro = {
        NombreRubro: FormDatosRubro.get('NombreRubro'),
        Descripcion: FormDatosRubro.get('Descripcion')
    }

    //PASAMOS LA RUTA DE NUESTRO MÉTODO DEL BACKEND CON LA OPERACIÓN A REALIZARSE.
    fetch('http://localhost:8080/api/usuarios', {
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