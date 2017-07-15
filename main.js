var city = document.getElementById('city');
var region = document.getElementById('region');
var temperature = document.getElementById('temperature');
var temperatureMax = document.getElementById('temperatureMax');
var temperatureMin = document.getElementById('temperatureMin');

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
    region.innerHTML = serverLocationResponse.region.substring(0,2).toUpperCase();
    temperature.innerHTML = temp;
    temperatureMax.innerHTML =tempMax;
    temperatureMin.innerHTML = tempMin;
}
