let guardListItems;

function getGuardListPromise() {
    return new Promise(resolve => {
        chrome.storage.local.get({guardList: ''}, function(items) {
            resolve(items.guardList);
        })
    })
}

getGuardListPromise().then(result => {
    guardListItems = result;

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            const temp = guardListItems.filter(value => sender.url.includes(value));
            console.log(guardListItems);
            console.log(temp);
            if (temp.length > 0) {
                sendResponse({status: "wasting time"});
            } else {
                sendResponse({status: "not wasting time"});
            }
        }
    )
});

