

const applicationsCount =
    document.querySelector("#applicationsCount");

const interviewsCount =
    document.querySelector("#interviewsCount");

const offersCount =
    document.querySelector("#offersCount");

const rejectedCount =
    document.querySelector("#rejectedCount");



function getApplications() {

    const savedApplications =
        localStorage.getItem("applications");

    if (!savedApplications) {
        return [];
    }

    try {

        return JSON.parse(savedApplications);

    } catch (error) {

        console.error(
            "Could not read applications:",
            error
        );

        return [];

    }
}


function updateOpportunityStats() {

    const applications = getApplications();

    const totalApplications =
        applications.length;


    const totalInterviews =
        applications.filter(
            application =>
                application.status === "interview"
        ).length;



    const totalOffers =
        applications.filter(
            application =>
                application.status === "offer"
        ).length;

        
    const totalRejected =
        applications.filter(
            application =>
                application.status === "rejected"
        ).length;


    if (applicationsCount) {
        applicationsCount.textContent =
            totalApplications;
    }

    if (interviewsCount) {
        interviewsCount.textContent =
            totalInterviews;
    }

    if (offersCount) {
        offersCount.textContent =
            totalOffers;
    }

    if (rejectedCount) {
        rejectedCount.textContent =
            totalRejected;
    }

}


updateOpportunityStats();

window.addEventListener("storage", () => {

    updateOpportunityStats();

});