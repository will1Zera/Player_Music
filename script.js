let currentMusic = 0

const music = document.querySelector('#audio')

const seekBar = document.querySelector('.seekBar')
const songName = document.querySelector('.musicName')
const artistName = document.querySelector('.artistName')
const disk = document.querySelector('.disk')
const currentTime = document.querySelector('.currentTime')
const songDuration = document.querySelector('.songDuration')
const playBtn = document.querySelector('.playBtn')
const nextBtn = document.querySelector('.next')
const previousBtn = document.querySelector('.previous')

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')) {
        music.play()
    } else {
        music.pause()
    }
    playBtn.classList.toggle('pause')
})


const setMusic = i => {
    seekBar.value = 0
    let song = songs[i]
    currentMusic = i
    music.src = song.path

    songName.innerHTML = song.name
    artistName.innerHTML = song.artist
    disk.style.backgroundImage = `url('${song.cover}')`

    currentTime.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.max = music.duration
        songDuration.innerHTML = formatTime(music.duration)
    }, 300)
}

setMusic(0)

const formatTime = time => {
    let min = Math.floor(time / 60)
    if (min < 10) {
        min = `0${min}`
    }

    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min} : ${sec}`
}

setInterval(() => {
    seekBar.value = music.currentTime
    currentTime.innerHTML = formatTime(music.currentTime)
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        nextBtn.click()
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})

const playMusic = () => {
    music.play()
    playBtn.classList.remove('pause')
}

nextBtn.addEventListener('click', () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0
    } else {
        currentMusic++
    }
    setMusic(currentMusic)
    playMusic()
})

previousBtn.addEventListener('click', () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1
    } else {
        currentMusic--
    }
    setMusic(currentMusic)
    playMusic()
})