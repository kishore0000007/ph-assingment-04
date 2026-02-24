const totalCount = document.getElementById("totalCount");
const interviewCount = document.getElementById("interviewCount");
const rejectedCount = document.getElementById("rejectedCount");

const allBtn = document.getElementById("allJobs");
const interviewBtn = document.getElementById("interviewJobs");
const rejectedBtn = document.getElementById("rejectedJobs");

function updateCounts() {
    const jobs = document.querySelectorAll("#jobListings > div");

    let total = jobs.length;
    let interview = 0;
    let rejected = 0;

    jobs.forEach(job => {
        if (job.classList.contains("interviewed")) interview++;
        if (job.classList.contains("rejected")) rejected++;
    });

    totalCount.innerText = total;
    interviewCount.innerText = interview;
    rejectedCount.innerText = rejected;
}

updateCounts();

document.querySelectorAll(".interviewButton").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".space-y-6");
        const status = card.querySelector(".status");

        if (card.classList.contains("interviewed")) return;

        card.classList.remove("rejected");
        card.classList.add("interviewed");

        status.innerText = "INTERVIEW";
        status.className = "status bg-green-200 text-green-800 py-2 px-4 rounded";

        updateCounts();
    });
});

document.querySelectorAll(".rejectedButton").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".space-y-6");
        const status = card.querySelector(".status");

        if (card.classList.contains("rejected")) return;

        card.classList.remove("interviewed");
        card.classList.add("rejected");

        status.innerText = "REJECTED";
        status.className = "status bg-red-200 text-red-800 py-2 px-4 rounded";

        updateCounts();
    });
});

document.querySelectorAll(".deleteButton").forEach(btn => {
    btn.addEventListener("click", function () {
        const card = this.closest(".space-y-6");
        const status = card.querySelector(".status");

        card.classList.remove("interviewed", "rejected");

    
        status.className =
            "status bg-blue-200 text-gray-800 py-2 px-4 rounded";
        status.innerText = "NOT APPLIED";

        updateCounts();
    });
});

function showAllJobs() {
    document.querySelectorAll("#jobListings > div").forEach(job => {
        job.style.display = "block";
    });
}

function showInterviewJobs() {
    document.querySelectorAll("#jobListings > div").forEach(job => {
        job.style.display = job.classList.contains("interviewed")
            ? "block"
            : "none";
    });
}

function showRejectedJobs() {
    document.querySelectorAll("#jobListings > div").forEach(job => {
        job.style.display = job.classList.contains("rejected")
            ? "block"
            : "none";
    });
}

allBtn.addEventListener("click", showAllJobs);
interviewBtn.addEventListener("click", showInterviewJobs);
rejectedBtn.addEventListener("click", showRejectedJobs);
