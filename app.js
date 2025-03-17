let amigos = [];
let amigosSorteados = [];

document.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll(".section-title, .list-title");  // Seleccionamos todos los títulos
    const body = document.body;

    // Esta función obtiene el color de fondo actual del body
    function getCurrentBackgroundColor() {
        const bgColor = window.getComputedStyle(body).backgroundColor;
        return bgColor;
    }

    // Esta función actualizará el color del texto de los títulos cuando estén visibles en la pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {  // Si el título está visible
                const bgColor = getCurrentBackgroundColor();
                entry.target.style.color = bgColor;  // Aplica el color del fondo al título
            }
        });
    }, { threshold: 0.5 });  // Detecta cuando al menos el 50% del título es visible

    // Observamos cada título
    titles.forEach(title => observer.observe(title));
});

function mostrarMensaje(mensaje, color = 'red') {
    let input = document.getElementById('amigo');
    input.style.color = color;  // Cambia el color del texto del input
    input.value = mensaje;
    input.style.border = `3px solid ${color}`;  // Cambia el borde del input
    input.disabled = true;

    setTimeout(() => {
        input.disabled = false;
        input.style.border = 'none';
        input.value = "";
        input.style.color = 'black';
    }, 2000);
}

function reiniciarSorteo() {
    amigos = [];
    amigosSorteados = [];
    let lista = document.getElementById('listaAmigos');  
    let resultado = document.getElementById('resultado');
    let tituloListaAmigos = document.getElementById('tituloListaAmigos');  // Obtener el título
    tituloListaAmigos.style.display = 'none';  // Esto oculta el título  
    tituloResultado.classList.add('ocultar'); 
    
    lista.innerHTML = "";
    resultado.innerHTML = "";  
    estadoBoton("activar");
    mostrarMensaje("Sorteo reiniciado.", 'Green');  // Aquí cambiamos el color a verde
}

function estadoBoton(estado) {
    let boton = document.querySelector(".button-draw");
    let add = document.getElementById("button-add");
    let input = document.getElementById("amigo");
    let container = document.querySelector(".button-container");

    let desactivar = estado === "desactivar";
    [boton, add].forEach(b => {
        b.disabled = desactivar;
        b.style.backgroundColor = desactivar ? "gray" : "";
        b.style.cursor = desactivar ? "not-allowed" : "pointer";
    });
    input.disabled = desactivar;
    container.style.backgroundColor = desactivar ? "gray" : "";
}

function agregarAmigo() {
    let nombre = document.getElementById('amigo').value.trim().toUpperCase();
    let tituloListaAmigos = document.getElementById('tituloListaAmigos');  // Obtener el título

    
    if (!nombre || amigos.includes(nombre) || /[!@#$%^&*(),.?":{}|<>\d\s$]/.test(nombre)) {
        mostrarMensaje("Nombre inválido o repetido.");
        return;
    }
     // Si es el primer amigo, muestra el título
     if (amigos.length === 0) {
        tituloListaAmigos.style.display = 'block';  // Muestra el título al agregar el primer amigo
    }
    
    amigos.push(nombre);
    document.getElementById('amigo').value = "";
    // Mostrar el título de "Lista de Amigos Ingresados"
    document.getElementById("tituloListaAmigos").classList.remove("ocultar");
    mostrarAmigos();
}

function mostrarAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = amigos.map(amigo => `<li>${amigo}</li>`).join('');
}

function sortearAmigo() {
    let boton = document.querySelector(".button-draw");
    
    // Verificar si hay al menos 2 amigos en la lista
    if (amigos.length < 2) {
        mostrarMensaje("Se necesitan al menos 2 amigos.");
        return;
    }

    // Verificar si todos los amigos ya fueron sorteados
    if (amigosSorteados.length === amigos.length) {
        mostrarMensaje("Todos los amigos fueron sorteados.");
        return;
    }
    
    let indice;
    do {
        // Seleccionar un índice aleatorio
        indice = Math.floor(Math.random() * amigos.length);
    } while (amigosSorteados.includes(indice)); // Asegurarse de que no se repita

    // Mostrar el resultado (nombre del amigo secreto)
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = amigos[indice];

    // Marcar el amigo como sorteado
    amigosSorteados.push(indice);

    // Mostrar el título "Su amigo secreto es:"
    const tituloResultado = document.getElementById('tituloResultado');
    if (tituloResultado.classList.contains('ocultar')) {
        tituloResultado.classList.remove('ocultar'); // Hacer visible el título
    }

    // Desactivar el botón si todos los amigos fueron sorteados
    if (amigosSorteados.length === amigos.length) {
        estadoBoton("desactivar");
        mostrarMensaje("Todos los amigos han sido sorteados.");
    }
}


document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        agregarAmigo();
    }
});
