var balls = [];

var Ball = function(xcoordinate, ycoordinate, radius, dx, dy, color, initspeed, angle)
{
	this.x = xcoordinate;
	this.y = ycoordinate;
	this.radius = radius;
	this.dx = (dx * initspeed)/5;
	this.dy = (dy * initspeed)/5;
	this.speed = initspeed;
	this.padHits = 0;
	this.color = color;
	this.angle = angle;
	this.lostBall = false;
	
	this.drawBall = function(context) {	
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.fillStyle = this.color;
		context.fill();
		context.save();
	}
	
	this.speedUp = function() {
		this.speed += 1;
		this.dx *= this.speed;
		this.dy *= this.speed;
	}

	
	this.doesBallsCollide = function(currentBall, currentIndex) {
		
		var filterCurrentBall = function(ball, index){
			if(currentIndex < index)
				return true;
			return false;
		}
		
		var checkIfCollide = function(ball) {
			var distance = findDistance(ball.x, currentBall.x, ball.y, currentBall.y);
			if(distance <= (ball.radius + currentBall.radius))
			{
				changeAnglesOfCollidedBalls(ball, currentBall);
			}
		}
	
		var changeAnglesOfCollidedBalls = function(ball1, ball2)
		{
			ball1.angle = findAngleOfCollision(ball1.x, ball1.y, ball2.x, ball2.y, boxDimensions.width);
			ball2.angle = findAngleOfCollision(ball2.x, ball2.y, ball1.x, ball1.y, boxDimensions.width);
			for(var i = 0; i < 5; i++){
				ball1.moveCoordinates();
				ball2.moveCoordinates();
			}
		}
		
		balls.filter(filterCurrentBall).map(checkIfCollide);
	
	}
	this.getQuadrant = function()
	{
		if(this.angle >=0 && this.angle < 90)
			return "Quadrant1";
		if(this.angle >= 90 && this.angle < 180)
			return "Quadrant2";
		if(this.angle >= 180 && this.angle < 270)
			return "Quadrant3";
		if(this.angle >= 270 && this.angle < 360)
			return "Quadrant4";
	}
	
	this.doesWallHit = function() {
		var xMax = boxDimensions.width;
		var xMin = 0;
		var yMax = boxDimensions.height;
		var yMin = 0;
		var xCoordinate = this.x + this.radius;
		
		switch(true)
		{
			
			case (this.x <= this.radius && this.getQuadrant() === "Quadrant2" )    		 :  this.angle = 180 - this.angle;
																																									  break;
			case (this.x + this.radius >= xMax && this.getQuadrant() === "Quadrant1")  :   this.angle = 180 - this.angle;
																																										break;
			case (this.x + this.radius >= xMax && this.getQuadrant() === "Quadrant4" ) :  this.angle = 360 + 180 - this.angle;
																																										break;
			case (this.x <= this.radius && this.getQuadrant() === "Quadrant3")         :  this.angle = 540 - this.angle;
																																									  break;
			case (this.y + this.radius >= yMax && this.getQuadrant() === "Quadrant1" ) : 
			case (this.y <= this.radius && this.getQuadrant() === "Quadrant3" )     	 : 
			case (this.y + this.radius >= yMax && this.getQuadrant() === "Quadrant2")  : 
			case (this.y <= this.radius && this.getQuadrant() === "Quadrant4")     	   : this.angle = 360 - this.angle;
																																									 break;
		}
	}
	
	this.moveCoordinates = function() {
	
		this.x += (Math.cos(angleToRadian(this.angle)) * this.dx);
		this.y += (Math.sin(angleToRadian(this.angle)) * this.dy);
	}
	
	this.changeAngleOnPadHit = function() {
		this.angle = 360 - this.angle;
	}
	
	this.doesPadHit = function(currentPad) {
		var padSize = padDimension(canvas);
		
		if(this.y <= this.radius + padSize.height)
		{
			if(this.x >= currentPad.positionX && this.x <= currentPad.positionX + currentPad.width)
			{	
				if(this.angle > 180)
				{
					this.speedUp();
					this.changeAngleOnPadHit();
					this.incrementPadHit();
				}
					return "padHit";
				
			}
			else if(this.doesEdgeHit(currentPad) )
			{
				if(this.angle > 180)
				{
					this.incrementPadHit();
				}
				
					
				return "edgeHit";
			}
			else if(this.y <= this.radius)
			{
				this.lostBall = true;
				return "ballLost";
			}
		}
		return "noHit";
	}

	this.incrementPadHit = function() {
		this.padHits++;
		if(this.padHits % 10 === 0)
			this.radius /= 1.5;
	}

	this.edgeHit = function(currentPad) {
		
		var leftEdgetoBallCenterDistance = findDistance(currentPad.positionX, this.x, (currentPad.positionY + currentPad.height), this.y);
		
		var rightEdgeToCenterDistance = findDistance((currentPad.positionX + currentPad.width), this.x, (currentPad.positionY + currentPad.height), this.y);
		
		if(rightEdgeToCenterDistance <= this.radius || leftEdgetoBallCenterDistance <= this.radius)
			return true;
		else
			return false;
	}
	
	this.doesEdgeHit = function(currentPad) {
		var quadrant = this.getQuadrant();
		if((quadrant === "Quadrant3") || (quadrant === "Quadrant4"))
		{
			var leftEdgetoBallCenterDistance = findDistance(currentPad.positionX, this.x, (currentPad.positionY + currentPad.height), this.y);
			
			var rightEdgeToCenterDistance = findDistance((currentPad.positionX + currentPad.width), this.x, (currentPad.positionY + currentPad.height), this.y);
			
			if(rightEdgeToCenterDistance <= this.radius || leftEdgetoBallCenterDistance <= this.radius)
			{
				if((rightEdgeToCenterDistance <= this.radius && quadrant === "Quandrant3" ) || (leftEdgetoBallCenterDistance <= this.radius && quadrant === "Quandrant4"))
					this.angle += 180;
				else
					this.changeAngleOnPadHit();
				return true;
			}
		}
		return false;
	}
	
	this.adjustAngle = function()
	{
		if(this.angle > 360)
			this.angle -= 360;
		if(this.angle < 0)
			this.angle += 360;
	}

};

var init_balls = function(mouseClickCoords) {

	var radius = boxDimensions.width / 20;
	var gapBetweenBalls = 10;
	var initx = mouseClickCoords.x;
	var inity = mouseClickCoords.y;
	var dx = boxDimensions.width / 100;
	var dy = boxDimensions.width / 100;
	var speed = 1; 
	
	balls.push(new Ball(initx, inity, radius, dx, dy, "#0000FF", speed, getRandomAngle() ));
	
	balls.push(new Ball(initx - (2 * radius) - gapBetweenBalls, inity, radius, dx, dy, "#00FF00", speed, getRandomAngle()));

	balls.push(new Ball(initx + (2 * radius) + gapBetweenBalls, inity, radius, dx, dy, "#FF0000", speed, getRandomAngle()));
	
	
}

var getRandomAngle = function()
{
	return Math.floor(((Math.random() * 30) + 30) + ((90 * Math.random()) * 4)); 
}

var gameOn = function() {

	balls.forEach(function(currentBall, index) {
	
		currentBall.doesBallsCollide(currentBall, index);
		
		
		var result = currentBall.doesPadHit(currentPad);
		if(result == "noHit")
			currentBall.doesWallHit();
			
		currentBall.adjustAngle();						
		currentBall.moveCoordinates();
	});
	
	
	balls = balls.filter(function(ball) {
		if(!ball.lostBall)
			return ball; 
	});
	
	if(balls.length <= 0)
		gameovermessage();
		
}

  var gameovermessage = function() {
  
	var gamestatus = document.getElementById('gamestatus')
	gamestatus.innerHTML = 'Game Over';
	gamestatus.style.background = 'yellow';
	gamestatus.style.padding = '0 200px 0 200px';
	
	var fadeOut = function() {
		gamestatus.style.background = '';
		gamestatus.innerHTML = '';
	}
	setTimeout(fadeOut, 2000);
}