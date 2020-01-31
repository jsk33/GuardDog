chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (sender.url.includes("reddit")) {
            sendResponse({status: "wasting time"});
        } else {
            sendResponse({status: "not wasting time"});
        }
    }
)