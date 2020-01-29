const button = document.querySelector('button');

function setCount(response) {
    const div = document.createElement('div');
    div.textContent = `${response.count} images were doggofied :)`;
    document.body.appendChild(div);
}

function handleClick() {
    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, 'doggofy this page', setCount);
        })
}

function buttonFunction() {
    button.addEventListener('click', handleClick, false);
}

function init() {
    document.addEventListener('DOMContentLoaded', buttonFunction);
}

init();