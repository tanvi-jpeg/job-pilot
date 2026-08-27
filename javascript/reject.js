const rejectedList =
    document.querySelector(".rejected-list");

const rejectedCount =
    document.querySelector("#rejectedCount");

const totalRejected =
    document.querySelector("#totalRejected");

const monthlyRejected =
    document.querySelector("#monthlyRejected");

const rejectedLabel =
    document.querySelector("#rejectedLabel");

const emptyRejected =
    document.querySelector(".empty-rejected");




function getApplications() {

    return JSON.parse(
        localStorage.getItem("applications")
    ) || [];

}


// ========================================
// GET REJECTED APPLICATIONS
// ========================================

function getRejectedApplications() {

    const applications =
        getApplications();

    return applications.filter(
        application =>
            application.status === "rejected"
    );

}



function getCompanyLogo(application) {



    if (application.companyLogo) {

        return `
            <img
                src="${application.companyLogo}"
                alt="${application.company || "Company"}"
                class="company-logo-img"
                onerror="
                    this.style.display='none';
                    this.nextElementSibling.style.display='block';
                "
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

        return "Date not set";

    }


    const formattedDate =
        new Date(date);


    if (isNaN(formattedDate)) {

        return date;

    }


    return formattedDate.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}




function isThisMonth(date) {

    if (!date) {

        return false;

    }


    const rejectedDate =
        new Date(date);

    const today =
        new Date();


    return (
        rejectedDate.getMonth() === today.getMonth() &&
        rejectedDate.getFullYear() === today.getFullYear()
    );

}



function displayRejectedApplications() {

    if (!rejectedList) {

        return;

    }


    rejectedList.innerHTML = "";


    const rejected =
        getRejectedApplications();


    if (rejectedCount) {

        rejectedCount.textContent =
            rejected.length;

    }


    if (totalRejected) {

        totalRejected.textContent =
            rejected.length;

    }


    if (rejectedLabel) {

        rejectedLabel.textContent =
            `${rejected.length} application${
                rejected.length === 1 ? "" : "s"
            }`;

    }



    const thisMonth =
        rejected.filter(
            application =>
                isThisMonth(
                    application.rejectedDate ||
                    application.date
                )
        );


    if (monthlyRejected) {

        monthlyRejected.textContent =
            thisMonth.length;

    }


    if (rejected.length === 0) {

        if (emptyRejected) {

            emptyRejected.style.display = "flex";

        }

        return;

    }


    if (emptyRejected) {

        emptyRejected.style.display = "none";

    }




    rejected.forEach(application => {

        const card =
            document.createElement("div");


        card.className =
            "rejected-card";


        card.innerHTML = `

            <div class="rejected-info">

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


            <div class="rejected-date">

                ${formatDate(
                    application.rejectedDate ||
                    application.date
                )}

            </div>


            <span class="status rejected">

                Rejected

            </span>

        `;


        rejectedList.appendChild(card);

    });

}


window.addEventListener(
    "storage",
    displayRejectedApplications
);

displayRejectedApplications();