const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const showSelect = document.getElementById('show');

populateUI();

let ticketPrice = +showSelect.value;

// save selected show index and price
function setShowData(showIndex, showPrice) {
	localStorage.setItem('selectedShowIndex', showIndex);
	localStorage.setItem('selectedShowPrice', showPrice);
}

// update selected counts
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;

	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localStorage and populate UI
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
	if (selectedShowIndex !== null && selectedShowIndex > -1) {
		showSelect.selectedIndex = selectedShowIndex;
	}
}

// show select event
showSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	console.log(e.target.selectedIndex);
	setShowData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

// seat click event
container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');
		updateSelectedCount();
	}
});

// initial count and total set
updateSelectedCount();
