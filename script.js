let page = 20;
let sacar = document.querySelector(".header_sacar");
let agregar = document.querySelector(".header_agregar");

sacar.addEventListener("click",()=>{
    if(page > 1){
        page -= 1;
        cargarDatos();
    }
})

agregar.addEventListener("click",()=>{
    if(page < 1562){
        page += 1;
        cargarDatos();
    }
})

const cargarDatos = async()=>{

    try{
        let peticion = await axios(`https://gateway.marvel.com:443/v1/public/characters?limit=${page}&ts=1&apikey=b495d3a4ea0716edb9cc18a9d0c59607&hash=fa99d99cfa7da96b787db334f6657445`)
        console.log(peticion)

        if(peticion.status == 200){
            let datos = peticion.data.data;
            console.log(datos)

            let personajes = "";

            datos.results.forEach(personaje => {
                personajes += `
                    <div class="card">
                        <img class="card_img" src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" alt="foto-del-personaje">
                        <h3 class="card_name">${personaje.name}</h3>
                        <a class ="card_features" href="${personaje.urls[0].url}" target="_blank">Más información del personaje.</a>
                    </div>
                `;
            });

            document.querySelector(".card-container").innerHTML = personajes;




        }else if(peticion.status == 401){
            console.log("Algo ha ido mal con la petición. Si recibes este error, prueba a refrescar la página o actualizar tu navegador.")
        }else if(peticion.status == 404){
            console.log("El recurso ha sido borrado o quizá has escrito la dirección web mal. Comprueba que la dirección que has introducido es correcta y no le falta o sobra nada.")
        } else{
            console.log("Ha ocurrido un error con la carga de los recursos.")
        }
    } 
    catch(e){
        console.log(e)
    }
    
};

cargarDatos();