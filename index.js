//nodos del HTML
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");
const contenedor = document.getElementById("contenedor");

let pagina = 1;

// funciones de los botones

btnAnterior.addEventListener("click", ()=>{
    if(pagina > 1){
        pagina -= 1;
        cargarPeliculas();
    }
});

btnSiguiente.addEventListener("click", ()=>{
    if(pagina <= 46646){
        pagina += 1;
        cargarPeliculas();
    }
});

// función asincrónica

//primero creo la función asincrónica
const cargarPeliculas = async()=>{
    //segundo paso es try y catch
    try{

        // hacer fetch
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page=${pagina}`);
        console.log(response);

        // validar respuesta de comunicación
        if(response.status === 200){
            const data = await response.json();
            console.log(data);

            // guardar la info de data en array
            let peliculas = [];

            // recorrer la data y generar las cards para cada pelicula
            data.results.forEach(pelicula => {
                peliculas += `
                <div class="card cardStyle pelicula">
                    <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title titulos">${pelicula.title} </h5>
                        <p class="card-text descripcion">${pelicula.overview} </p>
                    </div>
                </div>
                `;            
            });

            //devolver al contenedor del HTML el array
            contenedor.innerHTML = peliculas; 
        }
    }

    catch (error){
        console.log(error.message);
    }
}

cargarPeliculas();