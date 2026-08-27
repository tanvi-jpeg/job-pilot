const jobSearch = document.querySelector("#jobSearch");
const locationFilter = document.querySelector("#locationFilter");
const typeFilter = document.querySelector("#typeFilter");
const searchButton = document.querySelector("#searchBtn");

const jobsList = document.querySelector("#jobsList");
const jobCount = document.querySelector("#jobCount");
const searchMessage = document.querySelector("#searchMessage");

const loading = document.querySelector("#loading");
const noJobs = document.querySelector("#noJobs");
const errorMessage = document.querySelector("#errorMessage");
const retryButton = document.querySelector("#retryBtn");

let allJobs = [];

async function fetchJobs() {

    if (!jobsList) {
        return;
    }

    showLoading();

    try {

        const searchText = jobSearch
            ? jobSearch.value.trim()
            : "";

        const location = locationFilter
            ? locationFilter.value
            : "India";

        const params = new URLSearchParams();

        params.set(
            "q",
            searchText || "software developer"
        );

        params.set(
            "where",
            location
        );

        const response = await fetch(
            `/api/jobs?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();

        allJobs = removeDuplicates(
            data.results || []
        );

        hideLoading();
        hideError();

        updateSearchMessage(location);

        displayJobs();

    } catch (error) {

        console.error(
            "Error loading jobs:",
            error
        );

        hideLoading();

        jobsList.innerHTML = "";

        if (jobCount) {
            jobCount.textContent = "0 jobs";
        }

        showError();
    }
}

function displayJobs() {

    if (!jobsList) {
        return;
    }

    const searchText = jobSearch
        ? jobSearch.value
            .toLowerCase()
            .trim()
        : "";

    const selectedType = typeFilter
        ? typeFilter.value
        : "all";

    const selectedLocation = locationFilter
        ? locationFilter.value
        : "India";

    const filteredJobs = allJobs.filter(job => {

        const title = String(
            job.title || ""
        ).toLowerCase();

        const company = String(
            job.company?.display_name || ""
        ).toLowerCase();

        const location = String(
            job.location?.display_name || ""
        ).toLowerCase();

        const matchesSearch =
            title.includes(searchText) ||
            company.includes(searchText);

        let matchesLocation = true;

        if (selectedLocation !== "India") {

            matchesLocation =
                location.includes(
                    selectedLocation.toLowerCase()
                );
        }

        const matchesType =
            selectedType === "all" ||
            getJobType(job) === selectedType;

        return (
            matchesSearch &&
            matchesLocation &&
            matchesType
        );
    });

    jobsList.innerHTML = "";

    if (jobCount) {

        jobCount.textContent =
            `${filteredJobs.length} ${
                filteredJobs.length === 1
                    ? "job"
                    : "jobs"
            }`;
    }

    if (filteredJobs.length === 0) {

        if (noJobs) {
            noJobs.style.display = "flex";
        }

        return;
    }

    if (noJobs) {
        noJobs.style.display = "none";
    }

    filteredJobs.forEach(job => {

        const card =
            createJobCard(job);

        jobsList.appendChild(card);

    });
}

function removeDuplicates(jobs) {

    return jobs.filter(
        (job, index, self) =>
            index === self.findIndex(
                item =>
                    item.title === job.title &&
                    item.company?.display_name ===
                        job.company?.display_name &&
                    item.location?.display_name ===
                        job.location?.display_name
            )
    );
}

function getJobType(job) {

    const contract =
        String(
            job.contract_time || ""
        ).toLowerCase();

    const title =
        String(
            job.title || ""
        ).toLowerCase();

    if (
        title.includes("intern") ||
        contract.includes("intern")
    ) {
        return "internship";
    }

    if (
        contract.includes("part")
    ) {
        return "part-time";
    }

    if (
        contract.includes("full")
    ) {
        return "full-time";
    }

    return "full-time";
}

function createJobCard(job) {

    const card =
        document.createElement("div");

    card.className =
        "job-card";

    const company =
        job.company?.display_name ||
        "Unknown Company";

    const title =
        job.title ||
        "Job Opportunity";

    const location =
        job.location?.display_name ||
        "India";

    const description =
        cleanDescription(
            job.description ||
            "No description available."
        );

    const jobType =
        getJobType(job);

    const date =
        formatDate(job.created);

    const jobUrl =
        job.redirect_url ||
        "#";

    card.innerHTML = `

        <div class="job-card-header">

            <div class="company-info">

                <div class="company-logo">

                    <i class="fa-solid fa-building"></i>

                </div>

                <div>

                    <h3>
                        ${escapeHTML(company)}
                    </h3>

                    <p>
                        ${escapeHTML(title)}
                    </p>

                </div>

            </div>

            <span class="job-type">
                ${formatJobType(jobType)}
            </span>

        </div>

        <div class="job-description">

            <p>
                ${escapeHTML(description)}
            </p>

        </div>

        <div class="job-meta">

            <span>

                <i class="fa-solid fa-location-dot"></i>

                ${escapeHTML(location)}

            </span>

            <span>

                <i class="fa-solid fa-briefcase"></i>

                ${formatJobType(jobType)}

            </span>

        </div>

        <div class="job-footer">

            <span class="job-date">
                ${date}
            </span>

            <div class="job-actions">

                <button
                    class="view-job"
                    type="button"
                >
                    View Job
                </button>

                <button
                    class="track-job"
                    type="button"
                >
                    Track Job
                </button>

            </div>

        </div>

    `;

    const viewButton =
        card.querySelector(".view-job");

    if (viewButton) {

        viewButton.addEventListener(
            "click",
            () => {

                if (jobUrl !== "#") {

                    window.open(
                        jobUrl,
                        "_blank"
                    );
                }
            }
        );
    }

    const trackButton =
        card.querySelector(".track-job");

    if (trackButton) {

        trackButton.addEventListener(
            "click",
            () => {

                trackJob(
                    job,
                    trackButton
                );
            }
        );
    }

    return card;
}

function trackJob(job, button) {

    const applications =
        JSON.parse(
            localStorage.getItem(
                "applications"
            )
        ) || [];

    const alreadyTracked =
        applications.some(
            application =>
                application.jobId === job.id
        );

    if (alreadyTracked) {

        button.textContent =
            "Already Tracked";

        button.disabled = true;

        return;
    }

    const application = {

        jobId: job.id,

        company:
            job.company?.display_name ||
            "Unknown Company",

        role:
            job.title ||
            "Job Role",

        status: "applied",

        date:
            new Date()
                .toISOString()
                .split("T")[0],

        location:
            job.location?.display_name ||
            "India",

        jobUrl:
            job.redirect_url ||
            ""
    };

    applications.push(
        application
    );

    localStorage.setItem(
        "applications",
        JSON.stringify(
            applications
        )
    );

    button.textContent =
        "Tracked ✓";

    button.disabled = true;

    button.classList.add(
        "tracked"
    );
}

function formatJobType(type) {

    const names = {

        "full-time":
            "Full-time",

        "part-time":
            "Part-time",

        "internship":
            "Internship"
    };

    return (
        names[type] ||
        "Full-time"
    );
}

function formatDate(date) {

    if (!date) {
        return "Recently";
    }

    const parsedDate =
        new Date(date);

    if (isNaN(parsedDate)) {
        return "Recently";
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

function cleanDescription(
    description
) {

    const cleaned =
        String(description)
            .replace(/<[^>]*>/g, "")
            .replace(/\s+/g, " ")
            .trim();

    if (cleaned.length <= 250) {
        return cleaned;
    }

    return (
        cleaned.substring(0, 250) +
        "..."
    );
}

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function updateSearchMessage(location) {

    if (!searchMessage) {
        return;
    }

    if (location === "India") {

        searchMessage.textContent =
            "Showing jobs available in India";

    } else {

        searchMessage.textContent =
            `Showing jobs available in ${location}`;
    }
}

function showLoading() {

    if (loading) {
        loading.style.display = "flex";
    }

    if (jobsList) {
        jobsList.innerHTML = "";
    }

    if (noJobs) {
        noJobs.style.display = "none";
    }

    hideError();
}

function hideLoading() {

    if (loading) {
        loading.style.display = "none";
    }
}

function showError() {

    if (errorMessage) {
        errorMessage.style.display = "flex";
    }
}

function hideError() {

    if (errorMessage) {
        errorMessage.style.display = "none";
    }
}

if (searchButton) {

    searchButton.addEventListener(
        "click",
        fetchJobs
    );
}

if (jobSearch) {

    jobSearch.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {
                fetchJobs();
            }
        }
    );
}

if (locationFilter) {

    locationFilter.addEventListener(
        "change",
        fetchJobs
    );
}

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        displayJobs
    );
}

if (retryButton) {

    retryButton.addEventListener(
        "click",
        fetchJobs
    );
}

fetchJobs();