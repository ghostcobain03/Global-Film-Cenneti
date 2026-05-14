const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");


// SLIDER

arrows.forEach((arrow, i) => {

    const movieList = movieLists[i];

    let clickCounter = 0;

    arrow.addEventListener("click", () => {

        const itemNumber =
            movieList.querySelectorAll("img").length;

        clickCounter++;

        if(itemNumber - (4 + clickCounter) >= 0){

            movieList.style.transform =
                `translateX(${movieList.computedStyleMap().get("transform")[0].x.value - 300}px)`;

        }else{

            movieList.style.transform = "translateX(0)";

            clickCounter = 0;

        }

    });

});




// DARK MODE

const ball = document.querySelector(".toggle-ball");

const items = document.querySelectorAll(
    ".container,.navbar,.sidebar,.sidebar i,.movie-list-title,.toggle,.toggle-ball,.menu-list-item"
);

ball.addEventListener("click", () => {

    items.forEach(item => {

        item.classList.toggle("active");

    });

});




// VIDEO PLAYER

const playButtons =
    document.querySelectorAll(".play-icon");

const featuredPlayButton =
    document.querySelector(".play-button");

const videoModal =
    document.getElementById("videoModal");

const videoPlayer =
    document.getElementById("videoPlayer");

const videoSource =
    document.getElementById("videoSource");

const closeVideo =
    document.getElementById("closeVideo");



function openVideo(videoPath){

    videoSource.src = videoPath;

    videoPlayer.load();

    videoModal.style.display = "flex";

    videoPlayer.play();

}



// KART PLAY

playButtons.forEach(button => {

    button.addEventListener("click", () => {

        const video =
            button.dataset.video;

        openVideo(video);

    });

});



// FEATURED PLAY

featuredPlayButton.addEventListener("click", () => {

    const video =
        featuredPlayButton.dataset.video;

    openVideo(video);

});



// CLOSE

closeVideo.addEventListener("click", () => {

    videoModal.style.display = "none";

    videoPlayer.pause();

    videoPlayer.currentTime = 0;

});




// ESC CLOSE

document.addEventListener("keydown", (e) => {

    if(e.key === "Escape"){

        videoModal.style.display = "none";

        videoPlayer.pause();

    }

});