let order = [];
let playerOrder = [];
let flash; // Number of flashes that appeared in the game
let turn; // Keep track what turn we are on
let good; // Boolean to check if the player has hit all the colors or not
let compTurn; // Boolean to keep track whatever it is the players turn or the computers turn
let intervalId; // We need this to clear the interval
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
    clearInterval(intervalId); //Stops the gameTurn function
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
  turn = 1;
  good = true;
  intervalId = 0;
  turnCounter.textContent = 1;
  //Fill in the order array with 20 random numbers, if you get 20 rounds you win the game
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4 ) + 1); //Fill in the order array with 20 random numbers between 1 & 4
  }
  compTurn = true; //Computer turn
  intervalId = setInterval(gameTurn, 800); //Will run the gameTurn function every 800ms
}