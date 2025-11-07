/* =====================================================
   Campus Helpdesk Portal JS — v2.2
   Works with master style.css (blue-gold theme)
   Fixes: hover blocking, scroll reveal timing, card cascade
   Author: Devansh Dubey
===================================================== */

// -------------------- Utility Functions --------------------
function showToast(message, type = "info") {
  const wrap = document.querySelector(".toast") || (() => {
    const d = document.createElement("div");
    d.className = "toast";
    document.body.appendChild(d);
    return d;
  })();

  const note = document.createElement("div");
  note.className = `note ${type}`;
  note.textContent = message;
  wrap.appendChild(note);

  setTimeout(() => note.classList.add("show"), 20);
  setTimeout(() => note.classList.remove("show"), 2800);
  setTimeout(() => note.remove(), 3500);
}

function getData(key) {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
}
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function clearAllData() {
  if (confirm("Are you sure you want to clear all data?")) {
    ["lostFoundData", "complaintData"].forEach(k => localStorage.removeItem(k));
    showToast("All data cleared successfully!", "success");
    setTimeout(() => location.reload(), 800);
  }
}

// -------------------- Scroll Reveal --------------------
function observeReveal() {
  const cards = document.querySelectorAll(".card:not(.in)");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });
  cards.forEach(c => observer.observe(c));
}

// -------------------- Accordion Toggle --------------------
function enableAccordion() {
  document.querySelectorAll(".accordion-header").forEach(h => {
    h.addEventListener("click", () => {
      h.closest(".accordion-item").classList.toggle("open");
    });
  });
}

// -------------------- Page Setup --------------------
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop() || "index.html";

  // highlight nav
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === page) link.classList.add("active");
  });

  // Home page: cards visible instantly for hover
  if (page === "index.html") {
    document.querySelectorAll(".card").forEach(card => card.classList.add("in"));
  } else {
    observeReveal();
  }

  enableAccordion();

  if (page === "admin.html") {
    const f = document.querySelector("footer");
    const b = document.createElement("button");
    b.textContent = "Clear All Data";
    b.className = "btn-primary";
    b.style.marginTop = "1rem";
    b.onclick = clearAllData;
    f.appendChild(b);
  }
});

// -------------------- Toast style injection --------------------
const css = document.createElement("style");
css.textContent = `
.note {
  opacity:0;
  transform: translateX(30px);
  transition: all 0.4s cubic-bezier(.22,.61,.36,1);
}
.note.show {
  opacity:1;
  transform: translateX(0);
}
`;
document.head.appendChild(css);

// -------------------- Loader (optional) --------------------
function showLoader() {
  let l = document.querySelector(".loader");
  if (!l) {
    l = document.createElement("div");
    l.className = "loader";
    l.style.position = "fixed";
    l.style.left = "50%";
    l.style.top = "50%";
    l.style.transform = "translate(-50%,-50%)";
    document.body.appendChild(l);
  }
}
function hideLoader() {
  const l = document.querySelector(".loader");
  if (l) l.remove();
}

// -------------------- Scroll To Top --------------------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("div");
  btn.className = "scroll-top";
  btn.textContent = "↑";
  btn.style.cssText = `
    position: fixed; bottom: 28px; left: 28px;
    width: 42px; height: 42px;
    border-radius:50%;
    background: rgba(255,204,0,0.9);
    color:#001122;
    display:grid; place-items:center;
    font-size:22px; font-weight:900;
    cursor:pointer; opacity:0; transform:scale(.8);
    box-shadow:0 4px 16px rgba(255,204,0,0.4);
    transition: all 0.4s ease; z-index:99;
  `;
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(btn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) btn.style.opacity = 1, btn.style.transform = "scale(1)";
    else btn.style.opacity = 0, btn.style.transform = "scale(.8)";
  });

  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 22px rgba(255,204,0,0.6)";
    btn.style.transform = "scale(1.1)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "0 4px 16px rgba(255,204,0,0.4)";
    btn.style.transform = "scale(1)";
  });
});
