

var Pad = function(x, y, padSize) {
	this.positionX = x - padSize.width / 2;
	this.positionY = y;
	this.width = padSize.width; 
	this.height = padSize.height;
	
};

var movePad = function(event) {
	if (event.pageX < (currentPad.width/2)){
		currentPad.positionX = 0;
	} else if (event.pageX > canvas.width){
		currentPad.positionX = canvas.width - currentPad.width;
	} else if (event.pageX > (currentPad.width/2) && event.pageX < canvas.width-(currentPad.width/2)){
		currentPad.positionX = event.pageX -(currentPad.width/2);
	}
}

var touchmovePad = function(event) {
	if (event.pageX < (currentPad.width/2)){
		currentPad.positionX = 0;
	} else if (event.pageX > canvas.width){
		currentPad.positionX = canvas.width - currentPad.width;
	} else if (event.pageX > (currentPad.width/2) && event.pageX < canvas.width-(currentPad.width/2)){
		currentPad.positionX = event.pageX -(currentPad.width/2);
	}
}