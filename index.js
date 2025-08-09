//convert the code into jquery
//consider including start button
//also make the visual similar to the real one
// may be store max in local and diplay on the board, difficulty by varying the speed

function startTheGame() {
  return randFlasher();
}
document.addEventListener("keypress", startTheGame);

var arrayCollection = [];
var counter = -1;
var arrayLength;
var level = 1;

function randFlasher() {
  document.removeEventListener("keypress", startTheGame);

  let randVal = Math.floor(Math.random() * 4) + 1;
  document.querySelector("h1").textContent = "Level " + level;

  document.querySelector("#b" + randVal).classList.add("flasher");
  setTimeout(function () {
    document.querySelector("#b" + randVal).classList.remove("flasher");
  }, 200);

  let audFlashed = new Audio("./sounds/" + randVal + ".mp3");
  audFlashed.play();

  arrayCollection.push(randVal);
  arrayLength = arrayCollection.length;
  level++;
}

let temp = document.querySelectorAll(".tile");
for (var i = 0; i < temp.length; i++) {
  temp[i].addEventListener("click", listenKeyPress);
}

function listenKeyPress() {
  let clickedID = this.id;
  let clickedValue = clickedID.slice(1);

  document.querySelector("#" + clickedID).classList.add("flasher");
  setTimeout(function () {
    document.querySelector("#" + clickedID).classList.remove("flasher");
  }, 200);

  let audClicked = new Audio("./sounds/" + clickedID.slice(1) + ".mp3");
  audClicked.play();

  counter++;

  return check(clickedValue, counter);
}

function check(value, Counter) {
  arrayLength--; // to wait until all values in the array are clicked
  if (arrayCollection[Counter] == value) {
    if (arrayLength == 0) {
      counter = -1; // to reset the value since after randflash the user is expected to click from the beginning
      setTimeout(function () {
        return randFlasher();
      }, 1000);
    }
  } else {
    level = 1;
    counter = -1;
    arrayCollection = [];
    return displayError();
  }
}

function displayError() {
  document.querySelector("body").style.backgroundColor = "red";

  setTimeout(function () {
    document.querySelector("body").style.backgroundColor =
      "rgba(0, 0, 64, 0.975)";
  }, 200);

  let audError = new Audio("./sounds/wrong.mp3");
  audError.play();

  document.querySelector("h1").textContent = "Press any key to begin again!";
  document.addEventListener("keypress", startTheGame);
}
