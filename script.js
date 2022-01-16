const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const showSelect = document.getElementById('show');

populateUI();

let ticketPrice = +showSelect.value;

// Save selected show index and price
function setShowData(showIndex, showPrice) {
	localStorage.setItem('selectedShowIndex', showIndex);
	localStorage.setItem('selectedShowPrice', showPrice);
}

// Update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;

	setshowData(showSelect.selectedIndex, showSelect.value);
}

// Get data from localstorage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add('selected');
			}
		});
	}

	const selectedShowIndex = localStorage.getItem('selectedShowIndex');

	if (selectedShowIndex !== null) {
		showSelect.selectedIndex = selectedShowIndex;
	}
}

// show select event
showSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	setShowData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});

// Initial count and total set
updateSelectedCount();
