var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var phase = 0;
var isStarted = false;
var randomChosenColour = ''
var level = 0

// Escolhe uma cor aleatória
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColors[randomNumber]);
    return buttonColors[randomNumber];
}

// Evento para começar o jogo
$(document).keydown(function (e) {
    if ((e.key == "a" && isStarted == false) || $("#level-title").text() == "Você Perdeu! Pressione qualquer tecla para reiniciar.") {
        $("#level-title").text("Level: " + phase.toString());
        isStarted = true;
        randomChosenColour = nextSequence();
        var button = $("#" + randomChosenColour);
        button.fadeOut(100).fadeIn(100);
        playAudio(randomChosenColour);
    }
});

// Evento click dos botões
$(".btn").click(function (e) {
    e.preventDefault();
    var currentBtn = e.target.id;
    $("#" + currentBtn).toggleClass("pressed");
    setTimeout(function () {
        $("#" + currentBtn).toggleClass("pressed");
    }, 100);
    //$("#" + currentBtn).fadeOut(100).fadeIn(100);
    if (currentBtn == gamePattern[level]) {
        playAudio(gamePattern[level]);
        level += 1;
    } else if (isStarted == true) {
        gameOver();
    }
    if (level == gamePattern.length && isStarted == true) {
        randomChosenColour = nextSequence();
        setTimeout(playRound, 1000);
    }
});

function playAudio(cor) {
    var audio = new Audio('sounds/' + cor + '.mp3');
    audio.play();
}

function playRound() {
    for (var i = 0; i < gamePattern.length; i++) {
        var nome = gamePattern[i];
        setTimeout(playDelay, i * 1000, nome);
    }
    nextLevel();
}

function playDelay(item) {
    $("#" + item).fadeOut(100).fadeIn(100);
    playAudio(item);
}

function nextLevel() {
    level = 0;
    phase += 1;
    $("#level-title").text("Level: " + phase.toString());
}

function gameOver() {
    playAudio("wrong");
    $("#level-title").text("Você Perdeu! Pressione qualquer tecla para reiniciar.");
    isStarted = false;
    gamePattern = [];
    phase = 0;
    randomChosenColour = '';
    level = 0;
    $("body").toggleClass("game-over");
    setTimeout(function () {
        $("body").toggleClass("game-over");
    }, 100);
}