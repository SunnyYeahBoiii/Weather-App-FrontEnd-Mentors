const unitBoard = document.getElementById("unit-board");
const unitBtn = document.getElementById("unit-btn");
const dayOfTheWeekBoard = document.getElementById("day-of-the-week-board")
const dayOfTheWeekBtn = document.getElementById("forecast-day-btn")
const searchBar = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-btn")
const searchResult = document.getElementById("search-result")
let cityCards = document.querySelectorAll(".city-card")

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

async function fetchForecastData(){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&temperature_unit=fahrenheit&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min`;
    let dataObj = await fetch(url)
        .then((data) => data.json())
        .catch((err) => console.log("NGU"))

    console.log(dataObj)
}

searchBtn.addEventListener("click" , async (e) => {
    e.stopPropagation();
    if(searchResult.classList.contains("hidden"))
        searchResult.classList.toggle("hidden")

    const location_name = searchBar.value;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${location_name}`

    let resultObj = await fetch(url)
        .then((data) => data.json())
        .catch((err) => console.log("NGU"))

    const resultArr = resultObj['results']

    searchResult.innerHTML = '';
    for (let i = 0 ; i < resultArr.length ; i++){
        console.log(resultArr[i]);
        
        searchResult.innerHTML += `
            <div class = "city-card">
                <h2>${resultArr[i].name}</h2>
                <p>${resultArr[i].admin1 ? `${resultArr[i].admin1} ,` : ""} ${resultArr[i].admin2 ? `${resultArr[i].admin2} ,` : ""} ${resultArr[i].country}</p>
            </div>
        `;
    }

    cityCards = Array.from(document.querySelectorAll(".city-card"))
    console.log(cityCards)

    cityCards.forEach((cityCard) => {
        cityCard.addEventListener("click" , () => {
            const index = cityCards.findIndex((card) => card == cityCard)
            latitude = resultArr[index].latitude
            longitude = resultArr[index].longitude
            console.log(latitude , longitude)
            fetchForecastData()
        })
    })
})

searchBar.addEventListener("click" , (e) => {
    e.stopPropagation();
    if(searchResult.classList.contains("hidden"))
        searchResult.classList.toggle("hidden")
})