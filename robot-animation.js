/**
 * Created by Ksenia Koldaeva on 5/16/17.
 */


// Check if document ready
if(document.readyState === 'complete') {
    handleAnimation();
}

// Keep testing
var interval = setInterval(function() {
    if(document.readyState === 'complete') {
        clearInterval(interval);
        handleAnimation();
    }
}, 100);

function handleAnimation() {
    var button = document.querySelector('.container__button'),
        robot = document.querySelector('.container__image'),
        requestId,
        position = 0,
        lastTime = null;

    //register click event
    button.addEventListener('click', function() {
        if(this.classList.contains('pressed')) { //if the button is pressed
            stop();
            this.innerHTML = "Start";
        } else {
            start();
            this.innerHTML = "Stop";
        }

        this.classList.toggle('pressed');
    });

    function animate(timestamp) {
        var maxProgress = window.innerWidth,
            ROBOT_WIDTH = 100;

        if(lastTime != null) {
            if(timestamp - lastTime < 100) { // to prevent jumping after clicking Stop button
                position = (position < maxProgress ? position + (timestamp - lastTime) * 0.05 : -ROBOT_WIDTH);
            }
        }
        lastTime = timestamp;
        robot.style.left = position + "px";

        requestId = window.requestAnimationFrame(animate);
    }

    function start() {
        if(!requestId) {
            requestId = window.requestAnimationFrame(animate);
        }
    }

    function stop() {
        if(requestId) {
            window.cancelAnimationFrame(requestId);
            requestId = undefined;
        }
    }
}

