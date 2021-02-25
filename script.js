const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
// countdown-elements: 
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// Complete-Element 
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Create-global-variable 
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

// Create-global-date   
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 360;

// Display-current-date 
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// updateDOM function-populate countdown
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;

        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false;
        } else {
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}


// Take the values from the Form 
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.target[0].value;
    countdownDate = e.target[1].value;

    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    // check validate date 
    if (countdownDate === '') {
        alert('Select a Date, Please!');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}

// Reset function 
function reset() {
    clearInterval(countdownActive);
    countdownTitle = ''
    countdownDate = ''
    localStorage.removeItem('countdown');
    inputContainer.hidden = false;
    countdownEl.hidden = true;
    completeEl.hidden = true;
}

function restorePreviousCountdown() {
    // get countdown from local storage if available
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM()
    }
}

// Event-Listener-Section 
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// onLoad check localStorage
restorePreviousCountdown();