const unitBoard = document.getElementById("unit-board");
const unitBtn = document.getElementById("unit-btn");
const dayOfTheWeekCtn = document.getElementById("day-of-the-week")
const dayOfTheWeekBoard = document.getElementById("day-of-the-week-board")
const skeletonDayBoard = document.getElementById("skeleton-day-board")
const dayOfTheWeekBtn = document.getElementById("forecast-day-btn")
const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const searchResult = document.getElementById("search-result")
const weatherForecast = document.getElementById("weather-detail")
const board = document.getElementById("board")
const boardText = document.getElementById("board-inner-text");
const loadingText = document.getElementById("loading-text");
const temperatureCardText = document.getElementById("temperature-card-text");
const humidityCardText = document.getElementById("humidity-card-text");
const windSpeedCardText = document.getElementById("wind-speed-card-text");
const precipitationCardText = document.getElementById("precipitation-card-text");
const forecastDayBtn = document.getElementById("forecast-day-btn");
const hourlyForecastContent = document.getElementById("hourly-forecast-content");

let cityCards = document.querySelectorAll(".city-card")
const dailyForecastCards = document.querySelectorAll("#daily-forecast .card-wrapper .card")
const forecastDays = document.querySelectorAll("#hourly-forecast .label-ctn");
const forecastRadios = document.getElementsByName("forecast-day")

const temperatureRadios = document.getElementsByName("temperature");
const windSpeedRadios = document.getElementsByName("wind-speed");
const precipitationRadios = document.getElementsByName("precipitation");

const temperatureTexts = document.querySelectorAll(".temperature-text")
const precipitationTexts = document.querySelectorAll(".precipitation-text")
const windSpeedTexts = document.querySelectorAll(".wind-speed-text")

unitBtn.addEventListener("click" , function(event){
    event.stopPropagation();
    unitBoard.classList.toggle("hidden");
});

unitBoard.addEventListener("click" , function(event){
    event.stopPropagation();
});

dayOfTheWeekBtn.addEventListener("click" , function(event){
    event.stopPropagation();
    dayOfTheWeekBoard.classList.toggle("hidden");
});

dayOfTheWeekBoard.addEventListener("click" , function(event){
    event.stopPropagation();
});

window.addEventListener("click" , (e) => {
    e.stopPropagation();
    if(!unitBoard.classList.contains("hidden"))
        unitBoard.classList.toggle("hidden");
    if(!dayOfTheWeekBoard.classList.contains("hidden"))
        dayOfTheWeekBoard.classList.toggle("hidden");
    if(!searchResult.classList.contains("hidden"))
        searchResult.classList.toggle("hidden");
})

let latitude = 52.52;
let longitude = 13.41;
let cityName = "Vietnam";
let cityAdmin = "Vietnam";
let forecastDayOfTheWeek = 0;

forecastDays.forEach((forecastDay) => {
    forecastDay.addEventListener("click" , () => {
        
        setTimeout( () => {
        forecastDayBtn.innerHTML = `${forecastDay.textContent}  <img style = "width: 30%; height: 30%;" src = "./assets/images/icon-dropdown.svg"/>`;
        dayOfTheWeekBoard.classList.toggle("hidden");
        loadHourlyForcast(getForecastDay());
        }, 1);
    })
});

function getForecastDay(){
    let count = 0;
    let result = -1;
    forecastRadios.forEach((forecastDay) => {
        if(forecastDay.checked)
            result = count;
        // console.log(forecastDay);
        count++;
    });
    forecastDayOfTheWeek = result;
    console.log(result);
    return (result + 1) % 7;
}

function setDayBtn(index){
    forecastDayBtn.innerHTML = `${dayMap[index]}  <img style = "width: 30%; height: 30%;" src = "./assets/images/icon-dropdown.svg"/>`;
}

const weatherMap = {
    "0": "sunny",
    "1": "partly-cloudy",
    "2": "partly-cloudy",
    "3": "partly-cloudy",
    "45": "fog",
    "48": "fog",
    "51": "drizzle",
    "53": "drizzle",
    "55": "drizzle",
    "56": "drizzle",
    "57": "drizzle",
    "61": "rain",
    "63": "rain",
    "65": "rain",
    "66": "rain",
    "67": "rain",
    "71": "snow",
    "73": "snow",
    "75": "snow",
    "77": "snow",
    "85": "snow",
    "86": "snow",
    "80": "rain",
    "81": "rain",
    "82": "rain",
    "95": "storm",
    "96": "storm",
    "99": "storm"
};

const monthMap = {
    "0": "January",
    "1": "February",
    "2": "March",
    "3": "April",
    "4": "May",
    "5": "June",
    "6": "July",
    "7": "August",
    "8": "September",
    "9": "October",
    "10": "November",
    "11": "December"
};

const dayMap = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
}

function getWeather(weatherCode){
    return weatherMap[weatherCode];
}

function getDateString(today){
    return `${dayMap[today.getDay()]}, ${monthMap[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

let dataObj;

let temperatureUnit = "celsius";
let windSpeedUnit = "kmh";
let precipitationUnit = "mm";

async function loadForecastData(){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=${temperatureUnit}&precipitation_unit=${precipitationUnit}&wind_speed_unit=${windSpeedUnit}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&&minutely_15=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`;
    dataObj = await fetch(url)
        .then((data) => data.json())
        .catch((err) => console.log("NGU"))

    console.log(dataObj)

    today = new Date(dataObj.current.time)
    console.log(today.toDateString());

    console.log(loadingText)
    loadingText.classList.add("hidden");
    boardText.classList.remove("hidden");
    board.classList.remove("skeleton-board");

    boardText.innerHTML = `
        <span id = "board-left-text">
            <p>${cityName}, ${cityAdmin}</p>
            <p>${getDateString(today)}</p>
        </span>
        <span id = "board-right-text">
            <img class = "board-icon" src = "./assets/images/icon-${getWeather(dataObj.current.weather_code)}.webp"/>
            <p id = "right-text">${dataObj.current.temperature_2m}</p>
        </span>
    `;

    temperatureCardText.classList.remove("skeleton-text");
    temperatureCardText.innerText = dataObj.minutely_15.temperature_2m[0];
    humidityCardText.classList.remove("skeleton-text");
    humidityCardText.innerText = dataObj.minutely_15.relative_humidity_2m[0];
    windSpeedCardText.classList.remove("skeleton-text");
    windSpeedCardText.innerText = dataObj.minutely_15.wind_speed_10m[0];
    precipitationCardText.classList.remove("skeleton-text");
    precipitationCardText.innerText = dataObj.minutely_15.precipitation[0];

        //     <p class = "day-of-the-week">Mon</p>
        //     <img class = "weather-icon" src = "assets/images/icon-rain.webp">
        //     <span class = "card-temperature">
        //       <p class = "temperature-text">20</p>
        //       <p class = "temperature-text">14</p>
        //     </span>

    count = 0;
    dailyForecastCards.forEach((daily) => {
        let day = new Date(dataObj.daily.time[count]);
        daily.innerHTML = `
            <p class = "day-of-the-week">${dayMap[day.getDay()].slice(0,3)}</p>
            <img class = "weather-icon" src = "assets/images/icon-${getWeather(dataObj.daily.weather_code[count])}.webp">
            <span class = "card-temperature">
              <p class = "temperature-text">${dataObj.daily.temperature_2m_max[count]}</p>
              <p class = "temperature-text">${dataObj.daily.temperature_2m_min[count]}</p>
            </span>
        `;

        count++;
    });

    skeletonDayBoard.classList.add("hidden");
    dayOfTheWeekCtn.classList.remove("hidden");

    let currentDate = new Date(dataObj.hourly.time[0]);
    // currentDate = (currentDate.day - 1 + 7) % 7;
    let dateIndex = (currentDate.getDay() - 1 + 7) % 7;
    forecastRadios[dateIndex].checked = true;
    setDayBtn(currentDate.getDay());

    loadHourlyForcast(getForecastDay());
}

async function loadHourlyForcast(dayIndex){
    let index = -1;
    for (let current_index = 0 ; current_index < 7 ; current_index++){
        let currentDate = new Date(dataObj.hourly.time[current_index * 24]);
        if(dayIndex === currentDate.getDay())
            index = current_index;
    }

    console.log(dayIndex , index);
        
    let startIndex = index * 24;
    let endIndex = (index + 1) * 24 - 1;

    // hourlyForecastContent

    console.log(hourlyForecastContent);
    hourlyForecastContent.innerHTML = ``;

    for (let current_index = startIndex ; current_index <= endIndex ; current_index++){
        let currentTime = new Date(dataObj.hourly.time[current_index]);
        currentTime = currentTime.getHours();
        let timeText = `${(currentTime <= 12) ? `${currentTime}AM` : `${currentTime - 12}PM`}`;

        hourlyForecastContent.innerHTML += `
            <div class = "hour-card">
                <div class = "hour-card-content">
                <span class = "weather-text">
                    <img class = "weather-icon" src = "assets/images/icon-${getWeather(dataObj.hourly.weather_code[current_index])}.webp"/>
                    <p>${timeText}</p>
                </span>

                <p class = "temperature-text">${dataObj.hourly.temperature_2m[current_index]}</p>
                </div>
            </div>
        `;
    }
}

async function updateSearchResult(e){
    e.stopPropagation();

    if(searchResult.classList.contains("hidden"))
        searchResult.classList.toggle("hidden")

    searchResult.innerHTML = `
        <div class = "loading-card">
          <h2 class = "loading-text">Loading</h2>
        </div>
    `;

    const location_name = searchBar.value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location_name}`

    let resultObj = await fetch(url)
        .then((data) => data.json())
        .catch((err) => console.log("NGU"))

    const resultArr = resultObj['results']

    searchResult.innerHTML = '';
    for (let i = 0 ; i < resultArr.length ; i++){
        // console.log(resultArr[i]);
        
        searchResult.innerHTML += `
            <div class = "city-card">
                <h2>${resultArr[i].name}</h2>
                <p>${resultArr[i].admin1 ? `${resultArr[i].admin1} ,` : ""} ${resultArr[i].admin2 ? `${resultArr[i].admin2} ,` : ""} ${resultArr[i].country ? `${resultArr[i].country}` : ""}</p>
            </div>
        `;
    }

    cityCards = Array.from(document.querySelectorAll(".city-card"))

    cityCards.forEach((cityCard) => {
        cityCard.addEventListener("click" , () => {
            const index = cityCards.findIndex((card) => card === cityCard)
            latitude = resultArr[index].latitude;
            longitude = resultArr[index].longitude;

            cityName = resultArr[index].name;
            cityAdmin = `${resultArr[index].admin1 ? `${resultArr[index].admin1} ,` : ""} ${resultArr[index].admin2 ? `${resultArr[index].admin2} ,` : ""} ${resultArr[index].country ? `${resultArr[index].country}` : ""}`;
            loadLoadingScreen();
            loadForecastData();
        })
    })
}

searchBtn.addEventListener("click" , updateSearchResult);

searchBar.addEventListener("click" , (e) => {
    e.stopPropagation();
    if(searchResult.classList.contains("hidden"))
        searchResult.classList.toggle("hidden")
})

function loadLoadingScreen(){
    if(weatherForecast.classList.contains("hidden"))
        weatherForecast.classList.toggle("hidden");
}

searchBar.addEventListener("keydown" , (e) => {
    if(e.key === "Enter"){
        searchBtn.click();
    }
})

temperatureRadios[0].addEventListener("click" , () => {
    temperatureUnit = "celsius";
})
temperatureRadios[1].addEventListener("click" , () => {
    temperatureUnit = "fahrenheit";
})

temperatureRadios.forEach( (input) => {
    input.addEventListener("change" , () => {
        loadForecastData();
        console.log("NGU");
    })
});

// windSpeedRadios.forEach( (input) => {
//     const unitArr = ["kmh" , "mph"];
//     input.addEventListener("change" , () => {
//         loadForecastData();
//         console.log("NGU");
//     })
// });

windSpeedRadios[0].addEventListener("change" , async () => {
    windSpeedUnit = "kmh";
    await loadForecastData();
    windSpeedTexts.forEach((item) => {
        item.style.setProperty("--content-after" , '"km/h"');
    });
})
windSpeedRadios[1].addEventListener("change" , async () => {
    windSpeedUnit = "mph";
    await loadForecastData();
    windSpeedTexts.forEach((item) => {
        item.style.setProperty("--content-after" , '"mph"');
    });
})

// precipitationRadios[0].addEventListener("click" , () => {
//     precipitationUnit = "mm";
//     precipitationTexts.forEach((item) => {
//         item.style.setProperty("--content-after" , '"mm"');
//     });
// })
// precipitationRadios[1].addEventListener("click" , () => {
//     precipitationUnit = "inch";
//     precipitationTexts.forEach((item) => {
//         item.style.setProperty("--content-after" , '"inch"');
//     });
// })

// precipitationRadios.forEach( (input) => {
//     const unitArr = ["mm" , "inch"];
//     let count = 0;
    
// });

precipitationRadios[0].addEventListener("change" , async () => {
    precipitationUnit = "mm";
    await loadForecastData();
    precipitationTexts.forEach((item) => {
        item.style.setProperty("--content-after" , '"mm"');
    });
    count++;
})
precipitationRadios[1].addEventListener("change" , async () => {
    precipitationUnit = "inch";
    await loadForecastData();
    precipitationTexts.forEach((item) => {
        item.style.setProperty("--content-after" , '"inch"');
    });
    count++;
})