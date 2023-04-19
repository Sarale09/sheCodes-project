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
  console.log(citySearch);
  let city = document.querySelector("#city");
  city.innerHTML = citySearch;
  changeWeather(`q=${citySearch}`);
}

function changeWeather(location){
  apiKey = "62231151ce343c4d68652e1617efc22f";
  let weatherurl = `https://api.openweathermap.org/data/2.5/weather?${location}&units=${unit}&appid=${apiKey}`;
  console.log(weatherurl);
  axios.get(weatherurl).then(getTemp);
}

function getTemp(response){
  let weather = Math.round(response.data.main.temp);
  console.log(weather);
  let tempNow = document.querySelector("#currentTemp");
  tempNow.innerHTML = weather + "°";
  console.log(response.data);
  let hum = document.querySelector(".humidity");
  hum.innerHTML = response.data.main.humidity + "%";
  let wind = document.querySelector(".wind");
  wind.innerHTML = response.data.wind.speed + windSpeedUnit();
  let desc = document.querySelector(".desc");
  console.log(response.data.weather[0].description);
  desc.innerHTML = response.data.weather[0].description;
}
function handlePosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
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