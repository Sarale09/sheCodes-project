let week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
let now = new Date();
let day = week[now.getDay()];
let date = now.getDate();
let minutes = ('0'+now.getMinutes()).slice(-2);
let timeNow = now.getHours() + ":" + minutes;
let month = months[now.getMonth()];
var unit = "metric";


function celcius(){
  unit = "metric";
  console.log(unit);
  if (document.querySelector("#searchbarInput").value === ""){
    navigator.geolocation.getCurrentPosition(handlePosition);
  }
  searchCity(event);
}
function fahrenheit(){
  unit = "imperial";
  console.log(unit);
  if (document.querySelector("#searchbarInput").value === ""){
    navigator.geolocation.getCurrentPosition(handlePosition);
  }
  searchCity(event);
}

function searchCity(event){
  event.preventDefault();
  let citySearch = document.querySelector("#searchbarInput").value;
  citySearch = citySearch[0].toUpperCase() + citySearch.slice(1);
  let city = document.querySelector("#city");
  city.innerHTML = citySearch;
  changeWeather(`q=${citySearch}`);
}

function changeWeather(location){
  apiKey = "62231151ce343c4d68652e1617efc22f";
  let weatherurl = `https://api.openweathermap.org/data/2.5/weather?${location}&units=${unit}&appid=${apiKey}`;
  axios.get(weatherurl).then(getTemp);
}

function forecastUpdate(){
  let forecastElement = document.querySelector("#forecast");
  let forecastDays = ["tuesday","wednesday","thursday","friday","saturday"];

  let forecastHTML = `<div class="row">`;

  forecastDays.forEach(function(day){
    forecastHTML = forecastHTML + 
      `
        <div class="col">
              <p> <span class="temp">34</span>°/<span class="temp">23</span>°</p>
              <i class="fa-solid fa-sun"></i>
              <p>${day}</p>
        </div>
      `;
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords){
  console.log(coords);
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&unit=${unit}`;
  axios.get(forecastURL).then(forecastUpdate);
}

function getTemp(response){
  let weather = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#currentTemp");
  tempNow.innerHTML = weather + "°";

  let hum = document.querySelector(".humidity");
  hum.innerHTML = response.data.main.humidity + "%";

  let wind = document.querySelector(".wind");
  wind.innerHTML = response.data.wind.speed + windSpeedUnit();

  let desc = document.querySelector(".desc");
  desc.innerHTML = response.data.weather[0].description;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute("class", checkWeatherIcon(response));

  getForecast(response.data.coord);
}

function checkWeatherIcon (response) {
  if (response.data.weather[0].description === "clear sky") {
    let icon = "fa-solid fa-sun";
    return icon;
  } else if (response.data.weather[0].description === "few clouds") {
    let icon = "fa-solid fa-cloud-sun";
    return icon;
  } else if (response.data.weather[0].description === "scattered clouds") {
    let icon = "fa-solid fa-cloud";
    return icon;
  } else if (response.data.weather[0].description === "broken clouds" || response.data.weather[0].description === "overcast clouds" ) {
    let icon = "fa-solid fa-cloud dark";
    return icon;
  } else if (response.data.weather[0].main === "Rain") {
      if (response.data.weather[0].description === "light rain" || response.data.weather[0].description === "moderate rain") {
        let icon = "fa-solid fa-cloud-rain";
        return icon;
      } else {
        let icon = "fa-solid fa-cloud-showers-heavy";
        return icon;
      }
  } else if (response.data.weather[0].main === "Thunderstorm") {
    let icon = "fa-solid fa-cloud-bolt";
    return icon;
  } else if (response.data.weather[0].main === "Snow") {
    let icon = "fa-solid fa-snowflake";
    return icon;
  } else if (response.data.weather[0].description === "mist") {
    let icon = "fa-solid fa-wind";
    return icon;
  }
}

function handlePosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  changeWeather(`lat=${lat}&lon=${lon}`)
}
function windSpeedUnit(){
  if (unit === "metric"){
    let speedUnit = "M/S";
    return speedUnit;
  } else if (unit === "imperial") {
    let speedUnit = "MPH";
    return speedUnit;
  }
}
function currentPosition(){
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let clock = document.querySelector("#time");
clock.innerHTML = timeNow;
let today = document.querySelector("#today");
  today.innerHTML = `${day}, ${month} ${date}`;

currentPosition();

let c = document.querySelector("#celcius");
c.addEventListener("click", celcius);
let f = document.querySelector("#fahrenheit");
f.addEventListener("click", fahrenheit);

let search = document.querySelector("#searchbar");
search.addEventListener("submit", searchCity);

let currentLocationButton = document.querySelector("#currentLocation");

currentLocationButton.addEventListener("submit", navigator.geolocation.getCurrentPosition(handlePosition));