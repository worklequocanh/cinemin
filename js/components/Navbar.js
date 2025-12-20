class Navbar {
    constructor() {
        this.user = appStore.user;
    }

    render() {
        const isUserLoggedIn = !!this.user;

        return `
            <nav class="navbar navbar-expand-lg navbar-dark navbar-glass">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src="assets/images/logo.svg" alt="CINEMIN" height="40">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header border-bottom border-secondary">
                            <h5 class="offcanvas-title text-gold fw-bold" id="offcanvasNavbarLabel">CINEMIN</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link ${window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') ? 'active' : ''}" aria-current="page" href="index.html">Trang Chủ</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link ${window.location.pathname.includes('about.html') ? 'active' : ''}" href="about.html">Giới Thiệu</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link ${window.location.pathname.includes('contact.html') ? 'active' : ''}" href="contact.html">Liên Hệ</a>
                                </li>
                            </ul>
                            
                            <div class="d-flex align-items-center mt-3 mt-lg-0 justify-content-center">
                                ${isUserLoggedIn ? `
                                    <div class="dropdown">
                                        <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-light" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="${this.user.avatar}" alt="" width="32" height="32" class="rounded-circle me-2">
                                            <span class="">${this.user.username}</span>
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                                            <li><a class="dropdown-item" href="profile.html">Tài Khoản & Vé</a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item text-danger" href="#" onclick="appStore.logout()">Đăng Xuất</a></li>
                                        </ul>
                                    </div>
                                ` : `
                                    <a href="login.html" class="btn btn-outline-gold btn-sm px-4">Đăng Nhập</a>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `;
    }

    mount(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.render();
        }
    }
}
