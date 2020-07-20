/*
let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.toLowerCase();
city = city.trim();
if (weather[city] !== undefined) {
  citycapital = city.charAt(0).toUpperCase() + city.slice(1);
  citydegree = Math.round(weather[city].temp);
  cityfarenh = (weather[city].temp * 9) / 5 + 32;
  cityfarenh = Math.round(cityfarenh);
  alert(
    `It is currently ${citydegree}ºC (${cityfarenh}ºF) in ${citycapital} with a humidity of ${weather[city].humidity} %`
  );
} else {
  alert(
    `Sorry, we do not know the weather for this city, try going to https://www.google.com/search?q=weather+${city}.`
  );
}
*/

//SET THE CURRENT DATE

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function currentDate(date) {
  let hours = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let number = date.getDate();
  let month = date.getMonth();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  month = months[date.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let today = days[date.getDay()];

  return `${today} ${number} ${month}, ${hours}:${minutes}`;
}

let now = new Date();
let date = document.querySelector("#full-date");
date.innerHTML = currentDate(now);

//DISPLAY THE CITY WRITTEN IN THE SEARCH BAR

function displaydata(response) {
  //city
  document.querySelector("#full-city").innerHTML = response.data.name;
  console.log(response.data.name);

  //degrees
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );

  //description
  let description = response.data.weather[0].description;
  let descript = document.querySelector("#descript");
  descript.innerHTML = description;

  //extra information-humidity
  document.querySelector("#extrahumidity").innerHTML = Math.round(
    response.data.main.humidity
  );

  //extra information wind
  let windy = (document.querySelector("#extrawind").innerHTML = Math.round(
    response.data.wind.speed
  ));

  //extra information feels like
  let feelslike = (document.querySelector(
    "#extrafeelslike"
  ).innerHTML = Math.round(response.data.main.feels_like));
}
function toSearch(city) {
  let apiKey = "11a110017f1c9d2d6fa8fce3c4ceacf4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displaydata);
}

function handleSubmit(event) {
  event.preventDefault(); //solo se usa cuando trigger un link, form o button.
  //si entras en esta funcion a traves de otra funcion, no hay que ponerlo porque no me va a funcionar

  /*let writtenCity = document.querySelector("#city-name");

  //write the input city in a nice way in my page
  let citycapital = writtenCity.value.toLowerCase();
  citycapital = citycapital.trim();
  citycapital = citycapital.charAt(0).toUpperCase() + citycapital.slice(1);

  let title = document.querySelector("#full-city");
  title.innerHTML = `${citycapital}`;
  */

  //make the API call and display the name of the city and the temperature

  let city = document.querySelector("#city-name").value;
  toSearch(city);
}

let search = document.querySelector("#search-bar");
search.addEventListener("submit", handleSubmit);

//CHANGE CELSIUS-FAHRENHEIT

function toFahrenheit(event) {
  let currentDegrees = document.querySelector("#degrees");
  let degreeNumber = currentDegrees.innerHTML;
  degreeNumber = Number(degreeNumber);
  let fahrenheit = Math.round((degreeNumber * 9) / 5 + 32);
  currentDegrees.innerHTML = `${fahrenheit}`;

  let fahrenh = document.querySelector("#desired-unit");
  fahrenh.innerHTML = `Cº`;
  let celsius = document.querySelector("#current-unit");
  celsius.innerHTML = `Fº`;
}

function toCelsius(event) {
  let currentFahrenheit = document.querySelector("#degrees");
  let degreeNumber = currentFahrenheit.innerHTML; //this is a string
  degreeNumber = Number(degreeNumber);
  let celsius = Math.round(((degreeNumber - 32) * 5) / 9);
  currentFahrenheit.innerHTML = `${celsius}`;

  let celsiusTemp = document.querySelector("#desired-unit");
  celsiusTemp.innerHTML = `Fº`;
  let fahrenheit = document.querySelector("#current-unit");
  fahrenheit.innerHTML = `Cº`;
}

let unit = document.querySelector("#desired-unit");
unit.addEventListener("click", convertUnits);

function convertUnits(event) {
  event.preventDefault();
  let unit = document.querySelector("#desired-unit");
  let units = unit.innerHTML;

  if (units === "Fº") {
    toFahrenheit();
  } else {
    toCelsius();
  }
}

//city data by default
toSearch("Madrid");

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);

  let apiKey = "11a110017f1c9d2d6fa8fce3c4ceacf4";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displaydata);
}

function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", currentPosition);
