function formatDate(date) {
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()];

  let dateNumber = date.getDate();

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let month = months[date.getMonth()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  
  let todayDateTime = document.querySelector("#today-date-time");
 
  todayDateTime.innerHTML = `${day} ${dateNumber} ${month} | ${hour}:${minutes}`;

}

function changeToFarenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = "30°F"
}

function changeToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = "-1°C"
}

let now = new Date();
formatDate(now);


let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener("click", changeToFarenheit);

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", changeToCelsius);





function showWeather(response) {
   console.log(response);
   let currentTemperature = Math.round(response.data.main.temp);
   document.querySelector("#current-temperature").innerHTML = `${currentTemperature}°C`
   document.querySelector("#description").innerHTML = response.data.weather[0].main;
   document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   let windSpeed = document.querySelector("#wind-speed");
   let formattedWindSpeed = Math.round((response.data.wind.speed) * 3.6);
   windSpeed.innerHTML = formattedWindSpeed;
   let currentLocationCity = document.querySelector("#current-city");
   currentLocationCity.innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "a57cca630b0e893126f37f33164019a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar-input").value;
  search(city);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a57cca630b0e893126f37f33164019a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather)
}

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(showLocation) 
}

let citySearchBar = document.querySelector("#city-search-bar");
citySearchBar.addEventListener("submit", displayCity);

let locationButton = document.querySelector("#current-location-btn");
locationButton.addEventListener("click", showPosition)

search("London");



