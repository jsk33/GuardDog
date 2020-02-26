let intervalDuration;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "doggofy this page") {
        content.doggofy();
    } else {
        
    }
})

chrome.runtime.sendMessage({message: "are you wasting time?"}, function(response) {
    if (response.status === "wasting time") {
        let intervalDuration;

        content.getGracePeriodPromise().then(result => {
            intervalDuration = result;
            if (intervalDuration === '') {
                // no need to activate doggofyInterval
            } else {
                // activate doggofyInterval after 'intervalDuration' minutes
                window.setTimeout(content.doggofyInterval, content.durationInMinutes(intervalDuration));
            }
        });
    }
});


var content = {
    getGracePeriodPromise: function getGracePeriodPromise() {
        return new Promise(resolve => {
            chrome.storage.local.get({gracePeriod: ''}, function(items) {
              resolve(items.gracePeriod);
            });
        });
    },

    doggofy: function doggofy() {
        let images = document.querySelectorAll('img');
        images.forEach(function(image) {
            image.removeAttribute('srcset');
            image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
        });
    },

    doggofyInterval: function doggofyInterval() {
        // doggofies every 5 seconds
        setInterval(content.doggofy, 5000);
    },

    durationInMinutes: function durationInMinutes(intervalDuration) {
        return intervalDuration * 60000;
    }
}
