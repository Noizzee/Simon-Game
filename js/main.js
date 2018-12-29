let order = [];
let playerOrder = [];
let flash; // Number of flashes that appeared in the game
let turn; // Keep track what turn we are on
let good; // Boolean to check if the player has hit all the colors or not
let compTurn; // Boolean to keep track whatever it is the players turn or the computers turn
let intervalId;
let strict = false; // Checks if the strict button is pressed or not
let noise = true;
let on = false; // Checks if the on button has been pressed or not
let win; // Will tell if the player has won the game or not

// Caching the DOM
const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

strictButton.addEventListener('change', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.textContent = "-";
  } else {
    on = false;
    turnCounter.textContent = "";
    clearColor(); //Function that will clear all the colors highlighted on the screen
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) {
    play(); //Function that will start the game
  }
});

function play() {
  //Reset the variables
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.textContent = 1;
  good = true;
  //Fill in the order array with 20 random numbers if you get 20 rounds you win the game
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4 ) + 1);
  }
}