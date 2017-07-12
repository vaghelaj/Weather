var container = document.getElementById('Weather-Container');
var city = document.getElementById('city');
var description = document.getElementById('description');
var temperature = document.getElementById('temperature');
var temperatureMax = document.getElementById('temperatureMax');
var temperatureMin = document.getElementById('temperatureMin');
var humidity = document.getElementById('humidity');
var pressure = document.getElementById('pressure');

var locationResponse;
var request = new XMLHttpRequest();

request.open('GET', 'https://ipinfo.io/json', true);
request.onload = function() {

    locationResponse = JSON.parse(request.responseText);

    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=%27'+locationResponse.city+'+%27&appid=f5ca140b6db0de13daabb40571994509', true);
    request.onload = function () {
        var weatherResponse = JSON.parse(request.responseText);
        renderInformation(locationResponse, weatherResponse);
    };

    request.send();
};

request.send();

function renderInformation(serverLocationResponse, serverWeatherResponse) {

    var temp = Math.floor(serverWeatherResponse.main.temp - 273.15);
    var tempMax = Math.floor(serverWeatherResponse.main.temp_max - 273.15);
    var tempMin = Math.floor(serverWeatherResponse.main.temp_min - 273.15);
    city.innerHTML = serverLocationResponse.city;
    temperature.innerHTML = temp + "°";
    description.innerHTML = serverWeatherResponse.weather[0].description.charAt(0).toUpperCase() + serverWeatherResponse.weather[0].description.slice(1);
    temperatureMax.innerHTML = "Max: " + tempMax + "°";
    temperatureMin.innerHTML = "Min: " + tempMin + "°";
    humidity.innerHTML = "Humidity: " + serverWeatherResponse.main.humidity + "%";
    pressure.innerHTML = "Pressure: " + serverWeatherResponse.main.pressure + " hPa";
}
