// DOM elements Selection
const container = document.getElementById('seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Save selected movie index and price to localStorage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count and save seats to localStorage
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // copy selected seats into an array and map through to get the index
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    //save to local storage as a JSON string
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate UI on initial load
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event listener
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event listener using EVENT DELEGATION
// attach the event  to container not individual seats
container.addEventListener('click', e => {
    // check if clicked target is a seat and not occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // toogle 'selected' class
        e.target.classList.toggle('selected');
        // recalculate totals
        updateSelectedCount();
    }
});

// initial count and total set
updateSelectedCount();