const bar = document.getElementById('bar');
const click = document.getElementById('click');
const scroll = document.getElementById('scroll');
const start = document.getElementById('start');
const menu = document.getElementById('menu');

var clickSide = click.getBoundingClientRect();
var scrollSide = scroll.getBoundingClientRect();

let barWidth = bar.clientWidth
let barSide = bar.getBoundingClientRect();

let min = barSide.left;
let max =  barSide.right;

let Score = 0;

window.addEventListener("keydown", keyDown = (event) => {
    if(event.code == 'Space') {
        Pop()
    }     
  });

Click = () => {
    let clickCenter = clickSide.left + (clickSide.width / 2);
    let rand = `${Math.round(Math.random() * barWidth)-(clickSide.width/2)}px`
    click.style.left = rand;
    click.style.width = `${10 -Score}%`
    clickSide = click.getBoundingClientRect();
} 

Scroll = () => {
    let rand = `${Math.round(Math.random() * barWidth)}px`
    scroll.style.left = rand;
    let dir = 1
    setInterval(function(){
        scroll.style.left = `${Number(scroll.offsetLeft) + dir * Math.min(Score + 1, 4)}px`
        if ((dir == 1)&&(scrollSide.right > max)) {
            dir = -1
        } else if  ((dir == -1)&&(scrollSide.left < min)) {
            dir = 1
        }
        scrollSide = scroll.getBoundingClientRect();
    }, 60/1000);
}

Pop = () => {
    if ((scrollSide.left < clickSide.left)||(scrollSide.right > clickSide.right)) {
        location.reload();
    } else {
     Click()
     Score++
     if (Score == 10) {
         console.log('win')
     }}}

     start.addEventListener("click", myFunction = () => {
        menu.style.display = 'none'
     });

Click()
Scroll()


