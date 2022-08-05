const link = window.location.href;
const newLink = new URL(link);
const movieId = newLink.searchParams.get("movieId");


const urlGhibliFilm = `https://ghibliapi.herokuapp.com/films/${movieId}`; 
const trailers = {

}

function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => createDisplay(data))

    .catch(err => console.log(err));
}
getMovies(urlGhibliFilm);

function createDisplay(movie) {
    const title = document.querySelector(".movie-info__title");
    title.textContent = movie.title;

    const japaneseTitle = document.querySelector(".movie-info__titleJ");
    japaneseTitle.textContent = movie.original_title_romanised;

    const rating = document.querySelector(".movie_info__rating");
    rating.textContent = `Rating Score: ${movie.rt_score}`;

    const date = document.querySelector(".movie_info__date");
    date.textContent = movie.release_date;

    const time = document.querySelector(".movie_info__time");
    time.textContent = `${movie.running_time} min`;
    
    const synopsis = document.querySelector(".movie-info__synopsis");
    synopsis.textContent = movie.description;

    const movieContainer = document.querySelector(".movie-cover");
    const movieCover = document.createElement("img");
    movieCover.src = movie.image;
    movieCover.classList.add("cover-img");
    movieContainer.appendChild(movieCover);

    const movieLink = document.querySelector(".movie-link");
    movieLink.href = `https://ghibli.fandom.com/wiki/${movie.title}`;
}

