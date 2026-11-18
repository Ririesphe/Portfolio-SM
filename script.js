// =========================
// EMAILJS INIT
// =========================
if (typeof emailjs !== "undefined") { emailjs.init("D5_iZOaeAj2N1-vcU"); }

// =========================
// DARK MODE TOGGLE
// =========================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change toggle text & icon
    if(body.classList.contains("dark-mode")) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i> <span class="btn-text">Light Mode</span>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i> <span class="btn-text">Dark Mode</span>';
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

// Note: Project buttons are now standard <a> tags and handle their own links.


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
    // el.style.opacity = "0";
    // el.style.transform = "translateY(30px)";
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
    // entry.style.opacity = "0";
    // entry.style.transform = "translateX(-30px)";
    setTimeout(() => {
        entry.style.opacity = "1";
        entry.style.transform = "translateX(0)";
    }, 200 * index);
});

// Note: Form ID is now #contact-form
const contactForm = document.getElementById("contact-form");

// =========================
// SCROLL HELPERS
// =========================
function scrollToProjects() {
    const section = document.getElementById("projects");
    if(section) section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
    const section = document.getElementById("contact");
    if(section) section.scrollIntoView({ behavior: 'smooth' });
}

function scrollToAbout() {
    const section = document.getElementById("about");
    if(section) section.scrollIntoView({ behavior: 'smooth' });
}

// =========================
// COPY EMAIL LOGIC
// =========================
function copyEmail(event) {
    event.preventDefault();
    const email = "ririemalotana@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        const textSpan = document.getElementById("copy-text");
        const originalText = textSpan.innerHTML;
        textSpan.innerHTML = "Copied to clipboard!";
        textSpan.style.color = "var(--primary)";
        
        setTimeout(() => {
            textSpan.innerHTML = originalText;
            textSpan.style.color = "";
        }, 2000);
    });
}

if(contactForm){
    contactForm.addEventListener("submit", function(e){
        e.preventDefault();

        // Change button state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = "<span>Sending...</span> <i class='fas fa-spinner fa-spin'></i>";
        submitBtn.disabled = true;

        // Collect data
        const formData = {
            from_name: this.querySelector('input[name="from_name"]').value,
            name: this.querySelector('input[name="from_name"]').value, // Added for template compatibility
            reply_to: this.querySelector('input[name="reply_to"]').value,
            email: this.querySelector('input[name="reply_to"]').value, // Added for template compatibility
            subject: this.querySelector('input[name="subject"]').value,
            message: this.querySelector('textarea[name="message"]').value
        };

        // Send via EmailJS
        if (typeof emailjs === "undefined") {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            alert("The form couldn't load. Please email ririemalotana@gmail.com directly.");
            return;
        }
        emailjs.send("service_22b95u5", "template_hbmmbkn", formData)
        .then(() => {
            // Success State
            contactForm.innerHTML = `
                <div style="text-align:center; padding:40px; color: var(--text);">
                    <i class="fas fa-check-circle" style="font-size:50px; color:#16a34a; margin-bottom:20px; display:block;"></i>
                    <h3 style="margin-bottom:10px;">Message Sent!</h3>
                    <p style="opacity:0.8;">Thank you, I'll get back to you soon.</p>
                </div>
            `;
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            alert("Failed to send message. Please try again later.");
        });
    });
}
// =========================
// ACTIVE SECTION IN NAVIGATION
// =========================
(function(){
    const navAnchors = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
    if(!navAnchors.length || !("IntersectionObserver" in window)) return;
    const spy = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) return;
            navAnchors.forEach(a => {
                const on = a.getAttribute("href") === "#" + entry.target.id;
                a.classList.toggle("active", on);
                if(on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
            });
        });
    }, { rootMargin: "-45% 0px -50% 0px" });
    navAnchors.forEach(a => {
        const target = document.querySelector(a.getAttribute("href"));
        if(target) spy.observe(target);
    });
})();

// =========================
// MENU STATE FOR SCREEN READERS + CLOSE ON LINK CLICK
// =========================
if(hamburger && navLinks){
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-controls", "nav-links");
    hamburger.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", String(navLinks.classList.contains("show")));
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
        navLinks.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
    }));
}

// =========================
// PROJECTS CAROUSEL
// Native horizontal scrolling (touch swipe, trackpad, keyboard) with
// arrow buttons and page dots. Cards per view are set in CSS.
// =========================
(function(){
    const track = document.getElementById("projects-track");
    const prevBtn = document.getElementById("projects-prev");
    const nextBtn = document.getElementById("projects-next");
    const dotsWrap = document.getElementById("projects-dots");
    if(!track || !prevBtn || !nextBtn || !dotsWrap) return;

    const cards = Array.from(track.querySelectorAll(".premium-card"));
    cards.forEach((card, i) => {
        card.setAttribute("role", "group");
        card.setAttribute("aria-roledescription", "slide");
        card.setAttribute("aria-label", `${i + 1} of ${cards.length}`);
    });

    // Distance between the starts of two neighbouring cards
    const step = () => cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    const perView = () => Math.max(1, Math.round((track.clientWidth + 1) / step()));
    const maxScroll = () => track.scrollWidth - track.clientWidth;
    const pageCount = () => Math.max(1, Math.ceil((cards.length - perView()) / perView()) + 1);

    function currentPage(){
        if(track.scrollLeft >= maxScroll() - 2) return pageCount() - 1;
        return Math.round(track.scrollLeft / (step() * perView()));
    }

    function goToPage(page){
        const target = Math.min(page * perView() * step(), maxScroll());
        track.scrollTo({ left: target });
    }

    function renderDots(){
        const count = pageCount();
        dotsWrap.innerHTML = "";
        dotsWrap.hidden = count < 2;
        for(let i = 0; i < count; i++){
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "carousel-dot";
            dot.setAttribute("aria-label", `Show project page ${i + 1} of ${count}`);
            dot.addEventListener("click", () => goToPage(i));
            dotsWrap.appendChild(dot);
        }
    }

    function update(){
        const atStart = track.scrollLeft <= 2;
        const atEnd = track.scrollLeft >= maxScroll() - 2;
        prevBtn.disabled = atStart;
        nextBtn.disabled = atEnd;
        const page = currentPage();
        Array.from(dotsWrap.children).forEach((dot, i) => {
            if(i === page) dot.setAttribute("aria-current", "true");
            else dot.removeAttribute("aria-current");
        });
    }

    prevBtn.addEventListener("click", () => goToPage(Math.max(0, currentPage() - 1)));
    nextBtn.addEventListener("click", () => goToPage(Math.min(pageCount() - 1, currentPage() + 1)));

    let ticking = false;
    track.addEventListener("scroll", () => {
        if(ticking) return;
        ticking = true;
        requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });

    let lastPages = 0;
    function refresh(){
        if(pageCount() !== lastPages){ renderDots(); lastPages = pageCount(); }
        update();
    }
    window.addEventListener("resize", refresh);
    refresh();
})();
