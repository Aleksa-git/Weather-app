let currentday = document.querySelector("#currentday");
let current = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[current.getDay()];
let hour = current.getHours();
let min = current.getMinutes();
currentday.innerHTML = `${day} ${hour}:${min}`;

function checkCity(event) {
  event.preventDefault();
  let city = document.querySelector("#inputcity");
  let enterCity = document.querySelector("#currentcity");
  enterCity.innerHTML = city.value;
}
let city = document.querySelector("#formsearch");
city.addEventListener("submit", checkCity);

function converttoFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currtemp");
  let currtemp = temperatureElement.innerHTML;
  currtemp = Number(currtemp);
  temperatureElement.innerHTML = Math.round((currtemp * 9) / 5 + 32);
}

function converttoCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#currtemp");
  let currtemp = temperatureElement.innerHTML;
  currtemp = Number(currtemp);
  temperatureElement.innerHTML = Math.round(((currtemp - 32) * 5) / 9);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", converttoFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", converttoCelsius);

let apiKey = "9b4dd9de229ea5afe63c1fc8670585e8";

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#currtemp");
  currentTemp.innerHTML = `${temperature}`;
  let cityName = document.querySelector("#currentcity");
  cityName.innerHTML = response.data.name;
  let weatherInfo = document.querySelector(".current-weather");
  weatherInfo.innerHTML = response.data.weather[0].main;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}

function CurrentLocTemp(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#geo");
currentLocation.addEventListener("click", CurrentLocTemp);
let searchForm = document.querySelector("#formsearch");
searchForm.addEventListener("submit", searchCity);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputcity");
  let inputcity = cityInput.value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputcity}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

CurrentLocTemp();
