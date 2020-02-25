const gracePeriodForm = document.querySelector(".gracePeriod-js");
const gracePeriodInput = gracePeriodForm.querySelector("input");
const gracePeriodLabel = document.querySelector(".gracePeriodValue-js");
const gracePeriodBtn = document.querySelector(".gracePeriodBtn-js");

var gracePeriod = {
    init: function init() {
        gracePeriod.loadGracePeriod();
        gracePeriodBtn.addEventListener("click", gracePeriod.handleClick);
    },

    loadGracePeriod: function loadGracePeriod() {
        let currentGracePeriod;
        // get the grace period value from chrome storage
        gracePeriod.getGracePeriodPromise().then(result => {
            currentGracePeriod = result;
            if (currentGracePeriod === '') {
                gracePeriod.askGracePeriod();
            } else {
                gracePeriod.paintGracePeriod(currentGracePeriod);
            }
        })
    },

    getGracePeriodPromise: function getGracePeriodPromise() {
        return new Promise(resolve => {
            chrome.storage.local.get({gracePeriod: ''}, function(items) {
              resolve(items.gracePeriod);
            });
        });
    },

    askGracePeriod: function askGracePeriod() {
        // hide the label and show the form
        gracePeriodLabel.classList.remove(SHOWING_ON);
        gracePeriodForm.classList.add(SHOWING_ON);

        gracePeriodForm.addEventListener("submit", gracePeriod.handleSubmit);
    },

    handleSubmit: function handleSubmit(event) {
        event.preventDefault();

        const newGracePeriod = gracePeriodInput.value;
        chrome.storage.local.set({gracePeriod: newGracePeriod}, function() {
            console.log("current grace period is set to: " + newGracePeriod);
        });

        gracePeriod.paintGracePeriod(newGracePeriod);
    },

    paintGracePeriod: function paintGracePeriod(gracePeriod) {
        // hide text input & show label
        gracePeriodForm.classList.remove(SHOWING_ON);
        gracePeriodLabel.classList.add(SHOWING_ON);


        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {gracePeriod: gracePeriod}, function(response) {
                    gracePeriodLabel.innerText = `${response.gracePeriod} minutes`;
                });
            }
        )
    },

    handleClick: function handleClick() {
        chrome.storage.local.remove("gracePeriod");
        gracePeriod.askGracePeriod();
    }
}

gracePeriod.init();