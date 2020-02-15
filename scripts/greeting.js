const greetingForm = document.querySelector(".greetingForm-js");
const greetingInput = greetingForm.querySelector("input");
const greetingMessage = document.querySelector(".greeting-js");
const greetingChangeUserBtn = document.querySelector(".greetingChangeUserBtn-js");

const SHOWING_ON = "showing";

var greeting = {
    paintGreeting: function paintGreeting(text) {
        greetingForm.classList.remove(SHOWING_ON);
        greetingMessage.classList.add(SHOWING_ON);
        greetingMessage.innerText = `Hey ${text}, I'm GuardDog`;
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();
    
        const newName = greetingInput.value;
        chrome.storage.local.set({currentUser: newName}, function() {
            console.log("current user is set to: " + newName);
        });
        greeting.paintGreeting(newName);
    },

    askForName: function askForName() {
        greetingForm.classList.add(SHOWING_ON);
        greetingForm.addEventListener("submit", greeting.handleSubmit);
    },

    loadName: function loadName() {
        let currentUser;
    
        greeting.getCurrentUserPromise().then(result => {
            currentUser = result;
            currentUser === '' ? greeting.askForName() : greeting.paintGreeting(currentUser);
        })
    },
    
    getCurrentUserPromise: function getCurrentUserPromise() {
        return new Promise(resolve => {
            chrome.storage.local.get({currentUser: ''}, function(items) {
              resolve(items.currentUser);
            })
        })
    },

    changeUserBtnOnClick: function changeUserBtnOnClick(event) {
        chrome.storage.local.remove("currentUser");
        greetingMessage.classList.remove(SHOWING_ON);
        greeting.askForName();
    },

    init: function init() {
        greeting.loadName();
        greetingChangeUserBtn.addEventListener("click", greeting.changeUserBtnOnClick);
    }
}

greeting.init();