/* =====================================
   ECOGUARD JAVASCRIPT
===================================== */


/* GET ELEMENTS */

const navButtons =
    document.querySelectorAll(".nav-btn");

const sections =
    document.querySelectorAll(".page-section");

const clickSound =
    document.getElementById("clickSound");

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const rotateButton =
    document.getElementById("rotateButton");

const molecule =
    document.querySelector(".molecule");


/* =====================================
   SOUND FUNCTION
===================================== */

function playClickSound() {

    if (!clickSound) {
        return;
    }

    clickSound.currentTime = 0;

    clickSound.play()
        .catch(function () {

            console.log(
                "Sound requires user interaction."
            );

        });

}


/* =====================================
   SHOW SECTION
===================================== */

function showSection(sectionId) {


    /* Hide all sections */

    sections.forEach(function (section) {

        section.classList.remove(
            "active-section"
        );

    });


    /* Show selected section */

    const selectedSection =
        document.getElementById(sectionId);

    if (selectedSection) {

        selectedSection.classList.add(
            "active-section"
        );

    }


    /* Update active navigation */

    navButtons.forEach(function (button) {

        button.classList.remove(
            "active"
        );

        if (
            button.dataset.section ===
            sectionId
        ) {

            button.classList.add(
                "active"
            );

        }

    });


    /* Scroll to top */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    /* Close mobile menu */

    if (navMenu) {

        navMenu.classList.remove(
            "show"
        );

    }


    /* Play sound */

    playClickSound();

}


/* =====================================
   NAVIGATION BUTTONS
===================================== */

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


/* =====================================
   MOBILE MENU
===================================== */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "show"
            );

            playClickSound();

        }
    );

}


/* =====================================
   3D MODEL ROTATION
===================================== */

if (rotateButton && molecule) {

    rotateButton.addEventListener(
        "click",
        function () {

            molecule.classList.remove(
                "rotate"
            );


            /* Restart animation */

            void molecule.offsetWidth;


            molecule.classList.add(
                "rotate"
            );


            playClickSound();

        }
    );

}


/* =====================================
   BUTTON SOUND
===================================== */

const allButtons =
    document.querySelectorAll("button");


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

                    duration: 250,

                    easing:
                        "ease-out"

                }

            );

        }

    );

});


/* =====================================
   PREVENTION BUTTON / HOME BUTTONS
===================================== */

document.addEventListener(
    "click",
    function (event) {

        const target =
            event.target;


        if (
            target.matches(
                ".main-btn, .secondary-btn"
            )
        ) {

            playClickSound();

        }

    }
);


/* =====================================
   PAGE LOADED ANIMATION
===================================== */

window.addEventListener(
    "load",
    function () {

        document.body.animate(

            [

                {
                    opacity:
                        0
                },

                {
                    opacity:
                        1
                }

            ],

            {

                duration:
                    700,

                easing:
                    "ease"

            }

        );

    }
);