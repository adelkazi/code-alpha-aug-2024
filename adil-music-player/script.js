

const musicList = document.querySelectorAll('#music-list li');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const songNameDisplay = document.getElementById('current-song-name');
const artistNameDisplay = document.getElementById('current-artist-name');
const albumCover = document.getElementById('album-cover');
const searchInput = document.getElementById('search');
let currentSongIndex = 0;

const songs = Array.from(musicList).map((item, index) => {
  return {
    element: item,
    song: item.getAttribute('data-song'),
    title: item.getAttribute('data-title'),
    artist: item.getAttribute('data-artist'),
    cover: item.querySelector('img').src, 
    index: index,
  };
});

function loadSong(song) {
  songNameDisplay.textContent = song.title;
  artistNameDisplay.textContent = song.artist;
  audioPlayer.src = song.song;
  albumCover.src = song.cover; e
}

function playSong() {
  audioPlayer.play();
  playIcon.classList.replace('bx-play-circle', 'bx-pause-circle');
}

function pauseSong() {
  audioPlayer.pause();
  playIcon.classList.replace('bx-pause-circle', 'bx-play-circle');
}

playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

musicList.forEach((musicItem, index) => {
  musicItem.addEventListener('click', () => {
    currentSongIndex = index;
    loadSong(songs[currentSongIndex]);
    playSong();
  });
});

document.getElementById('prev-btn').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});


searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  songs.forEach(song => {
    const isVisible =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query);
    song.element.style.display = isVisible ? 'block' : 'none';
  });


  if (query === '') {
    songs.forEach(song => {
      song.element.style.display = 'block';
    });
  }
});

loadSong(songs[currentSongIndex]);
