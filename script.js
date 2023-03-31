console.log("Welcome to Spotiy Clone");


// Declaring Variables to be used
let songIndex    = 0;
let audioElement = new Audio('/songs/1.mp3');

let masterSongName = document.getElementById('masterSongName');
let masterPlay     = document.getElementById('masterPlay');
let myProgressBar  = document.getElementById('myProgressBar');
let gif            = document.getElementById('gif');


let songs = [
    {songName: "Let me Love You", filePath: "/songs/1.mp3", coverPath: "/covers/letme.jpg" },
    {songName: "Kahani Suno", filePath: "/songs/2.mp3", coverPath: "/covers/kahanisuno.jpg" },
    {songName: "Basti Ka Hasti", filePath: "/songs/3.mp3", coverPath: "/covers/bastika.jpg" },
    {songName: "Mera Dil ye Pukare", filePath: "/songs/4.mp3", coverPath: "/covers/meradil.jpg" },
    {songName: "Baarsihain", filePath: "/songs/5.mp3", coverPath: "/covers/barishain.jpg" },
    
]


// Handle Play/Pause clicks in bottom 
masterPlay.addEventListener('click', () => {
    // if audio element is paused or audio element is not yet started then ...
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else { // If audio is already playing
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        gif.style.opacity =0;
    }
})


// Update time in Progrss Bar
audioElement.addEventListener('timeupdate', () => {
    console.log("Time Update"); // To detect change in progress bar 
    // Update progress Bar

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100); // This basically is calculating the percentage of song played
    // console.log(progress);
    myProgressBar.value = progress; // This increases progress bar status as song plays 
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = ((myProgressBar.value * audioElement.duration)/100);
})



const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}


// So the line below means basically, it is creating an arrya which it will access baadmain, using className. 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
       
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex+1}.mp3`;
        audioElement.currentTime = 0; // Since everytime a new song is being played, we will have to start it from the start
        audioElement.play();

        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    })
})


// Previous and Next button working
document.getElementById('next').addEventListener('click', () => {
    if(songIndex>=6){
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; // Since everytime a new song is being played, we will have to start it from the start
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if(songIndex<=0){
        songIndex = 6;
    } else {
        songIndex -= 1;
    }

    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0; // Since everytime a new song is being played, we will have to start it from the start
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
})
