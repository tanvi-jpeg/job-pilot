const upcomingList =
    document.querySelector(".upcoming-list");

const completedList =
    document.querySelector(".completed-list");



function getApplications() {

    return JSON.parse(
        localStorage.getItem("applications")
    ) || [];

}


function getInterviews() {

    const applications =
        getApplications();

    return applications.filter(
        application =>
            application.status === "interview"
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


    const interviewDate =
        new Date(date);


    if (isNaN(interviewDate)) {

        return date;

    }


    return interviewDate.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );

}



function isUpcoming(application) {


    if (!application.interviewDate) {

        return true;

    }


    const today =
        new Date();

    const interviewDate =
        new Date(application.interviewDate);


    return interviewDate >= today;

}



function displayUpcomingInterviews() {

    if (!upcomingList) {

        return;

    }


    upcomingList.innerHTML = "";


    const interviews =
        getInterviews();


    const upcoming =
        interviews.filter(
            interview =>
                isUpcoming(interview)
        );


    // ------------------------------------
    // Empty state
    // ------------------------------------

    if (upcoming.length === 0) {

        upcomingList.innerHTML = `

            <div class="empty-interviews">

                <i class="fa-solid fa-calendar-check"></i>

                <h3>
                    No Upcoming Interviews
                </h3>

                <p>
                    Your upcoming interviews will appear here.
                </p>

            </div>

        `;

        return;

    }


    upcoming.forEach(interview => {

        const card =
            document.createElement("div");


        card.className =
            "interview-card";


        card.innerHTML = `

            <div class="interview-info">

                <div class="company-logo">

                    ${getCompanyLogo(interview)}

                </div>


                <div>

                    <h3>
                        ${interview.company || "Unknown Company"}
                    </h3>

                    <p>
                        ${interview.role || "Job Role"}
                    </p>

                </div>

            </div>


            <div class="interview-date">

                <strong>

                    ${formatDate(
                        interview.interviewDate
                    )}

                </strong>


                <span>

                    ${interview.interviewTime || "Time not set"}

                </span>

            </div>


            <div class="interview-action">

                <span class="status upcoming">

                    Upcoming

                </span>

            </div>

        `;


        upcomingList.appendChild(card);

    });

}



function displayCompletedInterviews() {

    if (!completedList) {

        return;

    }


    completedList.innerHTML = "";


    const interviews =
        getInterviews();


    const completed =
        interviews.filter(
            interview =>
                !isUpcoming(interview)
        );




    if (completed.length === 0) {

        completedList.innerHTML = `

            <div class="empty-interviews">

                <i class="fa-solid fa-clock-rotate-left"></i>

                <h3>
                    No Completed Interviews
                </h3>

                <p>
                    Completed interviews will appear here.
                </p>

            </div>

        `;

        return;

    }



    completed.forEach(interview => {

        const card =
            document.createElement("div");


        card.className =
            "completed-card";


        card.innerHTML = `

            <div class="company-logo">

                ${getCompanyLogo(interview)}

            </div>


            <div class="completed-info">

                <h3>
                    ${interview.company || "Unknown Company"}
                </h3>

                <p>
                    ${interview.role || "Job Role"}
                </p>

            </div>


            <div class="completed-date">

                ${formatDate(
                    interview.interviewDate
                )}

            </div>


            <span class="status completed">

                Completed

            </span>

        `;


        completedList.appendChild(card);

    });

}



function updateInterviews() {

    displayUpcomingInterviews();

    displayCompletedInterviews();

}



window.addEventListener(
    "storage",
    updateInterviews
);



updateInterviews();