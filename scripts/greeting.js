const greetingForm = document.querySelector(".greetingForm-js");
const greetingInput = greetingForm.querySelector("input");
const greetingMessage = document.querySelector(".greeting-js");

const USER_CHROME_STORAGE = "currentUser";
const SHOWING_ON = "showing";


function paintGreeting(text) {
    greetingForm.classList.remove(SHOWING_ON);
    greetingMessage.classList.add(SHOWING_ON);
    greetingMessage.innerHTML = `Hey ${text}, I'm GuardDog`;
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
    greetingForm.classList.add(SHOWING_ON);
    greetingForm.addEventListener("submit", handleSubmit);
}

function loadName() {
    let currentUser;
    chrome.storage.local.get("currentUser", function(result) {
        currentUser = result.key;
    });
    currentUser === undefined ? askForName() : paintGreeting(currentUser);
}

function init() {
    loadName();
}

init();