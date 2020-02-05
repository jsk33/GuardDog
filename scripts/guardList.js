const guardListForm = document.querySelector(".guardListForm-js");
const guardListInput = guardListForm.querySelector("input");
const guardListItems = document.querySelector(".guardListItems-js");



function paintGuardList(textArray) {
    // for each item in the guard list, append a li child to guardListItems
    
}

function saveGuardList(textArray) {
    chrome.storage.local.set({"guardList": textArray}, function() {
        console.log("guardList is set to: " + textArray);
    })
}

function handleSubmit(event) {
    event.preventDefault();

    const newGuardItem = guardListInput.value;
    addToGuardList(newGuardItem);
}

function addToGuardList(text) {
    // append the new item to the string array of guard items
    let guardList;
    
    chrome.storage.local.get("guardList", function(result) {
        guardList = result;
    });

    guardList.append(text);
    saveGuardList(guardList);
    paintGuardList(guardList);
}

function loadGuardListItems() {
    let guardList;
    
    chrome.storage.local.get("guardList", function(result) {
        guardList = result;
    });

    guardList === undefined ? console.log("empty guard list") : paintGuardList(guardList);
}

function init() {
    console.log("guardList.js initialized");
    loadGuardListItems();
    guardListForm.addEventListener("submit", handleSubmit);
}

init();