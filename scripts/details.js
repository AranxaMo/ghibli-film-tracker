const link = window.location.href;
const newLink = new URL(link);
const movieId = newLink.searchParams.get("movieId");


const urlGhibliFilm = `https://ghibliapi.herokuapp.com/films/${movieId}`; 

let linkMovie;
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

    let movielinkVideo;
    movielinkVideo = movie.title == "Castle in the Sky" ? (movielinkVideo = "https://www.youtube.com/embed/8ykEy-yPBFc"):
    movie.title == "Grave of the Fireflies" ? (movielinkVideo = "https://www.youtube.com/embed/4vPeTSRd580"):
    movie.title == "My Neighbor Totoro" ? (movielinkVideo = "https://www.youtube.com/embed/92a7Hj0ijLs"):
    movie.title == "Kiki's Delivery Service" ? (movielinkVideo = "https://www.youtube.com/embed/4bG17OYs-GA"):
    movie.title == "Only Yesterday" ? (movielinkVideo = "https://www.youtube.com/embed/OfkQlZArxw0"):
    movie.title == "Porco Rosso" ? (movielinkVideo = "https://www.youtube.com/embed/awEC-aLDzjs"):
    movie.title == "Pom Poko" ? (movielinkVideo = "https://www.youtube.com/embed/_7cowIHjCD4"):
    movie.title == "Whisper of the Heart" ? (movielinkVideo = "https://www.youtube.com/embed/0pVkiod6V0U"):
    movie.title == "Princess Mononoke" ? (movielinkVideo = "https://www.youtube.com/embed/4OiMOHRDs14"):
    movie.title == "My Neighbors the Yamadas" ? (movielinkVideo = "https://www.youtube.com/embed/1C9ujuCPlnY"):
    movie.title == "Spirited Away" ? (movielinkVideo = "https://www.youtube.com/embed/ByXuk9QqQkk"):
    movie.title == "The Cat Returns" ? (movielinkVideo = "https://www.youtube.com/embed/Gp-H_YOcYTM"):
    movie.title == "Howl's Moving Castle" ? (movielinkVideo = "https://www.youtube.com/embed/iwROgK94zcM"):
    movie.title == "Tales from Earthsea" ? (movielinkVideo = "https://www.youtube.com/embed/8hxYx3Jq3kI"):
    movie.title == "Ponyo" ? (movielinkVideo = "https://www.youtube.com/embed/CsR3KVgBzSM"):
    movie.title == "Arrietty" ? (movielinkVideo = "https://www.youtube.com/embed/9CtIXPhPo0g"):
    movie.title == "From Up on Poppy Hill" ? (movielinkVideo = "https://www.youtube.com/embed/9nzpk_Br6yo"):
    movie.title == "The Wind Rises" ? (movielinkVideo = "https://www.youtube.com/embed/YrueAaw0RYg"):
    movie.title == "The Tale of the Princess Kaguya" ? (movielinkVideo = "https://www.youtube.com/embed/W71mtorCZDw"):
    movie.title == "When Marnie Was There" ? (movielinkVideo = "https://www.youtube.com/embed/jjmrxqcQdYg"):
    movie.title == "The Red Turtle" ? (movielinkVideo = "https://www.youtube.com/embed/FRFAujm3rik"):
    movie.title == "Earwig and the Witch" ? (movielinkVideo = "https://www.youtube.com/embed/KRq3xlhZDPo"):
    "Error";
    const movieLink = document.querySelector(".video-movie");
    movieLink.src = movielinkVideo;
}

