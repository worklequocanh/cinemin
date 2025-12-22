document.addEventListener("storeReady", () => {
  appStore.redirectIfLoggedIn();
});

document
  .getElementById("registerForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword =
      document.getElementById("confirmPassword").value;
    const errorEl = document.getElementById("error-message");

    if (password !== confirmPassword) {
      Toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Register logic
    const result = appStore.register({
      fullName,
      email,
      username,
      password,
    });

    if (result.success) {
      Toast.success("Đăng ký thành công! Đang chuyển hướng...", 1500);
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      Toast.error(result.message);
    }
  });