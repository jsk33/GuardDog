chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let images = document.querySelectorAll('img');
    images.forEach(function(image) {
        image.removeAttribute('srcset');
        image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
    })

    sendResponse({count: images.length});
})

chrome.runtime.sendMessage({message: "are you wasting time?"}, function(response) {
    console.log(response);
});




// function doggofy() {
//     let images = document.querySelectorAll('img');
//     images.forEach(function(image) {
//         image.removeAttribute('srcset');
//         image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
//     });
//     console.log("doggofied");
// }

// function doggofyInterval() {
//     if (isOnTimeWastingSite()) {
//         setInterval(doggofy, 5000);
//     }
// }

// window.setTimeout(doggofyInterval, 10000);