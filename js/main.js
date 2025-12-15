// Global State Management
class Store {
    constructor() {
        this.movies = [];
        this.rooms = [];
        this.showtimes = [];
        this.bookings = [];
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.users = [];
    }

    async init() {
        // Fetch specific json from db.json if first load
        try {
            const response = await fetch('./data/db.json');
            const data = await response.json();
            
            this.movies = data.movies || [];
            this.rooms = data.rooms || [];
            this.showtimes = data.showtimes || [];
            
            // Bookings typically come from LocalStorage in this client-side demo
            // But we load from db.json initially if localStorage is empty
            const localBookings = localStorage.getItem('bookings');
            if (localBookings) {
                this.bookings = JSON.parse(localBookings);
            } else {
                this.bookings = data.bookings || [];
                this.saveBookings();
            }

            // Users Logic
            const localUsers = localStorage.getItem('users');
            if (localUsers) {
                this.users = JSON.parse(localUsers);
            } else {
                this.users = data.users || [];
                this.saveUsers();
            }
        } catch (error) {
            console.error("Failed to load data:", error);
        }
    }

    // Data Access Methods
    getNowShowingMovies() {
        return this.movies.filter(m => m.status === 'now_showing');
    }

    getComingSoonMovies() {
        return this.movies.filter(m => m.status === 'coming_soon');
    }

    getBookedSeats(showtimeId) {
        // Find all bookings for this showtime
        const showtimeBookings = this.bookings.filter(b => b.showtimeId == showtimeId);
        console.log(`Checking booked seats for showtime ${showtimeId}`, { 
            totalBookings: this.bookings.length,
            matches: showtimeBookings.length, 
            booked: showtimeBookings 
        });
        
        // Flatten all seats from these bookings into a single array
        return showtimeBookings.reduce((allSeats, b) => allSeats.concat(b.seats || b.seatCodes), []); // Handle both naming conventions if any
    }
    
    getMovie(id) {
        return this.movies.find(m => m.id == id);
    }

    getShowtime(id) {
        return this.showtimes.find(s => s.id == id);
    }
    
    getShowtimesByMovie(movieId) {
        return this.showtimes.filter(s => s.movieId == movieId);
    }
    
    getRoom(id) {
        return this.rooms.find(r => r.id == id);
    }

    saveBookings() {
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    addBooking(booking) {
        this.bookings.push(booking);
        this.saveBookings();
    }

    checkAuth(redirectIfMissing = false) {
        if (this.user) return true;
        
        if (redirectIfMissing) {
            const currentUrl = encodeURIComponent(window.location.href);
            window.location.href = `login.html?returnUrl=${currentUrl}`;
        }
        return false;
    }

    redirectIfLoggedIn() {
        if (this.user) {
            window.location.href = 'index.html';
        }
    }

    register(user) {
        if (this.users.some(u => u.username === user.username)) {
            return { success: false, message: "Tên đăng nhập đã tồn tại!" };
        }
        if (this.users.some(u => u.email === user.email)) {
            return { success: false, message: "Email đã được sử dụng!" };
        }
        
        const newUser = {
            id: Date.now(),
            avatar: "assets/images/user_avatar.png",
            ...user
        };
        
        this.users.push(newUser);
        this.saveUsers();
        return { success: true, message: "Đăng ký thành công!" };
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.user));
            return { success: true };
        }
        return { success: false, message: "Sai tên đăng nhập hoặc mật khẩu!" };
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        window.location.reload();
    }
}

// Global instance
const appStore = new Store();

// Helper to format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Component Loader Helper
const loadComponent = async (placeholderId, componentPath) => {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;
    
    // In a real module system we would import. 
    // Here we will rely on including scripts in HTML or just generic rendering if they are classes.
    // However, for this MPA structure without modules, we might just instantiate classes if they are loaded globally.
};

// DOM Content Loaded wrapper to start app
document.addEventListener('DOMContentLoaded', async () => {
    await appStore.init();
    
    // Broadcast event that data is ready
    const event = new Event('storeReady');
    document.dispatchEvent(event);
    
    console.log("Cinemin Store Initialized");
});
