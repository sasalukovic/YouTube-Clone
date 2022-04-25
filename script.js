const id = "AIzaSyCkh8WQm-StjlVw0GY_JFQiCTSCquo4BIA";
const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=${id}&maxResults=10&q=`;
const iframe = document.querySelector("iframe");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const main = document.querySelector("main");
const request = new XMLHttpRequest();

function createVideos(items) {
  main.innerHTML = " ";
  items.forEach((e) => {
    let video = document.createElement("div");
    let title = document.createElement("h2");
    let desc = document.createElement("p");
    let image = document.createElement("img");

    title.innerHTML = e.snippet.title;
    desc.innerHTML = e.snippet.description;
    image.setAttribute("src", e.snippet.thumbnails.high.url);
    video.classList.add("video-card")
    video.addEventListener("click", () => {
      iframe.setAttribute(
        "src",
        `https://www.youtube.com/embed/${e.id.videoId}`
      );
      iframe.classList.add("show-iframe");
    });
    // input.setAttribute("src", )
    video.append(image, title, desc);
    main.appendChild(video);
  });
}

function fetchVideos() {
  request.open("GET", url + input.value);
  request.send();
  request.onload = () => {
    createVideos(JSON.parse(request.responseText).items);
    
  };
}

window.addEventListener("load", fetchVideos);
btn.addEventListener("click", fetchVideos);