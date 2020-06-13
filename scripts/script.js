import { setupEventListeners } from "./domController.js";
import { setupCanvas } from "./gameController.js";

//Shows and hides the more info modal
const moreInfo = document.querySelector("#more-info");
const modal = document.querySelector(".modal");
moreInfo.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});
const closeButton = document.querySelector("#close-button");
closeButton.addEventListener("click", () => {
  modal.classList.toggle("hidden");
});

//Sets up game of life on page load
setupCanvas();
setupEventListeners();
