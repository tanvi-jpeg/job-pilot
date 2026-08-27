document.addEventListener("DOMContentLoaded", () => {

    const offersList = document.querySelector("#offersList");
    const emptyOffers = document.querySelector("#emptyOffers");

    const totalOffers = document.querySelector("#totalOffers");
    const monthlyOffers = document.querySelector("#monthlyOffers");
    const offerCount = document.querySelector("#offerCount");


    // Get applications
    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];


    // Only show offers
    const offers = applications.filter(application =>
        application.status?.toLowerCase() === "offer"
    );


    // Update statistics
    totalOffers.textContent = offers.length;

    offerCount.textContent =
        `${offers.length} ${offers.length === 1 ? "offer" : "offers"}`;


    // Current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();


    const thisMonthOffers = offers.filter(application => {

        if (!application.date) {
            return false;
        }

        const date = new Date(application.date);

        return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
        );

    });


    monthlyOffers.textContent = thisMonthOffers.length;


    // Empty state
    if (offers.length === 0) {

        offersList.innerHTML = "";

        emptyOffers.style.display = "flex";

        return;
    }


    // Hide empty state
    emptyOffers.style.display = "none";


    // Create offer cards
    offersList.innerHTML = "";


    offers.forEach(application => {

        const card = document.createElement("div");

        card.className = "offer-card";


        card.innerHTML = `

            <div class="offer-info">

                <div class="company-logo">

                    ${
                        application.logo
                        ? `<img
                            src="${application.logo}"
                            class="company-logo-img"
                            alt="${application.company}"
                          >`
                        : `<i class="fa-solid fa-building"></i>`
                    }

                </div>

                <div>

                    <h3>
                        ${application.company}
                    </h3>

                    <p>
                        ${application.role}
                    </p>

                </div>

            </div>


            <span class="status offer">
                Offer
            </span>


            <div class="offer-basic-details">

                <div>

                    <i class="fa-solid fa-location-dot"></i>

                    <span>
                        ${application.location || "Location not specified"}
                    </span>

                </div>


                <div>

                    <i class="fa-solid fa-calendar"></i>

                    <span>
                        ${formatDate(application.date)}
                    </span>

                </div>

            </div>


            <div class="offer-extra-details">

                <div>

                    <span class="detail-label">
                        Salary
                    </span>

                    <strong>
                        ${application.salary || "Not specified"}
                    </strong>

                </div>


                <div>

                    <span class="detail-label">
                        Joining Date
                    </span>

                    <strong>
                        ${application.joiningDate || "Not specified"}
                    </strong>

                </div>


                <div>

                    <span class="detail-label">
                        Offer Deadline
                    </span>

                    <strong>
                        ${application.deadline || "Not specified"}
                    </strong>

                </div>

            </div>

        `;


        offersList.appendChild(card);

    });


    // Format date
    function formatDate(dateString) {

        if (!dateString) {
            return "Date not specified";
        }

        const date = new Date(dateString);

        if (isNaN(date)) {
            return dateString;
        }

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });

    }

});