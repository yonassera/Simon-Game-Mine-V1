function startTheGame() {
  return randFlasher();
}
$(".btn").on("click", startTheGame);

var arrayCollection = [];
var counter = -1;
var arrayLength;
var level = 1;
var highscore = 0;

$(".sa").hide();

function randFlasher() {
  $(".btn").off("click", startTheGame);
  $(".sa").hide();

  let randVal = Math.floor(Math.random() * 4) + 1;
  $(".level").text("Level:" + level);

  $("#b" + randVal).addClass("flasher");
  setTimeout(function () {
    $("#b" + randVal).removeClass("flasher");
  }, 200);

  let audFlashed = new Audio("./sounds/" + randVal + ".mp3");
  audFlashed.play();

  arrayCollection.push(randVal);
  arrayLength = arrayCollection.length;
  level++;
}

$(".tile").on("click", listenKeyPress);

function listenKeyPress() {
  let clickedID = this.id;
  let clickedValue = clickedID.slice(1);

  $("#" + clickedID).addClass("flasher");
  setTimeout(function () {
    $("#" + clickedID).removeClass("flasher");
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
    return displayError();
  }
}

function displayError() {
  if (level > highscore) {
    highscore = level - 2;
  }

  if (highscore >= 0) $(".hs").text("High score:" + highscore);

  level = 1;
  counter = -1;
  arrayCollection = [];

  $(".tile").off("click", listenKeyPress); // to prevent multiple flashes
  $(".btn").off("click", startTheGame);

  $("body").css("backgroundColor", "red");

  setTimeout(function () {
    $("body").css("backgroundColor", "black");
  }, 200);

  let audError = new Audio("./sounds/wrong.mp3");
  audError.play();

  $(".sa").show();

  $(".tile").on("click", listenKeyPress);
  $(".btn").on("click", startTheGame);
}
