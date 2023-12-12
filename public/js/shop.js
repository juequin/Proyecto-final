document.addEventListener('DOMContentLoaded', function() {

    let identificadorTemporizador = "";
    
    const inputBuscador = document.getElementById('search-textinput');

    // Chequeamos si existe alguna "Query Param" en la URL para rellenar el Input
    const queryString = window.location.search;             // Capturamos la cadena de consulta (query string) de la URL actual
    const params = new URLSearchParams(queryString);        // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const valorQueryParam = params.get('buscar');           // Obtener el valor del parámetro 'buscar' de la URL
    
    if (valorQueryParam){                            // si existe "valorQueryParam" entonces
        inputBuscador.value = valorQueryParam;       // "rellenamos" el input con ese valor
        inputBuscador.focus();                       // posicionamos el cursor dentro del input
    };


    inputBuscador.addEventListener('input', function(event) {
        
        clearTimeout(identificadorTemporizador);

        identificadorTemporizador  = setTimeout(function() {

                const valorInputSearch = event.target.value;
                
                if (valorInputSearch != '') {
                    window.location.href = `/shop/?buscar=${encodeURIComponent(valorInputSearch)}`;
                }else{
                    window.location.href = `/shop/`;
                };

        }, 1000);

    });
    
});