// MAKE ARRAYS
var colors = [];
var squares = document.querySelectorAll(".square");
var visibleSquares = 6;
var styleSheet = document.styleSheets[0];

// RANDOM FUNCTION
function rand(l,h){
	return Math.floor((Math.random() * (h + 1)) + l);
}

// FILL COLORS ARRAY
function colorsArray(){
	colors = [];
	for (var i = squares.length - 1; i >= 0; i--) {
		colors[i] = "rgb(" + rand(0,255) + ", " + rand(0,255) + ", " + rand(0,255) + ")";
		squares[i].style.background = colors[i];
	}
}
colorsArray();

// CHOOSE WINNING COLOR
var pickedColor;
function winningColor(){
	var randColor = rand(0,visibleSquares-1);
	pickedColor = colors[randColor];
	document.querySelector(".colorDisplay").innerHTML = pickedColor;
}
winningColor();

// GAME
function game(){
	var selectedSquare;
	for (var i = squares.length - 1; i >= 0; i--) {
		// ADD EVENT HANDLER TO EACH SQUARE
	 	squares[i].addEventListener("click", function(){
	 		selectedSquare = this.style.background;
	 		// CHECK IF CORRECT
	 		if (selectedSquare == pickedColor){
	 			// CORRECT
	 			// CHANGE COLORS OF ALL SQUARES
	 			for (var i = squares.length - 1; i >= 0; i--) {
	 			 squares[i].style.background = pickedColor;
	 			}
	 			// CHANGE H1
	 			document.querySelector("h1").style.background = pickedColor;
	 			// CHANGE TEXT
	 			document.querySelector(".messageBar .message").innerHTML = "You Won!";
	 		}
	 		else {
	 			// WRONG
	 			// MAKE SQUARE DISAPEAR
	 			this.style.background = "#232323";
	 			document.querySelector(".messageBar .message").innerHTML = "Nope, try again!";
	 		}
	 	});
	}
}
game();

// RESET GAME
function newGame(){
	colorsArray();
	winningColor();
	document.querySelector(".messageBar .message").innerHTML = "Choose a square.";
}
document.querySelector(".messageBar button").addEventListener("click", newGame);

// EASY MODE
document.querySelector(".messageBar .easy").addEventListener("click", function(){
	var i = 5;
	while (i >= 3){
		squares[i].style.display = "none";
		i--;
	}
	this.classList.add("selected");
	document.querySelector(".messageBar .hard").classList.remove("selected");
	visibleSquares = 3;
	newGame();
	
});

// HARD MODE
document.querySelector(".messageBar .hard").addEventListener("click", function(){
	var i = 5;
	while (i >= 3){
		squares[i].style.display = "block";
		i--;
	}
	this.classList.add("selected");
	document.querySelector(".messageBar .easy").classList.remove("selected");
	visibleSquares = 6;
	newGame();
});
