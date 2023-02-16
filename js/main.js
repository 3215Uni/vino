/**FORMULARIO*/
function onClick (event) {
  event.preventDefault();
  this.style.backgroundColor = "black";
  console.log("click...");
  console.log(event);


  const mensaje = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }
  console.log(mensaje);


  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => { 
        console.log(json);
        Swal.fire(
            'Enviado',
            'Gracias por tu comentario',
            'success'
        );
        cleanForm();
        /* redirectUrl(); */
    })
    .catch((err) => console.log(err));
}

function cleanForm() {
  let formulario = document.getElementById('formulario');    
  formulario.reset();    
}
function redirectUrl(){
  window.location.href = "https://google.com;"  
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);

/**CLIMA */
window.addEventListener('load', ()=> {
let lon=-65.3280383
let lat=-24.1800537
let temperaturaValor = document.getElementById('valor')  
let temperaturaDescripcion = document.getElementById('descripcion')  
let ubicacion = document.getElementById('ubicacion')  
let iconoClima = document.getElementById('svgAnimado') 
let vientoVelocidad = document.getElementById('vientos') 
let humedad =document.getElementById('humedad')

if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition( posicion => {
       //Cordenadas longitud y latitud
       lon = posicion.coords.longitude
       lat = posicion.coords.latitude            
       //ubicación  ciudad cultural           
       const url = `https://api.openweathermap.org/data/2.5/weather?lat=-65.3280383&lon=-24.1800537&appid=3528a1cc7ca439010a4bcff2e783cefb&units=metric&lang=es`
       //console.log(url)
       fetch(url)
        .then( response => { return response.json()})
        .then( data => {
            //temperatura
            let temp = Math.round(data.main.temp)                
            temperaturaValor.textContent = `${temp} ° C`
            //Humedad
            let humd = Math.round(data.main.humidity)                
            humedad.textContent = `${humd}` + "%";
            //descripcion
            let desc = data.weather[0].description                
            temperaturaDescripcion.textContent = desc.toUpperCase()
            ubicacion.textContent =data.name
            //Velocidad del Viento: 
            vientoVelocidad.textContent = `${data.wind.speed} m/s`
            //Case para los  iconos dinámicos
            console.log(data.weather[0].main)
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                  iconoClima.src='animated/thunder.svg'
                  console.log('TORMENTA');
                  break;
                case 'Drizzle':
                  iconoClima.src='animated/rainy-2.svg'
                  console.log('LLOVIZNA');
                  break;
                case 'Rain':
                  iconoClima.src='animated/rainy-7.svg'
                  console.log('LLUVIA');
                  break;
                case 'Snow':
                  iconoClima.src='animated/snowy-6.svg'
                    console.log('NIEVE');
                  break;                        
                case 'Clear':
                    iconoClima.src='animated/day.svg'
                    console.log('LIMPIO');
                  break;
                case 'Atmosphere':
                  iconoClima.src='animated/weather.svg'
                    console.log('ATMOSFERA');
                    break;  
                case 'Clouds':
                    iconoClima.src='animated/cloudy-day-1.svg'
                    console.log('NUBES');
                    break;  
                default:
                  iconoClima.src='animated/cloudy-day-1.svg'
                  console.log('por defecto');
              }
        })
        .catch( error => {
            console.log(error)
        })
   })        
}
})
