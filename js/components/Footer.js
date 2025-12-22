class Footer {
    render() {
        return `
            <footer class="text-light py-5 mt-auto" style="background-color: var(--color-bg-dark); border-top: 1px solid rgba(255,255,255,0.05);">
                <div class="container">
                    <div class="row gy-4">
                        <div class="col-lg-4 col-md-6">
                            <h4 class="text-gold mb-3 fw-bold">CINEMIN</h4>
                            <p class="text-light text-opacity-75">Trải nghiệm điện ảnh đỉnh cao với hệ thống phòng chiếu hiện đại và dịch vụ đẳng cấp.</p>
                            <div class="social-links">
                                <a href="#" class="text-light me-3"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" class="text-light me-3"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="text-light me-3"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="text-white mb-3 text-uppercase fw-bold text-shadow" style="font-size: 0.9rem; letter-spacing: 1px;">Khám Phá</h5>
                            <ul class="list-unstyled text-light text-opacity-75 small">
                                <li class="mb-2"><a href="index.html" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-home me-2"></i>Trang Chủ</a></li>
                                <li class="mb-2"><a href="index.html#now-showing" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-film me-2"></i>Phim Đang Chiếu</a></li>
                                <li class="mb-2"><a href="index.html#coming-soon" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-calendar-alt me-2"></i>Phim Sắp Chiếu</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-2 col-md-6">
                            <h5 class="text-white mb-3 text-uppercase fw-bold text-shadow" style="font-size: 0.9rem; letter-spacing: 1px;">Hỗ Trợ</h5>
                            <ul class="list-unstyled text-light text-opacity-75 small">
                                <li class="mb-2"><a href="about.html" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-info-circle me-2"></i>Về Chúng Tôi</a></li>
                                <li class="mb-2"><a href="contact.html" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-envelope me-2"></i>Liên Hệ</a></li>
                                <li class="mb-2"><a href="profile.html" class="text-decoration-none text-light text-opacity-75 hover-gold"><i class="fas fa-user-circle me-2"></i>Tài Khoản</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <h5 class="text-white mb-3">Nhận Khuyến Mãi</h5>
                            <p class="text-light text-opacity-75 small">Đăng ký để nhận tin tức ưu đãi mới nhất.</p>
                            <div class="input-group mb-3">
                                <input type="text" class="form-control bg-dark text-light border-secondary" placeholder="Email của bạn" aria-label="Email">
                                <button class="btn btn-gold" type="button">Đăng Ký</button>
                            </div>
                        </div>
                    </div>
                    <hr class="border-secondary my-4">
                    <div class="text-center text-light text-opacity-50 small">
                        &copy; 2025 Cinemin. All rights reserved. Designed by WorkLeQuocAnh.
                    </div>
                </div>
            </footer>
        `;
    }

    mount(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = this.render();

            // Handle Newsletter Subscription
            const btn = container.querySelector('.input-group button');
            const input = container.querySelector('.input-group input');

            if (btn && input) {
                btn.addEventListener('click', () => {
                    const email = input.value.trim();
                    if (email) {
                        // Mock API call
                        Toast.success(`Cảm ơn bạn đã đăng ký! Tin tức mới nhất sẽ được gửi tới ${email}.`);
                        input.value = ''; // Clear input
                    } else {
                        Toast.error("Vui lòng nhập email của bạn.");
                    }
                });
            }
        }
    }
}
