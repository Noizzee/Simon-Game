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

function gameTurn() {
  on = false;
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one(); //If the random number in the order array is 1, we run the one function
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++; //Increment flash to check how many times the program has flashed lights
    }, 200) //Will stop flashing for 200ms 
  }
}

function one() { //Function that will light up top left color and play the audio clip
  if (noise) {
    let audio = document.querySelector('#clip1');
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() { //Function that will light up top right color and play the audio clip
  if (noise) {
    let audio = document.querySelector('#clip2');
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}

function three() {
  if (noise) {
    let audio = document.querySelector('#clip3');
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  if (noise) {
    let audio = document.querySelector('#clip4');
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {  //Function that will set the colors to default
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if (!win) {
      setTimeout(() => { //If player has not won yet, clear the color after 300ms
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() { //Function to check if the player color matches the computer color
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) good = false;
  if (playerOrder.length == 20 && good) { //Condition if the player wins the game
    winGame();
  }
  if (good == false) { //Condition if the player has something wrong
    flashColor();
    turnCounter.textContent = "NO!";
    setTimeout(() => {
      turnCounter.textContent = turn;
      clearColor();
      if (strict) {
        play(); //Starting the game over again if in strict mode
      } else { //Starting over in current round
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);
    noise = false;
  }
  if (turn == playerOrder.length && good && !win) { //Condition if the player gets everything correct
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.textContent = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.textContent = "WIN!";
  on = false;
  win = true;
}