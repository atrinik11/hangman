//Create an array of the words
var superHeroNames = [
  "supergirl",
  "wonderwoman",
  "batgirl",
  "bumblebee",
  "harleyquinn",
  "katana",
  "poisonivy"
];

var blankedInput;
var wins = 0;
var losses = 0;
var guessLeft = 9;
var letterAlreadyGuessed = [];
var computerSelectedName;
var wordLength;
var wordImage;
var displayName;

//Reset the game variables when the user losses or win one round
function renderWord() {
  blankedInput = [];
  computerSelectedName =
    superHeroNames[Math.floor(Math.random() * superHeroNames.length)];
  wordLength = computerSelectedName.length;
  console.log(computerSelectedName);
  for (var i = 1; i <= wordLength; i++) {
    blankedInput.push("_");
  }
  guessLeft = 9;
  letterAlreadyGuessed = [];
  updatePage();
}

//Update the display of the HTML page
function updatePage() {
  displayName = "";
  document.getElementById("userInput").innerText = " ";
  for (var i = 0; i < blankedInput.length; i++) {
    document.getElementById("userInput").innerText += blankedInput[i];
  }
  document.getElementById("win").innerText = wins;
  document.getElementById("loss").innerText = losses;
  document.getElementById("letterGuessed").innerText = letterAlreadyGuessed;
  document.getElementById("guessRemain").innerText = guessLeft;
  document.getElementById("displayMsg").innerHTML = displayName;
}

//Display image when the user has guessed the word correctly
function displayImage() {
  if (computerSelectedName === "batgirl") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://vignette.wikia.nocookie.net/dc-superherogirls/images/d/d2/Batgirl.png/revision/latest?cb=20151129050642" width="400" height="400" alt="batgirl image">';
  }
  if (computerSelectedName === "supergirl") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://vignette.wikia.nocookie.net/dc-superherogirls/images/7/76/Supergirl_Pose_DCSHG_Transparent.png/revision/latest?cb=20161210024135"  width="400" height="400" alt="super girl image">';
  }
  if (computerSelectedName === "katana") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://vignette.wikia.nocookie.net/dc-superherogirls/images/e/e9/Katana.png/revision/latest?cb=20160311042525" width="400" height="400" alt="katana image">';
  }
  if (computerSelectedName === "wonderwoman") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://i.pinimg.com/originals/84/8f/fe/848ffe4d83ebf00a3ea2cba1d6e2f827.png" width="400" height="400" alt=wonder woman" image">';
  }
  if (computerSelectedName === "bumblebee") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://vignette.wikia.nocookie.net/dc-superherogirls/images/9/90/Bumblebee.png/revision/latest?cb=20151129050844" width="400" height="400" alt="bumblebee image">';
  }
  if (computerSelectedName === "poisonivy") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://vignette.wikia.nocookie.net/dc-superherogirls/images/3/36/Poison_Ivy.png/revision/latest?cb=20151129050943" width="400" height="400" alt="Poison Ivy image">';
  }
  if (computerSelectedName === "harleyquinn") {
    document.getElementById("displayImage").innerHTML =
      '<img src="https://i.pinimg.com/originals/b3/f7/e5/b3f7e53e2b74764bac3d9346593fc325.png" width="400" height="400" alt="Harley Quinn image">';
  }
}

function displayHangmanImage() {
  displayName = "The correct Name is: " + "\n" + computerSelectedName;
  if (guessLeft === 8) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img1.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 7) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img2.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 6) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img3.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 5) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img4.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 4) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img5.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 3) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img6.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 2) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img7.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 1) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img8.png" width="350" height="350" alt="hangman image">';
  }
  if (guessLeft === 0) {
    document.getElementById("displayImage").innerHTML =
      '<img src="assets/images/img9.png" width="350" height="350" alt="hangman image">';
    document.getElementById("displayMsg").innerHTML = displayName;
  }
}

renderWord();

document.onkeyup = function(event) {
  var userGuessLetter = event.key.toLowerCase();
  //This is return false if the letter is not found in the letter guessed array
  if (letterAlreadyGuessed.indexOf(userGuessLetter) === -1) {
    //Here it will check if the letter exist in the word
    if (computerSelectedName.indexOf(userGuessLetter) === -1) {
      //now it will push the userGuessletter into letterAlreadyguessed array
      letterAlreadyGuessed.push(userGuessLetter);
      guessLeft--;
      displayHangmanImage();
      //Now if out of guess
      if (guessLeft === 0) {
        losses++;
        renderWord();
      }
    } else {
      var positions = [];
      for (var j = 0; j < wordLength; j++) {
        if (computerSelectedName.charAt(j) === userGuessLetter) {
          if (letterAlreadyGuessed.indexOf(userGuessLetter) === -1) {
            letterAlreadyGuessed.push(userGuessLetter);
          }
          positions.push(j);
          for (var k = 0; k < positions.length; k++) {
            blankedInput[positions[k]] = userGuessLetter;
          }

          if (blankedInput.indexOf("_") === -1) {
            wins++;
            displayImage();
            renderWord();
          }
        }
      }
    }
    updatePage();
  }
};
