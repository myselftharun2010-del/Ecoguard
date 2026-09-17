/* =========================================================
   ECOGUARD - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       SECTION NAVIGATION
       ===================================================== */

    const sections =
        document.querySelectorAll(".page-section");

    const navButtons =
        document.querySelectorAll(".nav-btn");

    const targetButtons =
        document.querySelectorAll("[data-target]");


    function showSection(sectionId) {

        const target =
            document.getElementById(sectionId);

        if (!target) {
            return;
        }


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        target.classList.add(
            "active-section"
        );


        navButtons.forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.section === sectionId
            ) {

                button.classList.add("active");

            }

        });


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        history.replaceState(
            null,
            "",
            "#" + sectionId
        );
    }


    /* Main navigation */

    navButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    });


    /* Hero / cards / footer */

    targetButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const target =
                    button.dataset.target;

                if (!target) {
                    return;
                }

                event.preventDefault();

                showSection(target);

            }
        );

    });


    /* =====================================================
       ABOUT DETAIL POPUPS
       ===================================================== */

    function closeAllAboutPopups() {

        document.querySelectorAll(".about-popup").forEach(popup => {
            popup.classList.remove("show");
            popup.setAttribute("aria-hidden", "true");
        });

        document.body.style.overflow = "";
    }

    // Event delegation makes the popup buttons work even if the cards
    // are changed/re-rendered later.
    document.addEventListener("click", event => {

        const popupButton = event.target.closest("[data-popup]");

        if (popupButton) {
            event.preventDefault();
            event.stopPropagation();

            const popupId = popupButton.getAttribute("data-popup");
            const popup = document.getElementById(popupId);

            if (!popup) {
                console.warn("EcoGuard popup not found:", popupId);
                return;
            }

            closeAllAboutPopups();
            popup.classList.add("show");
            popup.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
            return;
        }

        const closeButton = event.target.closest("[data-close-popup]");

        if (closeButton) {
            event.preventDefault();
            closeAllAboutPopups();
            return;
        }

        if (event.target.classList.contains("about-popup")) {
            closeAllAboutPopups();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeAllAboutPopups();
        }
    });


    /* =====================================================
       OPEN SECTION FROM URL HASH
       ===================================================== */

    function openHashSection() {

        const hash =
            window.location.hash.replace("#", "");

        if (
            hash &&
            document.getElementById(hash)
        ) {

            showSection(hash);

        }

    }


    openHashSection();


    /* =====================================================
       CARBON STATISTICS COUNTER
       ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    function animateCounter(element) {

        const target =
            Number(element.dataset.value);

        if (!Number.isFinite(target)) {
            return;
        }


        const duration = 1400;

        const startTime =
            performance.now();


        function update(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const value =
                target * eased;


            let decimals = 0;


            if (
                target % 1 !== 0
            ) {

                decimals =
                    target < 10 ? 2 : 1;

            }


            element.textContent =
                value.toFixed(decimals);


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target.toFixed(decimals);

            }

        }


        requestAnimationFrame(update);

    }


    let statisticsStarted = false;


    const statisticsSection =
        document.querySelector(
            "#home"
        );


    if (statisticsSection) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !statisticsStarted
                        ) {

                            statisticsStarted = true;

                            counters.forEach(
                                animateCounter
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );


        observer.observe(
            statisticsSection
        );

    }


    /* =====================================================
       CARBON CALCULATOR
       ===================================================== */

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


    const total =
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


    const transportVal =
        document.getElementById(
            "carbonTransportVal"
        );

    const energyVal =
        document.getElementById(
            "carbonEnergyVal"
        );

    const foodVal =
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


    const FACTORS = {

        car: 0.19,

        electricity: 0.42,

        meal: 2.5,

        flight: 255

    };


    const MONTHLY_REFERENCE = 500;


    function updateCalculator() {

        if (
            !car ||
            !power ||
            !meals ||
            !flights
        ) {

            return;

        }


        const carKm =
            Number(car.value);

        const electricity =
            Number(power.value);

        const mealCount =
            Number(meals.value);

        const flightCount =
            Number(flights.value);


        /* Category calculations */

        const carCO2 =
            carKm * FACTORS.car;

        const electricityCO2 =
            electricity *
            FACTORS.electricity;

        const foodCO2 =
            mealCount *
            FACTORS.meal;

        const flightCO2 =
            flightCount *
            FACTORS.flight;


        const transportCO2 =
            carCO2 + flightCO2;


        const totalCO2 =
            transportCO2 +
            electricityCO2 +
            foodCO2;


        /* Update slider labels */

        carOut.textContent =
            `${carKm} km`;

        powerOut.textContent =
            `${electricity} kWh`;

        mealsOut.textContent =
            `${mealCount} meals`;

        flightsOut.textContent =
            `${flightCount} flights`;


        /* Total */

        total.textContent =
            Math.round(totalCO2);


        /* Comparison */

        const percentage =
            (
                totalCO2 /
                MONTHLY_REFERENCE
            ) * 100;


        if (totalCO2 < 250) {

            comparison.textContent =
                `Your estimated footprint is ${Math.round(
                    percentage
                )}% of the 500 kg monthly reference. Great job keeping it low!`;

        } else if (totalCO2 <= 500) {

            comparison.textContent =
                `Your estimated footprint is ${Math.round(
                    percentage
                )}% of the 500 kg monthly reference. There are opportunities to reduce it further.`;

        } else {

            comparison.textContent =
                `Your estimated footprint is ${Math.round(
                    percentage
                )}% of the 500 kg monthly reference. Consider reducing your highest-emission activities.`;

        }


        /* Category values */

        transportVal.textContent =
            `${Math.round(transportCO2)} kg`;

        energyVal.textContent =
            `${Math.round(electricityCO2)} kg`;

        foodVal.textContent =
            `${Math.round(foodCO2)} kg`;


        /* Category bars */

        const maximum =
            Math.max(
                transportCO2,
                electricityCO2,
                foodCO2,
                1
            );


        transportBar.style.width =
            `${(
                transportCO2 /
                maximum
            ) * 100}%`;


        energyBar.style.width =
            `${(
                electricityCO2 /
                maximum
            ) * 100}%`;


        foodBar.style.width =
            `${(
                foodCO2 /
                maximum
            ) * 100}%`;


        /* =================================================
           PERSONALIZED TIP
           ================================================= */

        const categories = [

            {
                name: "transport",
                value: transportCO2
            },

            {
                name: "energy",
                value: electricityCO2
            },

            {
                name: "food",
                value: foodCO2
            }

        ];


        categories.sort(
            (a, b) => b.value - a.value
        );


        const largest =
            categories[0];


        if (
            largest.name === "transport"
        ) {

            tipTitle.textContent =
                "Reduce transport emissions";


            tipText.textContent =
                "Try reducing unnecessary car journeys, using public transport, walking, cycling, or choosing more efficient transport. Short flights can also have a significant impact.";

        }


        else if (
            largest.name === "energy"
        ) {

            tipTitle.textContent =
                "Reduce electricity emissions";


            tipText.textContent =
                "Switch off unused appliances, improve energy efficiency and consider renewable electricity where available.";

        }


        else {

            tipTitle.textContent =
                "Reduce food emissions";


            tipText.textContent =
                "Reducing meat-based meals and choosing more plant-rich meals can help lower food-related emissions.";

        }

    }


    /* Calculator events */

    [
        car,
        power,
        meals,
        flights
    ].forEach(input => {

        if (input) {

            input.addEventListener(
                "input",
                updateCalculator
            );

        }

    });


    /* Initial calculator result */

    updateCalculator();


    /* =====================================================
       BUTTON PRESS EFFECT
       ===================================================== */

    document
        .querySelectorAll(
            "button, .nav-ai-btn"
        )
        .forEach(element => {

            element.addEventListener(
                "pointerdown",
                () => {

                    element.style.transform =
                        "scale(0.97)";

                }
            );


            element.addEventListener(
                "pointerup",
                () => {

                    element.style.transform = "";

                }
            );


            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform = "";

                }
            );

        });


    /* =====================================================
       FILTRATION / 3D MODEL VIDEO AUTO PLAY
       ===================================================== */

    const filtrationVideo =
        document.querySelector(".model-video");

    if (filtrationVideo) {

        filtrationVideo.muted = true;
        filtrationVideo.autoplay = true;
        filtrationVideo.loop = true;
        filtrationVideo.playsInline = true;

        filtrationVideo.play().catch(() => {
            console.log("Video autoplay was blocked by the browser.");
        });

    }


    /* =====================================================
       PAGE FADE-IN
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );


    /* =====================================================
       HANDLE HASH CHANGES
       ===================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            openHashSection();

        }
    );

});