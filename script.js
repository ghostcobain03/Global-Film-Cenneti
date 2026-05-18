const API_KEY = "cd516ef0e80d5c126df6b7214ac9eb99";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const genres = [
    { id: 28, name: "Aksiyon" },
    { id: 35, name: "Komedi" },
    { id: 27, name: "Korku" },
    { id: 878, name: "Bilim Kurgu" },
    { id: 18, name: "Drama" }
];

const movieLists = document.getElementById("movieLists");

async function init() {
    for (const genre of genres) {
        await createMovieRow(genre);
    }
}

async function createMovieRow(genre) {

    const res = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=tr-TR`
    );

    const data = await res.json();

    const container = document.createElement("div");
    container.className = "movie-list-container";

    container.innerHTML = `
        <h1 class="movie-list-title">${genre.name}</h1>
        <div class="movie-list-wrapper">
            <div class="movie-list"></div>
            <i class="bi bi-chevron-right arrow"></i>
        </div>
    `;

    const movieList = container.querySelector(".movie-list");

    data.results.forEach(movie => {

        if (!movie.poster_path) return;

        const item = document.createElement("div");
        item.className = "movie-item";

       item.innerHTML = `
    <img class="movie-item-img" src="${IMG_URL + movie.poster_path}">

    <span class="movie-item-title">
        ${movie.title}
    </span>

    <div class="movie-item-buttons">
        <i class="bi bi-play-circle"></i>
        <i class="bi bi-plus-circle"></i>
        <i class="bi bi-hand-thumbs-up"></i>
    </div>
`;

        movieList.appendChild(item);
    });

    movieLists.appendChild(container);

    setupSlider(container);
}

function setupSlider(container) {

    const arrow = container.querySelector(".arrow");
    const movieList = container.querySelector(".movie-list");

    let index = 0;

    arrow.addEventListener("click", () => {

        const visibleWidth =
            container.querySelector(".movie-list-wrapper").offsetWidth;

        const maxScroll =
            movieList.scrollWidth - visibleWidth;

        index += 800;

        if (index > maxScroll) index = 0;

        movieList.style.transform = `translateX(-${index}px)`;
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("searchInput");

    if(!searchInput){
        console.log("Search input bulunamadı!");
        return;
    }

    searchInput.addEventListener("input", async (e) => {

        const query = e.target.value.trim();

        const movieListsContainer = document.getElementById("movieLists");
        const featured = document.getElementById("featuredContent");

        if(query.length < 2){

    movieListsContainer.style.display = "block";
    featured.style.visibility = "visible";
featured.style.height = "60vh";

    const oldResults = document.getElementById("searchResults");

    if(oldResults){
        oldResults.innerHTML = "";
    }

    return;
}

        movieListsContainer.style.display = "none";
        featured.style.visibility = "hidden";
featured.style.height = "0";

        const res = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=tr-TR`
        );

        const data = await res.json();

        let searchContainer = document.getElementById("searchResults");

        if(!searchContainer){
            searchContainer = document.createElement("div");
            searchContainer.id = "searchResults";
            document.body.appendChild(searchContainer);
        }

        searchContainer.innerHTML = "";

        const container = document.createElement("div");
        container.className = "movie-list-container";

        container.innerHTML = `
            <h1 class="movie-list-title">Arama Sonuçları</h1>
            <div class="movie-list-wrapper">
                <div class="movie-list"></div>
            </div>
        `;

        const movieList = container.querySelector(".movie-list");

        data.results.forEach(movie => {
            if(!movie.poster_path) return;

            const item = document.createElement("div");
            item.className = "movie-item";

            item.innerHTML = `
                <img class="movie-item-img"
                src="${IMG_URL + movie.poster_path}">
            `;

            movieList.appendChild(item);
        });

        searchContainer.appendChild(container);
    });
});



const loginModal = document.getElementById("loginModal");

const accountBtn = document.querySelector(".profile-text-container");

const closeLogin = document.getElementById("closeLogin");

accountBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
});

closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
});

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {

    const username = document.getElementById("username").value;

    const password = document.getElementById("password").value;

    if(username && password){

        localStorage.setItem("user", username);

        alert("Giriş yapıldı: " + username);

        document.getElementById("loginModal").style.display = "none";
    }
});

const user = localStorage.getItem("user");

if(user){
    document.querySelector(".profile-text").innerText = user;
}

async function loadFeaturedMovie() {

    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=tr-TR`
    );

    const data = await res.json();

    const movie = data.results[0];

    document.getElementById("featuredTitle").innerText =
        movie.title;

    document.getElementById("featuredDesc").innerText =
        movie.overview;

    document.getElementById("featuredContent").style.background = `
        linear-gradient(to bottom, rgba(0,0,0,0.2), #0d0d0d),
        url(${IMG_URL + movie.backdrop_path})
    `;

    document.getElementById("featuredContent").style.backgroundSize = "cover";
    document.getElementById("featuredContent").style.backgroundPosition = "center";
}
loadFeaturedMovie();




init();
