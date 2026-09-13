/* =====================================
   ECOGUARD - ADVANCED STYLES
===================================== */

:root {
    --primary: #50FF96;
    --secondary: #9DFFC0;
    --accent: #A9FFC3;
    --dark-bg: #061b17;
    --card-bg: rgba(255,255,255,0.08);
    --text-light: rgba(255,255,255,0.75);
    --text-lighter: rgba(255,255,255,0.5);
}

[data-theme="light"] {
    --primary: #1EA56E;
    --secondary: #16A34A;
    --accent: #15803D;
    --dark-bg: #F0F9FF;
    --card-bg: rgba(0,0,0,0.05);
    --text-light: #1F2937;
    --text-lighter: #6B7280;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: "Poppins", sans-serif;
    min-height: 100vh;
    color: white;
    background: linear-gradient(135deg, #061b17, #082c24, #061d2a);
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
}

[data-theme="light"] body {
    background: linear-gradient(135deg, #E0F2FE, #F0F9FF, #E0F2FE);
    color: #1F2937;
}

/* ===== LOGIN MODAL ===== */
.login-modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.75);
    z-index: 9999;
}

.login-modal.hidden {
    display: none !important;
}

.login-container {
    width: min(520px, 92%);
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.12);
    padding: 28px;
    border-radius: 18px;
    backdrop-filter: blur(12px);
    box-shadow: 0 25px 80px rgba(0,0,0,0.6);
}

.login-header h1 {
    font-size: 26px;
    margin-bottom: 6px;
}

.login-header p {
    color: var(--text-light);
    margin-bottom: 18px;
}

.login-form .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 14px;
}

.login-form label {
    color: var(--text-lighter);
    font-size: 13px;
}

.login-form input {
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.12);
    color: inherit;
}

.login-btn {
    width: 100%;
    padding: 12px 16px;
    margin-top: 6px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    color: #001;
    font-weight: 700;
    cursor: pointer;
}

.login-note {
    margin-top: 12px;
    color: var(--text-lighter);
    font-size: 13px;
    text-align: center;
}

/* ===== USER PROFILE (small) ===== */
.user-profile-container {
    position: fixed;
    left: 20px;
    top: 22px;
    z-index: 2001; /* below modal but above navbar */
}

.profile-btn {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    padding: 8px 12px;
    border-radius: 18px;
    cursor: pointer;
    color: inherit;
}

.profile-dropdown {
    display: none;
    margin-top: 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 12px;
    border-radius: 12px;
}

.profile-dropdown.show {
    display: block;
}

.profile-info p {
    font-size: 14px;
    color: var(--text-light);
    margin-bottom: 6px;
}

.logout-btn {
    margin-top: 8px;
    padding: 8px 10px;
    border-radius: 8px;
    border: none;
    background: rgba(255,80,80,0.12);
    color: #fff;
    cursor: pointer;
}

/* ===== BACKGROUND ===== */
.background {
    position: fixed;
    inset: 0;
    z-index: -2;
    background: radial-gradient(circle at 10% 20%, rgba(80, 255, 150, 0.18), transparent 30%),
                radial-gradient(circle at 85% 30%, rgba(80, 180, 255, 0.18), transparent 30%),
                radial-gradient(circle at 50% 100%, rgba(80, 255, 190, 0.15), transparent 40%);
    animation: backgroundMove 12s ease-in-out infinite alternate;
}

@keyframes backgroundMove {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
}

[data-theme="light"] .background {
    background: radial-gradient(circle at 10% 20%, rgba(22, 163, 74, 0.1), transparent 30%),
                radial-gradient(circle at 85% 30%, rgba(34, 197, 94, 0.1), transparent 30%),
                radial-gradient(circle at 50% 100%, rgba(34, 197, 94, 0.08), transparent 40%);
}

/* ===== PARTICLES ===== */
.particles span {
    position: fixed;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(150, 255, 190, 0.35);
    filter: blur(1px);
    animation: floatParticle 8s infinite ease-in-out;
    z-index: -1;
}

.particles span:nth-child(1) { left: 10%; top: 20%; }
.particles span:nth-child(2) { left: 80%; top: 15%; }
.particles span:nth-child(3) { left: 20%; top: 80%; }
.particles span:nth-child(4) { left: 70%; top: 75%; }
.particles span:nth-child(5) { left: 50%; top: 45%; }

@keyframes floatParticle {
    0% { transform: translateY(0); }
    50% { transform: translateY(-40px); }
    100% { transform: translateY(0); }
}

/* ===== THEME TOGGLE ===== */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(80,255,150,0.3), rgba(30,160,110,0.3));
    border: 2px solid var(--primary);
    font-size: 24px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(80,255,150,0.2);
}

.theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(80,255,150,0.4);
}

/* ===== NAVIGATION ===== */
/* ... (rest of your original CSS stays unchanged) ... */

/* For brevity: the remainder of your existing style rules (navbar, hero, sections, feature cards, charts, etc.)
   should be kept exactly as in your original style.css file. */
