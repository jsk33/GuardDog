const weather = document.querySelector(".weather-js");

const API_KEY = "7f702cad950ec9fa1307bf6ebf86f58c";
const COORDS = 'coords';

function getWeather(lat, long) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        // the initial response from the fetch call gives me the network info, from which we need the json object version
        return response.json();
    })
    .then(function(json) {
        // once we have the json, we can do the following
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    })
}

function saveCoords(coordsObject) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObject));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObject = {
        latitude,
        longitude
    }

    saveCoords(coordsObject);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();