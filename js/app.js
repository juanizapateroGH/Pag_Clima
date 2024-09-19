// Seleccionamos los elementos del DOM
let formulario;
let resultado;

window.addEventListener('load', () => {
    formulario = document.getElementById('formulario');
    resultado = document.getElementById('resultado');
    
    // Escuchar el evento submit del formulario
    formulario.addEventListener('submit', buscarClima);
});

// Función para buscar el clima
function buscarClima(e) {
    e.preventDefault(); // Evitar que el formulario recargue la página

    // Obtener los valores de ciudad y país
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;

    // Validar que ambos campos estén completos
    if (pais === "" || ciudad === "") {
        mostrarError("Ambos campos tienen que estar completos");
        return;
    }

    // Construir la URL para la API
    const appId = '70b869dad88fa9bc91529e05fab4cde8';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    // Hacer la petición a la API
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod !== 200) {
                mostrarError("Ciudad no encontrada");
                return;
            }
            mostrarClima(datos);
        })
        .catch(error => {
            console.error('Error en la petición:', error);
            mostrarError('Hubo un problema al realizar la búsqueda');
        });
}

// Función para mostrar errores
function mostrarError(mensaje) {
    const alerta = document.createElement('div');
    alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
    alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
    `;
    const container = document.querySelector('.container');
    container.appendChild(alerta);

    // Eliminar la alerta después de 5 segundos
    setTimeout(() => {
        alerta.remove();
    }, 5000);
}

// Función para mostrar el clima
function mostrarClima(datos) {
    const centigrados = kelvinACentigrados(datos.main.temp);
    const ciudad = datos.name;
    const descripcion = datos.weather[0].description;

    const tempActual = document.createElement('p');
    tempActual.innerHTML = `${centigrados} &#8451;`; // Símbolo de grados Celsius
    tempActual.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(tempActual);

    // Mostrar el resultado en el contenedor
    resultado.innerHTML = `
        <h3>Clima en ${ciudad}</h3>
        <p>Descripción: ${descripcion}</p>
    `;
    resultado.appendChild(resultadoDiv);
}

// Convertir Kelvin a Celsius
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15); // Conversión de Kelvin a Celsius
}

function limpiarHTML() {
    resultado.innerHTML = '';
    }

    function Spinner() {
        limpiarHTML();
        const divSpinner = document.createElement('div');
        divSpinner.classList.add('sk-fading-circle');
        divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
        `;
        resultado.appendChild(divSpinner);
        }
        