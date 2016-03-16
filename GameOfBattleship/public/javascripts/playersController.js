angular.module('multiplayer', [])
	.controller('PlayersController', function($http, $timeout, $document){
	
	var playersController = this;
	var document = window.document;
	var shipLocations = [];
	
	var displayErrorMessage = function(errormessage) {
		playersController.errorMessage = errormessage;
		var fadeOut = function() {
			playersController.errorMessage = '';
		}
		setTimeout(fadeOut, 5000);
	}
	
	playersController.getPlayers = function() {
		$http.get('/players/' + playersController.currentPlayer.name)
			.success(function(data) {
				playersController.players = [];
				playersController.players = data;
			});
	};
	
	playersController.nameEntered = function() {
	
		return document.getElementById("name").value.length > 0;
	
	}
	
	playersController.addPlayer = function() {
		playersController.errorMessage = '';
		
		$http.post('/players/add', playersController.player)
			.success(function(currentPlayer) {
				if(currentPlayer != "PlayerAlreadyExist")
				{	
					playersController.currentPlayer.name = currentPlayer;
					playersController.getPlayers();
					updatePlayers();
					showScreen2();
					updateRequests();
					checkForPartnerAcceptance();
				}
				else
				{
					displayErrorMessage("Player already exist with this name. Please enter a different name.");
				}
			});
			
	};
	
	playersController.requestPlayer = function(player) {

		
		$http.post('/players/request/'+ playersController.currentPlayer.name,  player)
			.success(function(data) {
				playersController.requestsMadeByCurrentPlayer.push(player.name);
			});
		
	};
	
	playersController.getRequests = function() {
	
		$http.post('/players/playRequests/'+ playersController.currentPlayer.name)
			.success(function(requests) {
				playersController.getRequestsForCurrentPlayer = [];
				requests.forEach(function(result) {
					playersController.getRequestsForCurrentPlayer.push(result.from);
				});
			});
			
	};
	
	playersController.acceptRequest = function(player) {
		
		$http.post('/players/acceptResponse/' + playersController.currentPlayer.name, player)
			.success(function(success) {
				if(success)
				{
					playersController.currentPlayer.opponent = player.name;
					playersController.currentPlayer.playerType = 'toPlayer';
					showScreen3();
				}
			});
	};
	
	playersController.rejectRequest = function(player) {
		
		$http.post('/players/rejectResponse/' + playersController.currentPlayer.name, player)
			.success(function(result) {
			});
	};
	
	playersController.checkForAcceptedRequests = function() {
		
		$http.post('/players/requestResponse/' + playersController.currentPlayer.name)
			.success(function(result) {
				if(result != 'no')
				{
					playersController.currentPlayer.opponent = result;
					playersController.currentPlayer.playerType = 'fromPlayer';
					showScreen3();
				}
			});
			
	};
	
	playersController.gotPlayRequest = function(player) {
		var didIRequest = function(acc, requestedBy) {
			if(!acc)
				return requestedBy === player.name;
			return acc;
		}
		return playersController.getRequestsForCurrentPlayer.reduce(didIRequest, false);
	};
	
	playersController.ifAlreadyRequested = function(player) {
		var result1 = playersController.getRequestsForCurrentPlayer.indexOf(player.name);
		var result2 = playersController.requestsMadeByCurrentPlayer.indexOf(player.name);
		if(result1 != -1 || result2 != -1)
			return true;
		return false;
	};
	
	playersController.shipsNotChoosen = function() {
	
		return !(shipLocations.length === 5);
	
	};
	
	playersController.startTheGame = function() {
		document.getElementById('gamestartbutton').style.display = 'none';
		playersController.currentPlayer.gameState = 'Waiting for the Opponent';
		shipLocations.forEach(clearCells);
		var fromPlayer = '';
		var toPlayer = '';
		
		if(playersController.currentPlayer.playerType === 'fromPlayer')
		{
			fromPlayer = playersController.currentPlayer.name;
			toPlayer = playersController.currentPlayer.opponent;
		}
		else if(playersController.currentPlayer.playerType === 'toPlayer')
		{
			fromPlayer = playersController.currentPlayer.opponent;
			toPlayer = playersController.currentPlayer.name;
		}
		
		$http.post('/players/postSelectedCells/' + playersController.currentPlayer.playerType + '/' + shipLocations + '/' + fromPlayer + '/' + toPlayer)
			.success(function(pair) {
				if(pair.accessPair > -1)
				{
					playersController.currentPlayer.pairIndex = pair.accessPair;
					IsOpponentReady();
				}
				else
					playersController.errorMessage = 'Pair Info not found';
			});
		
	};
	
	playersController.CheckIfOpponentReady = function() {
	
		$http.post('/players/isOpponentReady/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				if(result)
				{
					if(playersController.currentPlayer.playerType === 'fromPlayer')
					{
						playersController.currentPlayer.gameState = 'Your Turn';
					}
					else if(playersController.currentPlayer.playerType === 'toPlayer')
					{
						playersController.currentPlayer.gameState = 'Opponents Turn';
						checkForMyTurn();
					}
					if(playersController.currentPlayer.targetCells.length === 0)
						playersController.getTargetCells();
				}
			});
		
	}
	
	playersController.getTargetCells = function() {
	
		$http.post('/players/getOpponentShips/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				playersController.currentPlayer.targetCells = result;
			});
	}
	
	var IsOpponentReady = function()
	{
		if(playersController.currentPlayer.gameState === 'Waiting for the Opponent')
		{
			$timeout(function() {
				playersController.CheckIfOpponentReady();
				IsOpponentReady();
			}, 3000);
		}
	}
	
	var clearCells = function(id) {
				document.getElementById(id).innerHTML = '';
				document.getElementById(id).className = '';
	}
	
	playersController.disableTableCells = function(id) {
		return playersController.currentPlayer.gameState === 'Waiting for the Opponent' 
			|| playersController.currentPlayer.gameState === 'Opponents Turn'
				|| playersController.currentPlayer.gameState === 'Game Over';
	};
	
	var checkForPartnerAcceptance = function() {
		if(playersController.currentPlayer.inPlay === 'no')
		{
			$timeout(function() {
					playersController.checkForAcceptedRequests();
					checkForPartnerAcceptance();
				}, 3000);
		}
	};
	
	var updatePlayers = function() {
		if(playersController.currentPlayer.name != '' && playersController.currentPlayer.inPlay === 'no')
		{
			$timeout(function() {
					playersController.getPlayers();
					updatePlayers();
				}, 2000);
		}
	};
	
	
	
	var updateRequests = function() {
		if(playersController.currentPlayer.inPlay === 'no')
		{
			$timeout(function() {
						playersController.getRequests();
						updateRequests();
					}, 2000);
		}
	};
	
	var paintTableOnShipPlace = function(id, msg)
	{
		document.getElementById(id).innerHTML = msg;
		document.getElementById(id).className = 'clicked';
	}
	
	var toggleSelection = function(cellID) {
	
		if(document.getElementById(cellID).className === 'clicked') {
			clearCells(cellID);
			var index = shipLocations.indexOf(cellID);
			shipLocations.splice(index, 1);
		} else {
			if(shipLocations.length < 5) {
				paintTableOnShipPlace(cellID, 'ship');
				shipLocations.push(cellID);
			} else {
				displayErrorMessage('You can only choose 5 cells.');
			}
		}
	}
	
	playersController.getCell = function(cellID) {
		playersController.errorMessage = '';
		if(playersController.currentPlayer.gameState === 'Select your five ships and click start game')
			toggleSelection(cellID);
		else if(playersController.currentPlayer.gameState === 'Waiting for the Opponent')
		{
			
		}
		else if(playersController.currentPlayer.gameState === 'Your Turn')
		{
			var index = playersController.selectedCells.indexOf(cellID);
			if(index < 0)
			{
				var index = playersController.currentPlayer.targetCells.indexOf(cellID);
				if(index >=0)
				{
					paintTableOnShipPlace(cellID, 'blast');
					playersController.currentPlayer.myScore += 1;
					playersController.updateMyScore();
				}
				else
				{
					document.getElementById(cellID).style.backgroundColor = "red";
				}
				playersController.selectedCells.push(cellID);
				playersController.updateTurn();
				playersController.currentPlayer.gameState = 'Opponents Turn';
				checkForMyTurn();
				if(playersController.currentPlayer.myScore === 5)
				{
					playersController.currentPlayer.gameState = 'Game Over';
				}
			}
		}
		else if(playersController.currentPlayer.gameState === 'Opponents Turn')
		{
			
		}
	};
	
	playersController.updateMyScore = function() {
	
		$http.post('/players/updateMyScore/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				
			});
		
	}
	
	playersController.updateTurn = function()
	{
	
		$http.post('/players/updateTurn/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				
			});
	};
	
	playersController.isItMyTurn = function()
	{
		$http.post('/players/isMyTurn/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				if(result)
				{
					playersController.currentPlayer.gameState = 'Your Turn';
					playersController.updateOpponentScore();
				}
			});
	};
	
	playersController.updateOpponentScore = function() {
	
		$http.post('/players/getOpponentScore/' + playersController.currentPlayer.playerType + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
				
				playersController.currentPlayer.opponentScore = result.opponentScore;
				if(playersController.currentPlayer.opponentScore === 5)
				{
					playersController.currentPlayer.gameState = 'Game Over';
					playersController.updateOnGameOver();
				}
					
			});
	};
	
	playersController.updateOnGameOver = function() {
	
		$http.post('/players/updateOnGameOver/' + playersController.currentPlayer.name 
																				 + '/' + playersController.currentPlayer.opponent 
																				 + '/' + playersController.currentPlayer.pairIndex)
			.success(function(result) {
			
			
			});
		
	}
	
	playersController.isGameOver = function() { 
	
		return playersController.currentPlayer.gameState === 'Game Over';
	
	};
	
	playersController.gameResult = function() {
	
		if(playersController.currentPlayer.myScore === 5)
			return '!  You Win!';
		else
			return '!  You Lose!';
	
	};
	
	playersController.didGameStart = function() { 
	
		return playersController.currentPlayer.gameState != 'Select your five ships and click start game';
	
	}
	
	var checkForMyTurn = function() {
	
		if(playersController.currentPlayer.gameState === 'Opponents Turn')
		{
			$timeout(function() {
				playersController.isItMyTurn();
				checkForMyTurn();
			}, 2000);
		}
	
	}
	
	var showScreen1 = function() {
		document.getElementById("content").style.visibility = "visible";
		document.getElementById("playersonline").style.visibility = "hidden";
		document.getElementById("gameboard").style.visibility = "hidden";
	};
	
	var showScreen2 = function() {
		document.getElementById("content").style.visibility = "hidden";
		document.getElementById("playersonline").style.visibility = "visible";
		document.getElementById("gameboard").style.visibility = "hidden";
	};
	
	var showScreen3 = function() {
		
		playersController.currentPlayer.inPlay = 'yes';
		document.getElementById("content").style.visibility = "hidden";
		document.getElementById("playersonline").style.visibility = "hidden";
		document.getElementById("content").style.display = "none";
		document.getElementById("playersonline").style.display = "none";
		document.getElementById("gameboard").style.visibility = "visible";
	};
	
	playersController.players = [];
	playersController.getRequestsForCurrentPlayer = [];
	playersController.requestsMadeByCurrentPlayer = [];
	playersController.currentPlayer = {  
																			name : '',
																			inPlay : 'no',
																			opponent : '',
																			playerType : '',
																			gameState : 'Select your five ships and click start game',
																			pairIndex : -1,
																			targetCells : [],
																			myScore : 0,
																			opponentScore : 0
																		};
	playersController.errorMessage = '';
	playersController.selectedCells = [];
	showScreen1();

});