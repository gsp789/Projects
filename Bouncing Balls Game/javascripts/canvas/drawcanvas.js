var canvas;
var context;
var timer;

var init = function() {
	center = canvasCenter(canvas);
	context = canvas.getContext('2d');	
	currentPad = new Pad(center.x, 0, padDimension(canvas));
	setInterval(drawGameArea, 1000/50);
}

var drawGameArea = function() {
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = '#D1D1D1';
	context.fillRect(0, 0, canvas.width, canvas.height);  
	currentPad.drawPad();
	if(balls.length > 0)
	{
		setTimer();
		gameOn();
		balls.forEach(function(currentBall){
			currentBall.drawBall(context);
		});
	}
}

var draw = function(theCanvas) {
  canvas = theCanvas;
  init();
}

var registerHandleEvents = function(canvas) {

	canvas.onclick = function(event) {
		if(balls.length <= 0)
		{
			var positionX = event.pageX;
			var positionY = event.pageY;
			
			positionX -= this.offsetLeft;
			positionY -= this.offsetTop;
			var XYcoords = function(positionX, positionY)
			{
				var coords = {
					x : positionX,
					y : positionY
				};
				return coords;
			};
			var coords = XYcoords(positionX, positionY);
			init_balls(coords);
		}
	}
}