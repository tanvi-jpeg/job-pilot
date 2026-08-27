document.addEventListener("DOMContentLoaded", () => {

    const applications =
        JSON.parse(
            localStorage.getItem("applications")
        ) || [];


    const appliedCount =
        document.querySelector("#appliedCount");

    const interviewCount =
        document.querySelector("#interviewCount");

    const offerCount =
        document.querySelector("#offerCount");

    const rejectedCount =
        document.querySelector("#rejectedCount");


    const appliedBar =
        document.querySelector("#appliedBar");

    const interviewBar =
        document.querySelector("#interviewBar");

    const offerBar =
        document.querySelector("#offerBar");

    const rejectedBar =
        document.querySelector("#rejectedBar");


    const totalStatus =
        document.querySelector("#totalStatus");


    const jobTypes =
        document.querySelector("#jobTypes");


    const weekCount =
        document.querySelector("#weekCount");

    const monthCount =
        document.querySelector("#monthCount");

    const totalCount =
        document.querySelector("#totalCount");


    function getStatus(application) {

        return (
            application.status ||
            "Applied"
        ).toLowerCase();

    }


    function countStatus(status) {

        return applications.filter(
            application =>
                getStatus(application) === status
        ).length;

    }


    const total =
        applications.length;

    const applied =
        countStatus("applied");

    const interviews =
        countStatus("interview");

    const offers =
        countStatus("offer");

    const rejected =
        countStatus("rejected");


    appliedCount.textContent =
        applied;

    interviewCount.textContent =
        interviews;

    offerCount.textContent =
        offers;

    rejectedCount.textContent =
        rejected;


    totalStatus.textContent =
        `${total} ${
            total === 1
                ? "application"
                : "applications"
        }`;


    function percentage(value) {

        if (total === 0) {
            return 0;
        }

        return (value / total) * 100;

    }


    appliedBar.style.width =
        `${percentage(applied)}%`;

    interviewBar.style.width =
        `${percentage(interviews)}%`;

    offerBar.style.width =
        `${percentage(offers)}%`;

    rejectedBar.style.width =
        `${percentage(rejected)}%`;


    function getDate(application) {

        return (
            application.appliedDate ||
            application.date ||
            application.createdAt ||
            null
        );

    }


    function isThisWeek(date) {

        if (!date) {
            return false;
        }

        const applicationDate =
            new Date(date);

        const today =
            new Date();

        const day =
            today.getDay();

        const difference =
            day === 0
                ? 6
                : day - 1;

        const startOfWeek =
            new Date(today);

        startOfWeek.setDate(
            today.getDate() - difference
        );

        startOfWeek.setHours(
            0,
            0,
            0,
            0
        );

        return applicationDate >=
            startOfWeek;

    }


    function isThisMonth(date) {

        if (!date) {
            return false;
        }

        const applicationDate =
            new Date(date);

        const today =
            new Date();

        return (
            applicationDate.getMonth() ===
            today.getMonth() &&
            applicationDate.getFullYear() ===
            today.getFullYear()
        );

    }


    const thisWeek =
        applications.filter(
            application =>
                isThisWeek(
                    getDate(application)
                )
        ).length;


    const thisMonth =
        applications.filter(
            application =>
                isThisMonth(
                    getDate(application)
                )
        ).length;


    weekCount.textContent =
        thisWeek;

    monthCount.textContent =
        thisMonth;

    totalCount.textContent =
        total;


    function formatJobType(type) {

        const value =
            String(type)
                .toLowerCase();


        if (value.includes("intern")) {
            return "Internship";
        }

        if (value.includes("full")) {
            return "Full-time";
        }

        if (value.includes("part")) {
            return "Part-time";
        }

        return "Other";

    }


    function displayJobTypes() {

        jobTypes.innerHTML = "";


        const types = {};


        applications.forEach(application => {

            const type =
                application.employmentType ||
                application.type ||
                "Other";


            const formattedType =
                formatJobType(type);


            types[formattedType] =
                (types[formattedType] || 0) + 1;

        });


        const sortedTypes =
            Object.entries(types)
                .sort(
                    (a, b) =>
                        b[1] - a[1]
                )
                .slice(0, 5);


        if (sortedTypes.length === 0) {

            jobTypes.innerHTML = `

                <div class="no-job-types">
                    No job data available yet.
                </div>

            `;

            return;

        }


        sortedTypes.forEach(
            ([type, count]) => {

                const row =
                    document.createElement("div");


                row.className =
                    "job-type-row";


                row.innerHTML = `

                    <div class="job-type-info">

                        <span class="job-type-dot"></span>

                        <span>
                            ${type}
                        </span>

                    </div>

                    <strong>
                        ${count}
                    </strong>

                `;


                jobTypes.appendChild(row);

            }
        );

    }


    displayJobTypes();

});