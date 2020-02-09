const guardListForm = document.querySelector(".guardListForm-js");
const guardListInput = guardListForm.querySelector("input");
const guardListItemList = document.querySelector(".guardListItems-js");


var guardList = {
    paintGuardList: function paintGuardList(guardListItems) {
        // for each item in the guard list, append a li child to guardListItems
        guardListItemList.innerHTML='';
        
        guardListItems.forEach(guardObj => {
            const listItem = document.createElement("li");
            const deleteBtn = document.createElement("button");
            const span = document.createElement("span");

            listItem.id = guardObj.id;

            deleteBtn.innerText = "❌";
            deleteBtn.addEventListener("click", guardList.handleDelete);

            span.innerText = guardObj.site + " ";

            listItem.appendChild(span);
            listItem.appendChild(deleteBtn);

            guardListItemList.appendChild(listItem);
        });
    },

    handleDelete: function handleDelete(event) {
        console.log("deleting item");
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
                // initialize a new array and add the new guard object
                let newId = 1;
                let newGuardObj = {
                    site: newGuardItem,
                    id: newId
                };
                tempGuardList = [newGuardObj];
                guardList.saveGuardList(tempGuardList);
            } else {
                // append the new guard object to the existing array of guard items
                let newId = tempGuardList.length + 1;
                let newGuardObj = {
                    site: newGuardItem,
                    id: newId
                }
                tempGuardList.push(newGuardObj);
                guardList.saveGuardList(tempGuardList);
            }
            console.log(tempGuardList);
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