var boxDimensions;
var currentPad;
var timer = 0;
var Box = function() {

	this.width  = boxDimensions.width;
	this.height = boxDimensions.height;
	this.centerX = this.width / 2;
  this.centerY = this.height / 2;
	
	this.drawPad = function(context) {
		context.fillStyle = 'black';
		context.fillRect(currentPad.positionX, currentPad.positionY, currentPad.width, currentPad.height);
	}
	
	this.drawGameArea = function(context) {
		context.clearRect(0, 0, this.width, this.height);
		context.fillStyle = '#D1D1D1';
		context.fillRect(0, 0, this.width, this.height);  
		this.drawPad(context);
		if(balls.length > 0)
		{
			setTimer();
			gameOn();
			balls.forEach(function(currentBall){
				currentBall.drawBall(context);
			});
		}
	}

};

var draw = function(theCanvas) {

		canvas = theCanvas;
		context = canvas.getContext('2d');	
		boxDimensions = {
			width : canvas.width,
			height: canvas.height
		};
		var box = new Box();
		currentPad = new Pad(box.centerX, 0, padDimension(box.width));
		var drawGame = function()
		{
			box.drawGameArea(context);
		}
		setInterval(drawGame, 1000/50);
		
}

var registerHandleEvents = function(canvas) {

	canvas.onclick = function(event) {
		this.getCoordinates(event);
	}
	
	canvas.ontouchend = function(event) {
		this.getCoordinates(event.changedTouches[event.changedTouches.length-1]);	
	}
	
	canvas.getCoordinates = function(event) {
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
			timer = 0;
			init_balls(coords);
		}
	}
	
}