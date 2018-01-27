/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let moveCont = 0;
let traialCont = 0;
let matchCont = 0;
const moveContWraper = $(".moves");
let  tempArray = [];
let  tempArray2 = [];
let cardIndex;
var timerWraper = document.getElementsByTagName('time')[0],
    seconds = 0, minutes = 0, hours = 0, t;
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// comparing 2 arrays https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

// show suffled cards
function showCards(index) {
  const cardIcons = [
    "fa-diamond",
    "fa-paper-plane-o", 
    "fa-anchor", 
    "fa-bolt",
    "fa-cube",
    "fa-leaf", 
    "fa-bicycle",
    "fa-bomb"];
  let dublicatedCards = cardIcons.concat(cardIcons);
  let shuffledCards = shuffle(dublicatedCards);

  for (let i = 0; i < index ; i ++) {
    let card = '<li class="card" index="'+i+'" > <i class="fa '+ shuffledCards[i]+'" data-icon="'+ shuffledCards[i]+'"></i> </li>';
    $(".deck").append(card); 
  }
};
showCards(16);

// restarting the game
function restart() {
  $(".deck li").remove(); 
  moveCont = 0;
  traialCont = 0;
  matchCont = 0;
  timerWraper.textContent = "00:00";
  seconds = 0; minutes = 0;
  tempArray = []; //For reset the last cardmatch

  move();
  liveStars(3);
  showCards(16);
};

function move(){
  moveContWraper.text(traialCont);

}

function liveStars(index) {
  $(".stars li").remove();
  for (let i = 0; i <= index-1 ; i ++) {
    let starsContent = '<li><i class="fa fa-star"></i></li>';
    $(".stars").append(starsContent); 
  }
}

// MAtching the Cards
function matchCard() {
  if (tempArray.length == 2 ) {
    if (arraysIdentical(tempArray[0], tempArray[1]) != true)  {
      setTimeout(function () {      
         $( ".card.open.show" ).removeClass( "open show bounceIn" );         
      }, 800);
      
      tempArray = [];
      tempArray2 = [];
      move();
    }else{
      if (tempArray2[0] !== tempArray2[1]) {
        matchCont += 1;
        $(".card.open.show" ).addClass( "match flip" );
        tempArray = [];
        tempArray2 = [];
        move();
      }
      else{
        tempArray.pop();
        tempArray2.pop();
        moveCont -= 1;
        traialCont -= 1;
      }
    }
  }

  if (moveCont == 18) {
      $(".stars li:last-child").remove();
    } else if (moveCont == 36) {
      $(".stars li:last-child").remove();
    }
  finish();

}

function play(){
  $(".deck").on("click","li",function() {//All Live Click actions
    moveCont += 1;
    if (moveCont % 2 == 0) {
      traialCont += 1;
    }
       
    // let clicked = $(this).attr("data-icon");
    let clicked = $(this).children('i').attr("data-icon");
    cardIndex = $(this).attr("index");
    this.classList.add('open', 'show', 'animated', 'bounceIn');
    tempArray.push(clicked);
    tempArray2.push(cardIndex);
    matchCard(); 
  });
  $( ".restart" ).click(function() {
    restart();
    $(".result").hide();
  });
  timer();
  liveStars(3);
}


// timer https://jsfiddle.net/Daniel_Hug/pvk6p/

function time() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    
    timerWraper.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(time, 1000);
}

// when game finish
function finish(){
  let stars;
  if (matchCont == 8) {
    if (traialCont <= 8) {
      stars = 3;
    } else if(traialCont > 8 && traialCont < 16) {
      stars = 2;
    }else{
      stars = 1;
    }
    clearTimeout(t);
    $(".moves").text(traialCont);
    $(".star").text(stars);
    $(".timer").text(timerWraper.textContent); 
    $(".result").addClass('wobble').show();
  }
  
}
// Start the game
$( ".js-start" ).click(function() {
  $(this).closest(".start").addClass('flipOutX');
    play();
    
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */