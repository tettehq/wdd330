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
            label: "Week3 exercises",
            url: "week3/week3_exercises.html"
        },
        {
            label: "Week4 exercises",
            url: "week4/forms/hero/hero.html"
        },
        {
            label: "week5 exercises",
            url: "week5/testing_and_debugging/index.html"
        },
        {
            label: "week7 exercises",
            url: "week7/exercises/index.html"
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

let d = new Date()
document.getElementById("currentyear").innerHTML = d.getFullYear()

document.getElementById("currentdatetime").innerHTML = `Last updated: ${new Date(document.lastModified)}`