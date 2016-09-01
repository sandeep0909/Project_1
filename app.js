var cardsInPlay = [];
var points = 0;
var currPlayer = playerA;
var pointAA = 0;
var pointBB = 0;
var totalPoints = 0;
var message;
var message1;

$('#inst-link').click(function() {
    $('.instructions').slideToggle("slow");
})
var box_arr = [
    '<div id="box1" class="game"><img src="memory-car.png" class="car" alt="car" ><img src="bg_img.jpg" class="default-img1" alt="" ></div>',
    '<div id="box2" class="game"><img src="memory-car.png" class="car" alt="car"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box3" class="game"><img src="memory_baloon.png" class="balloon" alt="balloon"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box4" class="game"><img src="memory_baloon.png" class="balloon" alt="balloon"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box5" class="game"><img src="memory_cow.png" class="cow" alt="cow"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box6" class="game"><img src="memory_cow.png" class="cow" alt="cow"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box7" class="game"><img src="memory_crane.png" class="crane" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>',
    '<div id="box8" class="game"><img src="memory_crane.png" class="crane" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>', '<div id="box9" class="game"><img src="memory_lion.png" class="lion" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>', '<div id="box10" class="game"><img src="memory_lion.png" class="lion" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>', '<div id="box11" class="game"><img src="memory_orange.png" class="orange" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>', '<div id="box12" class="game"><img src="memory_orange.png" class="orange" alt="crane"><img src="bg_img.jpg" class="default-img1" alt=""></div>'
]


function randomize() {
    shuffle(box_arr)
    for (var i = 0; i < box_arr.length; i++) {
        $('.parclass').append(box_arr[i])
    }

}

// var box_arr = [
//   {img: "memory-car", class: "car"},
//   {img: "memory-car", class: "car"},
//   {img: "memory-car", class: "car"},
//   {img: "memory-car", class: "car"},
//   {img: "memory-car", class: "car"},
//   {img: "memory-car", class: "car"}
// ]
//
// function randomize() {
//     shuffle(box_arr)
//     for (var i = 0; i < box_arr.length; i++) {
//       var box = '<div class="game"><img src="' + box_arr[i].img + '.png" class="' + box_arr[i].class + '" alt="car" ><img src="bg_img.jpg" class="default-img1" alt="" ></div>'
//         $('.parclass').append(box)
//     }
//
// }


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function myTurn() {
    if (currPlayer == playerA) {

        currPlayer = playerB;
        $('#btn2').css("background-color", "red");
        $('#btn1').css("background-color", "rgb(192, 192, 192)");
        return (currPlayer);

    } else {
        currPlayer = playerA;
        $('#btn1').css("background-color", "blue");
        $('#btn2').css("background-color", "rgb(192, 192, 192)");
        return (currPlayer);
    }
}

function myScore() {
    if (currPlayer == playerA) {
        points = parseInt($('#playerA').val())
        points = points + 1
        pointAA = points
        $('#playerA').val(points)
    } else {
        points = parseInt($('#playerB').val())
        points = points + 1
        pointBB = points
        $('#playerB').val(points)
    }
    totalPoints = pointAA + pointBB
}

function resetScore() {
    parseInt($('#playerA').val(0))
    parseInt($('#playerB').val(0))
}

function isMatch() {
    return (cardsInPlay[0] == cardsInPlay[1])
}

function callBackMain() {

    showCard($(this))
    if (cardsInPlay.length < 2) {
        cardsInPlay.push($(this).children().eq(0).attr('class'))
    }

    if (cardsInPlay.length == 2) {
        if (isMatch()) {
            $('.' + cardsInPlay[0]).addClass('matched')
            $('.' + cardsInPlay[0]).addClass('zoomIn animated')
            $('.' + cardsInPlay[1]).addClass('zoomIn animated')
            myScore();
            $(this).off();
        } else {
            setTimeout(function() {
                hideNoMatch()
            }, 500);

        }
        cardsInPlay = []
    }
    if (cardsInPlay.length > 2) {
        cardsInPlay = []
    }

    finalScore()

}

function showCard($whatCard) {
    $whatCard.children().eq(0).show()
    $whatCard.children().eq(1).hide()
}

function hideCard($whatCard) {

    $whatCard.children().eq(0).hide()
    $whatCard.children().eq(1).show()
}
  var myMusic = new Audio("myMusic.mov");


function hideNoMatch() {
    $('.game').each(function(i, box) {
        if (!$(box).children().eq(0).hasClass('matched')) {
            $(box).children().eq(0).hide()
            $(box).children().eq(1).show()
        }
    })
    myTurn();
}

function enableClick() {
    $(".game").on("click", callBackMain)
}

function checkWinner() {
    if (pointAA > pointBB) {
        message = 'Player 1 wins!!!'
        $("div.message_bar1").html("<h3>" + message + "</h3>")
        myMusic.play();
    } else if (pointAA < pointBB) {
        message = 'Player 2 wins!!!'
        $("div.message_bar1").html("<h3>" + message + "</h3>")
        myMusic.play();
    } else {
        message = "It"+ "'" + "s a tie!!!"
        $("div.message_bar1").html("<h3>" + message + "</h3>")
        myMusic.play();
    }
    message1 = 'Game Over!!!';
    $("div.message_bar2").html("<h2>" + message1 + "</h2>")
}



function finalScore() {
    if (totalPoints == 6) {
        setTimeout(function() {
            checkWinner()
        }, 300);

    }
}

$("#restart").on("click", function() {
    $('.parclass').empty()
    resetScore()
    randomize()
    enableClick()
})
$("#reset").on("click", function() {
    location.reload();
});
