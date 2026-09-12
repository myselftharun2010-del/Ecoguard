/* GET ELEMENTS */
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");
const clickSound = document.getElementById("clickSound");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const rotateButton = document.getElementById("rotateButton");
const molecule = document.querySelector(".molecule");
const themeToggle = document.getElementById("themeToggle");
const statNumbers = document.querySelectorAll(".stat-number");

/* ===== THEME TOGGLE ===== */
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
        playClickSound();
    });
}

initTheme();

/* ===== SOUND FUNCTION ===== */
function playClickSound() {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {
        console.log("Sound requires user interaction.");
    });
}

/* ===== SHOW SECTION ===== */
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove("active-section");
    });
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add("active-section");
    }
    
    navButtons.forEach(button => {
        button.classList.remove("active");
        if (button.dataset.section === sectionId) {
            button.classList.add("active");
        }
    });
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    if (navMenu) {
        navMenu.classList.remove("show");
    }
    
    if (sectionId === "stats") {
        animateStats();
    }
    
    playClickSound();
}

/* ===== ANIMATE STATISTICS ===== */
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseFloat(stat.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = (start + (target - start) * easeOutQuad(progress)).toFixed(1);
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        updateNumber();
    });
}

function easeOutQuad(t) {
    return t * (2 - t);
}

/* ===== NAVIGATION BUTTONS ===== */
navButtons.forEach(button => {
    button.addEventListener("click", () => {
        const sectionId = button.dataset.section;
        showSection(sectionId);
    });
});

/* ===== MOBILE MENU ===== */
if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        playClickSound();
    });
}

/* ===== 3D MODEL ROTATION ===== */
if (rotateButton && molecule) {
    rotateButton.addEventListener("click", () => {
        molecule.classList.remove("rotate");
        void molecule.offsetWidth;
        molecule.classList.add("rotate");
        playClickSound();
    });
}

/* ===== BUTTON INTERACTIONS ===== */
const allButtons = document.querySelectorAll("button");
allButtons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.animate(
            [
                { transform: "scale(1)" },
                { transform: "scale(0.96)" },
                { transform: "scale(1)" }
            ],
            {
                duration: 250,
                easing: "ease-out"
            }
        );
    });
});

/* ===== PAGE LOAD ANIMATION ===== */
window.addEventListener("load", () => {
    document.body.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        { duration: 700, easing: "ease" }
    );
});

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".feature-card, .glass-card, .gas-card, .prevention-card").forEach(el => {
    observer.observe(el);
});