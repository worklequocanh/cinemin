document.addEventListener('storeReady', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const showtimeId = urlParams.get('showtimeId');

    if (!showtimeId) {
        alert("Không tìm thấy suất chiếu!");
        window.location.href = 'index.html';
        return;
    }

    const showtime = appStore.getShowtime(showtimeId);
    if (!showtime) {
        alert("Suất chiếu không tồn tại!");
        window.location.href = 'index.html';
        return;
    }

    // Render Movie Info in Sidebar
    renderBookingInfo(showtime);

    // Update Back Button
    const backBtn = document.querySelector('header a.text-gold');
    if (backBtn) {
        backBtn.href = `detail.html?id=${showtime.movieId}`;
        backBtn.innerHTML = `<i class="fas fa-chevron-left me-2"></i>${showtime.movieTitle || 'Chi Tiết Phim'}`;
    }

    // Initialize Seat Selector
    const seatSelector = new SeatSelector(showtime, (selectedSeats) => {
        updateSummary(selectedSeats);
    });
    seatSelector.mount('seat-map-container');

    // Restore Selection if Returning from Payment
    const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));
    if (pendingBooking && pendingBooking.showtimeId == showtime.id && pendingBooking.seats) {
        console.log("Restoring seats from pending booking:", pendingBooking.seats);
        // Find buttons for these seats and simulate selection
        // Note: This relies on the button elements being rendered already (synchronous render above)
        pendingBooking.seats.forEach(seatCode => {
            const btn = document.querySelector(`button[data-code="${seatCode}"]`);
            if (btn && !btn.disabled) { 
                // Initial selection logic manually since we are outside the click handler
                 const price = parseInt(btn.dataset.price);
                 seatSelector.selectedSeats.push({ code: seatCode, price: price });
                 btn.classList.add('selecting');
            }
        });
        // Update UI summary
        updateSummary(seatSelector.selectedSeats);
    }

    // Handle Payment Navigation
    document.getElementById('btn-payment').addEventListener('click', () => {
        const selectedSeats = seatSelector.selectedSeats;
        if (selectedSeats.length === 0) return;

        // Check login
        if (!appStore.checkAuth(true)) {
            // checkAuth handles redirect with returnUrl
            return;
        }

        // Create Pending Booking Object
        const pendingBooking = {
            showtimeId: showtime.id,
            seats: selectedSeats.map(s => s.code),
            totalPrice: selectedSeats.reduce((sum, s) => sum + s.price, 0),
            movie: appStore.getMovie(showtime.movieId),
            showtimeInfo: showtime,
            room: appStore.getRoom(showtime.roomId)
        };

        localStorage.setItem('pendingBooking', JSON.stringify(pendingBooking));
        window.location.href = 'payment.html';
    });
});

function renderBookingInfo(showtime) {
    const movie = appStore.getMovie(showtime.movieId);
    const room = appStore.getRoom(showtime.roomId);
    
    document.getElementById('booking-info').innerHTML = `
        <div class="d-flex gap-3 mb-3">
            <img src="${movie.poster}" class="rounded" style="width: 80px; height: 120px; object-fit: cover;">
            <div>
                <h4 class="text-white fw-bold mb-1">${movie.title}</h4>
                <p class="text-gold mb-1">${room.name}</p>
                <p class="text-light text-opacity-75 small">${showtime.startTime} - ${showtime.endTime}</p>
            </div>
        </div>
    `;
}

function updateSummary(selectedSeats) {
    console.log("Updating Summary with seats:", selectedSeats);
    const displayContainer = document.getElementById('selected-seats-display');
    const totalPriceEl = document.getElementById('total-price');
    const paymentBtn = document.getElementById('btn-payment');
    
    // Render Seats List
    if (selectedSeats.length === 0) {
        displayContainer.innerHTML = '<span class="text-light text-opacity-50 small">Vui lòng chọn ghế...</span>';
        paymentBtn.disabled = true;
        totalPriceEl.innerText = '0 ₫';
    } else {
        displayContainer.innerHTML = selectedSeats.map(s => `
            <span class="badge bg-gold text-black border border-white fw-bold fs-6 py-2 px-3 shadow-lg" style="letter-spacing: 1px;">${s.code}</span>
        `).join('');
        
        const total = selectedSeats.reduce((sum, s) => sum + s.price, 0);
        totalPriceEl.innerText = formatCurrency(total);
        paymentBtn.disabled = false;
        paymentBtn.innerText = `THANH TOÁN • ${formatCurrency(total)}`;
    }
}
