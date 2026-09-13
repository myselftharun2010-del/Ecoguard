/* GET ELEMENTS */
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");
const clickSound = document.getElementById("clickSound");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const rotateButton = document.getElementById("rotateButton");
const molecule = document.querySelector(".molecule");
const themeToggle = document.getElementById("themeToggle");
const counters = document.querySelectorAll(".counter");

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
        animateBars();
    }
    
    playClickSound();
}

/* ===== ANIMATE STATISTICS ===== */
function animateStats() {
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const duration = 2000;
        const start = 0;
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = (start + (target - start) * easeOutQuad(progress)).toFixed(1);
            counter.textContent = current;
            
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

/* ===== ANIMATE BARS ===== */
function animateBars() {
    const bars = document.querySelectorAll(".metric-bar, .bar, .region-bar, .reduction-bar");
    bars.forEach((bar, index) => {
        setTimeout(() => {
            const targetWidth = bar.style.width || "100%";
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.transition = "width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
                bar.style.width = targetWidth;
            }, 50);
        }, index * 100);
    });
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

/* ===== 3D MODEL VIEWER CONTROLS ===== */
const viewer = document.getElementById("modelViewer");
const loading = document.getElementById("loading");
const fileInput = document.getElementById("fileInput");

let rotating = true;

if (viewer) {
    viewer.addEventListener("load", () => {
        if (loading) {
            loading.innerText = "3D Model Loaded";
            setTimeout(() => {
                loading.style.opacity = "0";
            }, 1500);
        }
    });
}

function resetCamera() {
    if (viewer) {
        viewer.cameraOrbit = "0deg 75deg 105%";
        viewer.fieldOfView = "30deg";
    }
}

function toggleRotation() {
    if (!viewer) return;
    rotating = !rotating;
    if (rotating) {
        viewer.setAttribute("auto-rotate", "");
    } else {
        viewer.removeAttribute("auto-rotate");
    }
}

function toggleFullscreen() {
    const box = document.querySelector(".viewer-box");
    if (!box) return;
    if (!document.fullscreenElement) {
        box.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

if (fileInput) {
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file || !viewer) return;
        const url = URL.createObjectURL(file);
        viewer.src = url;
        if (loading) {
            loading.innerText = "Loading New Model...";
            loading.style.opacity = "1";
        }
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
}
                                                                                            /* ===== LOGIN SYSTEM ===== */
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const profileBtn = document.getElementById("profileBtn");
const profileDropdown = document.getElementById("profileDropdown");
const logoutBtn = document.getElementById("logoutBtn");

// Initialize login on page load
function initLogin() {
    const storedUser = localStorage.getItem("ecoguard_user");
    
    if (storedUser) {
        const user = JSON.parse(storedUser);
        hideLoginModal();
        displayUserProfile(user);
    } else {
        showLoginModal();
    }
}

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const userName = document.getElementById("userName").value.trim();
    const userEmail = document.getElementById("userEmail").value.trim();
    
    if (userName && userEmail) {
        // Store user data in localStorage
        const userData = {
            name: userName,
            email: userEmail,
            loginDate: new Date().toLocaleDateString()
        };
        
        localStorage.setItem("ecoguard_user", JSON.stringify(userData));
        updateAllUsersOnLogin(userData);
        
        // Hide login modal and show profile
        hideLoginModal();
        displayUserProfile(userData);
        
        // Clear form
        loginForm.reset();
        
        playClickSound();
    }
});

// Display user profile
function displayUserProfile(user) {
    document.getElementById("userName").textContent = user.name.split(" ")[0];
    document.getElementById("displayName").textContent = user.name;
    document.getElementById("displayEmail").textContent = user.email;
}

// Show/Hide login modal
function showLoginModal() {
    loginModal.classList.remove("hidden");
}

function hideLoginModal() {
    loginModal.classList.add("hidden");
}

// Toggle profile dropdown
profileBtn.addEventListener("click", () => {
    profileDropdown.classList.toggle("show");
    playClickSound();
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.closest(".user-profile-container")) {
        profileDropdown.classList.remove("show");
    }
});

// Logout function
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("ecoguard_user");
    profileDropdown.classList.remove("show");
    showLoginModal();
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    playClickSound();
});

// Get all users from localStorage
function getAllUsersFromStorage() {
    const currentUser = localStorage.getItem("ecoguard_user");
    const allUsers = JSON.parse(localStorage.getItem("ecoguard_all_users") || "[]");
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        const userExists = allUsers.some(u => u.email === user.email);
        if (!userExists) {
            allUsers.push(user);
            localStorage.setItem("ecoguard_all_users", JSON.stringify(allUsers));
        }
    }
    
    return allUsers;
}

// Update all users on login
function updateAllUsersOnLogin(userData) {
    const allUsers = JSON.parse(localStorage.getItem("ecoguard_all_users") || "[]");
    const userExists = allUsers.some(u => u.email === userData.email);
    
    if (!userExists) {
        allUsers.push(userData);
        localStorage.setItem("ecoguard_all_users", JSON.stringify(allUsers));
    }
    
}

// Initialize login system when page loads
initLogin();
);
console.log("loginModal:", document.getElementById("loginModal"));
console.log("loginForm:", document.getElementById("loginForm"));
console.log("profileBtn:", document.getElementById("profileBtn"));
