import { listaServices } from "../service/cliente_service.js";

export function detallePets(){
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

//backticks
const crearNuevaLinea = (imagen, raza, color, descripcion, email) => {
    const linea = document.createElement("div");

    const contenido = `
    <div>
        <img class="img_pets" src="${imagen}" alt="Imagen del Producto ${raza}">
    </div>
    <div class="detalles">
        <h1 class="raza_detalles">${raza}</h1>
        <h5 class="color_detalles">${color}</h5>
        <p class="descripcion_detalles">${descripcion}</p>
        <email class="email_stylos">
        <a class="text_email" href="mailto:${email}">Contactate</a> 
        </email>

        
    </div>
    `;

    linea.innerHTML = contenido;

    return linea;
};


const div = document.querySelector("[data-detalle]");



   listaServices
    .detallePets(id)
    .then((data) => {

        const nuevaLinea = crearNuevaLinea(data.imagen, data.raza, data.color, data.descripcion, data.email);
        div.appendChild(nuevaLinea).className = "pets_detalles";

    })
    .catch((error) => alert("Oops! Error. Comuniquese con Matr3"));
}


