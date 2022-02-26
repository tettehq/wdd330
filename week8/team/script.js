let htmlPeopleUl = document.getElementById("people-list")

let nextUrl = ""
let previousUrl = ""


function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        //.then(data => console.log(data))
        .then(data => {
            showList(data);
            nextUrl = data.next;
            previousUrl = data.previous;
        });
}

// fetch('https://swapi.dev/api/people/')
//         .then(response => response.json())
//         //.then(data => console.log(data))
//         .then(data => {
//             showList(data);
//             nextUrl = data.next;
//             previousUrl = data.previous;
//         });

function showList(data) {
    for (let i = 0; i < data.results.length; i++) {
        console.log(i);
        let li = document.createElement("li");
        li.textContent = data.results[i].name;
        li.id = data.results[i].url;
        li.addEventListener("click", showFullDetails);
        htmlPeopleUl.appendChild(li);
    }
}

function removeList() {
    while (htmlPeopleUl.lastChild) {
        htmlPeopleUl.lastChild.remove()
    }
}

function showRequested(url) {
    if (url != "" && url != null) {
        removeList();
        fetchData(url);
    }
}

function showFullDetails(event) {
    const key = event
    // let peopleList = Array.from(document.querySelectorAll("li"));
    // for (let i = 0; peopleList.length; i++) {
    //     peopleList[i].addEventListener("click", ()=> {
    //         fetch(`https://swapi.dev/api/people/${i+1}/`)
    //         .then(response => {
    //             console.log(response);
    //         })
    //     })
    // }
    fetch(event.target.id)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let detailList = document.createElement("ul");
        let birthyear = document.createElement("li");
        let gender = document.createElement("li");
        let height = document.createElement("li");
        let complexion = document.createElement("li");

        birthyear.textContent = data.birth_year;
        gender.textContent = data.gender;
        height.textContent = data.height;
        complexion.textContent = data.skin_color;

        detailList.appendChild(birthyear);
        detailList.appendChild(gender);
        detailList.appendChild(height);
        detailList.appendChild(complexion);
        
        key.target.appendChild(detailList);
    });
    key.target.removeEventListener("click", showFullDetails)
}

let htmlPreviosButton = document.getElementById("previous-button")
let htmlNextButton = document.getElementById("next-button")

htmlPreviosButton.addEventListener("click", () => showRequested(previousUrl))
htmlNextButton.addEventListener("click", () => showRequested(nextUrl))

window.addEventListener("load", fetchData('https://swapi.dev/api/people/'));