const urlGhibli = 'https://ghibliapi.herokuapp.com/films';
const menu = document.querySelector(".navbar-content");
const searchbar = document.querySelector(".search-bar");
const searchIcon = document.querySelector(".search-icon");
const closeIcon = document.querySelector(".close-icon");
const filterIcon = document.querySelector(".filter-icon");
const results = document.querySelector(".search-results");
const filtersContainer = document.querySelector(".filters-options");

searchIcon.addEventListener("click", () =>{
    searchbar.classList.add("open")
    closeIcon.classList.add("shown");
    searchIcon.classList.add("shown");
});
closeIcon.addEventListener("click", () =>{
    searchbar.classList.remove("open")
    closeIcon.classList.remove("shown");
    searchIcon.classList.remove("shown");
    searchbar.value = "";
    results.innerHTML = "";
});
filterIcon.addEventListener("click", () =>{
    filtersContainer.classList.toggle("shown");
})

function getMovies() {
    fetch(urlGhibli)
    .then(response => response.json())
    .then(data => {
        filters(data);
        search(data);
    })
    .catch(err => console.log(err));
}
getMovies();

// function dataMovie(data) {
//     let films = [];
//     for (const index of data) {
//     }
//     console.log(films)
// }

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

function search(data){
    searchbar.addEventListener("keyup", (e) => {
        const value = e.target.value.toLowerCase();
        results.innerHTML = "";
        data.forEach(movie => {
            let searchItem = ""
            searchItem = movie.title.toLowerCase()
            let movieLink = movie.id;
            if(searchItem.includes(value)){
                results.innerHTML += `<a  href="./details.html?movieId=${movieLink}" class="result-item">
                ${searchItem}
                </a>`
            }
        });
    })  
}




const orderOptions = document.getElementById("order");
const sortOptions = document.getElementById("options");
var orderValue = orderOptions.value;
var sortValue = sortOptions.value;

function filters(data) {

    sortOptions.addEventListener("change", (e =>{
        sortValue = e.target.value;
        orderValue = orderOptions.value;
        console.log(sortValue);
    }));
   
    console.log(sortValue);
    console.log(orderValue);

    if (sortValue === "duration") {
        console.log("Si 1")
        data.sort((a,b) => {
            if(orderValue === "ascendant") {
                return a.running_time - b.running_time;
            }else{
                return b.running_time - a.running_time;
            }
        })
    }else if (sortValue === "year") {
        data.sort((a,b) => {
            if(orderValue === "ascendant"){
                return a.release_date - b.release_date;
            }else{
                return b.release_date - a.release_date;
            }
        })
    }else if (sortValue === "audience score") {
        data.sort((a,b) =>{
            if(orderValue === "ascendant"){
                return a.rt_score - b.rt_score;
            }else{
                return b.rt_score - a.rt_score;
            }
        })
    }
    data.forEach(movie =>{createMovie(movie)})
}









