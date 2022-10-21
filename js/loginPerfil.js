import {listaClientes} from "../service/cliente_service.js";
import { detalleUsuarios } from "./barraUsuario.js";
import { perfilUser } from "./usuario_pets.js"



/*
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === 'visible') {
    console.log("PLAY")
  } else {
    console.log("PAUSE")
  }
});
*/
function handleVisibilityChange() {
  if(document.hidden) {
    console.log("HIDDEN: ");
    /*setInterval((window.location.href ="index.html"), 10000)*/
    /*Agregar ventana de close*/
  } else {
    console.log("VISIBLE: ")
    /*Agregar booleano que se active cuando esta activa*/
    /*tomar el tiempo de inicio de sesion*/
    /*si no se usa en determinado tiempo cerrar sesion*/
    //const test = dato1.email;
    /*guarda en el sessionStorage*/
    //sessionStorage.setItem("lastname", test);
    //sessionStorage.getItem("lastname");
  }
}




  var dato1 = {};
  

  function storageEmail (emailAdd,nombreCompletoAdd,imagenAdd){
    sessionStorage.setItem("email", emailAdd);
    sessionStorage.getItem("email");
    sessionStorage.setItem("nombre", nombreCompletoAdd);
    sessionStorage.getItem("nombre");
    sessionStorage.setItem("imagen", imagenAdd);
    sessionStorage.getItem("imagen");
    
    
  }

    //Funcion capturar datos
    export function obtenerDatos() {
      
      const emailAdd = dato1.email;
      const nombreAdd = dato1.given_name;
      const apellidoAdd = dato1.family_name;
      const nombreCompletoAdd = dato1.name;
      const imagenAdd = dato1.picture;
      storageEmail(emailAdd,nombreCompletoAdd,imagenAdd)
      //console.log(email + " " + nombre + " " + apellido + " " + nombreCompleto + " " + imagen);
      var count = true;
      listaClientes
      .listaUsuarios()
      .then((respuesta) => {
        respuesta.forEach(({email}) =>{
          
          const user = email;

         
         if(user.includes(emailAdd)){
          console.log("ya tengo usuario")
          document.querySelector(".box_botonInicio").style.display="none";
          document.querySelector(".box_detalle_user").style.display="block";
          document.querySelector(".box_ingreso").style.display="none";
          
          detalleUsuarios(nombreCompletoAdd,imagenAdd);
          perfilUser();
          storageEmail (emailAdd,nombreCompletoAdd,imagenAdd);
          
          return count = false; 
         }
        
        } 
        );
        if(count){
          console.log("voy crear usuario")
          listaClientes
          .crearUsuario(emailAdd, nombreAdd, apellidoAdd, nombreCompletoAdd, imagenAdd)
          .then((respuesta) => {
            console.log("creo usuario")
          document.querySelector(".box_botonInicio").style.display="none";
          document.querySelector(".box_detalle_user").style.display="block";
          document.querySelector(".box_ingreso").style.display="none";
          
          detalleUsuarios(nombreCompletoAdd,imagenAdd);
          perfilUser();
          

          }).catch((error) => console.log(error));

        };
      })
        
     .catch((err) => console.log(err));
          
          /*else{
            
            listaClientes
        .crearUsuario(email, nombre, apellido, nombreCompleto, imagen)
        .then((respuesta) => {
            document.querySelector(".box_botonInicio").style.display="none";
            document.querySelector(".box_detalle_user").style.display="block";
            //cuando termino de capturar los datos llamo a la funcion detalle_pets.js
          //detalleUsuarios(imagen,nombreCompleto);
            detallePets();
            //console.log(imagen, categoria, nombre_prod, precio_prod, descripcion_prod)
            //window.location.href ="productos.html"

        }).catch((error) => console.log(error));
          */
      
      
      
    }

    //Funcion usada de https://es.stackoverflow.com/
    function parseJwt(token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      dato1 = JSON.parse(jsonPayload);
      return JSON.parse(jsonPayload);
    };

    function handleCredentialResponse(response) {
     // console.log("Encoded JWT ID token: " + response.credential);
      JSON.stringify(parseJwt(response.credential));
      obtenerDatos();
      
    }

    if(sessionStorage.getItem("email")){
      console.log("Sesion: "+sessionStorage.getItem("email"))
      document.querySelector(".box_botonInicio").style.display="none";
      document.querySelector(".box_detalle_user").style.display="block";
      document.querySelector(".box_ingreso").style.display="none";
      const nombre = sessionStorage.getItem("nombre").replace(/"/g, '');
      const imagen = sessionStorage.getItem("imagen").replace(/"/g, '');

      detalleUsuarios(nombre,imagen);
      perfilUser();
        
      
    }else{
      window.onload = function () {
        google.accounts.id.initialize({
          client_id: "404534087235-cn6uhb4iiua6vjg91orae16aq4qij8ad.apps.googleusercontent.com",
          callback: handleCredentialResponse,
          auto_select: true
        });
        google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
        
      }
    }
    

  
   

