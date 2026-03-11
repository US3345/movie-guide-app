const searchForm = document.querySelector('form');
const moviecontainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');

const getMovieInfo = async (movie) => {

    const myApikey = "1507dce8";
    const url = `http://www.omdbapi.com/?apikey=${myApikey}&t=${movie}`;

    moviecontainer.innerHTML = "<h2>Loading...</h2>";

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    // movie not found
    if (data.Response === "False") {
        moviecontainer.innerHTML = `<h2>Movie not found</h2>`;
        moviecontainer.classList.add('noBackground');
        return;
    }

    showMovieData(data);
}

const showMovieData = (data) => {

    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove('noBackground');

    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `
        <h2>${Title}</h2>

        <p><strong>Rating:</strong> ${imdbRating}</p>

        <p>
        <span class="genre">
        ${Genre.split(",").map(g => `<span class="genre-tag">${g.trim()}</span>`).join("")}
        </span>
        </p>

        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    const moviePoster = document.createElement('div');
    moviePoster.classList.add('movie-poster');

    moviePoster.innerHTML = `<img src="${Poster}" alt="${Title}">`;

    moviecontainer.appendChild(moviePoster);
    moviecontainer.appendChild(movieElement);
}

searchForm.addEventListener('submit', (e) => {

    e.preventDefault();

    const movieName = inputBox.value.trim();

    if (movieName) {
        getMovieInfo(movieName);
    } else {
        moviecontainer.innerHTML = `<h2>Enter movie name</h2>`;
        moviecontainer.classList.add('noBackground');
    }

});