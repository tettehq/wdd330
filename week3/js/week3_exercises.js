//1. table build
const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

function buildTable(objectArray) {
    let table = document.createElement("table");

    let columnHeads = Object.keys(objectArray[0]);
    let headRow = document.createElement("tr");
    columnHeads.forEach((column) => {
        let headCell = document.createElement("th");
        headCell.appendChild(document.createTextNode(column));
        headRow.appendChild(headCell);
    });
    table.appendChild(headRow);
    
    objectArray.forEach((object) => {
        let row = document.createElement("tr");
        columnHeads.forEach((column) => {
            let rowCell = document.createElement("td");
            rowCell.appendChild(document.createTextNode(object[column]));
            row.appendChild(rowCell);
        });
        table.appendChild(row);
    });
    return table;
}

let tableSpace = document.querySelector("#mountains");
tableSpace.appendChild(buildTable(MOUNTAINS));


//2. Elements by tag name
function byTagName(node, tagName) {
    let elements = [];
    tagName = tagName.toUpperCase();

    function readNode(node) {
        for (let i = 0; i < node.childNodes.length; i++) {
            let child = node.childNodes[i];
            if (child.nodeType == document.ELEMENT_NODE) {
                if (child.nodeName == tagName) elements.push(child);
                readNode(child);
            }
        }
    }
    readNode(node);
    return elements;
}

console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);
console.log(byTagName(document.body, "td").length);
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);