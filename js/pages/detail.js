document.addEventListener('storeReady', () => {
    // 1. Mount Layout Components
    const navbar = new Navbar();
    navbar.mount('navbar-placeholder');
    
    const footer = new Footer();
    footer.mount('footer-placeholder');

    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (movieId) {
        renderMovieDetail(movieId);
    } else {
        document.getElementById('movie-detail-container').innerHTML = `
            <div class="alert alert-danger">Không tìm thấy phim. <a href="index.html" class="alert-link">Quay lại trang chủ</a></div>
        `;
    }
});

function renderMovieDetail(id) {
    const movie = appStore.getMovie(id);
    const container = document.getElementById('movie-detail-container');
    const breadcrumbTitle = document.getElementById('breadcrumb-movie-title');

    if (!movie) {
        container.innerHTML = `<div class="alert alert-warning">Phim không tồn tại.</div>`;
        return;
    }

    breadcrumbTitle.innerText = movie.title;
    
    // Get showtimes
    const showtimes = appStore.getShowtimesByMovie(id);
    
    // Group showtimes by date (simple grouping)
    // Assume all are same date for current mock, but let's be generic
    const groupedShowtimes = {};
    showtimes.forEach(s => {
        if (!groupedShowtimes[s.date]) groupedShowtimes[s.date] = [];
        groupedShowtimes[s.date].push(s);
    });

    let showtimeHtml = '';
    if (showtimes.length > 0) {
        for (const [date, slots] of Object.entries(groupedShowtimes)) {
            const formattedDate = new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' });
            
            showtimeHtml += `
                <div class="mb-4">
                    <h5 class="text-gold border-bottom border-secondary pb-2 mb-3"><i class="far fa-calendar-alt me-2"></i>${formattedDate}</h5>
                    <div class="d-flex flex-wrap gap-3">
                        ${slots.map(slot => {
                            const room = appStore.getRoom(slot.roomId);
                            return `
                                <a href="booking.html?showtimeId=${slot.id}" class="btn btn-outline-light d-flex flex-column align-items-center p-2" style="min-width: 100px;">
                                    <span class="fs-5 fw-bold">${slot.startTime}</span>
                                    <span class="small text-light text-opacity-75">~ ${slot.endTime}</span>
                                    <span class="badge bg-secondary mt-1 small">${room ? room.name : 'Rạp 1'}</span>
                                    <span class="text-gold small mt-1">${formatCurrency(slot.price)}</span>
                                </a>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }
    } else {
        showtimeHtml = '<p class="text-light text-opacity-75">Chưa có lịch chiếu cho phim này.</p>';
    }

    const html = `
        <div class="row g-4 g-lg-5">
            <!-- Poster Col -->
            <div class="col-md-4 col-lg-3 mb-4 mb-md-0">
                <div class="position-sticky" style="top: 100px; z-index: 1;">
                    <img src="${movie.poster}" alt="${movie.title}" class="img-fluid rounded shadow-lg w-100 placeholder-wave mb-3">
                    <button class="btn btn-danger w-100 rounded-pill fw-bold shadow-sm" data-bs-toggle="modal" data-bs-target="#trailerModal" onclick="document.getElementById('trailer-iframe').src='${movie.trailer}?autoplay=1'">
                        <i class="fas fa-play me-2"></i>Xem Trailer
                    </button>
                </div>
            </div>
            
            <!-- Info Col -->
            <div class="col-md-8 col-lg-9">
                <h1 class="display-4 fw-bold text-uppercase mb-2 text-shadow">${movie.title}</h1>
                <div class="mb-4">
                    <span class="badge bg-warning text-dark me-2"><i class="fas fa-star me-1"></i>${movie.rating}</span>
                    <span class="badge bg-secondary me-2">${movie.duration} phút</span>
                    <span class="text-gold fw-bold">${movie.genre}</span>
                </div>
                
                <p class="lead text-light text-opacity-75 mb-5" style="text-align: justify;">
                    ${movie.description}
                </p>

                <div class="bg-dark p-4 rounded border border-secondary shadow-sm" style="--bs-bg-opacity: .3;">
                    <h3 class="section-title text-gold mb-4">Lịch Chiếu</h3>
                    ${showtimeHtml}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
    
    // Reset trailer when modal closed
    const trailerModal = document.getElementById('trailerModal');
    trailerModal.addEventListener('hidden.bs.modal', function () {
        document.getElementById('trailer-iframe').src = '';
    });
}
