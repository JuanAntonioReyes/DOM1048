var gridSize = 4;
var grid = [];

//$(document).keydown(moveSquareKey);

function startGame() {
	makeGrid(gridSize);

	placeNewTile(2);
	placeNewTile(2);
}

function makeGrid(size) {
	var gridDivs = "", gridRow;

	for (var i = 0; i < size; i++) {
		gridRow = [];

		for (var j = 0; j < size; j++) {
			gridDivs += '<div class="gridTile"></div>';
			gridRow.push(0);
		}

		gridDivs += '<br>';
		grid.push(gridRow);
	}

	$('.grid').append(gridDivs);
}

function placeNewTile(tileValue) {
	var tilePosition = getRandomValidPosition();

	grid[tilePosition[0]][tilePosition[1]] = tileValue;
}

//(Math.random() < 0.5) ? tileValue = 2 : tileValue = 4;

function getRandomValidPosition() {
	var randomRow, randomColumn, isValid = false;

	while (!isValid) {
		randomRow = Math.floor(Math.random() * gridSize);
		randomCol = Math.floor(Math.random() * gridSize);

		//console.log(randomRow + " - " + randomCol);

		if (grid[randomRow][randomCol] === 0) {
			isValid = true;
		}
	}

	return [randomRow, randomCol];
}

//$('.blueSquare').offset({ top: 10, left: 10 });

/*function moveSquareKey(e) {
	var pressedKey = e.which;
	var speed = 150;
	var distance = 60;

	switch (pressedKey) {
		case 37: $('.blueSquare').animate({left: "-="+distance}, speed);
						 console.log("LEFT");
						break;
		case 38: $('.blueSquare').animate({top: "-="+distance}, speed);
						 console.log("UP");
						break;
		case 39: $('.blueSquare').animate({left: "+="+distance}, speed);
						 console.log("RIGHT");
						break;
		case 40: $('.blueSquare').animate({top: "+="+distance}, speed);
						 console.log("DOWN");
						break;
	}

	console.log($('.blueSquare').position());
}
*/