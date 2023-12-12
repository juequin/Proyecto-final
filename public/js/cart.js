// Primero nos aseguramos que todos los elementos HTML esten disponibles para ser manipulados con "DOMContentLoaded"
document.addEventListener('DOMContentLoaded', function() {
 

    // Datos dinamicos utiles para el codigo
    let precioEnvio = 2500;
    let minimoEnvioGratis = 10000;


    // Creamos una constante para seleccionar el elemento del DOM que queremos manipular
    const cartList = document.querySelector('#cart_list');


    // Funcion para actualizar el valor total del producto dependiendo de las cantidades que figuran
    function actualizaTotalProducto(idItemCarrito, cantidadInput) {                        // Funcion que recibe 2 parametros, el identificador del item en el carrito y la cantidad que indica el Input Box
        
        const inputHiddenPrecio = document.querySelector(`#price${idItemCarrito}`);
        precioItem = inputHiddenPrecio.value;
        const precioTotal = precioItem * cantidadInput;
        
        const totalElement = document.querySelector(`#total${idItemCarrito}`);
        totalElement.textContent = `$ ${precioTotal.toFixed(2)}`;
    }


    function actualizaTotalCarrito() {

        // Capturamos los elementos contenedores donde se muestra la informacion
        
        //const headerCantidad = document.querySelector(`#header-cantidad`);  // Icono en el header del carrito
        const resumenCantidad = document.querySelector(`#cantidad`);
        const hiddenCantidad = document.querySelector(`#hiddencantidad`);
        const resumenSubtotal = document.querySelector(`#subtotal`);
        const resumenEnvio = document.querySelector(`#envio`);
        const resumenTotal = document.querySelector(`#total`);
        const hiddenTotal = document.querySelector(`#hiddentotal`);

        // Cantidad de Elementos
        const sumamosInputs = document.querySelectorAll('.cart__item-qnum');
        let sumadorCantidad = 0;
        sumamosInputs.forEach(inputCantidad => {
            sumadorCantidad += parseInt(inputCantidad.value);
        });

        // Subtotal
        const sumamosSubtotal = document.querySelectorAll('.cart__item-price');
        let sumadorSubtotal = 0;
        sumamosSubtotal.forEach(elementoSumado => {
            sumadorSubtotal += parseFloat(elementoSumado.textContent.replace(/[^0-9.]/g, ''));
                                // parseFloat convierte la cadena en un numero de coma flotante
                                // replace reemplaza todos los caracteres que no sean numeros ni el separador decimal por "nada", osea que borra cualquier otro caracter
        });

        // Total
        sumadorTotal = sumadorSubtotal + precioEnvio;                                                   // Calculamos el total sumando el subtotal + el envio
        if (sumadorTotal > minimoEnvioGratis + precioEnvio){                                            // si el total supera el envio gratis entonces
            resumenEnvio.innerHTML = `<span class="EnvioGratis">$ ${precioEnvio.toFixed(2)}</span>`;    // en envio mostramos esto
            mostrarTotal = `$ ${sumadorSubtotal.toFixed(2)}`;                                           // en total mostramos esto
            soloTotal = sumadorSubtotal.toFixed(2);
        } else {                                                                                        // sino
            resumenEnvio.textContent = `$ ${precioEnvio.toFixed(2)}`;                                   // en envio mostramos esto
            mostrarTotal = `$ ${sumadorTotal.toFixed(2)}`;                                              // en total mostramos esto
            soloTotal = sumadorTotal.toFixed(2);
        }

        // Asignamos los valores a cada contenedor correspondiente
        //headerCantidad.textContent = sumadorCantidad;   // Icono en el header del carrito
        resumenCantidad.textContent = sumadorCantidad; 
        hiddenCantidad.value = sumadorCantidad; 
        resumenSubtotal.textContent = `$ ${sumadorSubtotal.toFixed(2)}`;
        resumenTotal.textContent = mostrarTotal;
        hiddenTotal.value = soloTotal;
    }



    // Esta es la funcion principal, la que inicia y hace que todo aparezca y se ejecute llamando a otras funciones en caso de ser necesario
    function inicializarModuloCarrito() {


            // Paso seguido invocamos a la funcion para que calcule los valores del Total del Carrito
            actualizaTotalCarrito();
            
            // Capturamos todos los inputs de cantidad existentes para "escuchar" el evento "change" de cualquiera de ellos
            const inputsDeCantidad = document.querySelectorAll('.cart__item-qnum');
            inputsDeCantidad.forEach(elementoInput => {
                elementoInput.addEventListener('change', function() {
                    if (isNaN(this.value) || this.value < 0) {
                        this.value = 0;
                    } 
                    actualizaTotalProducto(this.dataset.id, this.value);
                    actualizaTotalCarrito()
                });
            });


            // Aqui estaremos "escuchando" cualquier click que se haga dentro del contenedor cuyo DOM sea el de "cartList" que como mas arriba definimos es el contenedor "cart_list"
            cartList.addEventListener('click', function(event) {
                
                const elementoClickeado = event.target;
                
                if (elementoClickeado.classList.contains('plus')) {
                    const idItemCarrito = elementoClickeado.dataset.id;
                    const cantidadInput = document.querySelector(`#quant${idItemCarrito}`);
                    cantidadInput.value = Number(cantidadInput.value) + 1;
                    actualizaTotalProducto(parseInt(idItemCarrito), parseInt(cantidadInput.value));
                    actualizaTotalCarrito()
                           
                } else if (elementoClickeado.classList.contains('minus')) {
                    const idItemCarrito = elementoClickeado.dataset.id;
                    const cantidadInput = document.querySelector(`#quant${idItemCarrito}`);
                    if (cantidadInput.value > 0) {
                        cantidadInput.value = Number(cantidadInput.value) - 1;
                        actualizaTotalProducto(parseInt(idItemCarrito), parseInt(cantidadInput.value));
                        actualizaTotalCarrito()
                    };
                };
            });

    };


    // Invocamos la funcion para que todo se ejecute, es decir, "el modulo del carrito"
    inicializarModuloCarrito();


});








