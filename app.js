const maxTracks = 3;
const trackList = document.querySelector(".playlist__list");
const audio = document.querySelector(".app__audio");
const playBtn = document.querySelector(".play-btn");
const backBtn = document.querySelector(".back-btn");
const nextBtn = document.querySelector(".next-btn");
backBtn.addEventListener("click", back);
playBtn.addEventListener("click", playPause);
nextBtn.addEventListener("click", next);
let isPlaying = false;
function playPause() {
  audio.setAttribute("id", audio.getAttribute("id") || 0);
  console.log(audio.attributes.id);
  songName();
  songTime();
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.innerHTML = `<i class="fas fa-play-circle"></i>`;
  } else {
    audio.play();
    isPlaying = true;
    playBtn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
  }
}
function next() {
  let trackID = audio.getAttribute("id") || 0;
  if (trackID < maxTracks - 1) {
    trackID = parseInt(trackID) + 1;
    audio.setAttribute("src", tracksData[trackID].src);
    audio.setAttribute("id", trackID);
    audio.play();
  } else {
    trackID = 0;
    audio.setAttribute("src", tracksData[trackID].src);
    audio.setAttribute("id", trackID);
    audio.play();
  }
  isPlaying = true;
  updateSongs(trackID);
  playBtn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
  songName();
  songTime();
}
function back() {
  let trackID = audio.getAttribute("id");
  if (trackID > 0) {
    trackID = parseInt(trackID) - 1;
    audio.setAttribute("src", tracksData[trackID].src);
    audio.setAttribute("id", trackID);
    audio.play();
  } else {
    trackID = parseInt(maxTracks) - 1;
    audio.setAttribute("src", tracksData[trackID].src);
    audio.setAttribute("id", trackID);
    audio.play();
  }
  isPlaying = true;

  updateSongs(trackID);
  playBtn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
  songName();
  songTime();
}
function updateSongs(trackID) {
  const newTracksData = tracksData.map((trackData) => {
    if (trackData.id == trackID) {
      return { ...trackData, active: true };
    }
    return trackData;
  });
  loadSongs(newTracksData);
}
const tracksData = [
  {
    id: 0,
    title: "The hill",
    artist: "The Weekend",
    time: "4:25",
    album: "none",
    src: "https://data04.chiasenhac.com/downloads/1519/2/1518407-343d2a02/320/The%20Hills%20-%20The%20Weeknd.mp3",
    active: false,
  },
  {
    id: 1,
    title: "Apocalypse",
    artist: "Cigarettes after sex",
    time: "5:00",
    album: "Cigarettes after sex",
    src: "https://data33.chiasenhac.com/downloads/1984/2/1983499-aaf23b46/320/Apocalypse%20-%20Cigarettes%20After%20Sex.mp3",
    active: false,
  },
  {
    id: 2,
    title: "I feel like i'm drowning",
    artist: "Two Feet",
    time: "3:45",
    album: "Pink",
    src: "https://data33.chiasenhac.com/downloads/1989/2/1988390-401d6226/320/I%20Feel%20Like%20I_m%20Drowning%20-%20Two%20Feet.mp3",
    active: false,
  },
  {
    id: 3,
    title: "Comfortably numb",
    artist: "Pink Floyd",
    time: "7:25",
    album: "The Wall",
  },
  {
    id: 4,
    title: "And I love her",
    artist: "The Beatles",
    time: "3:14",
    album: "none",
  },
  {
    index: 5,
    title: "Don't Stop me now",
    artist: "Queen",
    time: "5:25",
    album: "none",
  },
];
function songName() {
  const songName = document.querySelector(".player__song-name");
  songName.textContent = tracksData[audio.getAttribute("id")].title;
}
function songTime() {
  const time = document.querySelector(".player__seekbar-length");
  time.textContent = tracksData[audio.getAttribute("id")].time;
}
function active() {
  document
    .querySelector(".playlist__item.playlist__item--active")
    ?.classList.remove("playlist__item--active");
  this.classList.add("playlist__item--active");
  audio.setAttribute("src", this.getAttribute("data-src"));
  audio.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fas fa-pause-circle"></i>`;
  audio.setAttribute("id", this.getAttribute("id"));

  songTime();
  songName();
}
function loadSongs(songsData) {
  trackList.innerHTML = ``;
  for (let i = 0; i < maxTracks; i++) {
    let track = document.createElement("LI");
    const createPElement = () => document.createElement("P");
    track.classList.add("playlist__item");
    const trackNumber = createPElement();
    trackNumber.innerText = songsData[i].id + 1;
    const trackTitle = createPElement();
    trackTitle.innerText = `${songsData[i].title}`;
    const trackArtist = createPElement();
    trackArtist.innerText = `${songsData[i].artist}`;
    const trackTime = createPElement();
    trackTime.innerText = `${songsData[i].time}`;
    const trackAlbum = createPElement();
    trackAlbum.innerText = `${songsData[i].album}`;
    track.append(trackNumber, trackTitle, trackArtist, trackTime, trackAlbum);
    track.setAttribute("data-src", `${songsData[i].src}`);
    track.setAttribute("id", `${songsData[i].id}`);
    if (songsData[i].active == true) {
      track.classList.add("playlist__item--active");
    }
    trackList.appendChild(track);
    track.addEventListener("click", active);
  }
}
loadSongs(tracksData);
