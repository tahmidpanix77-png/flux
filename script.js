const API_URL = "http://localhost:5000";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const usernameDisplay = document.getElementById("username-display");
  const logoutBtn = document.getElementById("logout");

  // Handle registration
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;

      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) window.location.href = "login.html";
    });
  }

  // Handle login
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;

      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "dashboard.html";
      }
    });
  }

  // Show username on dashboard
  if (usernameDisplay) {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) window.location.href = "login.html";
    usernameDisplay.textContent = loggedInUser;
  }

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "login.html";
    });
  }
});
