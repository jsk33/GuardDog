chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let images = document.querySelectorAll('img');
    images.forEach(function(image) {
        image.removeAttribute('srcset');
        image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
    })

    sendResponse({count: images.length});
})