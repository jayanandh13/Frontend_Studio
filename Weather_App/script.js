const apiKey = "45ae66a48fdc48982a2bca4f33dfbf86";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = document.querySelector(".search input"); 
const searchBtn = document.querySelector(".search button"); 
const weatherIcon = document.querySelector(".weather-icon");
const errorDiv = document.querySelector(".error");
const weatherDiv = document.querySelector(".weather");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            errorDiv.style.display = "block";
            weatherDiv.style.display = "none";
            return;
        }

        const data = await response.json();
        updateWeather(data);
        errorDiv.style.display = "none";  


    } catch (error) {
        console.error('Error fetching weather data:', error);
        errorDiv.style.display = "block";
        weatherDiv.style.display = "none";
    }
}

function updateWeather(data) {
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    
    const weatherCondition = data.weather[0].main.toLowerCase();
    setWeatherIcon(weatherCondition);
    weatherDiv.style.display = "block";
}

function setWeatherIcon(condition) {
    const weatherIcons = {
        clouds: "images/clouds.png",
        clear: "images/clear.png",
        rain: "images/rain.png",
        drizzle: "images/drizzle.png",
        mist: "images/mist.png",
        snow: "images/snow.png"
    };

    weatherIcon.src = weatherIcons[condition] || "images/default.png";
}

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        checkWeather(city);
    }
});