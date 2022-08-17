import { saveMovie, updateMovieStatus } from "./firebase.js";
const urlGhibli = 'https://ghibliapi.herokuapp.com/films';
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
        firtLayout(data);
        dataMovie(data);
        search(data);
    })
    .catch(err => console.log(err));
}
getMovies();

function firtLayout(data) {
    for (const index of data) {
        createMovie(index);
    }
}

const moviesSection = document.querySelector(".movies-section");
function createMovie(movie) {  
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
                <input type="checkbox" class="movie-checkbox" name="${movie.title}" id="${movie.id}">
                <label for="${movie.id}" class="fa-solid fa-circle-check"></label>
            </div>
        </div>
    `; 

    document.querySelectorAll("input[type=checkbox]").forEach((checkbox) =>{ 
        checkbox.addEventListener("change", (e) => {
            const id = checkbox.id;
            const moviechek = document.getElementById(id);
            if (moviechek.checked) {
                saveMovie(moviechek.name, "Pending", "Pending");
            }else{
                updateMovieStatus(moviechek.name, false);
            }
            
        })
    })
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

function dataMovie(data){
    let orderValue;
    let sortValue;
    function filters(sort, order){
        if(sort === "duration"){
            data.sort((a,b) => {
                if(order === "ascendant"){
                    return a.running_time - b.running_time;
                }else{
                    return b.running_time - a.running_time;
                }
            })
        }else if(sort === "year") {
            data.sort((a,b) =>{
                if(order === "ascendant"){
                    return a.release_date - b.release_date;
                }else{
                    return b.release_date - a.release_date;
                }
            })
        }else if(sort === "audience") {
            data.sort((a,b) =>{
                if(order === "ascendant"){
                    return a.rt_score - b.rt_score;
                }else{
                    return b.rt_score - a.rt_score;
                }
            })
        }
        moviesSection.innerHTML = "";
        data.forEach(movie =>{
            createMovie(movie);
        })
    }

    sortOptions.addEventListener("change", (e) =>{
        orderValue = orderOptions.value;
        sortValue = e.target.value;
        filters(sortValue, orderValue);
    })

    orderOptions.addEventListener("change", (e) =>{
        orderValue =  e.target.value;
        sortValue = sortOptions.value;
        filters(sortValue, orderValue);
    })
}

