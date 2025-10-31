const unitBoard = document.getElementById("unit-board");
const unitBtn = document.getElementById("unit-btn");

unitBtn.addEventListener("click" , function(event){
    event.stopPropagation();
    unitBoard.classList.toggle("hidden");
})

unitBoard.addEventListener("click" , function(event){
    event.stopPropagation();
})