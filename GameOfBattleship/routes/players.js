var express = require('express');
var router = express.Router();

var players = [
];

var manageRequests = [];

router.get('/:currentPlayer', function(req, res, next) {
	var availablePlayers = filterCurrentPlayer(req.params.currentPlayer);
	res.send(availablePlayers);
});

router.post('/add', function(req, res, next) {
	var currentPlayer = req.body.name;
	
	if(!ifPlayerExist(currentPlayer))
	{
		players.push( 
		{ 
			name : currentPlayer, 
			inPlay : 'no'
		});
		res.send(currentPlayer);
	}
	else
	{
		res.send("PlayerAlreadyExist");
	}
	
});

router.post('/request/:currentPlayer', function(req, res, next) {
	var currentPlayer = req.params.currentPlayer;
	var toPlayer = req.body.name;
	manageRequests.push( 
	{ 
		from : currentPlayer,
		to : toPlayer, 
		accepted : '',
		inProgress : 'no',
		fromPlayerCells : [],
		toPlayerCells : [],
		turn : '',
		fromPlayerScore : 0,
		toPlayerScore : 0
	});
	res.send("success");
});

router.post('/playRequests/:currentPlayerName', function(req, res, next) {
	var currentPlayer = req.params.currentPlayerName;
	var requestsToCurrentPlayer = getRequestsForCurrentPlayer(currentPlayer);
	res.send(requestsToCurrentPlayer);
});

router.post('/acceptResponse/:currentPlayer', function(req, res, next) {
	var toPlayer = req.params.currentPlayer;
	var fromPlayer = req.body.name;
	var message = 'yes';
	var response = updatePlayRequestResponse(fromPlayer, toPlayer, message);
	res.send(response);
});

router.post('/rejectResponse/:currentPlayer', function(req, res, next) {
	var toPlayer = req.params.currentPlayer;
	var fromPlayer = req.body.name;
	var message = 'no';
	var response = updatePlayRequestResponse(fromPlayer, toPlayer, message);
	res.send(response);
});

router.post('/updateTurn/:playerType/:index', function(req, res, next) {
	var hisTurn = req.params.playerType === "fromPlayer" ? "toPlayer" : "fromPlayer";
	manageRequests[req.params.index].turn = hisTurn;
	res.send("success");
});

router.post('/isMyTurn/:playerType/:index', function(req, res, next) {
	res.send(manageRequests[req.params.index].turn === req.params.playerType);
});

router.post('/requestResponse/:currentPlayer', function(req, res, next) {
	var fromPlayer = req.params.currentPlayer;
	
	var didAnyoneAcceptMyRequest = function(acc, request) {
		if(acc === 'no')
		{
			if(request.from === fromPlayer && request.inProgress === 'yes')
				acc = request.to;
		}
		return acc;
	}
	
	res.send(manageRequests.reduce(didAnyoneAcceptMyRequest, 'no'));
	
});

router.post('/updateOnGameOver/:from/:to/:index', function(req, res, next) {

	takeoutPlayer(req.params.from);
	takeoutPlayer(req.params.to);	
	manageRequests[req.params.index].inProgress = 'complete';
	res.send("success")

});

router.post('/postSelectedCells/:playerType/:ships/:from/:to', function(req, res, next) {

	var playerType = req.params.playerType;
	var shipsPlacedAt = req.params.ships.split(",");
	var fromPlayer = req.params.from;
	var toPlayer = req.params.to;
	var index = -1;
	
	var getThePair = function(req, indx) {
		if(req.to === toPlayer && req.from === fromPlayer && req.accepted === 'yes' && req.inProgress === 'yes')
		{
			index = indx;
			return true;
		}
		return false;
	}
	
	var postTheCells = function(req) {
		if(playerType === 'fromPlayer')
			req.fromPlayerCells = shipsPlacedAt;
		else if(playerType === 'toPlayer')
			req.toPlayerCells = shipsPlacedAt;
	}
	
	manageRequests.filter(getThePair).map(postTheCells);
	res.send({ accessPair : index });
	
});

router.post('/isOpponentReady/:playerType/:index', function(req, res, next) {
	var index = req.params.index;
	if(req.params.playerType === 'fromPlayer')
		res.send(manageRequests[index].toPlayerCells.length === 5);
	else if(req.params.playerType === 'toPlayer')
		res.send(manageRequests[index].fromPlayerCells.length === 5);
		
});

router.post('/getOpponentShips/:playerType/:index', function(req, res, next) {
	var index = req.params.index;
	if(req.params.playerType === 'fromPlayer')
		res.send(manageRequests[index].toPlayerCells);
	else if(req.params.playerType === 'toPlayer')
		res.send(manageRequests[index].fromPlayerCells);		
});

router.post('/getOpponentScore/:playerType/:index', function(req, res, next) {
  var index = req.params.index;
	var score = 0;
	if(req.params.playerType === 'fromPlayer')
		score = manageRequests[index].toPlayerScore;
	else if(req.params.playerType === 'toPlayer')
		score = manageRequests[index].fromPlayerScore;
	res.send({ opponentScore : score });
});

router.post('/updateMyScore/:playerType/:index', function(req, res, next) {
	if(req.params.playerType === 'fromPlayer')
		manageRequests[req.params.index].fromPlayerScore += 1;
	else if(req.params.playerType === 'toPlayer')
		manageRequests[req.params.index].toPlayerScore += 1;
	res.send("success");
});

var updatePlayRequestResponse = function(fromPlayer, toPlayer, message) {
	var isSuccess = false;
	for(var i = 0; i < manageRequests.length; i++)
	{
		if(manageRequests[i].accepted === '')
		{
			if(manageRequests[i].from === fromPlayer && manageRequests[i].to === toPlayer)
			{
				manageRequests[i].accepted = message;
				if(message === 'yes')
				{
					manageRequests[i].inProgress = 'yes';
					players.map(function(player) {
						if(player.name === fromPlayer || player.name === toPlayer)
							player.inPlay = 'yes';
					});
				}
				isSuccess = true;
				break;
			}
		}
	}
	return isSuccess; 
}

var getRequestsForCurrentPlayer = function(currentPlayer) {

	var getRequests = function(requests) {
		return ((requests.to === currentPlayer) && (requests.accepted === ''));
	}
	
	return manageRequests.filter(getRequests);
	
}

var takeoutPlayer = function(name) {

	var index = players.indexOf(name);
	if(index > -1)
		players.splice(index, 1);

}

var ifPlayerExist = function(currentPlayer) {

	var doesPlayerExist = function(result, player) {
		if(!result)
			return player.name === currentPlayer;
		return result;
	}
	
	return players.reduce(doesPlayerExist, false);
	
}

var filterCurrentPlayer = function(currentPlayer) {

	var filterOutCurrentPlayer = function(player) {
		return player.name != currentPlayer && player.inPlay === 'no';
	}
	
	return players.filter(filterOutCurrentPlayer);	
	
}

module.exports = router;