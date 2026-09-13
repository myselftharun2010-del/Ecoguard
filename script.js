/* =========================================================
   ECOGUARD - COMPLETE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   GET ELEMENTS
========================================================= */

const navButtons = document.querySelectorAll(".nav-btn");

const sections = document.querySelectorAll(".page-section");

const clickSound = document.getElementById("clickSound");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const themeToggle = document.getElementById("themeToggle");

const statNumbers = document.querySelectorAll(".counter");


/* =========================================================
   CLICK SOUND
========================================================= */

function playClickSound() {

    if (!clickSound) {
        return;
    }

    clickSound.currentTime = 0;

    clickSound.play().catch(() => {
        /* Audio is optional */
    });
}


/* =========================================================
   THEME
========================================================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem("theme") || "dark";

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    updateThemeIcon(savedTheme);
}


function updateThemeIcon(theme) {

    if (!themeToggle) {
        return;
    }

    themeToggle.textContent =
        theme === "dark" ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement.getAttribute("data-theme") ||
            "dark";

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            newTheme
        );

        localStorage.setItem(
            "theme",
            newTheme
        );

        updateThemeIcon(newTheme);

        playClickSound();

    });

}


initTheme();


/* =========================================================
   SHOW SECTION
========================================================= */

function showSection(sectionId, playSound = true) {

    const selectedSection =
        document.getElementById(sectionId);

    if (!selectedSection) {
        return;
    }


    sections.forEach(section => {

        section.classList.remove(
            "active-section"
        );

    });


    selectedSection.classList.add(
        "active-section"
    );


    navButtons.forEach(button => {

        button.classList.remove("active");

        if (
            button.dataset.section ===
            sectionId
        ) {

            button.classList.add("active");

        }

    });


    if (navMenu) {

        navMenu.classList.remove("show");

    }


    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "stats") {

        animateStats();

    }


    if (playSound) {

        playClickSound();

    }

}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.section;

        showSection(sectionId);

    });

});


/* =========================================================
   HOME INTERNAL BUTTONS
========================================================= */

document.querySelectorAll(
    "[data-section]:not(.nav-btn)"
).forEach(button => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.section;

        showSection(sectionId);

    });

});


/* =========================================================
   STATISTICS ANIMATION
========================================================= */

let statisticsAnimated = false;


function animateStats() {

    if (statisticsAnimated) {
        return;
    }

    statisticsAnimated = true;


    statNumbers.forEach(stat => {

        const target =
            parseFloat(stat.dataset.target);

        if (Number.isNaN(target)) {
            return;
        }


        const duration = 1600;

        const start = 0;

        const startTime =
            performance.now();


        function updateNumber(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                easeOutQuad(progress);


            const current =
                start +
                (target - start) * eased;


            stat.textContent =
                current.toFixed(2);


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    });

}


function easeOutQuad(t) {

    return t * (2 - t);

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        playClickSound();

    });

}


/* =========================================================
   BUTTON PRESS ANIMATION
========================================================= */

const allButtons =
    document.querySelectorAll("button");


allButtons.forEach(button => {

    button.addEventListener(
        "mousedown",
        () => {

            if (
                typeof button.animate !==
                "function"
            ) {
                return;
            }


            button.animate(
                [
                    {
                        transform: "scale(1)"
                    },
                    {
                        transform: "scale(0.96)"
                    },
                    {
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 250,
                    easing: "ease-out"
                }
            );

        }
    );

});


/* =========================================================
   PAGE LOAD ANIMATION
========================================================= */

window.addEventListener("load", () => {

    if (
        typeof document.body.animate !==
        "function"
    ) {
        return;
    }


    document.body.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ],
        {
            duration: 700,
            easing: "ease"
        }
    );

});


/* =========================================================
   CARBON CALCULATOR
========================================================= */

const carbonCar =
    document.getElementById("carbonCar");

const carbonPower =
    document.getElementById("carbonPower");

const carbonMeals =
    document.getElementById("carbonMeals");

const carbonFlights =
    document.getElementById("carbonFlights");


const carbonCarOut =
    document.getElementById("carbonCarOut");

const carbonPowerOut =
    document.getElementById("carbonPowerOut");

const carbonMealsOut =
    document.getElementById("carbonMealsOut");

const carbonFlightsOut =
    document.getElementById("carbonFlightsOut");


const carbonTotal =
    document.getElementById("carbonTotal");

const carbonComparison =
    document.getElementById("carbonComparison");


const carbonTransportBar =
    document.getElementById("carbonTransportBar");

const carbonEnergyBar =
    document.getElementById("carbonEnergyBar");

const carbonFoodBar =
    document.getElementById("carbonFoodBar");


const carbonTransportVal =
    document.getElementById("carbonTransportVal");

const carbonEnergyVal =
    document.getElementById("carbonEnergyVal");

const carbonFoodVal =
    document.getElementById("carbonFoodVal");


const carbonTipTitle =
    document.getElementById("carbonTipTitle");

const carbonTipText =
    document.getElementById("carbonTipText");


function calculateCarbon() {

    if (
        !carbonCar ||
        !carbonPower ||
        !carbonMeals ||
        !carbonFlights
    ) {
        return;
    }


    const carKm =
        Number(carbonCar.value);

    const electricity =
        Number(carbonPower.value);

    const meals =
        Number(carbonMeals.value);

    const flights =
        Number(carbonFlights.value);


    /* Emission factors */

    const carCarbon =
        carKm * 0.19;

    const electricityCarbon =
        electricity * 0.42;

    const foodCarbon =
        meals * 2.5;

    const flightCarbon =
        flights * 255;


    /* Categories */

    const transportCarbon =
        carCarbon + flightCarbon;

    const energyCarbon =
        electricityCarbon;

    const totalCarbon =
        transportCarbon +
        energyCarbon +
        foodCarbon;


    /* Input labels */

    if (carbonCarOut) {

        carbonCarOut.textContent =
            `${carKm} km`;

    }

    if (carbonPowerOut) {

        carbonPowerOut.textContent =
            `${electricity} kWh`;

    }

    if (carbonMealsOut) {

        carbonMealsOut.textContent =
            `${meals} meals`;

    }

    if (carbonFlightsOut) {

        carbonFlightsOut.textContent =
            `${flights} flights`;

    }


    /* Total */

    if (carbonTotal) {

        carbonTotal.textContent =
            totalCarbon.toFixed(1);

    }


    /* Category values */

    if (carbonTransportVal) {

        carbonTransportVal.textContent =
            `${transportCarbon.toFixed(1)} kg`;

    }

    if (carbonEnergyVal) {

        carbonEnergyVal.textContent =
            `${energyCarbon.toFixed(1)} kg`;

    }

    if (carbonFoodVal) {

        carbonFoodVal.textContent =
            `${foodCarbon.toFixed(1)} kg`;

    }


    /* Bar calculation */

    const maximum =
        Math.max(
            transportCarbon,
            energyCarbon,
            foodCarbon,
            1
        );


    if (carbonTransportBar) {

        carbonTransportBar.style.width =
            `${Math.min(
                (transportCarbon / maximum) * 100,
                100
            )}%`;

    }


    if (carbonEnergyBar) {

        carbonEnergyBar.style.width =
            `${Math.min(
                (energyCarbon / maximum) * 100,
                100
            )}%`;

    }


    if (carbonFoodBar) {

        carbonFoodBar.style.width =
            `${Math.min(
                (foodCarbon / maximum) * 100,
                100
            )}%`;

    }


    /* 500 kg reference */

    const reference =
        500;

    const difference =
        totalCarbon - reference;


    if (carbonComparison) {

        if (totalCarbon === 0) {

            carbonComparison.textContent =
                "Your current estimate is 0 kg CO₂.";

        }

        else if (difference > 0) {

            carbonComparison.textContent =
                `Your estimate is ${difference.toFixed(1)} kg above the 500 kg monthly reference.`;

        }

        else if (difference < 0) {

            carbonComparison.textContent =
                `Your estimate is ${Math.abs(difference).toFixed(1)} kg below the 500 kg monthly reference.`;

        }

        else {

            carbonComparison.textContent =
                "Your estimate is exactly 500 kg CO₂ per month.";

        }

    }


    /* Largest category */

    let largestCategory =
        "transport";


    if (
        energyCarbon >=
        transportCarbon &&
        energyCarbon >=
        foodCarbon
    ) {

        largestCategory =
            "energy";

    }

    else if (
        foodCarbon >=
        transportCarbon &&
        foodCarbon >=
        energyCarbon
    ) {

        largestCategory =
            "food";

    }


    /* Recommendations */

    if (
        carbonTipTitle &&
        carbonTipText
    ) {

        if (totalCarbon === 0) {

            carbonTipTitle.textContent =
                "🌱 Great start";

            carbonTipText.textContent =
                "Your current calculator values produce a zero estimate. Try entering your normal monthly activities.";

        }

        else if (
            largestCategory ===
            "transport"
        ) {

            carbonTipTitle.textContent =
                "🚗 Focus on transport";

            carbonTipText.textContent =
                "Try walking, cycling, public transport, carpooling or reducing unnecessary trips.";

        }

        else if (
            largestCategory ===
            "energy"
        ) {

            carbonTipTitle.textContent =
                "⚡ Focus on home energy";

            carbonTipText.textContent =
                "Switch off unused appliances, use efficient lighting and reduce unnecessary electricity use.";

        }

        else {

            carbonTipTitle.textContent =
                "🥗 Focus on food";

            carbonTipText.textContent =
                "Reducing meat-based meals and avoiding food waste can lower your food-related footprint.";

        }

    }

}


/* =========================================================
   CALCULATOR INPUT EVENTS
========================================================= */

[
    carbonCar,
    carbonPower,
    carbonMeals,
    carbonFlights
].forEach(input => {

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        calculateCarbon
    );

});


/* Initial calculation */

calculateCarbon();


/* =========================================================
   SCROLL ANIMATIONS
========================================================= */

const observerOptions = {

    threshold: 0.1,

    rootMargin:
        "0px 0px -50px 0px"

};


if (
    "IntersectionObserver" in window
) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            observerOptions
        );


    document
        .querySelectorAll(
            ".feature-card, .gas-card, .prevention-card, .info-card, .stat-card"
        )
        .forEach(element => {

            observer.observe(element);

        });

}
