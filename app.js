var cardsInPlay = [];
var points = 0;
var currPlayer = playerA;

function myTurn() {
  console.log("myTurn Called");
    if (currPlayer == playerA) {
        currPlayer = playerB;
        console.log(currPlayer);
        return (currPlayer);

    } else {
        currPlayer = playerA;
        console.log(currPlayer);
        return (currPlayer);
    }
}

function myScore() {
    if (currPlayer == playerA) {
        points = parseInt($('#playerA').val())
        points = points + 1
        $('#playerA').val(points)
        console.log(points);
    } else {
        points = parseInt($('#playerB').val())
        points = points + 1
        $('#playerB').val(points)
        console.log(points);
    }
}

function isMatch() {
    return (cardsInPlay[0] == cardsInPlay[1])
    console.log("Logging for isMatch " + cardsInPlay[0] + "Array 1 is " + cardsInPlay[1]);

}
function callBackMain() {

    showCard($(this))
    console.log("before entering if Checkpoint")
        //debugger;
    if (cardsInPlay.length < 2) {
        console.log(" entering if Checkpoint")
        cardsInPlay.push($(this).children().eq(0).attr('class'))
    }

    if (cardsInPlay.length == 2) {
        console.log(" entering if Checkpoint after match")
        if (isMatch()) {
            console.log("entering isMatch ");
            $('.' + cardsInPlay[0]).addClass('matched')
            myScore();
            $(this).off();
        } else {
          setTimeout(function(){
            hideNoMatch()
          },1000);

        }
        console.log("Array size " + cardsInPlay.length)
        cardsInPlay = []
    }
    if (cardsInPlay.length > 2) {
        console.log("making array blank")
        cardsInPlay = []
    }
    console.log("Array size now " + cardsInPlay.length)


}

function showCard($whatCard) {
    console.log("logging for what Card in ShowCard " + $whatCard)
    $whatCard.children().eq(0).show()
    $whatCard.children().eq(1).hide()
}

function hideCard($whatCard) {
    $whatCard.children().eq(0).hide()
    $whatCard.children().eq(1).show()
    console.log("logging for hide Card in hide Card " + $whatCard)
}

function hideNoMatch() {
    // adjust later to only hide boxes that are not yet matched:
    $('.game').each(function(i, box) {
        if (!$(box).children().eq(0).hasClass('matched')) {
            $(box).children().eq(0).hide()
            $(box).children().eq(1).show()
        }
        //set the player turn here
    })
      console.log("about to call myTurn");
    myTurn();
}

function enableClick() {
    $(".game").on("click",callBackMain)
}

enableClick()
