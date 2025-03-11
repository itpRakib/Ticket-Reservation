let users = [];
let loggedInUser = null;
let selectedSeat = null;
let bookedSeats = [];
let currentBooking = null;

function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const contact = document.getElementById('regContact').value;
    const password = document.getElementById('regPassword').value;

    if (users.find(user => user.email === email)) {
        alert('Email already registered.');
        return;
    }

    users.push({ name, email, contact, password });
    alert('Registration successful.');
    showLogin();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        loggedInUser = user;
        alert('Login successful.');
        showBooking();
    } else {
        alert('Invalid credentials.');
    }
}

function showLogin() {
    document.getElementById('registration').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('booking').classList.add('hidden');
    document.getElementById('confirmation').classList.add('hidden');
}

function showBooking() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('booking').classList.remove('hidden');
    document.getElementById('confirmation').classList.add('hidden');
    generateSeatGrid();
}

function generateSeatGrid() {
    const seatSelection = document.getElementById('seatSelection');
    seatSelection.innerHTML = '';
    const grid = document.createElement('div');
    grid.classList.add('seat-grid');

    for (let i = 1; i <= 52; i++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = i;
        seat.dataset.seatNumber = i;

        if (bookedSeats.includes(i)) {
            seat.classList.add('unavailable');
        } else {
            seat.addEventListener('click', () => {
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                seat.classList.add('selected');
                selectedSeat = seat;
            });
        }
        grid.appendChild(seat);
    }
    seatSelection.appendChild(grid);
}

function book() {
    if (!selectedSeat) {
        alert('Please select a seat.');
        return;
    }

    const vehicle = document.getElementById('vehicle').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const amount = document.getElementById('amount').value;
    const seatNumber = parseInt(selectedSeat.dataset.seatNumber);

    bookedSeats.push(seatNumber);
    currentBooking = {
        vehicle,
        from,
        to,
        amount,
        seat: seatNumber,
        user: loggedInUser
    };

    showConfirmation();
}

function showConfirmation() {
    document.getElementById('booking').classList.add('hidden');
    document.getElementById('confirmation').classList.remove('hidden');
    document.getElementById('confirmationDetails').textContent = `Vehicle: ${currentBooking.vehicle}, From: ${currentBooking.from}, To: ${currentBooking.to}, Amount: ${currentBooking.amount}, Seat: ${currentBooking.seat}`;
}

function refund() {
    if (currentBooking) {
        const index = bookedSeats.indexOf(currentBooking.seat);
        if (index > -1) {
            bookedSeats.splice(index, 1);
        }
        alert('Refund successful.');
        currentBooking = null;
        showBooking();
    }
}