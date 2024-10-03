// SIDEBAR TOGGLE 
const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
document.querySelector("#sidebar").classList.toggle("expand");
});

const closeSidebar = document.querySelector(".toggle-btn2");

closeSidebar.addEventListener("click", function () {
    document.querySelector("#sidebar").classList.remove("expand");
});



document.addEventListener("DOMContentLoaded", async function() {
  
});

