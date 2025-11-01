const unitBoard = document.getElementById("unit-board");
const unitBtn = document.getElementById("unit-btn");
const dayOfTheWeekBoard = document.getElementById("day-of-the-week-board")
const dayOfTheWeekBtn = document.getElementById("forecast-day-btn")

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

window.addEventListener("click" , () => {
    if(!unitBoard.classList.contains("hidden"))
        unitBoard.classList.toggle("hidden");
    if(!dayOfTheWeekBoard.classList.contains("hidden"))
        dayOfTheWeekBoard.classList.toggle("hidden");
})