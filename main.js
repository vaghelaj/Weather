//Refering all the elements to their apporiate variable names.
var city = document.getElementById('city');
var region = document.getElementById('region');
var temperature = document.getElementById('temperature');
var temperatureMax = document.getElementById('temperatureMax');
var temperatureMin = document.getElementById('temperatureMin');
var locationResponse;
var weatherResponse;

var request = new XMLHttpRequest();
//Setting up a connection with the ip info, which fetchs the user's location.
request.open('GET', 'https://ipinfo.io/json', true);

request.onload = () => {
  //Checking the API request status for ipinfo.
  if (request.status >= 200 && request.status < 400) {
    locationResponse = JSON.parse(request.responseText);
    //Using the fetched location for getting the current weather information.
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+locationResponse.city+'&appid=f5ca140b6db0de13daabb40571994509&units=metric', true);
    request.onload = () => {
      //Checking the API request status for openweathermap.
      if (request.status >= 200 && request.status < 400) {
        weatherResponse = JSON.parse(request.responseText);
        renderInformation(locationResponse, weatherResponse)
      }
    }
    //Printing "Something Happen!" in the console when an error occurs.
    request.onerror = () => {
      console.log("Something Happen!");
    }
    request.send();
  }
}

//Printing "Something Happen!" in the console when an error occurs.
request.onerror = () => {
  console.log("Something Happen!");
}
request.send();


//This function renders all the inner HTML of the elements.
let renderInformation = (serverLocationResponse, serverWeatherResponse) => {
    city.innerHTML = serverLocationResponse.city;
    region.innerHTML = serverLocationResponse.region.substring(0,2).toUpperCase();
    temperature.innerHTML = Math.floor(serverWeatherResponse.main.temp);
    temperatureMax.innerHTML = Math.floor(serverWeatherResponse.main.temp_max);
    temperatureMin.innerHTML = Math.floor(serverWeatherResponse.main.temp_min);
}
