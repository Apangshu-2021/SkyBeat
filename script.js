//Initialize the variables
let songIndex = 1
let prevsongId = '1'
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'))
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'))
let previous = document.getElementById('previous')
let next = document.getElementById('next')
let masterSongName = document.getElementById('masterSongName')
let current_time = document.getElementById('current_time')
let total_time = document.getElementById('total_time')

let songs = [
  {
    songName: 'Meant to live-Switchfoot',
    filePath: 'songs/1.mp3',
    coverPath: 'covers/1.jpeg',
  },
  {
    songName: 'Numb-Linkin Park',
    filePath: 'songs/2.mp3',
    coverPath: 'covers/2.jpeg',
  },
  {
    songName: 'In the End-Linkin Park',
    filePath: 'songs/3.mp3',
    coverPath: 'covers/3.jpeg',
  },
  {
    songName: 'New Divide-Linkin Park',
    filePath: 'songs/4.mp3',
    coverPath: 'covers/4.jpeg',
  },
  {
    songName: 'Burn It Down-Linkin Park',
    filePath: 'songs/5.mp3',
    coverPath: 'covers/5.jpeg',
  },
  {
    songName: 'Leave Out All The Rest-Linkin Park',
    filePath: 'songs/6.mp3',
    coverPath: 'covers/6.jpeg',
  },
  {
    songName: 'Easier To Run-Linkin Park',
    filePath: 'songs/7.mp3',
    coverPath: 'covers/7.jpeg',
  },
  {
    songName: 'Hall Of Fame-Will.I.Am,The Script',
    filePath: 'songs/8.mp3',
    coverPath: 'covers/8.jpeg',
  },
  {
    songName: 'Centuries-Fall Out Boy',
    filePath: 'songs/9.mp3',
    coverPath: 'covers/9.jpeg',
  },
  {
    songName: 'Fireflies-Owl City',
    filePath: 'songs/10.mp3',
    coverPath: 'covers/10.jpeg',
  },
]

// Handling the image,songName and Time in the songItem.
songItems.forEach((element, i) => {
  //  console.log(element.getElementsByTagName("img"));
  // console.log(element, i);
  element.getElementsByTagName('img')[0].src = songs[i].coverPath
  element.getElementsByClassName('songName')[0].innerText = songs[i].songName
  //Only one element of img tag is there So [0] is given.To access that
  //Only one element of songName class is there So [0] is given.To access that.
})

// Handle Play/Pause click on the masterPlay
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play()
    // console.log(songItemPlay[0]);
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    songItemPlay[songIndex - 1].classList.remove('fa-play-circle')
    songItemPlay[songIndex - 1].classList.add('fa-pause-circle')
    gif.style.opacity = 1
  } else {
    audioElement.pause()
    masterPlay.classList.remove('fa-pause-circle')
    masterPlay.classList.add('fa-play-circle')
    songItemPlay[songIndex - 1].classList.remove('fa-pause-circle')
    songItemPlay[songIndex - 1].classList.add('fa-play-circle')
    gif.style.opacity = 0
  }
})

//Listen to events(Progress Bar)
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  )
  myProgressBar.value = progress

  //music duration update

  //current_time update

  let current_min_duration = Math.floor(audioElement.currentTime / 60)
  let current_sec_duration = Math.floor(audioElement.currentTime % 60)

  current_sec_duration =
    current_sec_duration < 10
      ? `0${current_sec_duration}`
      : current_sec_duration

  current_time.innerText = `${current_min_duration}:${current_sec_duration}`

  //total_time update
  let total_min_duration = Math.floor(audioElement.duration / 60)
  let total_sec_duration = Math.floor(audioElement.duration % 60)

  total_sec_duration =
    total_sec_duration < 10 ? `0${total_sec_duration}` : total_sec_duration

  if (total_min_duration && total_sec_duration) {
    total_time.innerText = `${total_min_duration}:${total_sec_duration}`
  }

  if (audioElement.ended) {
    masterPlay.classList.remove('fa-pause-circle')
    masterPlay.classList.add('fa-play-circle')
    songItemPlay[songIndex - 1].classList.remove('fa-pause-circle')
    songItemPlay[songIndex - 1].classList.add('fa-play-circle')

    if (songIndex >= 10) {
      songIndex = 1
    } else {
      songIndex += 1
    }

    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex - 1].songName
    audioElement.play()
    gif.style.opacity = 1
    masterPlay.classList.remove('fa-play-circle')
    masterPlay.classList.add('fa-pause-circle')
    songItemPlay[songIndex - 1].classList.remove('fa-play-circle')
    songItemPlay[songIndex - 1].classList.add('fa-pause-circle')
  }
})

// When we click on the progress bar,the song will be updated accordingly.
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

// Handling pause,play,onClick another song-play current,pause previous on the songItem.
songItemPlay.forEach((element) => {
  element.addEventListener('click', (e) => {
    if (audioElement.currentTime <= 0) {
      //console.log(e.target);
      prevsongId = e.target.id
      e.target.classList.remove('fa-play-circle')
      e.target.classList.add('fa-pause-circle')
      songIndex = parseInt(e.target.id)
      //console.log(songIndex);
      audioElement.src = `songs/${songIndex}.mp3`
      masterSongName.innerText = songs[songIndex - 1].songName
      //    audioElement.currentTime=0;
      audioElement.play()
      gif.style.opacity = 1
      masterPlay.classList.remove('fa-play-circle')
      masterPlay.classList.add('fa-pause-circle')
    } else if (
      audioElement.currentTime > 0 &&
      audioElement.paused &&
      prevsongId == e.target.id
    ) {
      audioElement.play()
      e.target.classList.remove('fa-play-circle')
      e.target.classList.add('fa-pause-circle')
      masterPlay.classList.remove('fa-play-circle')
      masterPlay.classList.add('fa-pause-circle')
      gif.style.opacity = 1
    } else if (audioElement.currentTime > 0 && prevsongId != e.target.id) {
      // makeAllPlay();
      songItemPlay[songIndex - 1].classList.remove('fa-pause-circle')
      songItemPlay[songIndex - 1].classList.add('fa-play-circle')
      prevsongId = e.target.id
      e.target.classList.remove('fa-play-circle')
      e.target.classList.add('fa-pause-circle')
      songIndex = parseInt(e.target.id)
      audioElement.src = `songs/${songIndex}.mp3`
      masterSongName.innerText = songs[songIndex - 1].songName
      audioElement.play()
      gif.style.opacity = 1
      masterPlay.classList.remove('fa-play-circle')
      masterPlay.classList.add('fa-pause-circle')
    } else {
      audioElement.pause()
      e.target.classList.remove('fa-pause-circle')
      e.target.classList.add('fa-play-circle')
      masterPlay.classList.remove('fa-pause-circle')
      masterPlay.classList.add('fa-play-circle')
      gif.style.opacity = 0
    }
  })
})

// Handling backward button
previous.addEventListener('click', () => {
  songItemPlay[songIndex - 1].classList.remove('fa-pause-circle')
  songItemPlay[songIndex - 1].classList.add('fa-play-circle')

  if (songIndex <= 1) {
    songIndex = 10
  } else {
    songIndex -= 1
  }

  //  console.log(songIndex);
  audioElement.src = `songs/${songIndex}.mp3`
  masterSongName.innerText = songs[songIndex - 1].songName
  audioElement.currentTime = 0
  audioElement.play()
  gif.style.opacity = 1
  songItemPlay[songIndex - 1].classList.remove('fa-play-circle')
  songItemPlay[songIndex - 1].classList.add('fa-pause-circle')
  masterPlay.classList.remove('fa-play-circle')
  masterPlay.classList.add('fa-pause-circle')
})

// Handling forward button.Similar to previous button.
next.addEventListener('click', () => {
  songItemPlay[songIndex - 1].classList.remove('fa-pause-circle')
  songItemPlay[songIndex - 1].classList.add('fa-play-circle')

  if (songIndex >= 10) {
    songIndex = 1
  } else {
    songIndex += 1
  }

  //   console.log(songIndex);
  audioElement.src = `songs/${songIndex}.mp3`
  masterSongName.innerText = songs[songIndex - 1].songName
  audioElement.currentTime = 0
  audioElement.play()
  gif.style.opacity = 1
  songItemPlay[songIndex - 1].classList.remove('fa-play-circle')
  songItemPlay[songIndex - 1].classList.add('fa-pause-circle')
  masterPlay.classList.remove('fa-play-circle')
  masterPlay.classList.add('fa-pause-circle')
})
