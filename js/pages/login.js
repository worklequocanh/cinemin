document.addEventListener("storeReady", () => {
  appStore.redirectIfLoggedIn();
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;

  const btn = e.target.querySelector("button");
  const originalText = btn.innerText;
  btn.innerText = "ĐANG XỬ LÝ...";
  btn.disabled = true;

  setTimeout(() => {
    // Simulate network delay for effect
    const result = appStore.login(u, p);

    if (result.success) {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get("returnUrl");
      window.location.href = returnUrl
        ? decodeURIComponent(returnUrl)
        : "index.html";
    } else {
      Toast.error(result.message || "Đăng nhập thất bại");
      btn.innerText = originalText;
      btn.disabled = false;
    }
  }, 800);
});