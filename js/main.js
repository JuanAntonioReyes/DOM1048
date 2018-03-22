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
			//gridDivs += '<div class="gridTile gridTile' + i + '-' + j + '"></div>';
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

	tile = $('<div class="numberTile numberTile' + tilePosition[0] + '-' + tilePosition[1] + '">' + tileValue + '</div>');
	$('.numberTiles').append(tile);

	var tileX = ( ( tilePosition[1] * (tileSize + tileSpacing) ) + tileSpacing );
	var tileY = ( ( tilePosition[0] * (tileSize + tileSpacing) ) + tileSpacing );

	tile.offset({ top: tileY, left: tileX });
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

	//console.log("Row: " + randomRow + " - " + "Column: " + randomCol);

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

	//console.log($('.numberTile').position());
}

function checkTiles(direction) {

	//console.log(direction);
	var numberTile;
	var distance;
	var speed = 150;

	if (direction === "LEFT") {
		for (var i = 1; i < gridSize; i++) { // ROW
			for (var j = 0; j < gridSize; j++) { // COLUMN
				//console.log($('.gridTile' + j + '-' + i));
				//console.log(j + '-' + i);
				if (grid[j][i] != 0) {
					numberTile = $('.numberTile' + [j] + '-' + [i]);

					console.log("------");
					console.log("NUMBER TILE != 0");
					console.log(numberTile);
					console.log("------");

					var destination = findDestination('LEFT', [j,i], grid[j][i]);
					console.log(destination);

					grid[destination[0]][destination[1]] = grid[j][i];
					numberTile.addClass('numberTile' + destination[0] + '-' + destination[1]);
					grid[j][i] = 0;
					numberTile.removeClass('numberTile' + [j] + '-' + [i]);

					distance = ((i - destination[1]) * 60);

					numberTile.animate({left: "-="+distance}, speed);
				}
			}
		}
	} else if (direction === "UP") {
		for (var i = 1; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + i + '-' + j));
				//console.log(i + '-' + j);
				if (grid[i][j] != 0) {
					console.log("a");
				}
			}
		} 
	} else if (direction === "RIGHT") {
		for (var i = (gridSize-2); i >= 0; i--) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + j + '-' + i));
				//console.log(j + '-' + i);
				if (grid[j][i] != 0) {
					console.log("a");
				}
			}
		} 
	} else if (direction === "DOWN") {
		for (var i = (gridSize - 2); i >= 0; i--) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + i + '-' + j));
				//console.log(i + '-' + j);
				if (grid[i][j] != 0) {
					console.log("a");
				}
			}
		} 
	}

}

function findDestination(direction, tilePosition, tileValue) {
	var column = tilePosition[1];
	var row = tilePosition[0];
	var numberTileFound = false;
	//var foundedNumberTileValue;

	console.log("------");
	console.log("FINDING DESTINATION FOR NUMBER TILE " + row + " - " + column);

	if (direction === 'LEFT') {
		column--;
		
		console.log("- Destination finder is moving to the LEFT");
		console.log("  Starting the search at column " + column);

		while (column >= 0 && !numberTileFound) {

			if (grid[column][row] != 0){

				console.log("-- The destination finder has found another number tile");
				console.log("   at " + row + " - " + column + " | With value: " + grid[column][row]);

				numberTileFound = true;
				//foundedNumberTileValue = grid[column][row];
			}
			/* ------------- */
			else {
				console.log("-- The position " + row + " - " + column + " is empty (0) - The finder will continue searching");
			}
			/* ------------- */
			column--;
		}

		/* ------- */
		if (column < 0) {
			console.log("------ The destination finder has reached the grid limit");
		}
		/* ------- */

		if (numberTileFound || column < 0) {
			column++;
		}

	}

	console.log("THE TILE DESTINATION IS: " + row + " - " + column);
	console.log("------");

	return [row, column];
}

