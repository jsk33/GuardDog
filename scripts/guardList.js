const guardListForm = document.querySelector(".guardListForm-js");
const guardListInput = guardListForm.querySelector("input");
const guardListItems = document.querySelector(".guardListItems-js");


var guardList = {
    paintGuardList: function paintGuardList(textArray) {
        // for each item in the guard list, append a li child to guardListItems
        
    },

    saveGuardList: function saveGuardList(textArray) {
        chrome.storage.local.set({"guardList": textArray}, function() {
            console.log("guardList is set to: " + textArray);
        })
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
    
        const newGuardItem = guardListInput.value;
        guardList.addToGuardList(newGuardItem);
    },

    addToGuardList: function addToGuardList(text) {
        // append the new item to the string array of guard items
        let guardList;
        
        chrome.storage.local.get("guardList", function(result) {
            guardList = result;
        });
    
        guardList.append(text);
        guardList.saveGuardList(guardList);
        guardList.paintGuardList(guardList);
    },

    loadGuardListItems: function loadGuardListItems() {
        let guardList;
        
        chrome.storage.local.get("guardList", function(result) {
            guardList = result;
        });
    
        guardList === undefined ? console.log("empty guard list") : guardList.paintGuardList(guardList);
    },

    init: function init() {
        console.log("guardList.js initialized");
        guardList.loadGuardListItems();
        guardListForm.addEventListener("submit", guardList.handleSubmit);
    }
}

guardList.init();