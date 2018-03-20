var gridSize = 4;
var grid = [];
var tileSize = 50;
var tileSpacing = 10;

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
	var tile, tilePosition = getRandomValidPosition();

	grid[tilePosition[0]][tilePosition[1]] = tileValue;

	tile = $('<div class="numberTile">' + tileValue + '</div>');
	$('.numberTiles').append(tile);

	var tileX = ( ( tilePosition[1] * (tileSize + tileSpacing) ) + tileSpacing );
	var tileY = ( ( tilePosition[0] * (tileSize + tileSpacing) ) + tileSpacing );

	tile.offset({ top: tileX, left: tileY });
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