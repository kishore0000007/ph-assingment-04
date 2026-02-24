   document.addEventListener("DOMContentLoaded", () => {
  const totalCount = document.getElementById("totalCount");
  const interviewCount = document.getElementById("interviewCount");
  const rejectedCount = document.getElementById("rejectedCount");

  const allBtn = document.getElementById("allJobs");
  const interviewBtn = document.getElementById("interviewJobs");
  const rejectedBtn = document.getElementById("rejectedJobs");

  const noJobsMessage = document.getElementById("noJobsMessage");
  const filterButtons = document.querySelectorAll(".filter-btn");

  function setActiveFilter(activeBtn) {
    filterButtons.forEach(btn => {
      btn.classList.remove("bg-blue-500", "text-white");
      btn.classList.add("bg-white", "text-gray-800");
    });

    activeBtn.classList.remove("bg-white", "text-gray-800");
    activeBtn.classList.add("bg-blue-500", "text-white");
  }

  function updateCounts() {
    const cards = document.querySelectorAll(".job-card");
    let interview = 0;
    let rejected = 0;

    cards.forEach(card => {
      if (card.classList.contains("interviewed")) interview++;
      if (card.classList.contains("rejected")) rejected++;
    });

    totalCount.textContent = cards.length;
    interviewCount.textContent = interview;
    rejectedCount.textContent = rejected;
  }

  function updateNoJobs() {
    const visible = [...document.querySelectorAll(".job-card")]
      .filter(card => card.style.display !== "none");

    noJobsMessage.classList.toggle("hidden", visible.length !== 0);
  }

  document.addEventListener("click", e => {
    const interviewBtnClick = e.target.closest(".interviewButton");
    const rejectedBtnClick = e.target.closest(".rejectedButton");
    const deleteBtnClick = e.target.closest(".deleteButton");

    if (interviewBtnClick) {
      const card = interviewBtnClick.closest(".job-card");
      const status = card.querySelector(".status");

      card.classList.add("interviewed");
      card.classList.remove("rejected");

      status.textContent = "INTERVIEW";
      status.classList.remove("bg-blue-200", "bg-red-200", "text-gray-800", "text-red-800");
      status.classList.add("bg-green-200", "text-green-800");
    }

    if (rejectedBtnClick) {
      const card = rejectedBtnClick.closest(".job-card");
      const status = card.querySelector(".status");

      card.classList.add("rejected");
      card.classList.remove("interviewed");

      status.textContent = "REJECTED";
      status.classList.remove("bg-blue-200", "bg-green-200", "text-gray-800", "text-green-800");
      status.classList.add("bg-red-200", "text-red-800");
    }

    if (deleteBtnClick) {
      deleteBtnClick.closest(".job-card").remove();
    }

    updateCounts();
    updateNoJobs();
  });

  allBtn.addEventListener("click", () => {
    setActiveFilter(allBtn);
    document.querySelectorAll(".job-card").forEach(card => {
      card.style.display = "block";
    });
    updateNoJobs();
  });

  interviewBtn.addEventListener("click", () => {
    setActiveFilter(interviewBtn);
    document.querySelectorAll(".job-card").forEach(card => {
      card.style.display = card.classList.contains("interviewed") ? "block" : "none";
    });
    updateNoJobs();
  });

  rejectedBtn.addEventListener("click", () => {
    setActiveFilter(rejectedBtn);
    document.querySelectorAll(".job-card").forEach(card => {
      card.style.display = card.classList.contains("rejected") ? "block" : "none";
    });
    updateNoJobs();
  });

  updateCounts();
});
