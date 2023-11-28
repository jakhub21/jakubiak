const WeatherApp = class {
    constructor(apiKey, resultsBlockSelector) {
        this.apiKey = apiKey;
        this.resultsBlock = document.querySelector(resultsBlockSelector);
        this.currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q={query}&appid=${apiKey}&units=metric&lang=en`;
        this.forecastLink = `https://api.openweathermap.org/data/2.5/forecast?q={query}&appid=${apiKey}&units=metric&lang=en`;
        this.currentWeather = undefined;
        this.forecast = undefined;
    }

    getCurrentWeather(query) {
        let url = this.currentWeatherLink.replace("{query}", query);
        let req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", () => {
            this.currentWeather = JSON.parse(req.responseText);
            console.log(this.currentWeather);
            this.drawWeather();
        });
        req.send();
    }

    getForecast(query) {
        let url = this.forecastLink.replace("{query}", query);
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.forecast = data.list;
                console.log(this.forecast);
                this.drawWeather()
            })
        ;
    }

    getWeather(query) {
        this.getCurrentWeather(query);
        this.getForecast(query);
        }

    drawWeather() {
        this.resultsBlock.innerHTML = "";

        if(this.currentWeather ) {
            const date = new Date(this.currentWeather.dt * 1000);
            const weatherBlock = this.createWeatherBlock(
                `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`,
                this.currentWeather.main.temp,
                this.currentWeather.main.feels_like,
                this.currentWeather.weather[0].icon,
                this.currentWeather.weather[0].description
            );
            this.resultsBlock.appendChild(weatherBlock);
        }
        if (this.forecast) {
            for (let i = 0; i < this.forecast.length; i++) {
                let weather = this.forecast[i];
                const date = new Date(weather.dt * 1000);
                const weatherBlock = this.createWeatherBlock(
                    `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`,
                    weather.main.temp,
                    weather.main.feels_like,
                    weather.weather[0].icon,
                    weather.weather[0].description
                );
                this.resultsBlock.appendChild(weatherBlock);
            }
        }
    }

    createWeatherBlock(dateString, temperature, feelsLikeTemperature, iconName, description) {
        const weatherBlock = document.createElement("div");
        weatherBlock.className = "weather-block";

        const dateBlock = document.createElement("div");
        dateBlock.className = "weather-date";
        dateBlock.innerHTML = dateString;

        const temperatureBlock = document.createElement("div");
        temperatureBlock.className = "weather-temperature";
        temperatureBlock.innerHTML = `${temperature} &deg;C`;

        const feelsLikeTemperatureBlock = document.createElement("div");
        feelsLikeTemperatureBlock.className = "weather-temperature-feels-like";
        feelsLikeTemperatureBlock.innerHTML = `Feel: ${feelsLikeTemperature} &deg;C`

        const iconBlock = document.createElement("img");
        iconBlock.className = "weather-icon";
        iconBlock.src = `http://openweathermap.org/img/w/${iconName}.png`;

        const descriptionBlock = document.createElement("div");
        descriptionBlock.className = "weather-description";
        descriptionBlock.innerHTML = description;

        weatherBlock.appendChild(dateBlock);
        weatherBlock.appendChild(temperatureBlock);
        weatherBlock.appendChild(feelsLikeTemperatureBlock);
        weatherBlock.appendChild(iconBlock);
        weatherBlock.appendChild(descriptionBlock);

        return weatherBlock;
    }
}

document.weatherApp = new WeatherApp("7ded80d91f2b280ec979100cc8bbba94", "#weather-results-container");

document.querySelector("#checkButton").addEventListener("click", function() {
    const query = document.querySelector("#locationInput").value;
    document.weatherApp.getWeather(query);
});