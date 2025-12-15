document.addEventListener('storeReady', () => {
    // Check Auth
    if (!appStore.checkAuth(true)) return;

    // Mount Components
    const navbar = new Navbar();
    navbar.mount('navbar-placeholder');
    
    const footer = new Footer();
    footer.mount('footer-placeholder');

    // Render Data
    renderProfile();
    renderBookingHistory();
});

function renderProfile() {
    const user = appStore.user;
    document.getElementById('profile-name').innerText = user.fullName;
    document.getElementById('profile-email').innerText = user.email;
    document.getElementById('profile-avatar').src = user.avatar;
    
    // Populate Info Form
    const nameInput = document.getElementById('info-fullname');
    const emailInput = document.getElementById('info-email');
    if (nameInput) nameInput.value = user.fullName;
    if (emailInput) emailInput.value = user.email;
}

// Tab Switching Logic
document.addEventListener('DOMContentLoaded', () => {
    const tabHistory = document.getElementById('tab-history');
    const tabInfo = document.getElementById('tab-info');
    const contentHistory = document.getElementById('content-history');
    const contentInfo = document.getElementById('content-info');

    if (tabHistory && tabInfo && contentHistory && contentInfo) {
        tabHistory.addEventListener('click', () => {
            // UI Update
            tabHistory.classList.add('btn-gold');
            tabHistory.classList.remove('btn-outline-light');
            tabInfo.classList.remove('btn-gold');
            tabInfo.classList.add('btn-outline-light');
            
            // Content Update
            contentHistory.classList.remove('d-none');
            contentInfo.classList.add('d-none');
        });

        tabInfo.addEventListener('click', () => {
            // UI Update
            tabInfo.classList.add('btn-gold');
            tabInfo.classList.remove('btn-outline-light');
            tabHistory.classList.remove('btn-gold');
            tabHistory.classList.add('btn-outline-light');
            
            // Content Update
            contentInfo.classList.remove('d-none');
            contentHistory.classList.add('d-none');
        });
    }
});

function renderBookingHistory() {
    const bookings = appStore.bookings.filter(b => b.userId === appStore.user.id).sort((a,b) => b.id - a.id);
    const tbody = document.getElementById('booking-history-body');
    const emptyState = document.getElementById('empty-history');

    if (bookings.length === 0) {
        tbody.parentElement.classList.add('d-none'); // Hide table
        emptyState.classList.remove('d-none');
        return;
    }

    tbody.innerHTML = bookings.map(b => `
        <tr>
            <td><span class="badge bg-secondary text-light">#${b.id.toString().slice(-6)}</span></td>
            <td class="fw-bold text-white">${b.movieTitle || 'N/A'}</td>
            <td class="text-light text-opacity-75">${b.roomName || 'N/A'}</td>
            <td class="text-light text-opacity-75">${b.showtimeStart || 'N/A'}</td>
            <td>
                ${b.seatCodes.map(code => `<span class="badge bg-gold text-black border border-white fw-bold me-1">${code}</span>`).join('')}
            </td>
            <td class="text-gold fw-bold">${formatCurrency(b.totalPrice)}</td>
            <td><span class="badge bg-success border border-success-subtle">Thành công</span></td>
        </tr>
    `).join('');
}
