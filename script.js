const container = document.querySelector('.container');
const availableSeats = document.querySelectorAll('.row .seat:not(.occupied');
const countSelected = document.getElementById('count');
const totalSelected = document.getElementById('total');
const selectedShow = document.getElementById('show');
const ticketPrice = +selectedShow.value;

// update selected seat count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll('.row .seat.selected');
	const selectedSeatsCount = selectedSeats.length;
	countSelected.innerText = selectedSeatsCount;
	totalSelected.innerText = selectedSeatsCount * ticketPrice;
}

// event listeners
container.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		e.target.classList.toggle('selected');

		updateSelectedCount();
	}
});
