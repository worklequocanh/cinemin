document.addEventListener('storeReady', () => {
    // 1. Mount Layout Components
    const navbar = new Navbar();
    navbar.mount('navbar-placeholder');
    
    const footer = new Footer();
    footer.mount('footer-placeholder');

    // 2. Render Movies
    renderMovies();
});

function renderMovies() {
    const movies = appStore.movies;
    const nowShowingContainer = document.getElementById('movie-list-now-showing');
    const comingSoonContainer = document.getElementById('movie-list-coming-soon');

    // Clear loading spinners
    const nowShowingMovies = movies.filter(m => m.status === 'now_showing');
    const comingSoonMovies = movies.filter(m => m.status === 'coming_soon');

    // Render Now Showing
    if (nowShowingMovies.length > 0) {
        nowShowingContainer.innerHTML = nowShowingMovies.map(movie => new MovieCard(movie).render()).join('');
    } else {
        nowShowingContainer.innerHTML = '<p class="text-light text-opacity-75 col-12 text-center">Không có phim đang chiếu.</p>';
    }

    // Render Coming Soon
    if (comingSoonMovies.length > 0) {
        comingSoonContainer.innerHTML = comingSoonMovies.map(movie => new MovieCard(movie).render()).join('');
    } else {
        comingSoonContainer.innerHTML = '<p class="text-light text-opacity-75 col-12 text-center">Chưa có phim sắp chiếu.</p>';
    }
}
