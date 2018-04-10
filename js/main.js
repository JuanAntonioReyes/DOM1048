var gridSize = 4;
var grid = [];
var tileSize = 50;
var tileSpacing = 10;

$(document).keydown(moveTiles);

startGame(); // -----------------------------------------------

function printGrid() {
	var printableGrid = "";

	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			printableGrid += grid[i][j] + "  ";
		}
		printableGrid += "\n";
	}

	console.log(printableGrid);
}

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
//function placeNewTile(tileValue, tilePosition) {
	var tile;
	var tilePosition = getRandomValidPosition();

	if (tilePosition[0] === -1) {
		console.log("The grid is full and the tiles cannot move or fuse in that direction");
	} else {
		grid[tilePosition[0]][tilePosition[1]] = tileValue;

		tile = $('<div class="numberTile numberTile' + tilePosition[0] + '-' + tilePosition[1] + '">' + tileValue + '</div>');
		$('.numberTiles').append(tile);

		//tile.css("background-color", "#123456");

		console.log("The new tile is positioned in: " + tilePosition[0] + " - " + tilePosition[1]);
		console.log("Grid " + tilePosition[0] + " - " + tilePosition[1] + ": " + grid[tilePosition[0]][tilePosition[1]]);

		var tileX = ( ( tilePosition[1] * (tileSize + tileSpacing) ) + tileSpacing );
		var tileY = ( ( tilePosition[0] * (tileSize + tileSpacing) ) + tileSpacing );

		tile.offset({ top: tileY, left: tileX });
	}

}

function getRandomValidPosition() {
	var randomRow, randomCol, isValid = false;

	if (checkGridFull()) {
		randomRow = -1;
		randomCol = -1;
	} else {
		while (!isValid) {
			randomRow = Math.floor(Math.random() * gridSize);
			randomCol = Math.floor(Math.random() * gridSize);

			//console.log(randomRow + " - " + randomCol);

			if (grid[randomRow][randomCol] === 0) {
				isValid = true;
			}

		}
	}
	
	//console.log("Row: " + randomRow + " - " + "Column: " + randomCol);

	return [randomRow, randomCol];
}

function checkGridFull() { // TEMPORAL
	var isGridFull = true;

	for (var i = 0; i < gridSize; i++) {
		for (var j = 0; j < gridSize; j++) {
			if (grid[i][j] === 0) {
				isGridFull = false;
			}
		}
	}

	return isGridFull;
}

function placeRandomTile() {
	var tileValue = (Math.random() < 0.5) ? tileValue = 2 : tileValue = 4;

	placeNewTile(tileValue);
}

function moveTiles(e) {
/*	if (checkGridFull()) {
		console.log("GAME OVER - The grid is full");
	} else {*/
		var pressedKey = e.which;
		var distance = 60;
		var speed = 150;

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
	//}
}

function checkTiles(direction) {
	//console.log(direction);
	var numberTile, fusionNumberTile;
	var distance;
	var speed = 500;

	if (direction === "LEFT") {
		for (var i = 1; i < gridSize; i++) { // ROW
			for (var j = 0; j < gridSize; j++) { // COLUMN
				//console.log($('.gridTile' + j + '-' + i));
				//console.log(j + '-' + i);
				if (grid[j][i] != 0) {
					numberTile = $('.numberTile' + [j] + '-' + [i]);

// ---------------------------------------------------------------------------------
					console.log("----------------------------COLOR CHANGE TEST");
					
					var hexDigits = new Array
					        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 

					//Function to convert rgb color to hex format
					function rgb2hex(rgb) {
					 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					 //return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					 return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					}

					function hex(x) {
					  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
					}

					function addHexColor(c1, c2) {
					  var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
					  while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
					  return hexStr;
					}

					var color = numberTile.css("background-color");
					var colorHex = rgb2hex(color);
					var colorHexAdd = addHexColor(colorHex, '000001')
					console.log(color);
					//console.log(colorHex);
					console.log('#' + colorHex);
					console.log('#' + colorHexAdd);

					//numberTile.css("background-color", '#' + colorHexAdd);

// ---------------------------------------------------------------------------------

					console.log("------");
					console.log("NUMBER TILE != 0");
					console.log(numberTile);
					console.log("------");

					var destination = findDestination('LEFT', [j,i], grid[j][i]);
					console.log(destination);

					if (destination[2]) {

						if (destination[3]) { // MOVE AND FUSE

							console.log("The destination tile value will be: " + (grid[j][i] * 2));

							grid[destination[0]][destination[1]] = (grid[j][i] * 2);
							fusionNumberTile = $('.numberTile' + [destination[0]] + '-' + [destination[1]]);

							numberTile.text(grid[j][i] * 2);

						} else { // ONLY MOVE

							console.log("The destination tile value will be: " + grid[j][i]);

							grid[destination[0]][destination[1]] = grid[j][i];

						}

						numberTile.addClass('numberTile' + destination[0] + '-' + destination[1]);
						grid[j][i] = 0;
						numberTile.removeClass('numberTile' + [j] + '-' + [i]);

						distance = ((i - destination[1]) * 60);
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("The tile needs to move to Row: " + destination[0] + " - Col: " + destination[1]);
						console.log("The movement distance is: " + distance);

						numberTile.animate({left: "-="+distance}, speed);

						if (destination[3]) {
							fusionNumberTile.remove();
						}

					} else {
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("It doesn't need to move anywhere");
					}
					
				}
			}
		}
	} else if (direction === "UP") {
		for (var i = 1; i < gridSize; i++) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + i + '-' + j));
				//console.log(i + '-' + j);
				if (grid[i][j] != 0) {
					numberTile = $('.numberTile' + [i] + '-' + [j]);

					console.log("------");
					console.log("NUMBER TILE != 0");
					console.log(numberTile);
					console.log("------");

					var destination = findDestination('UP', [i,j], grid[i][j]);
					console.log(destination);

					if (destination[2]) {

						if (destination[3]) { // MOVE AND FUSE

							console.log("The destination tile value will be: " + (grid[j][i] * 2));

							grid[destination[0]][destination[1]] = (grid[i][j] * 2);
							fusionNumberTile = $('.numberTile' + [destination[0]] + '-' + [destination[1]]);

							numberTile.text(grid[i][j] * 2);

						} else { // ONLY MOVE

							console.log("The destination tile value will be: " + grid[j][i]);

							grid[destination[0]][destination[1]] = grid[i][j];

						}

						numberTile.addClass('numberTile' + destination[0] + '-' + destination[1]);
						grid[i][j] = 0;
						numberTile.removeClass('numberTile' + [i] + '-' + [j]);

						distance = ((i - destination[0]) * 60);
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("The tile needs to move to Row: " + destination[0] + " - Col: " + destination[1]);
						console.log("The movement distance is: " + distance);

						numberTile.animate({top: "-="+distance}, speed);

						if (destination[3]) {
							fusionNumberTile.remove();
						}

					} else {
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("It doesn't need to move anywhere");
					}
				}
			}
		} 
	} else if (direction === "RIGHT") {
		for (var i = (gridSize-2); i >= 0; i--) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + j + '-' + i));
				//console.log(j + '-' + i);
				if (grid[j][i] != 0) {
					numberTile = $('.numberTile' + [j] + '-' + [i]);

					console.log("------");
					console.log("NUMBER TILE != 0");
					console.log(numberTile);
					console.log("------");

					var destination = findDestination('RIGHT', [j,i], grid[j][i]);
					console.log(destination);

					if (destination[2]) {

						if (destination[3]) { // MOVE AND FUSE

							console.log("The destination tile value will be: " + (grid[j][i] * 2));

							grid[destination[0]][destination[1]] = (grid[j][i] * 2);
							fusionNumberTile = $('.numberTile' + [destination[0]] + '-' + [destination[1]]);

							numberTile.text(grid[j][i] * 2);
							
						} else { // ONLY MOVE

							console.log("The destination tile value will be: " + grid[j][i]);

							grid[destination[0]][destination[1]] = grid[j][i];

						}

						numberTile.addClass('numberTile' + destination[0] + '-' + destination[1]);
						grid[j][i] = 0;
						numberTile.removeClass('numberTile' + [j] + '-' + [i]);

						distance = ((destination[1] - i) * 60);
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("The tile needs to move to Row: " + destination[0] + " - Col: " + destination[1]);
						console.log("The movement distance is: " + distance);

						numberTile.animate({left: "+="+distance}, speed);

						if (destination[3]) {
							fusionNumberTile.remove();
						}

					} else {
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("It doesn't need to move anywhere");
					}
				}
			}
		} 
	} else if (direction === "DOWN") {
		for (var i = (gridSize - 2); i >= 0; i--) {
			for (var j = 0; j < gridSize; j++) {
				//console.log($('.gridTile' + i + '-' + j));
				//console.log(i + '-' + j);
				if (grid[i][j] != 0) {
					numberTile = $('.numberTile' + [i] + '-' + [j]);

					console.log("------");
					console.log("NUMBER TILE != 0");
					console.log(numberTile);
					console.log("------");

					var destination = findDestination('DOWN', [i,j], grid[i][j]);
					console.log(destination);

					if (destination[2]) {

						if (destination[3]) { // MOVE AND FUSE

							console.log("The destination tile value will be: " + (grid[j][i] * 2));

							grid[destination[0]][destination[1]] = (grid[i][j] * 2);
							fusionNumberTile = $('.numberTile' + [destination[0]] + '-' + [destination[1]]);

							numberTile.text(grid[i][j] * 2);
							
						} else { // ONLY MOVE

							console.log("The destination tile value will be: " + grid[j][i]);

							grid[destination[0]][destination[1]] = grid[i][j];

						}

						numberTile.addClass('numberTile' + destination[0] + '-' + destination[1]);
						grid[i][j] = 0;
						numberTile.removeClass('numberTile' + [i] + '-' + [j]);

						distance = ((destination[0] - i) * 60);
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("The tile needs to move to Row: " + destination[0] + " - Col: " + destination[1]);
						console.log("The movement distance is: " + distance);

						numberTile.animate({top: "+="+distance}, speed);

						if (destination[3]) {
							fusionNumberTile.remove();
						}

					} else {
						console.log("The tile was in Row: " + i + " - Col: " + j);
						console.log("It doesn't need to move anywhere");
					}
				}
			}
		} 
	}

	console.log("Grid before inserting new tile");
	printGrid();

	setTimeout(function(){
    placeRandomTile();
	}, speed);

	//placeRandomTile();
	
	setTimeout(function(){
    console.log("Grid after inserting new tile");
		printGrid();
	}, speed);

}

function findDestination(direction, tilePosition, tileValue) {
	var column, row;
	var numberTileFound = false;
	var changingPosition, fixedPosition;
	var changingFactor;
	var limitReached = false;
	var tileCanMove = false;
	var tileFusion = false;

	if (direction === 'LEFT' || direction === 'RIGHT') {
		changingPosition = tilePosition[1]; // Column
		fixedPosition = tilePosition[0]; // Row
	} else if (direction === 'UP' || direction === 'DOWN') {
		changingPosition = tilePosition[0]; // Row
		fixedPosition = tilePosition[1]; // Column
	}

	if (direction === 'LEFT' || direction === 'UP') {
		changingFactor = -1;
	} else if (direction === 'RIGHT' || direction === 'DOWN') {
		changingFactor = 1;
	}

	changingPosition += changingFactor;

	console.log("- Destination finder is moving to " + direction);
	if (direction === 'LEFT' || direction === 'RIGHT') {
		console.log("  Starting the search at column " + changingPosition);
	} else if (direction === 'UP' || direction === 'DOWN') {
		console.log("  Starting the search at row " + changingPosition);
	}

	var gridPositionValue;

	while (!limitReached && !numberTileFound) {

		if (direction === 'LEFT' || direction === 'RIGHT') {
			row = fixedPosition;
			column = changingPosition;
		} else if (direction === 'UP' || direction === 'DOWN') {
			row = changingPosition;
			column = fixedPosition;
		}

		gridPositionValue = grid[row][column];

		console.log("Row: " + row + " - Column: " + column);
		console.log("fixed: " + fixedPosition + " - changing: " + changingPosition);
		console.log("Grid " + row + " - " + column + ": " + gridPositionValue);

		if (gridPositionValue != 0){
			numberTileFound = true;

			console.log("-- The destination finder has found another number tile");
			console.log("   at " + row + " - " + column + " | With value: " + gridPositionValue);
		
			if (gridPositionValue === tileValue) {
				tileCanMove = true;
				tileFusion = true;

				console.log("-- The tile at " + tilePosition[0] + " - " + tilePosition[1] + "(" + tileValue + ") will fuse with the tile at " + row + " - " + column + " (" + gridPositionValue + ")");
			}

		} else {
			console.log("-- The position " + row + " - " + column + " is empty (" + gridPositionValue + ") - The finder will continue searching");

			tileCanMove = true;

			changingPosition += changingFactor;
		}

		if (((direction === 'LEFT' || direction === 'UP') && changingPosition < 0) ||
				((direction === 'RIGHT' || direction === 'DOWN') && changingPosition >= gridSize)) {

			limitReached = true;
		}

		if (limitReached) {
			console.log("------ The destination finder has reached the grid limit");
		}
	}

	if ((numberTileFound && !tileFusion) || limitReached) {
		changingPosition -= changingFactor;
	}

	if (direction === 'LEFT' || direction === 'RIGHT') {
		return [fixedPosition, changingPosition, tileCanMove, tileFusion];
	} else if (direction === 'UP' || direction === 'DOWN') {
		return [changingPosition, fixedPosition, tileCanMove, tileFusion];
	}
}

