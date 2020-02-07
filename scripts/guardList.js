const guardListForm = document.querySelector(".guardListForm-js");
const guardListInput = guardListForm.querySelector("input");
const guardListItemList = document.querySelector(".guardListItems-js");


var guardList = {
    paintGuardList: function paintGuardList(guardListItems) {
        // for each item in the guard list, append a li child to guardListItems
        guardListItemList.innerHTML='';
        
        guardListItems.forEach(value => {
            console.log(value);
            let listItem = document.createElement("li");
            listItem.innerText = value;
            guardListItemList.appendChild(listItem);
        });
    },

    saveGuardList: function saveGuardList(guardListItems) {
        chrome.storage.local.set({"guardList": guardListItems});
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
    
        const newGuardItem = guardListInput.value;
        guardListInput.value='';
        guardList.addToGuardList(newGuardItem);
    },

    addToGuardList: function addToGuardList(newGuardItem) {
        // append the new item to the string array of guard items
        let tempGuardList;
        
        guardList.getGuardListPromise().then(result => {
            tempGuardList = result;
            if (tempGuardList === '') {
                // initialize a new string array and add the new guard item to it
                tempGuardList = [newGuardItem];
                guardList.saveGuardList(tempGuardList);
            } else {
                // append the new guard item to the existing string array of guard items
                tempGuardList.push(newGuardItem);
                guardList.saveGuardList(tempGuardList);
            }
            guardList.paintGuardList(tempGuardList);
        })

    },

    loadGuardListItems: function loadGuardListItems() {
        let tempGuardList;
        
        guardList.getGuardListPromise().then(result => {
            tempGuardList = result;
            console.log(tempGuardList);
            tempGuardList === '' ? console.log("empty guard list") : guardList.paintGuardList(tempGuardList);
        })
    },

    getGuardListPromise: function getGuardListPromise() {
        return new Promise(resolve => {
            chrome.storage.local.get({guardList: ''}, function(items) {
                resolve(items.guardList);
            })
        })
    },

    init: function init() {
        guardList.loadGuardListItems();
        guardListForm.addEventListener("submit", guardList.handleSubmit);
    }
}

guardList.init();