


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        sendResponse(getWasteStatus(displayTab));
    }
)

function getWasteStatus(callback) {
    chrome.tabs.query({currentWindow: true, active: true, url: "https://www.reddit.com/*"},
        function(tab) {
            callback(tab);
        }
    );
}

function displayTab(tab) {
    console.log(tab);
    if (tab.length !== 0) {
        return {status: "waste"};
    } else {
        return {status: "not waste"};
    }
}