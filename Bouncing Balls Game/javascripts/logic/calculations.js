var padDimension = function(boxwidth) {
	var padSize = { 
		width: boxwidth / 10, 
		height: 6
	};
	return padSize;
}

var findDistance = function(x1, x2, y1, y2)
{
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

var findAngleOfCollision = function(point1X, point1Y, point2X, point2Y, maxWidth)
{

	var fixedPointX = (point1X + point2X) / 2;
	var fixedPointY = (point1Y + point2Y) / 2;
	var horizontalpointY = fixedPointY;
	var angle1 = Math.atan2(point1Y - fixedPointY, point1X - fixedPointX);
	var angle2 = Math.atan2( 0, (maxWidth + 10) - fixedPointX);
	var angle = ((angle1 - angle2) * (180/Math.PI)); 
	if(angle < 0)
		return Math.abs(angle);
	return 360-angle;
}

var angleToRadian = function(angle)
{
	return (angle * (Math.PI / 180));
}

