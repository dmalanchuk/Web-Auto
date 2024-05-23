document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement, {
        style: `
        --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
        --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
        `
    })
})

//sound effect 

const audioMotor = document.querySelector('#motor')
const buttonMotor = document.querySelector('#motorClick')

buttonMotor.addEventListener('click', () => {
    if (!audioMotor.paused) {
        audioMotor.pause();
        audioMotor.currentTime = 0.3;
    }
    audioMotor.play();
})




