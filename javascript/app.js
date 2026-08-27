const applicationList =
    document.querySelector(".application-list");

const searchInput =
    document.querySelector(".search-input");

const searchFilter =
    document.querySelector(".search-filter");

const applicationCount =
    document.querySelector("#applicationCount");

const emptyState =
    document.querySelector(".empty-state");


function getApplications() {

    return JSON.parse(
        localStorage.getItem("applications")
    ) || [];

}


function formatStatus(status) {

    const statusNames = {

        applied: "Applied",

        interview: "Interview",

        offer: "Offer",

        rejected: "Rejected"

    };

    const normalizedStatus =
        String(status || "applied")
            .toLowerCase();

    return (
        statusNames[normalizedStatus] ||
        status ||
        "Applied"
    );

}


function getCompanyLogo(application) {

    if (application.companyLogo) {

        return `

            <img
                src="${application.companyLogo}"
                alt="${application.company || "Company"}"
                class="company-logo-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
            >

            <i
                class="fa-solid fa-building company-fallback-icon"
                style="display:none;"
            ></i>

        `;

    }


    return `

        <i class="fa-solid fa-building"></i>

    `;

}


function formatDate(date) {

    if (!date) {

        return "No date";

    }


    const formattedDate =
        new Date(date);


    if (
        Number.isNaN(
            formattedDate.getTime()
        )
    ) {

        return "No date";

    }


    return formattedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function displayApplications() {

    if (!applicationList) {

        return;

    }


    const applications =
        getApplications();


    applicationList.innerHTML = "";


    if (applicationCount) {

        applicationCount.textContent =
            applications.length;

    }


    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedStatus =
        searchFilter
            ? searchFilter.value.toLowerCase()
            : "all";


    const filteredApplications =
        applications.filter(application => {

            const company =
                String(
                    application.company || ""
                ).toLowerCase();


            const role =
                String(
                    application.role || ""
                ).toLowerCase();


            const matchesSearch =
                company.includes(searchText) ||
                role.includes(searchText);


            const applicationStatus =
                String(
                    application.status ||
                    "applied"
                ).toLowerCase();


            const matchesStatus =
                selectedStatus === "all" ||
                applicationStatus === selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    if (
        filteredApplications.length === 0
    ) {

        if (emptyState) {

            emptyState.style.display =
                "flex";

        }

        return;

    }


    if (emptyState) {

        emptyState.style.display =
            "none";

    }


    filteredApplications.forEach(application => {

        const card =
            document.createElement("div");


        card.className =
            "application-card";


        const status =
            String(
                application.status ||
                "applied"
            ).toLowerCase();


        card.innerHTML = `

            <div class="company-info">

                <div class="company-logo">

                    ${getCompanyLogo(application)}

                </div>


                <div>

                    <h3>
                        ${application.company || "Unknown Company"}
                    </h3>

                    <p>
                        ${application.role || "Job Role"}
                    </p>

                </div>

            </div>


            <div class="application-details">

                <span
                    class="status ${status}"
                >

                    ${formatStatus(status)}

                </span>


                <p>
                    ${formatDate(
                        application.appliedDate
                    )}
                </p>

            </div>

        `;


        applicationList.appendChild(card);

    });

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayApplications
    );

}


if (searchFilter) {

    searchFilter.addEventListener(
        "change",
        displayApplications
    );

}


window.addEventListener(
    "storage",
    displayApplications
);


window.addEventListener(
    "pageshow",
    displayApplications
);


displayApplications();