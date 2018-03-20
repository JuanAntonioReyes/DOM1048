var gridSize = 4;

$(document).keydown(moveSquareKey);

var gridDivs = "";
for (var i = 0; i < gridSize; i++) {
	for (var j = 0; j < gridSize; j++) {
		gridDivs += '<div class="graySquare"></div>';
	}
	gridDivs += '<br>';
}
$('.squaresGrid').append(gridDivs);

//$('.blueSquare').offset({ top: 10, left: 10 });

function moveSquareKey(e) {
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
