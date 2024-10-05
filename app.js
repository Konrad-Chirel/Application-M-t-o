const apiKey = '68660d87fd793c0446c73c1d366a6b10'; // Ta clé API OpenWeather

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        const weatherData = await getWeather(city);
        console.log(weatherData); // Ajout de logs pour vérifier les données
        displayWeather(weatherData);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`);
        if (!response.ok) {
            throw new Error('Ville non trouvée ou autre erreur réseau');
        }
        const data = await response.json();
        if (data.cod !== 200) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        console.error('Il y a eu un problème avec la requête fetch :', error);
        return { cod: 'error', message: error.message };
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        const icon = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherInfo.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <p>${data.weather[0].description}</p>
            <p>Température: ${data.main.temp}°C</p>
            <p>Humidité: ${data.main.humidity}%</p>
            <p>Vitesse du vent: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}
