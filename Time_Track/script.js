document.addEventListener('DOMContentLoaded', (event) => {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    const displayTime = document.getElementById("displayTime");
    let timer = null;

    function stopwatch() {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }

        
           let h = hours < 10 ? "0" + hours : hours;
           let m = minutes < 10 ? "0" + minutes : minutes;
           let s = seconds < 10 ? "0" + seconds : seconds;

          displayTime.innerHTML = h + ":" + m + ":" + s;
    }

    function watchStart() {
        if (timer !== null) {
            clearInterval(timer);
        }
            timer = setInterval(stopwatch, 1000);
    }

    function watchStop() {
        clearInterval(timer);
        timer = null;
    }

    function watchReset() {
        clearInterval(timer);
        timer = null;
        seconds = 0;
        minutes = 0;
        hours = 0;
        displayTime.innerHTML = "00:00:00";
    }

   
            window.watchStart = watchStart;
           window.watchStop = watchStop;
         window.watchReset = watchReset;
});
