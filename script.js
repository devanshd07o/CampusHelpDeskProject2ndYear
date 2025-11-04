/* -----------------------------
   Campus Helpdesk Portal JS
   Shared Logic Across All Pages
   Author: Devansh Dubey
----------------------------- */

// ---- Utility Functions ----

// Show custom toast message
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);
  setTimeout(() => toast.classList.remove("show"), 2800);
  setTimeout(() => toast.remove(), 3500);
}

// Get data from localStorage
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to localStorage
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Clear all portal data
function clearAllData() {
  if (confirm("Are you sure you want to clear all data?")) {
    localStorage.removeItem("lostFoundData");
    localStorage.removeItem("complaintData");
    showToast("All data cleared successfully!", "success");
    setTimeout(() => window.location.reload(), 1000);
  }
}

// ---- Dynamic Page Detection ----
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop();

  // Highlight active nav link dynamically
  const links = document.querySelectorAll("nav a");
  links.forEach(link => {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
    }
  });

  // Display greeting on homepage
  if (page === "index.html" || page === "") {
    console.log("%cWelcome to Campus Helpdesk Portal", "color: #ffcc00; font-weight: bold;");
  }

  // Inject admin control buttons if on admin page
  if (page === "admin.html") {
    const footer = document.querySelector("footer");
    const btn = document.createElement("button");
    btn.textContent = "Clear All Data";
    btn.style.cssText = `
      background: #ffcc00;
      color: #002b5b;
      border: none;
      font-weight: bold;
      padding: 10px 18px;
      border-radius: 8px;
      cursor: pointer;
      margin-top: 1rem;
      transition: 0.3s;
    `;
    btn.onmouseenter = () => (btn.style.background = "#fff");
    btn.onmouseleave = () => (btn.style.background = "#ffcc00");
    btn.onclick = clearAllData;
    footer.appendChild(btn);
  }
});

// ---- Toast Notification Styling ----
const style = document.createElement("style");
style.textContent = `
.toast {
  position: fixed;
  bottom: 30px;
  right: -300px;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  opacity: 0;
  transition: all 0.6s ease;
  z-index: 9999;
}
.toast.success { background: rgba(0,128,0,0.9); }
.toast.error { background: rgba(255,0,0,0.9); }
.toast.show {
  opacity: 1;
  right: 30px;
}
`;
document.head.appendChild(style);
