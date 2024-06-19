document.addEventListener('DOMContentLoaded', function() {
    const welcomeMessage = document.getElementById('welcome-message');
    const messageText = 'Welcome to SkyPredictor! Enter a location to get the latest weather updates!';
    let index = 0;

    function typeWriter() {
        if (index < messageText.length) {
            welcomeMessage.innerHTML += messageText.charAt(index);
            index++;
            setTimeout(typeWriter, 100); 
        }
    }

    typeWriter();
    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const location = document.getElementById('location').value;
        getWeather(location);
    });
});
function getWeather(location) {
    const apiKey = '4dd03470f83a2f14838c18b9af73a1f2';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            displayError('Unable to get weather data');
        });
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p class="error">${message}</p>`;
}
