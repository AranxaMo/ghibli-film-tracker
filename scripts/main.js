const urlGhibli = 'https://ghibliapi.herokuapp.com/films';
const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".navbar-content");
const main = document.querySelector('.main');

hamburguer.addEventListener("click", () => {
    menu.classList.toggle("shown");
})

function getMovies() {
    fetch(urlGhibli)
    .then(response => response.json())
    .then(data => dataMovie(data))
    

    .catch(err => console.log(err));
}
getMovies();

function dataMovie(data) {
    for (const index of data) {
        createMovie(index);
        searchMovie(index)
    }
}

function createMovie(movie) {  
    const moviesSection = document.querySelector(".movies-section");
    moviesSection.innerHTML += `
        <div class="movie-container">
            <img src="${movie.movie_banner}" class="banner-img"/>
            <div class="info-container">
                <h2>${movie.title}</h2>
                <div class="data-movie_container">
                    <p>${movie.release_date}</p>
                    <hr>
                    <p>${movie.running_time} min</p>
                    <hr>
                    <p>Score: ${movie.rt_score}</p>
                </div>
                <a href="./details.html?movieId=${movie.id}" class="movie-link__info"></a>
                <input type="checkbox" class="movie-checkbox" id="${movie.id}">
                <label for="${movie.id}" class="fa-solid fa-circle-check"></label>
            </div>
        </div>
    `; 
}


function searchMovie(movie){
    const searchContainer = document.querySelector(".search-Container");
    let search = document.querySelector(".search-bar");
    
    search.addEventListener("input", (e) => {
       console.log(moviesList);
    })  
}

function showResults(movieList){
    
}
