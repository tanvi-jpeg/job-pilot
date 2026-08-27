

const authBtn = document.querySelector(".join-btn");
const authOverlay = document.querySelector(".auth-overlay");
const closeAuth = document.querySelector(".close-auth");
const authForm = document.querySelector(".auth-form");

const welcomeTitle = document.querySelector(".welcome h1");
const welcomeSubtitle = document.querySelector(".welcome h3");

const nameInput = authForm.querySelector("#userName");
const emailInput = authForm.querySelector("#userEmail");
const passwordInput = authForm.querySelector("#userPassword");


function animateWelcome(titleText) {

    welcomeTitle.innerHTML = "";
    welcomeSubtitle.innerHTML = "";



    const titleWords = titleText.split(" ");

    titleWords.forEach((word, index) => {

        const span = document.createElement("span");

        span.textContent = word;

        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(15px)";
        span.style.transition = "0.5s ease";

        welcomeTitle.appendChild(span);



        if (index < titleWords.length - 1) {

            welcomeTitle.appendChild(
                document.createTextNode(" ")
            );

        }

        setTimeout(() => {

            span.style.opacity = "1";
            span.style.transform = "translateY(0)";

        }, 100 + index * 250);

    });




    const subtitleWords = [
        "Navigate",
        "→",
        "Track",
        "→",
        "Succeed"
    ];


    // Wait until title finishes
    const titleDelay =
        100 + (titleWords.length * 250) + 300;


    subtitleWords.forEach((word, index) => {

        const span = document.createElement("span");

        span.textContent = word;

        span.style.display = "inline-block";
        span.style.opacity = "0";
        span.style.transform = "translateY(10px)";
        span.style.transition = "0.5s ease";

        welcomeSubtitle.appendChild(span);

        if (index < subtitleWords.length - 1) {

            welcomeSubtitle.appendChild(
                document.createTextNode(" ")
            );

        }


        setTimeout(() => {

            span.style.opacity = "1";
            span.style.transform = "translateY(0)";

        }, titleDelay + index * 250);

    });

}

function updateAuthButton() {

    const savedName = localStorage.getItem("userName");


    if (savedName) {

        // User is logged in
        authBtn.textContent = "Log Out";

        animateWelcome(
            `Welcome back, ${savedName}`
        );

    } else {

        // User is logged out
        authBtn.textContent = "Sign Up";

        animateWelcome(
            "Welcome to JobPilot"
        );

    }

}



updateAuthButton();


authBtn.addEventListener("click", () => {

    const savedName = localStorage.getItem("userName");



    if (savedName) {

        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userPassword");

        authBtn.textContent = "Sign Up";

        animateWelcome(
            "Welcome to JobPilot"
        );

        return;
    }



    authOverlay.classList.add("show");

    nameInput.focus();

});


closeAuth.addEventListener("click", () => {

    authOverlay.classList.remove("show");

});


authOverlay.addEventListener("click", (event) => {

    if (event.target === authOverlay) {

        authOverlay.classList.remove("show");

    }

});


authForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;



    if (!name || !email || !password) {

        alert("Please fill in all fields.");

        return;

    }

    if (password.length < 6) {

        alert("Password must be at least 6 characters.");

        return;

    }



    localStorage.setItem(
        "userName",
        name
    );

    localStorage.setItem(
        "userEmail",
        email
    );

    localStorage.setItem(
        "userPassword",
        password
    );



    authBtn.textContent = "Log Out";

    animateWelcome(
        `Welcome back, ${name}`
    );



    authOverlay.classList.remove("show");
    authForm.reset();

});