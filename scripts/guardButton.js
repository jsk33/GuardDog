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
                chrome.tabs.sendMessage(tabs[0].id, 'doggofy this page', guardButton.setCount);
            }
        )
    },
    setCount: function setCount(response) {
        const div = document.createElement('div');
        div.textContent = `${response.count} images doggofied :)`;
        document.body.appendChild(div);
    }

}

guardButton.init();