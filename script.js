let timerInterval;
let timeLeft = 300;
let testRunning = false;


// =====================================
// Default Passages
// =====================================

const defaultPassages = [
    {
        title: "Passage 1",
        content:
            "Regular typing practice helps improve speed and accuracy. A good typist should focus on correct spelling, proper finger placement and maintaining a steady typing rhythm."
    },

    {
        title: "Passage 2",
        content:
            "The present case arises out of Family Suit No. 148 of 2026 filed by the Plaintiff wife against the Defendant husband seeking maintenance and other reliefs."
    },

    {
        title: "Passage 3",
        content:
            "Typing regularly helps a person improve speed, accuracy and confidence. It is important to maintain proper finger placement and avoid looking at the keyboard while typing."
    }
];


// =====================================
// Get Passages From Admin Panel
// =====================================

function getPassages() {

    const savedPassages =
        JSON.parse(
            localStorage.getItem("typingPassages")
        ) || [];

    return [...defaultPassages, ...savedPassages];
}


// =====================================
// Load Passage List
// =====================================

function loadPassages() {

    const select =
        document.getElementById("passageSelect");

    if (!select) return;

    const allPassages = getPassages();

    select.innerHTML = "";

    allPassages.forEach(function (passage, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent = passage.title;

        select.appendChild(option);

    });

    changePassage();
}


// =====================================
// Change Passage
// =====================================

function changePassage() {

    const select =
        document.getElementById("passageSelect");

    const passageText =
        document.getElementById("passageText");

    if (!select || !passageText) return;

    const allPassages = getPassages();

    const index =
        Number(select.value);

    if (allPassages[index]) {

        passageText.textContent =
            allPassages[index].content;

    }

}


// =====================================
// Timer Display
// =====================================

function updateTimer() {

    const timer =
        document.getElementById("timer");

    if (!timer) return;

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timer.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}


// =====================================
// Set Time
// =====================================

function setTime() {

    const select =
        document.getElementById("timeSelect");

    if (!select) return;

    const minutes =
        Number(select.value);

    timeLeft =
        minutes * 60;

    updateTimer();
}


// =====================================
// Start Test
// =====================================

function startTest() {

    clearInterval(timerInterval);

    const timeSelect =
        document.getElementById("timeSelect");

    const typingArea =
        document.getElementById("typingArea");

    const resultBox =
        document.getElementById("resultBox");

    let minutes = 5;

    if (timeSelect) {

        minutes =
            Number(timeSelect.value);

    }

    timeLeft =
        minutes * 60;

    updateTimer();

    testRunning = true;
    const submitButton =
    document.getElementById("submitButton");

if (submitButton) {
    submitButton.disabled = false;
}

    if (typingArea) {

        typingArea.value = "";

        typingArea.disabled = false;

        typingArea.focus();

    }

    if (resultBox) {

        resultBox.style.display =
            "none";

    }

    if (timeSelect) {

        timeSelect.disabled =
            true;

    }

    timerInterval =
        setInterval(function () {

            timeLeft--;

            updateTimer();

            if (timeLeft <= 0) {

                finishTest();

            }

        }, 1000);

}


// =====================================
// Finish Test
// =====================================

function finishTest() {

    clearInterval(timerInterval);

    testRunning = false;
    const submitButton =
    document.getElementById("submitButton");

if (submitButton) {
    submitButton.disabled = true;
}

    const typingArea =
        document.getElementById("typingArea");

    const timeSelect =
        document.getElementById("timeSelect");

    if (typingArea) {

        typingArea.disabled =
            true;

    }

    if (timeSelect) {

        timeSelect.disabled =
            false;

    }

    timeLeft = 0;

    updateTimer();

    calculateResult();

}


// =====================================
// Calculate Result
// =====================================

function calculateResult() {

    const typingArea =
        document.getElementById("typingArea");

    const passageText =
        document.getElementById("passageText");

    if (!typingArea || !passageText)
        return;

    const typed =
        typingArea.value;

    const original =
        passageText.textContent.trim();

    let errors = 0;

    let correct = 0;

    const maxLength =
        Math.max(
            typed.length,
            original.length
        );

    for (
        let i = 0;
        i < maxLength;
        i++
    ) {

        if (typed[i] === original[i]) {

            correct++;

        } else {

            errors++;

        }

    }


    let accuracy = 0;

    if (typed.length > 0) {

        accuracy =
            (correct / typed.length) * 100;

    }


    const words =
        typed.trim() === ""
            ? 0
            : typed.trim().split(/\s+/).length;


    const timeSelect =
        document.getElementById("timeSelect");

    let totalMinutes = 5;

    if (timeSelect) {

        totalMinutes =
            Number(timeSelect.value);

    }


    const elapsedSeconds =
        (totalMinutes * 60) -
        timeLeft;


    const elapsedMinutes =
        elapsedSeconds / 60;


    let wpm = 0;

    if (elapsedMinutes > 0) {

        wpm =
            Math.round(
                words / elapsedMinutes
            );

    }


    const wpmResult =
        document.getElementById("wpmResult");

    const accuracyResult =
        document.getElementById("accuracyResult");

    const errorsResult =
        document.getElementById("errorsResult");

    const charactersResult =
        document.getElementById("charactersResult");


    if (wpmResult) {

        wpmResult.textContent =
            wpm;

    }

    if (accuracyResult) {

        accuracyResult.textContent =
            accuracy.toFixed(1) + "%";

    }

    if (errorsResult) {

        errorsResult.textContent =
            errors;

    }

    if (charactersResult) {

        charactersResult.textContent =
            typed.length;

    }


    const resultBox =
        document.getElementById("resultBox");

    if (resultBox) {

        resultBox.style.display =
            "block";

    }

}


// =====================================
// Page Load
// =====================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const timeSelect =
            document.getElementById("timeSelect");


        if (timeSelect) {

            timeSelect.addEventListener(
                "change",
                function () {

                    if (!testRunning) {

                        setTime();

                    }

                }
            );

        }


        loadPassages();

        setTime();

        updateTimer();

    }
);
// =====================================
// BACKSPACE & ARROW KEY SETTINGS
// =====================================

document.addEventListener("keydown", function (event) {

    const typingArea =
        document.getElementById("typingArea");

    if (!typingArea) return;

    // Only apply settings while typing
    if (document.activeElement !== typingArea) {
        return;
    }


    // -------------------------------
    // BACKSPACE
    // -------------------------------

    const backspaceOption =
        document.getElementById("backspaceOption");

    if (
        event.key === "Backspace" &&
        backspaceOption &&
        backspaceOption.value === "off"
    ) {
        event.preventDefault();
    }


    // -------------------------------
    // ARROW KEYS
    // -------------------------------

    const arrowOption =
        document.getElementById("arrowOption");

    const arrowKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight"
    ];

    if (
        arrowKeys.includes(event.key) &&
        arrowOption &&
        arrowOption.value === "off"
    ) {
        event.preventDefault();
    }

});