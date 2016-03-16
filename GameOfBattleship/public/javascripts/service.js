var players = [];

var addPlayer = function(name) {
	alert("Add Player Called");
	players.push({
		"name" : "praveen"
	});
}

var getPlayerNames = function() {
	var playerNames = [];
	players.forEach(function(player){
		playerNames.push(player.name);
	});
	return playerNames;
}