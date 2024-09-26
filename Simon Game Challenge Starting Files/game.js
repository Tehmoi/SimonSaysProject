alert("test for page load.");
var buttonColours = ["red", "blue", "green", "yellow"];//our color options

var gamePattern = []; //the sequence of colors grows as the game progresses. 

var userPattern = [];//what humans click and what order

var started = false;

var level = 0;

$(document).keypress(function(){
  if (!started){
    nextSequence();
    $("#level-title").text("Level " + level);
    started == true; // game starts triggering changes and next sequence.

  }
  
});


function nextSequence(){
  userPattern = []
  var randomNumber =  Math.floor(Math.random() * 4); // 0 to 3

  var randomChosenColour = buttonColours[randomNumber];// searches outward and gets 0 to 3 of list
    
  gamePattern.push(randomChosenColour); //push is for adding a single value to a collection
  //append would take the whole collection would add it to another collection.
  //Below. shows that we can concatenate ID's onto variables, AND trigger animations with JS at the same time.
  //$("#" + randomChosenColour).fadeIn(100).fadeOut(100).FadeIn(100);
  choiceAnimation(randomChosenColour);
  playSound(randomChosenColour);
  level++; //level shown increases each calling.
  console.log(gamePattern + " cpu");

  $("#level-title").text("Level " + level);

  //music audio concatenate the files for the proper visuals.
  //var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  //audio.play();
};

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");//refers to self. get self's ID
  userPattern.push(userChosenColour);
  console.log(userPattern);
  //var audio = new Audio("sounds/" + userChosenColour + ".mp3");
  //audio.play();
  playSound(userChosenColour);
  choiceAnimation(userChosenColour);
  checkAnswer(userPattern.length-1);

});

function playSound(target){
  var audio = new Audio("sounds/" + target + ".mp3");
  audio.play();
}//play audio for any choices made by CPU or player

function choiceAnimation(currentColor){
  $('#' + currentColor).addClass("pressed");
  setTimeout (function(){
    $('#' + currentColor).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel){

  if (userPattern[currentLevel] === gamePattern[currentLevel]){
    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 500);
    }// this handles keeping track of CPU and player inputs.

  }
  else {
    wrong();
  };
  

}

function wrong(){//triggers on bad input. handles everything to reset to base game. 
  playSound("wrong");
  $('body').addClass("game-over"); 
  $("#level-title").text("Game Over, Press Any Key to Restart");
 
  level = 0;
  started = false;
  gamePattern = [];
  setTimeout(function () {//this is where the screen returns to normal minus the text.
    $("body").removeClass("game-over");
  }, 200);  
}
