const urlGhibli = 'https://ghibliapi.herokuapp.com/films';
const hamburguer = document.querySelector(".hamburguer");
const menu = document.querySelector(".navbar-content");
const main = document.querySelector('.main');

hamburguer.addEventListener("click", () => {
    menu.classList.toggle("shown");
})

function getMovies(url) {
    fetch(url)
    .then(response => response.json())
    .then(data => dataMovie(data))
    

    .catch(err => console.log(err));
}
getMovies(urlGhibli);

function dataMovie(data) {
    for (const index of data) {
        //console.log(index); shows data from movies
        createMovie(index);
    }
}

function createMovie(movie) {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add("movie-container");
    main.appendChild(movieContainer);

    const movieImg = document.createElement('div');
    const movieInfo = document.createElement('div');
    movieImg.classList.add("img-container");
    movieInfo.classList.add("info-container");

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieInfo);
    // bannerContainer.classList.add('banner-container');

    const banner = document.createElement('img');
    banner.src = movie.image;
    banner.classList.add("banner-img");
    movieImg.appendChild(banner);

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const date = document.createElement('p');
    date.textContent = movie.release_date;

    const duration = document.createElement('p');
    duration.textContent = `${movie.running_time} min`;

    const rate = document.createElement('p');
    rate.textContent = `Score: ${movie.rt_score} `; 


    movieInfo.appendChild(title);
    movieInfo.appendChild(date);
    movieInfo.appendChild(duration);
    movieInfo.appendChild(rate);

    let id = movie.id;
    movieContainer.setAttribute('id', id);
    let red = document.getElementById(id);

    red.addEventListener('click', () => {
        window.location = "http://127.0.0.1:5500/html/details.html?movieId=" + id;
    });
}

