function updatePortfolio() {
    const links = [
        {
            label: "Week1 notes",
            url: "week1/index.html"
        },
        {
            label: "Week2 notes",
            url: "week2/index.html"
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