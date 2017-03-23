var colorGame = {
	// PROPERTIES
	colors: [],
	squares: document.querySelectorAll(".square"),
	visibleSquares: 6,
	pickedColor: null,

	// METHODS
	rand: function(l,h){
		return Math.floor((Math.random() * (h + 1)) + l);
	},

	colorsArray: function(){
		this.colors = [];
		for (var i = this.squares.length - 1; i >= 0; i--) {
			this.colors[i] = "rgb(" + this.rand(0,255) + ", " + this.rand(0,255) + ", " + this.rand(0,255) + ")";
			this.squares[i].style.background = this.colors[i];
		}
	},

	winningColor: function(){
		var randColor = this.rand(0, this.visibleSquares-1);
		this.pickedColor = this.colors[randColor];
		document.querySelector(".colorDisplay").innerHTML = this.pickedColor;
	},

	game: function(){
		for (var i = this.squares.length - 1; i >= 0; i--) {
			// ADD EVENT HANDLER TO EACH SQUARE
			var parent = this;
		 	this.squares[i].addEventListener("click", function(){
		 		var selectedSquare = this.style.background;
		 		// CHECK IF CORRECT
		 		if (selectedSquare == parent.pickedColor){
		 			// CORRECT! CHANGE COLORS OF ALL SQUARES
		 			for (var i = parent.squares.length - 1; i >= 0; i--) {
		 			 parent.squares[i].style.background = parent.pickedColor;
		 			}
		 			// CHANGE H1
		 			document.querySelector("h1").style.background = parent.pickedColor;
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
	},

 	newGame: function(mainObj){
 		mainObj.colorsArray();
 		mainObj.winningColor();
 		document.querySelector(".messageBar .message").innerHTML = "Choose a square.";
 	},

 	easyModeListener: function(mainObj){
 		document.querySelector(".messageBar .easy").addEventListener("click", function(){
 			var i = 5;
 			while (i >= 3){
 				mainObj.squares[i].style.display = "none";
 				i--;
 			}
 			this.classList.add("selected");
 			document.querySelector(".messageBar .hard").classList.remove("selected");
 			mainObj.visibleSquares = 3;
 			mainObj.newGame(mainObj);
 		});
 	},

 	hardModeListener: function(mainObj){
 		document.querySelector(".messageBar .hard").addEventListener("click", function(){
 			var i = 5;
 			while (i >= 3){
 				mainObj.squares[i].style.display = "block";
 				i--;
 			}
 			this.classList.add("selected");
 			document.querySelector(".messageBar .easy").classList.remove("selected");
 			mainObj.visibleSquares = 6;
 			mainObj.newGame(mainObj);
 		});
 	},

 	startGame: function(){
 		this.colorsArray();
 		this.winningColor();
 		this.game();
 		this.easyModeListener(this);
 		this.hardModeListener(this);
 		var mainObj = this;
 		document.querySelector(".messageBar button").addEventListener("click", function(){
 			mainObj.newGame(mainObj);
 		});
 	}

};

colorGame.startGame();