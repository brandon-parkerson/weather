const API_KEY = "310895052518d402683b89bc46310274";
const submitButton = document.getElementsByClassName("submit")[0];
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("container");
const tempPara = document.createElement("p");
const feelsLikePara = document.createElement("p");
const descriptionPara = document.createElement("p");

function main() {

    async function fetchWeather(location) {
        const geolocation = await geocode(location);
        console.log(`Lat: ${geolocation[0]}`);
        console.log(`Lon: ${geolocation[1]}`);
        const lat = geolocation[0];
        const lon = geolocation[1];
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            displayWeather(result);
        } catch (error) {
            console.log(error.message);
        }
    }
    function buttonListener() {
        submitButton.addEventListener("click", function (e) {
            tempPara.innerText = "";
            feelsLikePara.innerText = "";
            descriptionPara.innerText = "";
            const city = cityInput.value;
            console.log(`${city}`);
            fetchWeather(city);
        })
    }

    async function geocode(location) {
        const cityName = location;
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const result = await response.json();
            console.log(result);

            const lat = result[0].lat;
            const lon = result[0].lon;
            const geolocation = [lat, lon];
            return geolocation;
        } catch (error) {
            console.log(error.message);
        }

    }

    function displayWeather(weather) {
        const weatherTemp = weather.main.temp;
        const feelsLike = weather.main.feels_like;
        const description =weather.weather[0].description; 
        console.log(description);
        // append degrees and feels like to p elements 
        tempPara.append(`Temp ${weatherTemp} degrees`);
        feelsLikePara.append(`Feels Like ${feelsLike} degrees`);
        descriptionPara.append(`${description}`)

        weatherContainer.append(tempPara);
        weatherContainer.append(feelsLikePara);
        weatherContainer.append(descriptionPara);
    }
    buttonListener();
}

main();
