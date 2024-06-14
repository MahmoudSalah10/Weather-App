let searchInput = document.querySelector("#search");
let cityNameElement = document.querySelector(".location");
let temperatureElement = document.querySelector(".num");
let todayStatusElement = document.querySelector(".today-statues");
let todayIconElement = document.querySelector("#today-icon");
let secondDayIconElement = document.querySelector("#sec-icon");
let secondDayTemperatureElement = document.querySelector("#sec-deg");
let secondDayMinTemperatureElement = document.querySelector("#sec-small-deg");
let secondDayStatusElement = document.querySelector("#sec-statues");
let thirdDayIconElement = document.querySelector("#third-icon");
let thirdDayTemperatureElement = document.querySelector("#third-deg");
let thirdDayMinTemperatureElement = document.querySelector("#third-small-deg");
let thirdDayStatusElement = document.querySelector("#third-statues");
let todayElement = document.querySelector("#today");
let todayDateElement = document.querySelector("#today-date");
let secondDayElement = document.querySelector("#sec-day");
let thirdDayElement = document.querySelector("#third-day");

// displayCityWeather("cairo");
if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(function(pos){
     const lat = pos.coords.latitude
     const long = pos.coords.longitude
     displayCityWeather(`${lat} , ${long}`)
  })
}

searchInput.addEventListener("keyup", function () {
  displayCityWeather(searchInput.value || "cairo");
});

async function displayCityWeather(city) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=8915cd32cf36432fbb7155335232812&q=${city}&days=3`
  );

  let data = await response.json();

  if (response.status === 200) {
    let dateToday = new Date(data.forecast.forecastday[0].date);
    let dateSecondDay = new Date(data.forecast.forecastday[1].date);
    let dateThirdDay = new Date(data.forecast.forecastday[2].date);

    let todayName = getWeekDayName(dateToday.getDay());
    let secondDayName = getWeekDayName(dateSecondDay.getDay());
    let thirdDayName = getWeekDayName(dateThirdDay.getDay());

    let monthName = getMonthName(dateToday.getMonth());

    let todayDate = dateToday.getDate();

    todayElement.innerHTML = todayName;
    cityNameElement.innerHTML = data.location.name;
    temperatureElement.innerHTML = data.current.temp_c + `<sup>o</sup>C`;
    todayStatusElement.innerHTML = data.current.condition.text;
    todayDateElement.innerHTML = todayDate + monthName;
    todayIconElement.innerHTML = `<img class="w-100 " src="https:${data.current.condition.icon}" alt="${data.current.condition.text}" />`;

    secondDayElement.innerHTML = secondDayName;
    secondDayIconElement.innerHTML = `<img  src="https:${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}" />`;

    secondDayTemperatureElement.innerHTML =
      data.forecast.forecastday[1].day.maxtemp_c + `<sup>o</sup>C`;

    secondDayMinTemperatureElement.innerHTML =
      data.forecast.forecastday[1].day.mintemp_c + `<sup>o</sup>C`;

    secondDayStatusElement.innerHTML = data.forecast.forecastday[1].day.condition.text;

    thirdDayElement.innerHTML = thirdDayName;
    thirdDayIconElement.innerHTML = `<img  src="https:${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}" />`;

    thirdDayTemperatureElement.innerHTML =
      data.forecast.forecastday[2].day.maxtemp_c + `<sup>o</sup>C`;

    thirdDayMinTemperatureElement.innerHTML =
      data.forecast.forecastday[2].day.mintemp_c + `<sup>o</sup>C`;

    thirdDayStatusElement.innerHTML = data.forecast.forecastday[2].day.condition.text;
  }
}

function getWeekDayName(dayIndex) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return weekDays[dayIndex];
}

function getMonthName(monthIndex) {
  const monthNames = [
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

  return monthNames[monthIndex];
}

