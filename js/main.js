var gridSize = 4;
var grid = [];
var tileSize = 50;
var tileSpacing = 10;

$(document).keydown(moveTiles);

startGame();




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
			gridDivs += '<div class="gridTile gridTile' + i + '-' + j + '"></div>';
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

function placeRandomTile() {
	var tileValue = (Math.random() < 0.5) ? tileValue = 2 : tileValue = 4;

	placeNewTile(tileValue);
}

function moveTiles(e) {
	var pressedKey = e.which;
	var distance = 60;
	var speed = 150;

/*	switch (pressedKey) {
		case 37: $('.numberTile').animate({left: "-="+distance}, speed);
						 console.log("LEFT");
						break;
		case 38: $('.numberTile').animate({top: "-="+distance}, speed);
						 console.log("UP");
						break;
		case 39: $('.numberTile').animate({left: "+="+distance}, speed);
						 console.log("RIGHT");
						break;
		case 40: $('.numberTile').animate({top: "+="+distance}, speed);
						 console.log("DOWN");
						break;
	}*/

	switch (pressedKey) {
		case 37: checkTiles("LEFT");
						 console.log("LEFT");
						break;
		case 38: checkTiles("UP");
						 console.log("UP");
						break;
		case 39: checkTiles("RIGHT");
						 console.log("RIGHT");
						break;
		case 40: checkTiles("DOWN");
						 console.log("DOWN");
						break;
	}

	console.log($('.numberTile').position());
}

function checkTiles(direction) {

	if (direction === "LEFT") {
		for (var i = 1; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				console.log($('.gridTile' + j + '-' + i));
				$('.gridTile' + j + '-' + i).animate({opacity: 0.25}, 500);
			}
		}
	}
	
}



