const html = document.documentElement;
const canvas = document.querySelector('.donut-scrolling');
const context = canvas.getContext('2d')

const currentFrame = index => (
    `/images/vlc-ext${index.toString().padStart(5, '0')}.png`
)

const frameCount = 104;

canvas.height = window.innerHeight;
canvas.width= window.innerWidth;
const img = new Image();
img.src = currentFrame(1);
// console.log(img)
img.onload = function (){
    context.drawImage(img, canvas.width / 2 - img.width / 2,
        canvas.height / 2 - img.height / 2)
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, canvas.width / 2 - img.width / 2,
        canvas.height / 2 - img.height / 2);
}

window.addEventListener('scroll', ()=>{
    const scrollTop = html.scrollTop;
    // console.log(scrollTop)
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    // console.log(maxScrollTop)
    const scrollFraction = scrollTop / maxScrollTop; //goes from 0 to 1
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount))
    // console.log(frameIndex)
    requestAnimationFrame( ()=> updateImage(frameIndex + 1))
})