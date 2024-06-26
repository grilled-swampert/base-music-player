const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imgContainer = document.getElementById('img-container');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');


const songs = ['calling', 'tejano blue', 'therapy']

let songIndex = 2

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpeg`
}

function playSong() {
    imgContainer.classList.add('play')
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    

    audio.play()
}

function pauseSong() {
    imgContainer.classList.remove('play')
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length -1
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++

    if(songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration ) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
} )

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)
audio.addEventListener('ended', nextSong)
