import { saveMovie, deleteMovie, updateMovie } from "./firebase.js";
const link = window.location.href;
const newLink = new URL(link);
const movieId = newLink.searchParams.get("movieId");
const urlGhibliFilm = `https://ghibliapi.herokuapp.com/films/${movieId}`; 
const watchedMovie = document.querySelector("#movie__watched");
let movieTitle;
let ratingMovie;
let movielinkVideo;

/*fetch*/
function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        createDisplay(data);
    })

    .catch(err => console.log(err));
}
getMovies(urlGhibliFilm);

/*store data*/
watchedMovie.addEventListener("change", () => {
    if (watchedMovie.checked) {
        saveMovie(movieTitle, watchedMovie.checked, "Pending rate");
    }else{
        deleteMovie(movieTitle);
    }
})



const starRate = document.getElementsByName("rate");
starRate.forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.checked) {
            ratingMovie = radio.value;
            console.log(radio.value);
        }
    })
});


/*Display Movie*/
function createDisplay(movie) {
    movieTitle = movie.title;
    const title = document.querySelector(".movie-info__title");
    title.textContent = movie.title;

    const japaneseTitle = document.querySelector(".movie-info__titleJ");
    japaneseTitle.textContent = movie.original_title_romanised;

    const rating = document.querySelector(".movie_info__rating");
    rating.textContent = `Score: ${movie.rt_score}`;

    const date = document.querySelector(".movie_info__date");
    date.textContent = movie.release_date;

    const time = document.querySelector(".movie_info__time");
    time.textContent = `${movie.running_time} min`;
    
    const synopsis = document.querySelector(".movie-info__synopsis");
    synopsis.textContent = movie.description;

    const movieContainer = document.querySelector(".movie-container");
    const movieCover = document.createElement("img");
    movieCover.src = movie.image;
    movieCover.classList.add("cover-img");
    movieContainer.appendChild(movieCover);

    const moreInfoLink = document.querySelector(".movie-link");
    moreInfoLink.href = `https://ghibli.fandom.com/wiki/${movie.title}`;
    getYoutubeVideo(movie.title);    
}

function getYoutubeVideo(film){
    film == "Castle in the Sky" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/8ykEy-yPBFc"):
    film == "Grave of the Fireflies" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/4vPeTSRd580"):
    film == "My Neighbor Totoro" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/92a7Hj0ijLs"):
    film == "Kiki's Delivery Service" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/4bG17OYs-GA"):
    film == "Only Yesterday" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/OfkQlZArxw0"):
    film == "Porco Rosso" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/awEC-aLDzjs"):
    film == "Pom Poko" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/_7cowIHjCD4"):
    film == "Whisper of the Heart" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/0pVkiod6V0U"):
    film == "Princess Mononoke" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/4OiMOHRDs14"):
    film == "My Neighbors the Yamadas" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/1C9ujuCPlnY"):
    film == "Spirited Away" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/ByXuk9QqQkk"):
    film == "The Cat Returns" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/Gp-H_YOcYTM"):
    film == "Howl's Moving Castle" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/iwROgK94zcM"):
    film == "Tales from Earthsea" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/8hxYx3Jq3kI"):
    film == "Ponyo" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/CsR3KVgBzSM"):
    film == "Arrietty" ? (movielinkVideo = "https://www.youtube-nocookie.com.com/embed/9CtIXPhPo0g"):
    film == "From Up on Poppy Hill" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/9nzpk_Br6yo"):
    film == "The Wind Rises" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/YrueAaw0RYg"):
    film == "The Tale of the Princess Kaguya" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/W71mtorCZDw"):
    film == "When Marnie Was There" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/jjmrxqcQdYg"):
    film == "The Red Turtle" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/FRFAujm3rik"):
    film == "Earwig and the Witch" ? (movielinkVideo = "https://www.youtube-nocookie.com/embed/KRq3xlhZDPo"):
    "Error";
    const movieLink = document.querySelector(".video-movie");
    movieLink.src = movielinkVideo;
}