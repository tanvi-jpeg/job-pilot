document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.querySelector("#contactForm");

    const successMessage =
        document.querySelector("#successMessage");


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        const submitButton =
            form.querySelector(".send-btn");


        submitButton.disabled = true;

        submitButton.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Sending...
        `;


        try {

            const formData =
                new FormData(form);


            const response =
                await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );


            const data =
                await response.json();


            if (data.success) {

                successMessage.classList.add(
                    "show"
                );

                form.reset();


                submitButton.innerHTML = `
                    <i class="fa-solid fa-paper-plane"></i>
                    Send Message
                `;

            } else {

                throw new Error(
                    data.message ||
                    "Unable to send message"
                );

            }

        } catch (error) {

            console.error(error);

            alert(
                "Unable to send your message. Please try again."
            );

            submitButton.innerHTML = `
                <i class="fa-solid fa-paper-plane"></i>
                Send Message
            `;

        }


        submitButton.disabled = false;


        setTimeout(() => {

            successMessage.classList.remove(
                "show"
            );

        }, 5000);

    });

});