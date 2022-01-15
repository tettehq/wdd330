function updatePortfolio() {
    const links = [
        {
            label: "Week1 notes",
            url: "week1/index.html"
        },
        {
            label: "Week2 exercises",
            url: "week2/week2_exercise.html"
        },
        {
            label: "Week3 notes",
            url: "week3/index.html"
        }
    ]

    let weeksList = document.querySelector("ol");

    links.forEach(link => {
        let weekItem = document.createElement("li");
        let weekLink = document.createElement("a");
        weekLink.setAttribute("href", link.url);
        weekLink.textContent = link.label;
        weekItem.appendChild(weekLink);
        weeksList.appendChild(weekItem);
    });
}

updatePortfolio();