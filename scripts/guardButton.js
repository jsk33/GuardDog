const dogIcon = document.querySelector('.dogIcon');

var guardButton = {
    init: function init() {
        document.addEventListener('DOMContentLoaded', guardButton.dogIconFunction);
    },

    dogIconFunction: function dogIconFunction() {
        dogIcon.addEventListener("click", guardButton.handleClick, false);
    },

    handleClick: function handleClick() {
        chrome.tabs.query({currentWindow: true, active: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {message:'doggofy this page'});
            }
        )
    }
}

guardButton.init();