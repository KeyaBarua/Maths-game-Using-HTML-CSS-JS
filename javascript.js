var playing = false;
var score;
var action;
var timeRemain;
var correctAnswer;

//When we click on the start/reset button,
document.getElementById('startGame').onclick = function(){
   //if we already started game, ie, we click on the reset button
   if(playing == true){
     location.reload();
   }
   else{
     //after clicking on the start button,

     //change mode to playing
     playing = true;
     score = 0;
     //set score to 0
     document.getElementById('scoreValue').innerHTML = score;
     //show countdown box
     show('timeRemaining');
     hide('gameOver');
     timeRemain = 60;
     document.getElementById('timeRemainingValue').innerHTML = timeRemain;
     //set button to reset game
     document.getElementById('startGame').innerHTML = "Reset Game";

     //start countdown
     startCountdown();

     //generate new question and answers.
     generateQA();
   }
 }



//functions

//start countdown
 function startCountdown(){
   action = setInterval(function(){
     timeRemain -= 1;   //reduce time by 1 sec.
     if(timeRemain == 0){
       //we have to stop the counter.
       stopCountdown();
       show('gameOver');
       document.getElementById('gameOver').innerHTML =
        "<p>Game Over</p> <p>Your score is " + score + "</p>";
        hide('timeRemaining');
        hide('correct');
        hide('wrong');
        playing = false;
        document.getElementById('startGame').innerHTML = "Start Game";
     }
     document.getElementById('timeRemainingValue').innerHTML = timeRemain;
   }, 1000);
 }

//stop countdown
 function stopCountdown(){
   clearInterval(action);
 }

//hide an element
 function hide(Id){
   document.getElementById(Id).style.display = "none";
 }

//show an element
 function show(Id){
   document.getElementById(Id).style.display = "block";
 }

 //generate Q & A
function generateQA(){
  var x = 1 + Math.round(9 * Math.random());   //we multiply by 9 and add 1 because we want number between 1-10
  var y = 1 + Math.round(9 * Math.random());
  correctAnswer = x * y;
  document.getElementById('questionBox').innerHTML = x + "X" + y;
  var correctPosition = 1 + Math.round(Math.random() * 3);   //To choose the correct answer in the correctPosition.
  document.getElementById('box'+correctPosition).innerHTML = correctAnswer; //placing the correct answer in the correctPosition.

  var answers = [correctAnswer];

  for(i=1; i<5; i++){
    if(i != correctPosition){
      var wrongAnswer;
      do {
        wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));   //we want to execute this code atleast once.
      }while(answers.indexOf(wrongAnswer)>-1);   //we are checking if the wrong answer matches with any of the elements in the array.
      document.getElementById('box'+i).innerHTML = wrongAnswer;
      answers.push(wrongAnswer);
    }
  }
}

for (i = 1; i < 5; i++) {
  //If we click on an answer box
  document.getElementById('box'+i).onclick = function(){
    //if we are playing
    if(playing == true){    //yes
      if (this.innerHTML == correctAnswer) {
        //if answer is correct

        //increase score by 1
        score++;

        document.getElementById('scoreValue').innerHTML = score;

        //hide wrong box and show correctAnswer
        hide('wrong');
        show('correct');
        setTimeout(function(){
          hide('correct');
        }, 1000);    //to hide the correct box after one sec.
          //generate new q and a
          generateQA();
      }
      else{
        //if answer is not correct

        hide('correct');
        //show try again box.
        show('wrong');
        setTimeout(function(){
          hide('wrong');
        }, 1000);    //to hide the correct box after one sec.
      }
    }
  }
}


 //and if we are not playing
              //no action
