chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //const regex = new RegExp('dog', 'gi');
    //const matches = document.documentElement.innerHTML.match('regex');

    let images = document.querySelectorAll('img');
    images.forEach(function(image) {
        // while(image.attributes.length > 0) {
        //     image.removeAttribute(image.attributes[0].name);
        // }

        image.removeAttribute('srcset');
        
        image.src = "https://www.rover.com/blog/wp-content/uploads/2019/11/shiba-dreamstime-960x540.jpg";
    })

    sendResponse({count: images.length});
})