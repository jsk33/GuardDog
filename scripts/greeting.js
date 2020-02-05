const greetingForm = document.querySelector(".greetingForm-js");
const greetingInput = greetingForm.querySelector("input");
const greetingMessage = document.querySelector(".greeting-js");

const SHOWING_ON = "showing";

function paintGreeting(text) {
    console.log("painting greeting");
    greetingForm.classList.remove(SHOWING_ON);
    greetingMessage.classList.add(SHOWING_ON);
    greetingMessage.innerText = `Hey ${text}, I'm GuardDog`;
}

function handleSubmit(event) {
    event.preventDefault();

    const newName = greetingInput.value;
    chrome.storage.local.set({"currentUser": newName}, function() {
        console.log("current user is set to: " + newName);
    });
    paintGreeting(newName);
}

function askForName() {
    console.log("asking for name");
    greetingForm.classList.add(SHOWING_ON);
    greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
    let currentUser;

    getCurrentUserPromise().then(result => {
        currentUser = result;
        currentUser === undefined ? askForName() : paintGreeting(currentUser);
    })
}

function getCurrentUserPromise() {
    return new Promise(resolve => {
        chrome.storage.local.get({currentUser: ''}, function(items) {
          resolve(items.currentUser);
        })
    })
}

function init() {
    console.log("greeting.js initialized");
    loadName();
}

init();