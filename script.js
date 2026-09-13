const API_KEY = "c9e24f1d1df9b4b3a5db3b246516ac99";
const submitButton = document.getElementsByClassName("submit")[0];
const cityInput = document.getElementById("city");

function main() {
    console.log(submitButton);
}

function buttonListener() {
    submitButton.addEventListener("click", function (e) {
        const city = cityInput.value;
        console.log(`${city}`);
        fetchWeather(city);
    })
}

async function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
}


buttonListener();
main();
