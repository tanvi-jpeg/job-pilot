
const authBtn = document.querySelector(".join-btn");


function updateAuthButton() {

    if (!authBtn) return;

    const savedName = localStorage.getItem("userName");

    if (savedName) {
        authBtn.textContent = "Log Out";
    } else {
        authBtn.textContent = "Sign Up";
    }
}

updateAuthButton();

if (authBtn) {

    authBtn.addEventListener("click", function () {

        const savedName = localStorage.getItem("userName");
        if (savedName) {

            localStorage.removeItem("userName");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("isLoggedIn");

            updateAuthButton();

            // Update home page if we're on home
            const welcomeTitle =
                document.querySelector(".welcome h1");

            if (welcomeTitle) {
                welcomeTitle.textContent =
                    "Welcome to JobPilot";
            }

            return;
        }


        const authOverlay =
            document.querySelector(".auth-overlay");

        if (authOverlay) {

            authOverlay.classList.add("show");

        } else {


            window.location.href = "index.html";

        }

    });

}