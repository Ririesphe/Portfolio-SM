// =========================
// DARK MODE TOGGLE
// =========================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change toggle text & icon
    if(body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});

// =========================
// NAV HAMBURGER MENU
// =========================
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});

// =========================
// PROJECT FILTER SYSTEM
// =========================
const filterButtons = document.querySelectorAll(".filter-buttons button");
const projects = document.querySelectorAll(".project-card");

// Smooth transition
projects.forEach(project => {
    project.style.transition = "all 0.4s ease";
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        projects.forEach(project => {
            const category = project.getAttribute("data-category");

            if(filter === "all" || filter === category){
                project.style.display = "flex";
                setTimeout(() => {
                    project.style.opacity = "1";
                    project.style.transform = "translateY(0) scale(1)";
                }, 50);
            } else {
                project.style.opacity = "0";
                project.style.transform = "translateY(20px) scale(0.95)";
                setTimeout(() => {
                    project.style.display = "none";
                }, 300);
            }
        });
    });
});

// =========================
// BUTTON RIPPLE EFFECT
// =========================
const buttons = document.querySelectorAll(".btn, .project-btn, .hero button");

buttons.forEach(btn => {
    btn.addEventListener("click", function(e){
        const circle = document.createElement("span");
        const diameter = Math.max(this.clientWidth, this.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;
        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];
        if(ripple){ ripple.remove(); }

        this.appendChild(circle);
    });
});

// =========================
// SCROLL REVEAL ANIMATION
// =========================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

const scrollElements = document.querySelectorAll(
    ".project-card, .timeline-entry, .skill, .soft-skill, .fact-card, .hero-text"
);

scrollElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
});

// =========================
// BACK TO TOP BUTTON
// =========================
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if(window.scrollY > 400){
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================
// HERO TEXT ANIMATION
// =========================
window.addEventListener("load", () => {
    const heroText = document.querySelector(".hero-text");
    if(heroText){
        heroText.style.opacity = "1";
        heroText.style.transform = "translateY(0)";
    }
});

// =========================
// TIMELINE BRANCH ANIMATION
// =========================
const timelineEntries = document.querySelectorAll(".timeline-entry");
timelineEntries.forEach((entry, index) => {
    entry.style.opacity = "0";
    entry.style.transform = "translateX(-30px)";
    setTimeout(() => {
        entry.style.opacity = "1";
        entry.style.transform = "translateX(0)";
    }, 200 * index);
});