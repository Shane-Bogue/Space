window.addEventListener("click", function() {
        document.getElementById("start").style.opacity != '0'? Start(): Unlock();
})

window.addEventListener("keydown", keyDown = (key) => {
    if (key.code == 'Space') document.getElementById("start").style.opacity != '0'? Start(): Unlock();
})

function Start() {
    document.getElementById("start").style.opacity = '0';
    Game()
}

function Game() {

    class Object {
        constructor(element) {
            this.element = element;  
            this.left = element.getBoundingClientRect().left;
            this.right = element.getBoundingClientRect().right;
            this.width = element.getBoundingClientRect().width;
          }

          center() {
            return this.width / 2;
          }
    }

    let Score = 0;
    
    const track = new Object (document.getElementById('track'));
    const lock = new Object (document.getElementById('lock'));
    const key = new Object (document.getElementById('key'));

    function Generate() {

        Key()
        Lock()

        document.getElementById('score').textContent = Score;
        let dir = 1

        function Lock() {

            lock.element.style.width = `${Math.max(15 - Score,2)}%`;
            let rand = `${Math.round(Math.min(Math.random() * 100, 100 - parseFloat(lock.element.style.width)))}%`
            console.log(parseFloat(lock.element.style.width)/100)
            lock.element.style.left = rand;
            lock.element.style.opacity = '1';
            lock.left = lock.element.getBoundingClientRect().left;
            lock.right = lock.element.getBoundingClientRect().right;
        }

        function Key() {

            key.element.style.opacity = '1';
            key.element.style.filter = 'invert(1)';
            key.element.style.mixBlendMode = 'difference';

            let Timer = function(){
                key.left = key.element.getBoundingClientRect().left;
                key.right = key.element.getBoundingClientRect().right;
                key.element.style.left = `${Number(key.element.offsetLeft) + (dir * 2)}px`;
                if ((dir == 1)&&(key.right >= track.right)) {
                    dir = -1
                } else if  ((dir == -1)&&(key.left <= track.left)) {
                    dir = 1
                }
            }

            let myTimer = window.setInterval(Timer, 60/1000);

            function ResetTimer() {
                window.clearInterval(myTimer);
                myTimer = window.setInterval(Timer, 60/1000);
            }
     
            Unlock = () => {
                if ((key.left < lock.left)||(key.right > lock.right)) {
                    window.clearInterval(myTimer);
                    document.getElementById("start").style.opacity = '1';
                } else {
                    ResetTimer();
                    Lock();
                    Score++
                    document.getElementById('score').textContent = Score;
                }
            }
 
    }

}

Generate()

}
