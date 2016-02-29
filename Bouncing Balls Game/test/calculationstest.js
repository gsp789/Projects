describe('calculationstest', function() {

	it('canary is passing', function() {
		expect(true).to.be.eql(true);
	}); 
	
	beforeEach(function() {
		this.canvas = {
			width: 500,
			height: 400
		};
		this.currentPad = {
			positionX : 170,
			width : 50
		};
		this.boxDimensions = {
			width : 500
		};
	}); 

	it('pad size calculations', function() {
		var padSize = {width: 50, height: 6};
		
		expect(padDimension(this.boxDimensions.width)).to.be.eql(padSize);
	});
	
	it('check angle in / direction top', function() {
		expect(findDistance(10,10, 11, 11)).to.be.eql(0);
	});
	
	it('verify find distance method', function() {
		expect(findDistance(0,4, 3, 0)).to.be.eql(5);
	});
	
	it('check angle in / direction top', function() {
		expect(findAngleOfCollision(10,10, 11, 11, this.boxDimensions.width)).to.be.eql(135);
	});
	
	it('check angle in / direction bottom', function() {
		expect(findAngleOfCollision(12, 12, 10, 10, this.boxDimensions.width)).to.be.eql(315);
	});
	
	it('check angle in \ direction bottom', function() {
		expect(findAngleOfCollision( 0, 2, 2, 0, this.boxDimensions.width)).to.be.eql(225);
	});
	
	it('check angle in \ direction top', function() {
		expect(findAngleOfCollision(2, 0, 0, 2, this.boxDimensions.width)).to.be.eql(45);
	});
	
	it('check right angle down', function() {
		expect(findAngleOfCollision(0, 0, 0, 4, this.boxDimensions.width)).to.be.eql(90);
	});
	
	it('check right angle up', function() {
		expect(findAngleOfCollision(0, 2, 0, 0, this.boxDimensions.width)).to.be.eql(270);
	});
	
	it('angleToRadian method test', function() {
		expect(angleToRadian(180)).to.be.eql(3.141592653589793);
	});
	
});