/* =========================================================
   ECOGUARD - COMPLETE JAVASCRIPT
   ========================================================= */


/* ================= GET ELEMENTS ================= */

const navButtons =
    document.querySelectorAll(".nav-btn");

const sections =
    document.querySelectorAll(".page-section");

const themeToggle =
    document.getElementById("themeToggle");

const statNumbers =
    document.querySelectorAll(".counter");


/* ================= THEME ================= */

function initTheme() {

    let savedTheme = "dark";

    try {
        savedTheme =
            localStorage.getItem("theme") || "dark";
    } catch (error) {
        savedTheme = "dark";
    }

    document.documentElement
        .setAttribute("data-theme", savedTheme);

    updateThemeIcon(savedTheme);
}


function updateThemeIcon(theme) {

    if (!themeToggle) {
        return;
    }

    themeToggle.textContent =
        theme === "dark" ? "☀️" : "🌙";
}


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        const currentTheme =
            document.documentElement
                .getAttribute("data-theme") || "dark";

        const newTheme =
            currentTheme === "dark"
                ? "light"
                : "dark";

        document.documentElement
            .setAttribute("data-theme", newTheme);

        try {
            localStorage.setItem(
                "theme",
                newTheme
            );
        } catch (error) {
            console.log("Theme storage unavailable.");
        }

        updateThemeIcon(newTheme);

    });

}


initTheme();


/* ================= SHOW SECTION ================= */

function showSection(sectionId) {

    sections.forEach(section => {

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


    navButtons.forEach(button => {

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


/* ================= NAVIGATION ================= */

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.section;

        showSection(sectionId);

    });

});


/* ================= HERO BUTTONS ================= */

const sectionLinks =
    document.querySelectorAll(
        "[data-section-link]"
    );


sectionLinks.forEach(button => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.sectionLink;

        showSection(sectionId);

    });

});


/* ================= STATISTICS ================= */

let statisticsAnimated = false;


function animateStatistics() {

    if (statisticsAnimated) {
        return;
    }

    statisticsAnimated = true;


    statNumbers.forEach(stat => {

        const target =
            parseFloat(
                stat.dataset.target
            );

        const decimals =
            parseInt(
                stat.dataset.decimals || "1",
                10
            );

        const duration = 1600;

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
                progress *
                (2 - progress);


            const value =
                target * eased;


            stat.textContent =
                value.toFixed(decimals);


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            } else {

                stat.textContent =
                    target.toFixed(decimals);

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    });


    const countryBars =
        document.querySelectorAll(
            ".country-fill"
        );


    countryBars.forEach(bar => {

        const width =
            parseFloat(
                bar.dataset.width || 0
            );

        bar.style.width = "0%";


        setTimeout(() => {

            bar.style.width =
                width + "%";

        }, 100);

    });

}


/* ================= CARBON CALCULATOR ================= */

const carbonCar =
    document.getElementById("carbonCar");

const carbonCarOut =
    document.getElementById("carbonCarOut");

const carbonPower =
    document.getElementById("carbonPower");

const carbonPowerOut =
    document.getElementById("carbonPowerOut");

const carbonMeals =
    document.getElementById("carbonMeals");

const carbonMealsOut =
    document.getElementById("carbonMealsOut");

const carbonFlights =
    document.getElementById("carbonFlights");

const carbonFlightsOut =
    document.getElementById("carbonFlightsOut");


const carbonTotal =
    document.getElementById("carbonTotal");

const carbonComparison =
    document.getElementById("carbonComparison");


const carbonTransportBar =
    document.getElementById(
        "carbonTransportBar"
    );

const carbonEnergyBar =
    document.getElementById(
        "carbonEnergyBar"
    );

const carbonFoodBar =
    document.getElementById(
        "carbonFoodBar"
    );


const carbonTransportVal =
    document.getElementById(
        "carbonTransportVal"
    );

const carbonEnergyVal =
    document.getElementById(
        "carbonEnergyVal"
    );

const carbonFoodVal =
    document.getElementById(
        "carbonFoodVal"
    );


const carbonTipTitle =
    document.getElementById(
        "carbonTipTitle"
    );

const carbonTipText =
    document.getElementById(
        "carbonTipText"
    );


/* ================= CALCULATOR FUNCTION ================= */

function updateCarbonCalculator() {

    if (
        !carbonCar ||
        !carbonPower ||
        !carbonMeals ||
        !carbonFlights
    ) {
        return;
    }


    /* Values */

    const carKm =
        Number(carbonCar.value);

    const electricity =
        Number(carbonPower.value);

    const meals =
        Number(carbonMeals.value);

    const flights =
        Number(carbonFlights.value);


    /* Emission factors */

    const carEmission =
        carKm * 0.19;

    const electricityEmission =
        electricity * 0.42;

    const foodEmission =
        meals * 2.5;

    const flightEmission =
        flights * 255;


    /* Categories */

    const transport =
        carEmission + flightEmission;

    const energy =
        electricityEmission;

    const food =
        foodEmission;


    /* Total */

    const total =
        transport +
        energy +
        food;


    /* Update input labels */

    carbonCarOut.textContent =
        `${carKm} km`;

    carbonPowerOut.textContent =
        `${electricity} kWh`;

    carbonMealsOut.textContent =
        `${meals} meals`;

    carbonFlightsOut.textContent =
        `${flights} flights`;


    /* Update total */

    carbonTotal.textContent =
        `${total.toFixed(1)} kg`;


    /* Compare with 500 kg reference */

    const reference = 500;


    if (total > reference) {

        const percentage =
            ((total - reference) /
                reference) * 100;

        carbonComparison.textContent =
            `${percentage.toFixed(1)}% above the 500 kg monthly reference.`;

    } else if (total < reference) {

        const percentage =
            ((reference - total) /
                reference) * 100;

        carbonComparison.textContent =
            `${percentage.toFixed(1)}% below the 500 kg monthly reference.`;

    } else {

        carbonComparison.textContent =
            "Exactly at the 500 kg monthly reference.";

    }


    /* Update category values */

    carbonTransportVal.textContent =
        `${transport.toFixed(1)} kg`;

    carbonEnergyVal.textContent =
        `${energy.toFixed(1)} kg`;

    carbonFoodVal.textContent =
        `${food.toFixed(1)} kg`;


    /* Find largest category */

    const maximum =
        Math.max(
            transport,
            energy,
            food,
            1
        );


    /* Update bars */

    carbonTransportBar.style.width =
        `${(transport / maximum) * 100}%`;

    carbonEnergyBar.style.width =
        `${(energy / maximum) * 100}%`;

    carbonFoodBar.style.width =
        `${(food / maximum) * 100}%`;


    /* Recommendation */

    if (
        transport >= energy &&
        transport >= food
    ) {

        carbonTipTitle.textContent =
            "Reduce Transport Emissions";

        carbonTipText.textContent =
            "Try walking, cycling, public transport or carpooling. Reducing unnecessary flights can also make a large difference.";

    } else if (
        energy >= transport &&
        energy >= food
    ) {

        carbonTipTitle.textContent =
            "Reduce Electricity Use";

        carbonTipText.textContent =
            "Switch off unused appliances, use efficient devices and consider cleaner energy sources where available.";

    } else {

        carbonTipTitle.textContent =
            "Reduce Food Emissions";

        carbonTipText.textContent =
            "Consider reducing meat-heavy meals and adding more plant-based meals to your diet.";

    }

}


/* ================= CALCULATOR EVENTS ================= */

[
    carbonCar,
    carbonPower,
    carbonMeals,
    carbonFlights
].forEach(input => {

    if (input) {

        input.addEventListener(
            "input",
            updateCarbonCalculator
        );

    }

});


/* Initial calculator calculation */

updateCarbonCalculator();


/* ================= BUTTON PRESS ANIMATION ================= */

const allButtons =
    document.querySelectorAll("button");


allButtons.forEach(button => {

    button.addEventListener(
        "mousedown",
        () => {

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
                    duration: 220,
                    easing: "ease-out"
                }
            );

        }
    );

});


/* ================= PAGE LOAD ================= */

window.addEventListener(
    "load",
    () => {

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


/* ================= SCROLL ANIMATION ================= */

if (
    "IntersectionObserver" in window
) {

    const observerOptions = {

        threshold: 0.1,

        rootMargin:
            "0px 0px -50px 0px"

    };


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
            ".feature-card, .glass-card, .gas-card, .prevention-card"
        )
        .forEach(element => {

            observer.observe(element);

        });

}
