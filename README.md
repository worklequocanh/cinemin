# Cinemin 🎬
**Trải Nghiệm Điện Ảnh Đỉnh Cao**

Cinemin là một ứng dụng web đặt vé xem phim trực tuyến hiện đại, mang đến trải nghiệm người dùng mượt mà và giao diện ấn tượng. Dự án được xây dựng với công nghệ web thuần (Vanilla JavaScript, HTML, CSS) kết hợp với Bootstrap 5.

## 🌟 Tính Năng Chính

*   **Trang Chủ Ấn Tượng**: Banner slider động, danh sách phim "Đang Chiếu" và "Sắp Chiếu".
*   **Chi Tiết Phim**: Xem thông tin chi tiết, trailer và lịch chiếu của từng bộ phim.
*   **Đặt Vé Trực Tuyến**: Quy trình đặt vé đơn giản, chọn suất chiếu và ghế ngồi (mô phỏng).
*   **Hệ Thống Tài Khoản**:
    *   Đăng ký và Đăng nhập.
    *   Quản lý thông tin cá nhân.
    *   Lịch sử đặt vé.
*   **Giao Diện Responsive**: Tối ưu hóa cho cả máy tính và thiết bị di động.

## 🛠️ Công Nghệ Sử Dụng

*   **HTML5 & CSS3**: Cấu trúc và định kiểu trang web.
*   **JavaScript (Vanilla)**: Xử lý logic, quản lý trạng thái (State Management) và render components.
*   **Bootstrap 5**: Framework CSS cho hệ thống grid và các component UI responsive.
*   **JSON & LocalStorage**:
    *   `db.json`: Giả lập cơ sở dữ liệu (phim, rạp, suất chiếu).
    *   `localStorage`: Lưu trữ dữ liệu người dùng và đơn hàng ngay trên trình duyệt.

## 📂 Cấu Trúc Dự Án

```
cinemin/
├── assets/          # Tài nguyên tĩnh
│   ├── css/         # Global styles (base.css)
│   └── images/      # Hình ảnh banner, poster, avatar
├── data/            # Dữ liệu giả lập
│   └── db.json      # Database file
├── js/              # Mã nguồn JavaScript
│   ├── components/  # Các UI Component (Navbar, Footer, MovieCard)
│   ├── pages/       # Logic riêng cho từng trang
│   └── main.js      # Global Store và khởi tạo ứng dụng
├── *.html           # Các trang giao diện (index, detail, loading, v.v.)
└── README.md        # Tài liệu dự án
```

## 🚀 Cài Đặt và Chạy Dự Án

Dự án này là trang web tĩnh (Static Site), bạn không cần cài đặt môi trường phức tạp như Node.js hay Python.

1.  **Tải mã nguồn**: Clone hoặc tải file zip của dự án về máy.
2.  **Khởi chạy**:
    *   Cách đơn giản nhất: Sử dụng extension **Live Server** trên VS Code.
    *   Hoặc mở trực tiếp file `index.html` trên trình duyệt (tuy nhiên khuyến khích dùng Live Server để tránh lỗi CORS khi fetch dữ liệu từ `db.json`).

## 👤 Hướng Dẫn Sử Dụng

1.  **Đăng Ký Tài Khoản**: Truy cập trang Đăng Ký để tạo tài khoản mới. Dữ liệu sẽ được lưu vào trình duyệt của bạn.
2.  **Đặt Vé**: Chọn phim -> Chọn suất chiếu -> Tiến hành thanh toán giả lập.
3.  **Xem Vé**: Sau khi đặt, vé sẽ hiển thị trong phần "Hồ Sơ Cá Nhân".

---
**Lưu ý**: Đây là dự án Front-end Demo, mọi dữ liệu chỉ được lưu trữ tạm thời trên trình duyệt của người dùng.
