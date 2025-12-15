class MovieCard {
    constructor(movie) {
        this.movie = movie;
    }

    render() {
        return `
            <div class="col">
                <div class="card h-100 movie-card text-white">
                    <div class="position-relative">
                        <img src="${this.movie.poster}" class="card-img-top" alt="${this.movie.title}" loading="lazy">
                        <div class="position-absolute top-0 end-0 m-2 badge bg-gold text-dark fw-bold">
                            ${this.movie.rating || 'N/A'} <i class="fas fa-star small"></i>
                        </div>
                    </div>
                    <div class="card-body px-0">
                        <h5 class="card-title text-truncate fw-bold mb-1" title="${this.movie.title}">${this.movie.title}</h5>
                        <p class="card-text text-light text-opacity-75 small mb-2">${this.movie.genre} • ${this.movie.duration} phút</p>
                        <a href="detail.html?id=${this.movie.id}" class="btn btn-outline-gold w-100 btn-sm">
                            <i class="fas fa-ticket-alt me-1"></i> Đặt Vé
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
}
