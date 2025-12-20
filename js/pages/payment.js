document.addEventListener('storeReady', () => {
    // Access Control
    if (!appStore.checkAuth(true)) return;

    const pendingBooking = JSON.parse(localStorage.getItem('pendingBooking'));

    if (!pendingBooking) {
        Toast.info("Không có giao dịch nào đang chờ.", 2000);
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        return;
    }

    renderInfo(pendingBooking);
    generateQR(pendingBooking);
    startCountdown();

    // Handle Mock Confirmation
    const btnSimulate = document.getElementById('btn-simulate-success');
    if (btnSimulate) {
        btnSimulate.addEventListener('click', () => {
            completeBooking(pendingBooking);
        });
    }

    // Update Header Back Button
    const backBtn = document.querySelector('header a');
    if (backBtn) {
        backBtn.href = `booking.html?showtimeId=${pendingBooking.showtimeId}`;
        backBtn.innerHTML = `<i class="fas fa-chevron-left me-2"></i>Quay lại chọn ghế`;
    }
});

function renderInfo(booking) {
    document.getElementById('movie-poster').src = booking.movie.poster;
    document.getElementById('movie-title').innerText = booking.movie.title;
    document.getElementById('movie-title').innerText = booking.movie.title;

    document.getElementById('room-name').innerText = booking.room.name;
    document.getElementById('show-time').innerText = `${booking.showtimeInfo.startTime} - ${booking.showtimeInfo.date}`;

    // Render seats as badges
    const seatListHtml = booking.seats.map(code => `
        <span class="badge bg-gold text-black border border-white fw-bold py-1 px-2 shadow-sm" style="font-size: 0.9rem;">${code}</span>
    `).join(' ');
    document.getElementById('seat-list').innerHTML = seatListHtml;

    document.getElementById('payment-total').innerText = formatCurrency(booking.totalPrice);
}

function generateQR(booking) {
    const amount = parseInt(booking.totalPrice) || 0;
    const addInfo = `VE ${booking.showtimeId} ${booking.seats.join('')}`;
    const accountName = "CINEMIN";

    console.log("Generating QR:", { amount, addInfo });

    // VietQR Public API - TPBank
    const qrUrl = `https://img.vietqr.io/image/TPB-0778651136-compact.png?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;

    const imgEl = document.getElementById('qr-code-img');
    const loadingEl = document.getElementById('qr-loading');

    if (imgEl && loadingEl) {
        // 1. Ensure Loader is Visible initially
        loadingEl.classList.remove('d-none');
        loadingEl.classList.add('d-flex');

        // Helper to safely hide loader
        const hideLoader = () => {
            loadingEl.classList.remove('d-flex');
            loadingEl.classList.add('d-none');
            loadingEl.style.setProperty('display', 'none', 'important');
        };

        // 2. Define Handlers on the DOM Element
        imgEl.onload = () => {
            console.log("QR Loaded");
            hideLoader();
        };

        imgEl.onerror = () => {
            console.error("QR Load Failed");
            loadingEl.innerHTML = '<div class="text-danger">Lỗi ảnh QR</div>';
            // Don't hide completely on error, show the error message
        };

        // 3. Set Source
        imgEl.src = qrUrl;

        // 4. Check if already cached (run immediately)
        if (imgEl.complete && imgEl.naturalHeight !== 0) {
            console.log("QR Cached");
            hideLoader();
        }

        // 5. Safety Timeout (Force hide after 3s)
        setTimeout(() => {
            // Check if still visible (not strictly necessary with our robust hideLoader but good for logging)
            if (!loadingEl.classList.contains('d-none')) {
                console.log("Forcing loader hide");
                hideLoader();
            }
        }, 3000);

    } else {
        console.error("QR elements missing");
    }
}

function startCountdown() {
    let seconds = 300;
    const el = document.getElementById('payment-timer'); // Fixed ID
    if (!el) return;

    const interval = setInterval(() => {
        seconds--;
        // Format mm:ss
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        el.innerText = `${m}:${s}`;

        if (seconds <= 0) {
            clearInterval(interval);
            Toast.error("Giao dịch hết hạn!", 2000);
            setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        }
    }, 1000);
}

function completeBooking(booking) {
    // 1. Create Final Booking Object
    const finalBooking = {
        id: Date.now(),
        userId: appStore.user.id,
        showtimeId: booking.showtimeId,
        seatCodes: booking.seats,
        totalPrice: booking.totalPrice,
        status: 'paid',
        bookingDate: new Date().toISOString(),
        // Denormalize data for easier display in history
        movieTitle: booking.movie.title,
        roomName: booking.room.name,
        showtimeStart: booking.showtimeInfo.startTime
    };

    // 2. Save to Store
    appStore.addBooking(finalBooking);

    // 3. Clean up
    localStorage.removeItem('pendingBooking');

    // 4. Redirect
    Toast.success("Thanh toán thành công! Vé đã được lưu.", 2000);
    setTimeout(() => { window.location.href = 'profile.html'; }, 2000);
}
