let intervalDuration;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "doggofy this page") {
        let images = document.querySelectorAll('img');
        images.forEach(function(image) {
            image.removeAttribute('srcset');
            image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
        });
    } else {
        intervalDuration = request.gracePeriod;
        console.log(intervalDuration);
        sendResponse({gracePeriod: intervalDuration});
    }
})

chrome.runtime.sendMessage({message: "are you wasting time?"}, function(response) {
    if (response.status === "wasting time") {
        let intervalDuration;

        content.getGracePeriodPromise().then(result => {
            intervalDuration = result;
            if (intervalDuration === '') {
                
            } else {
                window.setTimeout(doggofyInterval, intervalDuration * 60000);
                console.log(`this page will doggofy in ${intervalDuration} minutes`);
            }
        })
        
    }
});


function doggofy() {
    let images = document.querySelectorAll('img');
    images.forEach(function(image) {
        image.removeAttribute('srcset');
        image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
    });
}

function doggofyInterval() {
    setInterval(doggofy, 5000);
}

var content = {
    getGracePeriodPromise: function getGracePeriodPromise() {
        return new Promise(resolve => {
            chrome.storage.local.get({gracePeriod: ''}, function(items) {
              resolve(items.gracePeriod);
            });
        });
    }
}
