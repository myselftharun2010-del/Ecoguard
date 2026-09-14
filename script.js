/* =========================================================
   ECOGUARD - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   GET ELEMENTS
========================================================= */

const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".page-section");

const themeToggle = document.getElementById("themeToggle");

const statNumbers = document.querySelectorAll(".counter");
const countryFills = document.querySelectorAll(".country-fill");


/* =========================================================
   THEME
========================================================= */

function getSavedTheme() {

    try {

        return localStorage.getItem("theme") || "dark";

    } catch (error) {

        return "dark";

    }

}


function saveTheme(theme) {

    try {

        localStorage.setItem("theme", theme);

    } catch (error) {

        /* Ignore storage errors */
    }

}


function updateThemeIcon(theme) {

    if (!themeToggle) {
        return;
    }

    themeToggle.textContent =
        theme === "dark"
            ? "☀️"
            : "🌙";

}


function initTheme() {

    const savedTheme = getSavedTheme();

    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );

    updateThemeIcon(savedTheme);

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const currentTheme =
                document.documentElement.getAttribute(
                    "data-theme"
                ) || "dark";

            const newTheme =
                currentTheme === "dark"
                    ? "light"
                    : "dark";

            document.documentElement.setAttribute(
                "data-theme",
                newTheme
            );

            saveTheme(newTheme);

            updateThemeIcon(newTheme);

        }
    );

}


initTheme();


/* =========================================================
   SHOW SECTION
========================================================= */

function showSection(sectionId) {

    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    navButtons.forEach(function (button) {

        button.classList.remove("active");


        if (
            button.dataset.section ===
            sectionId
        ) {

            button.classList.add("active");

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (
        sectionId === "home"
    ) {

        animateStatistics();

    }

}


/* =========================================================
   NAVIGATION BUTTONS
========================================================= */

navButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const sectionId =
                button.dataset.section;

            showSection(sectionId);

        }
    );

});


/* =========================================================
   HERO / CARD SECTION BUTTONS
========================================================= */

const sectionLinkButtons =
    document.querySelectorAll(
        "[data-section-link]"
    );


sectionLinkButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const sectionId =
                button.dataset.sectionLink;

            showSection(sectionId);

        }
    );

});


/* =========================================================
   ANIMATE STATISTICS
========================================================= */

let statisticsAnimated = false;


function animateStatistics() {

    if (statisticsAnimated) {
        return;
    }

    statisticsAnimated = true;


    /* Number counters */

    statNumbers.forEach(function (stat) {

        const target =
            parseFloat(
                stat.dataset.target
            );


        const decimals =
            parseInt(
                stat.dataset.decimals || "1",
                10
            );


        if (isNaN(target)) {
            return;
        }


        const duration = 1500;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const current =
                target * eased;


            stat.textContent =
                current.toFixed(decimals);


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    });


    /* Country bars */

    countryFills.forEach(function (bar) {

        const width =
            parseFloat(
                bar.dataset.width
            );


        if (isNaN(width)) {
            return;
        }


        bar.style.width = "0%";


        requestAnimationFrame(
            function () {

                setTimeout(
                    function () {

                        bar.style.width =
                            width + "%";

                    },
                    100
                );

            }
        );

    });

}


/* =========================================================
   CARBON CALCULATOR
========================================================= */

(function initCarbonCalculator() {

    const car =
        document.getElementById(
            "carbonCar"
        );

    const power =
        document.getElementById(
            "carbonPower"
        );

    const meals =
        document.getElementById(
            "carbonMeals"
        );

    const flights =
        document.getElementById(
            "carbonFlights"
        );


    const carOut =
        document.getElementById(
            "carbonCarOut"
        );

    const powerOut =
        document.getElementById(
            "carbonPowerOut"
        );

    const mealsOut =
        document.getElementById(
            "carbonMealsOut"
        );

    const flightsOut =
        document.getElementById(
            "carbonFlightsOut"
        );


    const totalOutput =
        document.getElementById(
            "carbonTotal"
        );

    const comparison =
        document.getElementById(
            "carbonComparison"
        );


    const transportBar =
        document.getElementById(
            "carbonTransportBar"
        );

    const energyBar =
        document.getElementById(
            "carbonEnergyBar"
        );

    const foodBar =
        document.getElementById(
            "carbonFoodBar"
        );


    const transportValue =
        document.getElementById(
            "carbonTransportVal"
        );

    const energyValue =
        document.getElementById(
            "carbonEnergyVal"
        );

    const foodValue =
        document.getElementById(
            "carbonFoodVal"
        );


    const tipTitle =
        document.getElementById(
            "carbonTipTitle"
        );

    const tipText =
        document.getElementById(
            "carbonTipText"
        );


    /*
        If the calculator is not present,
        safely stop.
    */

    if (
        !car ||
        !power ||
        !meals ||
        !flights
    ) {

        return;

    }


    /*
        Simplified educational emission factors.

        Driving:
        0.19 kg CO₂e / km

        Electricity:
        0.42 kg CO₂e / kWh

        Meat-based meal:
        2.5 kg CO₂e / meal

        Short flight:
        255 kg CO₂e / flight
    */

    const FACTORS = {

        driving: 0.19,

        electricity: 0.42,

        meal: 2.5,

        flight: 255

    };


    const MONTHLY_REFERENCE =
        500;


    function formatNumber(number) {

        return number.toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 1
            }
        );

    }


    function updateCalculator() {

        const drivingKm =
            Number(car.value) || 0;

        const electricity =
            Number(power.value) || 0;

        const meatMeals =
            Number(meals.value) || 0;

        const shortFlights =
            Number(flights.value) || 0;


        /* Category calculations */

        const drivingEmissions =
            drivingKm *
            FACTORS.driving;


        const flightEmissions =
            shortFlights *
            FACTORS.flight;


        const transportEmissions =
            drivingEmissions +
            flightEmissions;


        const energyEmissions =
            electricity *
            FACTORS.electricity;


        const foodEmissions =
            meatMeals *
            FACTORS.meal;


        const total =
            transportEmissions +
            energyEmissions +
            foodEmissions;


        /* Update slider labels */

        carOut.textContent =
            `${drivingKm} km`;

        powerOut.textContent =
            `${electricity} kWh`;

        mealsOut.textContent =
            `${meatMeals} meals`;

        flightsOut.textContent =
            `${shortFlights} flights`;


        /* Update total */

        totalOutput.textContent =
            formatNumber(total);


        /* Comparison */

        const difference =
            total - MONTHLY_REFERENCE;


        if (total === 0) {

            comparison.textContent =
                "No activity entered yet.";

        } else if (difference > 0) {

            const percentage =
                (
                    difference /
                    MONTHLY_REFERENCE *
                    100
                ).toFixed(0);

            comparison.textContent =
                `${percentage}% above the 500 kg monthly reference.`;

        } else {

            const percentage =
                (
                    Math.abs(difference) /
                    MONTHLY_REFERENCE *
                    100
                ).toFixed(0);

            comparison.textContent =
                `${percentage}% below the 500 kg monthly reference.`;

        }


        /* Category values */

        transportValue.textContent =
            `${formatNumber(transportEmissions)} kg`;

        energyValue.textContent =
            `${formatNumber(energyEmissions)} kg`;

        foodValue.textContent =
            `${formatNumber(foodEmissions)} kg`;


        /*
            Make the largest category 100%
            so the bars are easy to compare.
        */

        const maximum =
            Math.max(
                transportEmissions,
                energyEmissions,
                foodEmissions,
                1
            );


        transportBar.style.width =
            `${transportEmissions / maximum * 100}%`;


        energyBar.style.width =
            `${energyEmissions / maximum * 100}%`;


        foodBar.style.width =
            `${foodEmissions / maximum * 100}%`;


        /* Determine largest category */

        const categories = [

            {
                name: "Transport",
                value: transportEmissions
            },

            {
                name: "Energy",
                value: energyEmissions
            },

            {
                name: "Food",
                value: foodEmissions
            }

        ];


        categories.sort(
            function (a, b) {

                return b.value - a.value;

            }
        );


        const largest =
            categories[0];


        if (
            !largest ||
            largest.value === 0
        ) {

            tipTitle.textContent =
                "Eco Tip";

            tipText.textContent =
                "Adjust the sliders to calculate your footprint.";

            return;

        }


        /* Recommendations */

        if (
            largest.name ===
            "Transport"
        ) {

            tipTitle.textContent =
                "🚗 Transport Tip";

            tipText.textContent =
                "Try walking, cycling, public transport or combining trips. Reducing unnecessary driving and flights can significantly lower transport emissions.";

        } else if (
            largest.name ===
            "Energy"
        ) {

            tipTitle.textContent =
                "⚡ Energy Tip";

            tipText.textContent =
                "Switch off unused appliances, use efficient devices and reduce unnecessary electricity consumption.";

        } else {

            tipTitle.textContent =
                "🥗 Food Tip";

            tipText.textContent =
                "Consider reducing high-emission meals and adding more lower-emission food choices to your routine.";

        }

    }


    /* Listen for slider changes */

    car.addEventListener(
        "input",
        updateCalculator
    );

    power.addEventListener(
        "input",
        updateCalculator
    );

    meals.addEventListener(
        "input",
        updateCalculator
    );

    flights.addEventListener(
        "input",
        updateCalculator
    );


    /* Initial calculation */

    updateCalculator();

})();


/* =========================================================
   BUTTON PRESS EFFECT
========================================================= */

const allButtons =
    document.querySelectorAll(
        "button"
    );


allButtons.forEach(function (button) {

    button.addEventListener(
        "mousedown",
        function () {

            button.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },

                    {
                        transform:
                            "scale(0.96)"
                    },

                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 220,
                    easing: "ease-out"
                }
            );

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    function () {

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


        animateStatistics();

    }
);


/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

if (
    "IntersectionObserver"
    in window
) {

    const observerOptions = {

        threshold: 0.10,

        rootMargin:
            "0px 0px -40px 0px"

    };


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

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

                    }
                );

            },
            observerOptions
        );


    const animatedElements =
        document.querySelectorAll(
            ".feature-card, .glass-card, .gas-card, .prevention-card"
        );


    animatedElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}
